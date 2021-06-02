import { SET_FILTERS } from "../sources/constants/actionTypes";

export function setFilters(filters = {}) {
    return {
        type: SET_FILTERS,
        filters
    }
}