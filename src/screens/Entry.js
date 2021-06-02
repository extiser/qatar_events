import React, { Component } from 'react';
import { I18nManager, View } from 'react-native'
import {
    Container,
    Content,
    Spinner
} from 'native-base';
import { LANGUAGE_ROUTE, LOGIN_ROUTE, CHANNEL_ROUTE } from "sources/constants/routes";
import BrandLayout from "../layouts/BrandLayout";
import CookieManager from "react-native-cookies"
import { toggleAddChannelsModal } from "../actions/modals";
import { connect } from "react-redux";
import { getUser } from 'actions/user'
import { getUserChannels } from 'actions/userChannels'
import OneSignal from "react-native-onesignal";


class Entry extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    componentDidMount() {
        this.init();
    }

    componentWillMount() {
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        const { navigate } = this.props.navigation;

        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);

        const additionalData = openResult.notification.payload.additionalData;

        if (additionalData) {
            const {id, type} = additionalData;

            if (type === 'channel') {
                navigate(CHANNEL_ROUTE, {id});
            }
        }
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    navigate = (stackName) => {
        const { navigate } = this.props.navigation;

        setTimeout(() => {
            navigate(stackName)
        }, 500)
    };

    init = () => {
        const { screenProps, getUserChannels, getUser } = this.props;

        //storage.remove({key:'lang'});
        //storage.remove({key:'loginSkipped'});

        getUser(
            () => {
                this.checkChannels();
                getUserChannels();
                this.navigate('mainStack');
            },
            () => {
                storage.load({
                    key: 'loginSkipped'
                }).then(loginSkipped => {
                    this.navigate('mainStack')
                }).catch(() => {
                    this.navigate('loginStack')
                })
            }
        );

        // storage.load({
        //     key: 'lang',
        // }).then(lang => {
        //     i18n.changeLanguage(lang, (err, t) => {
        //         if (!err) {
        //             I18nManager.forceRTL(lang === 'ar');
        //
        //             getUser(
        //                 () => {
        //                     this.checkChannels();
        //                     getUserChannels();
        //                     this.navigate('mainStack')
        //                 },
        //                 () => {
        //                     storage.load({
        //                         key: 'loginSkipped'
        //                     }).then(loginSkipped => {
        //                         if (loginSkipped) {
        //                             this.navigate('mainStack')
        //                         }
        //                     }).catch(() => {
        //                         this.navigate('loginStack')
        //                     })
        //                 }
        //             );
        //         }
        //     });
        // }).catch(err => {
        //     this.navigate('languageStack');
        // });
    };

    checkChannels = () => {
        let key = 'channelsProposed';

        const showPurposeModal = () => {
            storage.save({
                key,
                data: true,
                expires: 3600 * 24 * 90
            }).then(r => {
                this.props.toggleAddChannelsModal()
            })
        };

        let channels = []; //TODO

        if (!channels.length) {
            //storage.remove({key});

            storage.load({key}).then(res => false).catch(err => {
                showPurposeModal()
            })
        }
    };

    render() {
        return (
            <BrandLayout logo height={'20%'}>
                <View>
                    <Spinner color={'white'} />
                </View>
            </BrandLayout>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser(successCallback, errorCallback) {
            dispatch(getUser(successCallback, errorCallback))
        },
        toggleAddChannelsModal() {
            dispatch(toggleAddChannelsModal())
        },
        getUserChannels() {
            dispatch(getUserChannels())
        }
    }
}

export default connect(null, mapDispatchToProps)(Entry)