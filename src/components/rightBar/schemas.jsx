export const schema = {
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
                        format: "url",
                    },
                },
            },
        },
    },
};

export const uiSchema = {
    uriArr: {
        "ui:options": {
            orderable: false,
        },
    },
};
