import {
    URL,
    API_URL,
    EVENT_ROUTE,
    EVENTS_URL,
    PINNED_EVENTS,
    TYPES_URL,
    USER_URL,
    LOGIN_URL,
    LOGOUT_URL,
    CHANNELS_URL,
    EVENT_URL,
    REGISTER_URL,
    SUBSCRIBE_CHANNEL_URL,
    UNSUBSCRIBE_CHANNEL_URL,
    USER_CHANNELS_URL,
    SUBMIT_EVENT_URL,
    GET_IN_TOUCH_URL,
    TECHNICAL_SUPPORT_URL,
    FAVOURITE_URL, UNFAVOURITE_URL, OAUTH_URL, FAVOURITES_URL
} from "./urls";
import axios from 'axios'

function api(config) {
    let request = axios.create({
        baseURL: URL + API_URL,
        withCredentials: true,
        ...config
    });

    return request
}

export default {
    getEvents(data) {
        return api().get(EVENTS_URL, {params: data})
    },

    getPinnedEvents(data) {
        return api().get(PINNED_EVENTS, {params: data})
    },

    getEvent(id) {
        return api().get(`${EVENT_URL}/${id}`)
    },

    getTypes() {
        return api().get(TYPES_URL)
    },

    login(data) {
        return api().post(LOGIN_URL, data)
    },

    logout() {
        return api().get(LOGOUT_URL)
    },

    getUser() {
        return api().get(USER_URL)
    },

    postUser(data) {
        return api().post(USER_URL, data)
    },

    getChannels() {
        return api().get(CHANNELS_URL)
    },

    getChannel(id) {
        return api().get(`${USER_URL}/${id}`)
    },

    getChannelEvents(data) {
        return api().get(EVENTS_URL, {params: data})
    },

    saveUser(data) {
        return api().post(REGISTER_URL, data)
    },

    subscribeChannel(id) {
        return api().post(`${SUBSCRIBE_CHANNEL_URL}/${id}`)
    },

    unsubscribeChannel(id) {
        return api().post(`${UNSUBSCRIBE_CHANNEL_URL}/${id}`)
    },

    getUserChannels() {
        return api().get(USER_CHANNELS_URL)
    },

    submitEvent(data) {
        return api().post(SUBMIT_EVENT_URL, data)
    },

    getInTouch(data) {
        return api().post(GET_IN_TOUCH_URL, data)
    },

    technicalSupport(data) {
        return api().post(TECHNICAL_SUPPORT_URL, data)
    },

    getFavouriteEvents() {
        return api().get(FAVOURITES_URL)
    },

    favourite(id) {
        return api().post(`${FAVOURITE_URL}/${id}`)
    },

    unfavourite(id) {
        return api().post(`${UNFAVOURITE_URL}/${id}`)
    },

    oauth(data) {
        return api().post(OAUTH_URL, data)
    },
}