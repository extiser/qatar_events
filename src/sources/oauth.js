import { google, facebook, twitter } from 'react-native-simple-auth';

const FACEBOOK_APP_ID = '366486140496617';
const FACEBOOK_AUTH_CALLBACK = 'fb366486140496617://authorize';

const TWITTER_APP_ID = 'wr6G64dcEnPJeHb5VR3U9yQXC';
const TWITTER_APP_SECRET = 'eXm2JpA1VpSAje70BfAcAtbjZXAQ7VgkI7vDRGYz89ydoIcqU4';
const TWITTER_AUTH_CALLBACK = 'qatar://authorize';

export const FACEBOOK = 'facebook';
export const TWITTER = 'twitter';

const Auth = {
    facebook,
    twitter,
    google,
};

export default authenticateWith = (name, successCallback, errorCallback, beforeCallback) => {
    let config = {};
    switch (name) {
        case FACEBOOK:
            config = {
                appId: FACEBOOK_APP_ID,
                callback: FACEBOOK_AUTH_CALLBACK,
            };
            break;
        case TWITTER:
            config = {
                appId: TWITTER_APP_ID,
                appSecret: TWITTER_APP_SECRET,
                callback: TWITTER_AUTH_CALLBACK,
            };
            break;
        default:
            console.error('Add a social network name')
    }

    if (beforeCallback) beforeCallback();

    return Auth[name](config).then((info) => {
        successCallback(info);
    }).catch((error) => {
        errorCallback(error);
    });
}