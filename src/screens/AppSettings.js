import React, { Component } from 'react';
import {
    Text,
    Container,
    Content,
    Label,
    Item,
    Input,
    Form
} from 'native-base';
import styles from 'styles/common'
import I18n from "../locale";
import { View, StyleSheet, Platform, I18nManager, Alert } from 'react-native'
import { INPUT_COLOR, PRIMARY_COLOR, YELLOW_COLOR } from "../sources/constants/colors";
import Avatar from 'components/Avatar'
import DatePicker from 'components/DatePicker'
import { REGISTRATION_RESULT_ROUTE } from "../sources/constants/routes";
import Button from 'components/Button'
import RadioGroup from 'components/RadioGroup'
import Language from 'screens/Language'
import Permissions from 'react-native-permissions'
import AndroidOpenSettings from 'react-native-android-open-settings'

const PERMISSION_STATUSES = {
    AUTHORIZED: 'authorized' //User has authorized this permission
};

const NOTIFICATION_STATUSES = {
    ON: 'on',
    OFF: 'off'
};

export default class AppSettings extends Component {

    static navigationOptions = ({ navigation }) => {
        const t = I18n.getFixedT();

        return {
            title: t('main:appSettings'),
        }
    };

    state = {};

    componentDidMount() {
        this.checkLanguage();
        this.checkNotificationPermissions();
    }

    checkLanguage = () => {
        storage.load({
            key: 'lang',
        }).then(lang => {
            this.setState({
                lang
            })
        });
    };

    checkNotificationPermissions = () => {
        Permissions.check('notification').then(status => {
            if (status === PERMISSION_STATUSES.AUTHORIZED) {
                this.setState({ notificationStatus: NOTIFICATION_STATUSES.ON });
            } else {
                this.setState({ notificationStatus: NOTIFICATION_STATUSES.OFF });
            }
        })
    };

    onLanguageChange = (lang) => {
        this.setState({
            lang
        }, () => {
            Language.setLanguage(lang);
        });
    };

    requestNotificationPermissions = () => {
        let message = 'Push notifcations can be switched off by accessing ';

        if (Platform.OS === 'ios') {
            message += 'Settings > Notifications > Qatar events > Allow notifications.'
        } else if (Platform.OS === 'android') {
            message += 'Settings > Notifications & status bar > App notifications > Qatar events > Show notifications'
        }

        Alert.alert(
            '"Qatar events" wants to open settings.',
            message,
            [
                { text: 'Cancel', style: 'cancel',},
                {
                    text: 'Open Settings',
                    onPress: () => {
                        if (Platform.OS === 'ios') {
                            Permissions.openSettings();
                        } else if (Platform.OS === 'android') {
                            AndroidOpenSettings.generalSettings()
                        }
                    }
                }
            ],
        );
    };

    render() {
        const { screenProps } = this.props;
        const { i18n } = screenProps;

        const { notificationStatus } = this.state;

        const t = i18n.getFixedT();

        const languageList = [
            {
                label: 'English',
                value: 'en'
            },
            {
                label: 'العربية',
                value: 'ar'
            }
        ];

        return (
            <Container style={styles.container}>
                <Content style={styles.greyBg}>
                    <View style={styles.wrapper}>
                        {/*{*/}
                            {/*this.state.lang ?*/}
                                {/*<RadioGroup*/}
                                    {/*label={t('appSettings:chooseLanguage')}*/}
                                    {/*radioGroupList={languageList}*/}
                                    {/*checkedColor={PRIMARY_COLOR}*/}
                                    {/*uncheckedColor={'white'}*/}
                                    {/*initialValue={this.state.lang}*/}
                                    {/*onChange={this.onLanguageChange}*/}
                                {/*/> : false*/}
                        {/*}*/}

                        <View style={{marginTop: 10}}>
                            <Text style={style.label}>
                                {t('appSettings:pushNotifications')}
                                {notificationStatus ? `: ${notificationStatus}` : ''}
                            </Text>

                            <Button
                                secondary
                                small
                                rounded
                                onPress={this.requestNotificationPermissions}
                                style={style.button}
                            >
                                {t('appSettings:manageNotifications')}
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    label: {
        fontWeight: '600',
        color: 'white',
        fontFamily: 'Mada',
        fontSize: 22,
        marginBottom: 5,
    }
});
