import * as types from "../constants";

export const getImgs = (urls) => {
    return {
        type: types.GET_FORM_DATA,
        urls: urls,
    };
};
