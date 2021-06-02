import { TOGGLE_ADD_CHANNELS_MODAL, TOGGLE_SIGN_IN_MODAL } from "../sources/constants/actionTypes";

const initialState = {
    addChannelsModalIsOpen: false,
    signInModalIsOpen: false
};

export default function modals(state = initialState, action = {}) {
    switch (action.type) {
        case TOGGLE_ADD_CHANNELS_MODAL:
            return {
                ...state,
                addChannelsModalIsOpen: !state.addChannelsModalIsOpen
            };
        case TOGGLE_SIGN_IN_MODAL:
            return {
                ...state,
                signInModalIsOpen: !state.signInModalIsOpen
            };
        default:
            return state
    }
}