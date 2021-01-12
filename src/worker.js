/* eslint-disable no-loop-func */
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const promises = [];
    let data = {};
    const urlMaker = (file) => {
        return URL.createObjectURL(file)
    }
  // eslint-disable-next-line no-restricted-globals
    self.addEventListener("message", event => {
        const sourceData = event.data;
        switch (sourceData.status) {
            case 'delete':
                delete data[sourceData.id];
                postMessage(data)
                break;
            default:
                sourceData.forEach(({ uri, id, loadType, imageURL, file }) => {
                    console.log(file)
                    switch (loadType) {
                        case 'local':
                            if (/(image\/png)|(image\/jpeg)|(image\/gif)/gi.test(file.type) && file.size < 21000000) {
                                data[id] = {
                                        status: "done",
                                        imageURL,
                                        id,
                                        loadType
                                    };
                                    postMessage(data);
                            } else {
                                postMessage({status: 'error', data})
                            }
                            break;
                        case 'url':
                            const promise = fetch(uri, {
                                headers: {
                                    'Accept': 'image/*',
                                    'Content-Type': 'image/*'
                                },
                            })
                                .then((response) => {
                                    data[id] = {
                                        status: "loading",
                                        id,
                                        uri,
                                        loadType
                                    };
                                    postMessage(data)
                                    return response.blob();
                                })
                                .then((blob) => {
                                    imageURL = urlMaker(blob);
                                    data[id] = {
                                        status: "done",
                                        id,
                                        imageURL,
                                        uri,
                                        loadType
                                    };
                                    console.log(data[id])

                                    postMessage(data);
                                })
                                .catch((error) => {
                                    postMessage({ status: 'error', data })
                                    
                                    data[id] = {
                                        status: "error",
                                        uri,
                                        error,
                                        loadType
                                    };
                                    postMessage(data);
                                });
                            promises.push(promise);
                            break;
                        default:
                            break;
                    }
                });

                Promise.all(promises).then(
                    () => postMessage({status: "finish"})
                ).catch()
                break;
        }
    });
}