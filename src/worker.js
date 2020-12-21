// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // eslint-disable-next-line no-restricted-globals
self.addEventListener("message", async e => {

    let images = []

        function* gen(arr) {
            for (let i = 0; i < arr.length; i++) {
                yield arr[i];
            }
        }

        const genratorIter = gen(e.data);

        async function hh() {
            let n = genratorIter.next();
            let imageURL;
            let blob;
            if (!n.done) {
                if (n.value.uri === undefined) {
                    imageURL = await URL.createObjectURL(n.value);
                    // First, we'll fetch the image file
                    const response = await fetch(imageURL)
                    // Once the file has been fetched, we'll convert it to a `Blob`
                    blob = await response.blob()
                } else {
                    let response = await fetch(n.value.uri);
                    if (!response.ok) {
                        throw new Error(response.status);
                    } else {
                        blob = await response.blob();
                        imageURL = await URL.createObjectURL(blob);
                    }
                }    
                images.push({
                    imageURL: imageURL,
                    blob: blob,
                })
                hh()
            
            } else {
            postMessage(images);
            }
        }
    
        hh()
    });
}

