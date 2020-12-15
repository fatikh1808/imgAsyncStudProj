import * as types from "../constants";

const initialState = {
    allUrls: [],
};

export default function getImgs(state = initialState, action) {
    switch (action.type) {
        case types.GET_FORM_DATA:
            return {
                ...state,
                // allUrls: ,
            };

        default:
            return state;
    }
}
