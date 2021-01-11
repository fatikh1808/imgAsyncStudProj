/* eslint-disable no-loop-func */
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const source = [];
    let data = {};

    const urlMaker = (file) => {
        return URL.createObjectURL(file)
    }
  // eslint-disable-next-line no-restricted-globals
    self.addEventListener("message", event => {
        
        if (event.data.status === 'loadedFromLocal') {
            source.push(event.data.data)
        }

        data = [...event.data.data, ...source].reduce((result, { uri, id }) => {
            result[id] = { uri, status: "loading" };

        return result;
    }, {});

    postMessage({
        status: "loading",
        data
    });


    for (const [id, { uri }] of Object.entries(data)) {
        fetch(uri)
            .then((response) => response.blob())
            .then((blob) => {
                data[id] = {
                    status: "done",
                    uri,
                    imageURL: urlMaker(blob)
                };
                
                postMessage(data)
            })
            .catch(error => {
                data[id] = {
                    status: "error",
                    uri,
                    error
                };

                postMessage(data);
            })
    }
    
    
    });
}