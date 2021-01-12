/* eslint-disable no-loop-func */
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {


    const promises = [];

    /** variable, data => object, which contains general info abt datas.Contains keys, loadTypes and others */ 
    let data = {};  


    /** Function urlMaker => get file or blob => make the url, for src of image node */
    const urlMaker = (file) => {
        return URL.createObjectURL(file)
    }

    const dataUpdater = (id, options) => {
        data[id] = options
    }
    // eslint-disable-next-line no-restricted-globals
    self.addEventListener("message", event => {

        /** sourceData = body of the answer from front */
        const sourceData = event.data;

        /** checking status of the answer, deleting or adding */
        switch (sourceData.status) {

            /** 
             * delete the item by its key, which sended with answer 
             */
            case 'delete':
                delete data[sourceData.id];
                postMessage(data)
                break;
            /** fetching => adding the file to the data */
            default:
                sourceData.forEach(({ uri, id, loadType, imageURL, file }) => {
                    /** checking loadtype, bcs we need`nt fetch the local files */
                    switch (loadType) {
                        case 'local':
                            /** checking the file type and it\s size */
                            if (/(image\/png)|(image\/jpeg)|(image\/gif)/gi.test(file.type) && file.size < 21000000) {
                                
                                /** add the files wth status: done to data */
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
                                    dataUpdater(id,{
                                            status: "loading",
                                            id,
                                            uri,
                                            loadType
                                        })
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