import API from 'API'
import { GET_TYPES } from "../sources/constants/actionTypes";

export function getTypes() {
    return dispatch => {
        API.getTypes()
            .then(data => {
                dispatch({
                    type: GET_TYPES,
                    data
                })
            })
    }
}