import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { translate } from 'react-i18next'
import store from 'store'
import setGlobalStyles from 'sources/utils/setGlobalStyles'
import { getTypes } from "./actions/getTypes";
import { Root } from 'native-base'
import i18n from "./locale"
import Navigation from 'routes'
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal';
import { Platform, Linking } from 'react-native'
import NavigationService from "./sources/NavigationService";
import { CHANNEL_ROUTE } from "./sources/constants/routes";

setGlobalStyles();

store.dispatch(getTypes());

const  WrappedStack = () => {
    const prefix = Platform.OS === 'android' ? 'qatar://' : 'qatar://';

    return (
        <Provider store={store}>
            <Root>
                <Navigation
                    screenProps={{i18n: i18n}}
                    uriPrefix={prefix}
                    ref={nav => NavigationService.setTopLevelNavigator(nav)}
                />
            </Root>
        </Provider>
    )
};

const ReloadAppOnLanguageChange = translate('common', {
    bindI18n: 'languageChanged',
})(WrappedStack);

class App extends Component {
    componentDidMount() {
        SplashScreen.hide();
        Linking.addEventListener('url', this.handleOpenURL);

    }

    componentWillMount() {
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);

        OneSignal.inFocusDisplaying(0);
        NavigationService.navigate(CHANNEL_ROUTE, {id: 76122})

    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);

        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    handleOpenURL(event) {
        // console.log(event.url);
        // const route = e.url.replace(/.*?:\/\//g, '');
        // do something with the url, in our case navigate(route)
    }

    onReceived(notification) {
        // console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        // console.log('Message: ', openResult.notification.payload.body);
        // console.log('Data: ', openResult.notification.payload.additionalData);
        // console.log('isActive: ', openResult.notification.isAppInFocus);
        // console.log('openResult: ', openResult);
    }

    onIds(device) {
        // console.log('Device info: ', device);
    }

    render() {
        return <ReloadAppOnLanguageChange />
    }
}

export default App
