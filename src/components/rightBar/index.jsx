import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Form from "@rjsf/core";
import "./schemaStyle.scss";

import Button from "react-bootstrap/Button";
import { schema, uiSchema } from "./schemas";

const RightBar = ({ getFormData, getDropZone }) => {
    const onSubmit = ({ formData }, e) => getFormData(formData);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result;
                getDropZone({ binaryStr });
            };
            reader.readAsDataURL(file);
        });
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
