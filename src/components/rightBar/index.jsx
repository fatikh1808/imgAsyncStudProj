import React, { useCallback, useState, useEffect, Component } from "react";
import { useDropzone } from "react-dropzone";
import Form from "@rjsf/core";
import { v4 as uuid } from 'uuid';

import "./schemaStyle.scss";

import worker from "../../worker.js";
import WebWorker from "../../workerSetup";

import { Spin } from 'antd';
import Button from "react-bootstrap/Button";
import { schema, uiSchema } from "./schemas";

const myWorker = new WebWorker(worker);

function RightBar ({
    setLoaders
}) {

    const [urlLoading, setUrlLoading] = useState(false);

    function setUUID(array, loadType) {
        if (loadType === "url") {
            return array.map(item => ({
                ...item,
                id: uuid(),
                status: "wait"
            }))    
        } else {
            return array.map(item => ({
                imageURL: URL.createObjectURL(item),
                id: uuid(),
                status: "done"
            }))   
        }
        
    }
    
    const executeStatus = useCallback(function (event) {
        const message = event.data;

        setLoaders(message);
    }, []);

    const onDrop = useCallback((acceptedFiles) => {
        myWorker.postMessage({status: "loadFromLocal", data: setUUID(acceptedFiles, "local")});
    }, []);

    useEffect(() => {
        myWorker.addEventListener("message", executeStatus);

        return () => myWorker.removeEventListener("message", executeStatus);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const onSubmit = ({ formData }) => {
        myWorker.postMessage({status: "loadFromURL", data: setUUID(formData.uriArr, "url")});
        setUrlLoading(true)
    }

    return (
        <div className={"right__bar"}>
            <Spin spinning={urlLoading}>
                <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmit}>
                    <div className="submit__button">
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                    </div>
                    </Form>
                </Spin>
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