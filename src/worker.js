// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // eslint-disable-next-line no-restricted-globals
self.addEventListener("message", async e => {

    let images = [];
    let Blob;
    let url
    const promises = e.data.map(async el => {
                if (el.uri === undefined) {
                url = URL.createObjectURL(el)
                const response = await fetch(url)
                const fileBlob = await response.blob();
                Blob = fileBlob;
            } else {
                const response = await fetch(el.uri)
                const fileBlob = await response.blob()
                url = URL.createObjectURL(fileBlob)
                Blob = fileBlob
            }
            return images.push({
                imageURL: url,
                blob: Blob,
            })

    });
    await Promise.all(promises)
        postMessage(images)
        
    

    // e.data.forEach(async el => {
    //     console.log("el", el)
    //     let Blob;
    //     let url
    //     if (el.uri === undefined) {
    //         url = URL.createObjectURL(el)
    //         const t = await fetch(url)
    //         const b = await t.blob();
    //         Blob = b;
    //     } else {
    //         const t = await fetch(el.uri)
    //         const b = await t.blob()
    //         url = URL.createObjectURL(b)
    //         Blob = b
    //     }
    //     images.push({
    //         imageURL: url,
    //         blob: Blob,
    //     })
    // });

    // postMessage(images)




    // let imageURL;
    // let blob;
    // for (let p in e.data) {
    //     let item = e.data[p]
    //     if (item.uri === undefined) {
    //         console.log(e.data[p])
    //         imageURL = await URL.createObjectURL(item);
    //         // First, we'll fetch the image file
    //         const response = await fetch(imageURL)
    //         // Once the file has been fetched, we'll convert it to a `Blob`
    //         blob = await response.blob()
    //     } else {
    //         let response = await fetch(item.uri);
    //         if (!response.ok) {
    //             throw new Error(response.status);
    //         } else {
    //             blob = await response.blob();
    //             imageURL = await URL.createObjectURL(blob);
    //         }
    //     }
    //     images.push({
    //         imageURL: imageURL,
    //         blob: blob,
    //     })
    // }
    // postMessage(images)






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