import { REMOVE_USER, GET_USER } from "../sources/constants/actionTypes";
import API from 'API'
import CookieManager from "react-native-cookies"
import { Platform } from 'react-native'

export function getUser(successCallback, errorCallback) {
    return dispatch => {
        API.getUser()
            .then(res => {
                console.log('user', res);
                dispatch({
                    type: GET_USER,
                    data: res.data
                });

                if (successCallback) successCallback();
            }).catch(err => {
                const { data } = err.response;
                const { error } = data;

                if (errorCallback) errorCallback();
            })
    }
}

export function removeUser() {
    return {
        type: REMOVE_USER,
    }
}