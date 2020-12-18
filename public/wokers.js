self.importScripts("../src/compression.js")

onmessage = (acceptedFiles) => {
// console.log(Compressor(acceptedFiles))
console.log(self)      

// acceptedFiles.data.forEach((file) => {
        //     console.log('originalFile instanceof Blob', file instanceof Blob); // true
        //     console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
            
        //     var options = {
        //         maxSizeMB: 1,
        //         maxWidthOrHeight: 1920,
        //         useWebWorker: true
        //     }
        //     imageCompression(file, options)
        //         .then(function (compressedFile) {
        //         console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        //         console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
            
        //         return postMessage(compressedFile); // write your own logic
        //         })
        //         .catch(function (error) {
        //         console.log(error.message);
        //         });
            
            
            // const reader = new FileReader();

            // reader.onabort = () => console.log("file reading was aborted");
            // reader.onerror = () => console.log("file reading has failed");
            // reader.onload = () => {
            //     // Do whatever you want with the file contents
            //     const binaryStr = reader.result;
            //     postMessage(binaryStr);

            // };
            // reader.readAsDataURL(file);
        // });
        console.log('Worker: Posting message back to main script');
}