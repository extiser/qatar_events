import { SET_FILTERS } from "../sources/constants/actionTypes";

export default function filters(state = {}, action = {}) {
    switch (action.type) {
        case SET_FILTERS:
            return action.filters;
        default:
            return state
    }
}