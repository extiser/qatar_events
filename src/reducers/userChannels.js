import { GET_USER_CHANNELS, REMOVE_USER_CHANNEL, REMOVE_ALL_USER_CHANNEL } from "../sources/constants/actionTypes";

export default function userChannels(state = [], action = {}) {
    switch (action.type) {
        case GET_USER_CHANNELS:
            return [
                ...action.data
            ];
        case REMOVE_USER_CHANNEL:
            return state.filter(channel => channel.id != action.id);
        case REMOVE_ALL_USER_CHANNEL:
            return [];
        default:
            return state
    }
}