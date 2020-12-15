import React from "react";
import Form from "@rjsf/core";
import "./schemaStyle.scss";
import Button from "react-bootstrap/Button";

const RightBar = ({ getFormData }) => {
    const schema = {
        title: "load files",
        type: "object",
        properties: {
            uriArr: {
                type: "array",
                title: "A list of strings",
                items: {
                    type: "object",
                    properties: {
                        uri: {
                            type: "string",
                            format: "data-url",
                        },
                    },
                },
            },
        },
    };

    const uiSchema = {
        uriArr: {
            "ui:options": {
                orderable: false,
            },
        },
    };

    const onSubmit = ({ formData }, e) => getFormData(formData);

    return (
        <div className={"right__bar"}>
            <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmit}>
                <div className="submit__button">
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default RightBar;
