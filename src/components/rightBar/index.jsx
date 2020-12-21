import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Form from "@rjsf/core";
import "./schemaStyle.scss";

import worker from "../../worker.js";
import WebWorker from "../../workerSetup";

import Button from "react-bootstrap/Button";
import { schema, uiSchema } from "./schemas";


const RightBar = ({ getFormData, getDropZone }) => {

    let myWorker = new WebWorker(worker);

    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles)
        myWorker.postMessage(acceptedFiles);
        console.log("started")
        
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const onSubmit = ({formData}) => myWorker.postMessage(formData.uriArr);


    myWorker.addEventListener("message", event => {
            console.log(event.data)
            getDropZone(event.data)
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
