import imageCompression from "browser-image-compression";

export function Compressor(acceptedFiles) {
acceptedFiles.data.forEach((file) => {
    console.log('originalFile instanceof Blob', file instanceof Blob); // true
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
            
    var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }
    imageCompression(file, options)
        .then(function (compressedFile) {
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
            
            return compressedFile
        })
        .catch(function (error) {
            console.log(error.message);
        });
})
}

