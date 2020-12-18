import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Form from "@rjsf/core";
import "./schemaStyle.scss";
import imageCompression from 'browser-image-compression';

import Button from "react-bootstrap/Button";
import { schema, uiSchema } from "./schemas";

const RightBar = ({ getFormData, getDropZone }) => {

const myWorker = new Worker("wokers.js");

	// first.onchange = function() {
	// myWorker.postMessage([first.value, second.value]);
    // console.log('Message posted to worker');
	// }

	// second.onchange = function() {
	// myWorker.postMessage([first.value, second.value]);
	// console.log('Message posted to worker');
	// }

    // myWorker.onmessage = function (e) {
    //     console.log('Message received from worker ' + e.data)
    //     let result = e.data
    //     getDropZone({result})
	// }
    const onSubmit = ({ formData }, e) => getFormData(formData);

    const onDrop = useCallback((acceptedFiles) => {
        myWorker.postMessage(acceptedFiles, imageCompression)
        // acceptedFiles.forEach((file) => {
        //     console.log('originalFile instanceof Blob', file instanceof Blob); // true
        //     console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
            
        //     var options = {
        //         maxSizeMB: 1,
        //         maxWidthOrHeight: 1920,
        //         useWebWorker: true
        //     }
        //     imageCompression(file, options)
        //         .then(function (compressedFile) {
        //             console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        //             console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
            
        //             getDropZone({compressedFile}); // write your own logic
        //         })
        //         .catch(function (error) {
        //             console.log(error.message);
        //         });
        // })
        console.log('Message posted to worker');
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <div className={"right__bar"}>
            <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmit}>
                <div className="submit__button">
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </div>
            </Form>
            <form {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="right__bar__drop_zone_active">
                        Drop the files here ...
                    </p>
                ) : (
                    <p className="right__bar__drop_zone">
                        Drag 'n' drop some files here, or click to select files
                    </p>
                )}
            </form>
        </div>
    );
};

export default RightBar;
