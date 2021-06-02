import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native'
import {
    Container,
    Content,
    Icon,
    Text,
    Spinner,
    Toast
} from 'native-base';
import styles from 'styles/common'
import Button from 'components/Button'
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "../sources/constants/routes";
import BrandLayout from "../layouts/BrandLayout";
import { toggleSignInModal } from "../actions/modals";
import { connect } from "react-redux";
import authenticateWith, { FACEBOOK, TWITTER } from "../sources/oauth";
import API from 'API'
import { getUser } from 'actions/user'
import { getUserChannels } from 'actions/userChannels'
import { isSmallHeight } from "../styles/breakpoints";

class Auth extends Component {
    state = {
        authProcessing: false
    };

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    skip = () => {
        const { navigation, toggleSignInModal } = this.props;
        const { navigate } = navigation;

        storage.save({
            key: 'loginSkipped',
            data: true
        }).then(() => {
            navigate(MAIN_ROUTE);
            setTimeout(() => {
                toggleSignInModal();
            }, 500)
        });
    };

    getUserInfo = async (callback) => {
        const { getUser, getUserChannels } = this.props;

        getUser();
        getUserChannels();

        try {

        } catch(e) {

        }

        callback();
    };

    onAuthSuccess = (provider, info) => {
        const { navigate } = this.props.navigation;
        const { credentials } = info;

        let data = new FormData();

        data.append('provider', provider);
        data.append('credentials', JSON.stringify(credentials));

            console.log(data);

        return API.oauth(data).then(res => {

            if (res.data.success) {
                this.setState({authProcessing: false});
                this.getUserInfo(() => navigate(MAIN_ROUTE));
            }
        }).catch(err => {
            this.setState({authProcessing: false});


            Toast.show({
                text: err.message,
                position: 'bottom',
                duration: 3000,
                type: 'danger',
                buttonText: 'OK'
            });
        });
    };

    beforeAuth = () => {
        this.setState({authProcessing: true});
    };

    onAuthError = (error) => {
        this.setState({authProcessing: false});
        console.log(error.response.data);
    };

    facebook = () => {
        return authenticateWith(
            FACEBOOK,
            (info) => this.onAuthSuccess(FACEBOOK, info),
            this.onAuthError,
            this.beforeAuth
        )
    };

    twitter = () => {
        return authenticateWith(
            TWITTER,
            (info) => this.onAuthSuccess(TWITTER, info),
            this.onAuthError,
            this.beforeAuth
        )
    };

    render() {
        const { screenProps, navigation } = this.props;
        const { navigate } = navigation;
        const { i18n } = screenProps;
        const { authProcessing } = this.state;

        const t = i18n.getFixedT();

        return (
            <BrandLayout animated logo height={authProcessing ? '20%' : '50%'}>
                {
                    authProcessing ?
                        <View>
                            <Spinner color={'white'} />
                        </View>
                        :
                        <View>
                            <View style={style.buttonContainer}>
                                <Button
                                    style={style.button}
                                    color={'#375794'}
                                    small={isSmallHeight}
                                    block
                                    rounded
                                    onPress={() => this.facebook()}
                                >
                                    {t('auth:loginWithFacebook')}
                                </Button>
                                <Button
                                    style={style.button}
                                    color={'#1DA1F3'}
                                    small={isSmallHeight}
                                    block
                                    rounded
                                    onPress={() => this.twitter()}
                                >
                                    {t('auth:loginWithTwitter')}
                                </Button>
                                <Button
                                    primary
                                    style={style.button}
                                    small={isSmallHeight}
                                    block
                                    rounded
                                    onPress={() => navigate(REGISTRATION_ROUTE)}
                                >
                                    {t('auth:registerByEmail')}
                                </Button>
                            </View>

                            <View style={[styles.centerTextContainer, {marginTop: 20, marginBottom: 10}]}>
                                <Text style={[styles.colorWhite]}>{t('auth:alreadyHaveILQAccount')}</Text>
                            </View>

                            <View style={style.buttonContainer}>
                                <Button
                                    block
                                    secondary
                                    style={style.button}
                                    small={isSmallHeight}
                                    rounded
                                    onPress={() => navigate(LOGIN_ROUTE)}
                                >
                                    {t('auth:login')}
                                </Button>
                            </View>

                            <View style={[styles.centerTextContainer, {marginTop: 20, marginBottom: 10}]}>
                                <TouchableHighlight onPress={this.skip} underlayColor={'transparent'}>
                                    <Text style={[styles.colorWhite, style.skipText]}>{t('auth:skip')}</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                }
            </BrandLayout>
        );
    }
}

const style = StyleSheet.create({
        button: {
            marginBottom: 10
        },
        logo: {
            marginBottom: 20
        },
        buttonContainer: {
            marginHorizontal: 60,
        },
        skipText: {
            fontSize: isSmallHeight ? 14 : 20,
            fontWeight: 'bold',
            textDecorationLine: 'underline'
        }
});

function mapDispatchToProps(dispatch) {
    return {
        toggleSignInModal() {
            dispatch(toggleSignInModal())
        },
        getUser(successCallback, errorCallback) {
            dispatch(getUser(successCallback, errorCallback))
        },
        getUserChannels() {
            dispatch(getUserChannels())
        }
    }
}

export default connect(null, mapDispatchToProps)(Auth)