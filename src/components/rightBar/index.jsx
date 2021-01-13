import React, { useCallback, useState, useEffect } from "react";
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


/**
 * 
 * @param {Functions} setLoaders 
 * @param {Object} deleteItem
 */
function RightBar ({
    setLoaders,
    deleteItem
}) {

    /**
     * Checking the changings in deleteItem
     */
    useEffect(() => {
        /**
         * if changed deleteItem and it`s status
         * Send the deleteItem to webWorker, to midfy root data
         */
        if (deleteItem.status === 'delete') {
            myWorker.postMessage(deleteItem);
        }
    }, [deleteItem])

    /**
     * @param {Boolean} urlLoading
     */
    const [urlLoading, setUrlLoading] = useState(false);

    /**
     *  Setting unique id`s to elements of array
     * @param {Array} array 
     * @param {String} loadType 
     */
    function setUUID(array, loadType) {
        /**
         * if loadType is url, 
         * we need just add uuid to element
         * else we also can add imageURL, bcs we need`nt fetch this element
         */
        if (loadType === "url") {
            return array.map(item => ({
                ...item,
                id: uuid(),
                status: "wait",
                loadType: "url"
            }))    
        } else {
            return array.map(item => ({
                file: item,
                imageURL: URL.createObjectURL(item),
                id: uuid(),
                status: "wait",
                loadType: "local"
            }))   
        }
        
    }
    
    /**
     * Function executeStatus, do smth, when worker answer contain status
     * @param {Object} event
     */
    const executeStatus = useCallback(function (event) {
        const message = event.data;
        if (message.status === "finish") {
            setUrlLoading(false)
        } else if (message.status === 'error') {
            alert(message.status) //do here smth, if droped wrong format 
        } else {
            setLoaders(message);
        }
    }, []);


    /**
     * Modifying the dropped Array and sending it to worker
     * @param {Array} acceptedFiles
     */
    const onDrop = useCallback((acceptedFiles) => {
        myWorker.postMessage(setUUID(acceptedFiles, "local"));
    }, []);

    /**
     * Detecting answer of worker
     */
    useEffect(() => {
        myWorker.addEventListener("message", executeStatus);

        return () => myWorker.removeEventListener("message", executeStatus);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    /**
     * Sending the modified message by setUUID to worker 
     * @param {Array} formData 
     */
    const onSubmit = ({ formData }) => {
        myWorker.postMessage(setUUID(formData.uriArr, "url"));
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