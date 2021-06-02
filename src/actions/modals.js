import { TOGGLE_ADD_CHANNELS_MODAL, TOGGLE_SIGN_IN_MODAL } from "../sources/constants/actionTypes";

export function toggleAddChannelsModal() {
    return {
        type: TOGGLE_ADD_CHANNELS_MODAL
    }
}

export function toggleSignInModal() {
    return {
        type: TOGGLE_SIGN_IN_MODAL
    }
}