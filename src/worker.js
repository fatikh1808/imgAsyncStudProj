/* eslint-disable no-loop-func */
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const promises = [];

    /** Variable
     *  @param {object} data - object, which contains general info abt datas.Contains keys, loadTypes and others
     * */
    let data = {};

    /**
     * Function urlMaker
     * @constructor
     * @param {file} file - file, for which need create url
     *  */
    const urlMaker = (file) => {
        return URL.createObjectURL(file);
    };

    /**
     * Function modifier value of Data by it`s key
     * @param {String} id
     * @param {object} options
     */
    const dataUpdater = (id, options) => {
        data[id] = options;
    };
    // eslint-disable-next-line no-restricted-globals
    self.addEventListener("message", (event) => {
        const sourceData = event.data;

        switch (sourceData.status) {
            case "delete":
                delete data[sourceData.id];
                postMessage(data);
                break;

            default:
                sourceData.forEach(({ uri, id, loadType, imageURL, file }) => {
                    switch (loadType) {
                        case "local":
                            if (
                                /(image\/png)|(image\/jpeg)|(image\/gif)/gi.test(
                                    file.type
                                ) &&
                                file.size < 21000000
                            ) {
                                data[id] = {
                                    status: "done",
                                    imageURL,
                                    id,
                                    loadType,
                                };

                                postMessage(data);
                            } else {
                                postMessage({ status: "error", data });
                            }
                            break;

                        case "url":
                            const promise = fetch(uri, {
                                headers: {
                                    Accept: "image/*",
                                    "Content-Type": "image/*",
                                },
                            })
                                .then((response) => {
                                    dataUpdater(id, {
                                        status: "loading",
                                        id,
                                        uri,
                                        loadType,
                                    });

                                    postMessage(data);

                                    return response.blob();
                                })
                                .then((blob) => {
                                    imageURL = urlMaker(blob);

                                    dataUpdater(id, {
                                        status: "done",
                                        id,
                                        imageURL,
                                        uri,
                                        loadType,
                                    });

                                    postMessage(data);
                                })

                                .catch((error) => {
                                    postMessage({ status: "error", data });

                                    dataUpdater(id, {
                                        status: "error",
                                        uri,
                                        error,
                                        loadType,
                                        id,
                                    });

                                    postMessage(data);
                                });

                            promises.push(promise);
                            break;
                        default:
                            break;
                    }
                });
                Promise.all(promises)
                    .then(() => postMessage({ status: "finish" }))
                    .catch();
                break;
        }
    });
};
