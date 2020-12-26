// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    const urlMaker = (file) => {
        return URL.createObjectURL(file)
    }

  // eslint-disable-next-line no-restricted-globals
self.addEventListener("message", async event => {

    let images = [];    
    
    const promises = event.data.map(async el => {
        if (el.uri === undefined) {
            await fetch(urlMaker(el))
                .then((response) => response.blob())
                .then((blob) => {
                    images.push({
                        imageURL: urlMaker(blob),
                        blob: blob
                    })
                    postMessage({ key: "process", process: 1 }); //how to save process 
                })
                .catch(error => postMessage({key: "download error", title: error}))
            } else {
                await fetch(el.uri)
                    .then((response) => response.blob())
                    .then((blob) => {
                        images.push({
                            imageURL: urlMaker(blob),
                            blob: blob
                        })
                        postMessage({ key: "process", process: 1}); //how to save process 
                    })
                .catch(error => postMessage({key: "download error", title: error}))
            }
        
    });
    await Promise.all(promises);
    postMessage({ key: "data", images });
        
    
    //     function* gen(arr) {
    //         for (let i = 0; i < arr.length; i++) {
    //             yield arr[i];
    //         }
    //     }
    //     const genratorIter = gen(e.data);
    //     async function hh() {
    //         let n = genratorIter.next();
    //         let imageURL;
    //         let blob;
    //         if (!n.done) {
    //             if (n.value.uri === undefined) {
    //                 imageURL = await URL.createObjectURL(n.value);
    //                 // First, we'll fetch the image file
    //                 const response = await fetch(imageURL)
    //                 // Once the file has been fetched, we'll convert it to a `Blob`
    //                 blob = await response.blob()
    //             } else {
    //                 let response = await fetch(n.value.uri);
    //                 if (!response.ok) {
    //                     throw new Error(response.status);
    //                 } else {
    //                     blob = await response.blob();
    //                     imageURL = await URL.createObjectURL(blob);
    //                 }
    //             }    
    //             images.push({
    //                 imageURL: imageURL,
    //                 blob: blob,
    //             })
    //             hh()   
    //         } else {
    //         postMessage(images);
    //         }
    //     }
    //     hh()
    });
}