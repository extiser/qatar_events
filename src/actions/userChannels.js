import { GET_USER_CHANNELS, REMOVE_USER_CHANNEL, REMOVE_ALL_USER_CHANNEL } from "../sources/constants/actionTypes";
import API from 'API'
import OneSignal from 'react-native-onesignal';
import storage from 'storage'

//storage.remove({key: 'tagsIsSended'});

const saveTags = async channels => {
    let tags = {};

    channels.forEach(channel => {
        tags[`channel${channel.id}`] = '1'
    });

    storage.save({key: 'tagsIsSended', data: true});
    OneSignal.sendTags(tags);
};

export function getUserChannels() {
    return async dispatch => {
        try {
            const { data: channels } = await API.getUserChannels();

            try {
                const tagsIsSended = await storage.load({key: 'tagsIsSended'});
            } catch (e) {
                if (e.name === 'NotFoundError') {
                    saveTags(channels)
                }
            }

            dispatch({
                type: GET_USER_CHANNELS,
                data: channels
            });
        } catch(err) {
            const { data } = err.response;
            const { error } = data;
        }
    }
}

export function removeAllChannels() {
    return {
        type: REMOVE_ALL_USER_CHANNEL,
    }
}

export function removeChannel(id) {
    return {
        type: REMOVE_USER_CHANNEL,
        id
    }
}