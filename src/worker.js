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
        return URL.createObjectURL(file)
    }

    /**
     * Function modifier value of Data by it`s key
     * @param {String} id 
     * @param {object} options 
     */
    const dataUpdater = (id, options) => {
        data[id] = options
    }
    // eslint-disable-next-line no-restricted-globals
    self.addEventListener("message", event => {

        /** variable sourceData 
         *  @param {Array} sourceData - body of the answer from front 
         * */
        const sourceData = event.data;

        /** checking status of the answer, deleting or adding 
         * @param {String} sourceData.status - status, shows what need to do
        */
        switch (sourceData.status) {

            /** 
             * delete the value of data by its key, which sended with answer. Then send modified data to front
             * @param {integer} data[sourceData.id] - key of the data value 
             */

            case 'delete':
                delete data[sourceData.id];
                postMessage(data)
                break;
            
            /** fetching => adding the file to the data */
            default:
                /**
                 * Doing smth with each element of Array
                 * @param {uri} uri - element`s uri of sourceData
                 * @param {Integer} id - element`s id of sourceData
                 * @param {String} loadType - element`s type load of sourceData
                 * @param {URL} imageURL - element`s url for src option of image node
                 * @param {File} file - element`s file of sourceData
                 */
                sourceData.forEach(({ uri, id, loadType, imageURL, file }) => {

                    /** 
                     * checking loadtype, bcs we need`nt fetch the local files 
                     * @param {String} loadType - shows, from where they were loaded
                     * */
                    switch (loadType) {
                        /**
                         * If loadType is local, we need`nt to fetch them
                         */
                        case 'local':
                            /** checking the file type and it`s size
                             * if, file type and size is ok, modify it
                             * @param {image} file.type - type of local loaded blob
                             * @param {Integer} file.size - size of local loaded blob
                             */
                            if (/(image\/png)|(image\/jpeg)|(image\/gif)/gi.test(file.type) && file.size < 21000000) {
                                
                                /** 
                                 * modify the element
                                 * @param {String} status - shows status of element 
                                 * */
                                data[id] = {
                                        status: "done",
                                        imageURL,
                                        id,
                                        loadType
                                };
                                
                                /**
                                 * Sending the modified data variable to front
                                 */
                                postMessage(data);
                            }
                            /**
                             * If file type or size is`nt suitable, send data without modifying
                             */
                            else {
                                postMessage({status: 'error', data})
                            }
                            break;
                        /** 
                         * If loadType is url, we shoul fetch them
                         */
                        case 'url':
                            /**
                             * Fetching the file by it`s uri
                             * @param {uri} uri - uri of the file 
                             * @param {headers} headers - options of fetching
                             */
                            const promise = fetch(uri, {
                                headers: {
                                    'Accept': 'image/*',
                                    'Content-Type': 'image/*'
                                },
                            })
                                .then((response) => {
                                    
                                    /**
                                     * Calling the function dateUpdater
                                     */
                                    dataUpdater(id,{
                                            status: "loading",
                                            id,
                                            uri,
                                            loadType
                                    })
                                    /**
                                     * Sending the mofified data to front
                                     */
                                    postMessage(data)

                                    /**
                                     * Responsing the fetched promise to blob
                                     */
                                    return response.blob();
                                })
                                .then((blob) => {
                                    /**
                                     * Creating the imageURL by it`s responsed blob
                                     */
                                    imageURL = urlMaker(blob);
                                    
                                    /**
                                     * Calling the function dateUpdater
                                     */
                                    dataUpdater(id,{
                                            status: "done",
                                            id,
                                            imageURL,
                                            uri,
                                            loadType
                                    })
                                    /**
                                     * Sending the mofified data to front
                                     */
                                    postMessage(data);
                                })
                                /**
                                 * Catching the error, while fetching
                                 * here, we can just send data to front without modifying it
                                 * or, modify data with element error. Then doing smth in front with it
                                 */
                                .catch((error) => {

                                    /**
                                     * Sending data to front without modifying, but with status error. which shows, catched error while fetching with smth
                                     */
                                    postMessage({ status: 'error', data })
                                    
                                    /**
                                     * Modifying data, by adding element with error status and text of error
                                     */
                                    dataUpdater(id,{
                                            status: "error",
                                            uri,
                                            error,
                                            loadType,
                                            id
                                    })

                                    /**
                                     * Sending the mofified data to front
                                     */
                                    postMessage(data);
                                });
                            /**
                             * Adding promise to array of promise
                             */
                            promises.push(promise);
                            break;
                        default:
                            break;
                    }
                });

                /**
                 * Waiting, end of all operations
                 * send the message with status of finish
                 */
                Promise.all(promises).then(
                    () => postMessage({status: "finish"})
                ).catch()
                break;
        }
    });
}