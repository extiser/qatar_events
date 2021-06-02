import authenticateWith from "./oauth";

export default [
    {
        name: 'facebook',
        icon: {
            ios: require('/static/icons/social/facebook.svg'),
            android: require('/static/icons/social/facebook-android.png')
        },
        authenticate: true
    },
    {
        name: 'twitter',
        icon: {
            ios: require('/static/icons/social/twitter.svg'),
            android: require('/static/icons/social/twitter-android.png')
        },
        authenticate: true
    },
    {
        name: 'instagram',
        icon: {
            ios: require('/static/icons/social/insta.svg'),
            android: require('/static/icons/social/insta-android.png')
        },
        authenticate: false
    },
    {
        name: 'google',
        icon: {
            ios: require('/static/icons/social/google-plus.svg'),
            android: require('/static/icons/social/google-plus-android.png')
        },
        authenticate: false
    },
    {
        name: 'pinterest',
        icon: {
            ios: require('/static/icons/social/pinterest.svg'),
            android: require('/static/icons/social/pinterest-android.png')
        },
        authenticate: false
    }
]