import { REMOVE_USER, GET_USER } from "../sources/constants/actionTypes";

const initialState = {
    data: {}
};

export default function user(state = initialState, action = {}) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                data: action.data
            };
        case REMOVE_USER:
            return {
                ...state,
                data: {}
            };
        default:
            return state
    }
}