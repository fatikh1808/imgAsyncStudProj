import React, { useCallback, useState, useEffect} from "react";
import { useDropzone } from "react-dropzone";
import Form from "@rjsf/core";
import "./schemaStyle.scss";

import worker from "../../worker.js";
import WebWorker from "../../workerSetup";

import { Spin } from 'antd';
import Button from "react-bootstrap/Button";
import { schema, uiSchema } from "./schemas";

const RightBar = ({ getDropZone, setNum, setAcceptedArray, acceptedArray, reload, setReload }) => {

    const [dropLoading, setDropLoading] = useState(false);
    const [urlLoading, setUrlLoading] = useState(false);
    const [downloadProcess, setDownloadProcess] = useState(0)

    let myWorker = new WebWorker(worker);

    const onDrop = useCallback((acceptedFiles) => {
        setAcceptedArray(acceptedFiles)
        setNum({
            num: acceptedFiles.length,
            active: true
        })
        myWorker.postMessage(acceptedFiles);
        setDropLoading(true)    
    }, []);

    useEffect(() => {
        myWorker.addEventListener("message", event => {
            if (event.data.key === "data") {
                setNum({
                num: 0,
                active: false
            })
                getDropZone(event.data)
                setUrlLoading(false)
                setDropLoading(false)
            } else if (event.data.key === 'process'){
                console.log(downloadProcess)
                setDownloadProcess(downloadProcess + 1)
            } else {
                getDropZone(event.data)
            }
        });
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    useEffect(() => {
        if (reload) {
            setNum({
                num: acceptedArray.length,
                active: true
            })
            myWorker.postMessage(acceptedArray);    
            setReload(false)
        }
    },[reload])

    const onSubmit = ({ formData }) => {
        setAcceptedArray(formData.uriArr)
        setNum({
            num: formData.uriArr.length,
            active: true
        })
        myWorker.postMessage(formData.uriArr);
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
                <Spin spinning={dropLoading}>
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
            </Spin>
            {downloadProcess}
        </div>
    );
};

export default RightBar;
