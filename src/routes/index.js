import Main from 'screens/Main'
import Profile from 'screens/Profile'
import Login from 'screens/Login'
import Auth from 'screens/Auth'
import Event from 'screens/Event'
import Language from 'screens/Language'
import Entry from 'screens/Entry'
import {
    MAIN_ROUTE, PROFILE_ROUTE, LOGIN_ROUTE, AUTH_ROUTE, ENTRY_ROUTE, LANGUAGE_ROUTE, REGISTRATION_ROUTE,
    FORGOT_PASSWORD_ROUTE, REGISTRATION_RESULT_ROUTE, FORGOT_PASSWORD_RESULT_ROUTE, EVENT_ROUTE, EVENT_CONTACTS_ROUTE,
    WEB_VIEW_ROUTE, ACCOUNT_SETTINGS_ROUTE, ADD_CHANNELS_ROUTE, APP_SETTINGS_ROUTE, ABOUT_APP_ROUTE, FAVORITES_ROUTE,
    MY_EVENTS_ROUTE, TECHNICAL_SUPPORT_ROUTE, GET_IN_TOUCH_ROUTE, SUBMIT_EVENT_ROUTE, CHANNEL_ROUTE, MY_CHANNELS_ROUTE, BROWSER
} from "../sources/constants/routes"
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import Registration from 'screens/Registration'
import ForgotPassword from 'screens/ForgotPassword'
import RegistrationResult from "../screens/RegistrationResult";
import ForgotPasswordResult from "../screens/ForgotPasswordResult";
import EventContacts from "../screens/EventContacts"
import SideBar from "../components/SideBar";
import options from './config'
import React from 'react'
import WebView from "../screens/WebView";
import AccountSettings from "../screens/AccountSettings";
import AppSettings from "../screens/AppSettings";
import { Dimensions } from 'react-native'
import constants from 'sources/constants/common'
import AddChannels from "screens/AddChannels";
import AboutApp from "../screens/AboutApp";
import Favorites from "../screens/Favorites";
import MyEvents from "../screens/MyEvents";
import TechnicalSupport from "../screens/TechnicalSupport";
import GetInTouch from "../screens/GetInTouch";
import SubmitEvent from "../screens/SubmitEvent";
import Channel from "../screens/Channel";
import MyChannels from "../screens/MyChannels";

const { width } = Dimensions.get('window');

const mainStack = StackNavigator({
    [MAIN_ROUTE]: {screen: Main},
    [EVENT_ROUTE]: {screen: Event, path: 'event/:id'},
    [EVENT_CONTACTS_ROUTE]: {screen: EventContacts},
    [WEB_VIEW_ROUTE]: {screen: WebView},
    [PROFILE_ROUTE]: {screen: Profile},
    [ACCOUNT_SETTINGS_ROUTE]: {screen: AccountSettings},
    [APP_SETTINGS_ROUTE]: {screen: AppSettings},
    [ADD_CHANNELS_ROUTE]: {screen: AddChannels},
    [ABOUT_APP_ROUTE]: {screen: AboutApp},
    [FAVORITES_ROUTE]: {screen: Favorites},
    [MY_EVENTS_ROUTE]: {screen: MyEvents},
    [PROFILE_ROUTE]: {screen: Profile},
    [TECHNICAL_SUPPORT_ROUTE]: {screen: TechnicalSupport},
    [GET_IN_TOUCH_ROUTE]: {screen: GetInTouch},
    [SUBMIT_EVENT_ROUTE]: {screen: SubmitEvent},
    [CHANNEL_ROUTE]: {screen: Channel, path: 'channel/:id'},
    [MY_CHANNELS_ROUTE]: {screen: MyChannels},
    [BROWSER]: {screen: WebView},
}, options);

const loginStack = StackNavigator({
    [AUTH_ROUTE]: {screen: Auth},
    [LOGIN_ROUTE]: {screen: Login},
    [REGISTRATION_ROUTE]: {screen: Registration},
    [REGISTRATION_RESULT_ROUTE]: {screen: RegistrationResult},
    [FORGOT_PASSWORD_ROUTE]: {screen: ForgotPassword},
    [FORGOT_PASSWORD_RESULT_ROUTE]: {screen: ForgotPasswordResult},
    [BROWSER]: {screen: WebView},
}, options);

const languageStack = StackNavigator({
    [LANGUAGE_ROUTE]: {screen: Language}
}, options);

const entryStack = StackNavigator({
    [ENTRY_ROUTE]: {screen: Entry}
}, options);

const rootStack = DrawerNavigator({
    entryStack: {screen: entryStack},
    // languageStack: {screen: languageStack},
    loginStack: {screen: loginStack},
    mainStack: {screen: mainStack, path: 'main'},
}, {
    contentComponent: ({navigation}) => <SideBar navigation={navigation} />,
    drawerWidth: width - constants.openDrawerOffset,
});

export default rootStack


