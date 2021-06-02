import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Text, Icon, Toast, CheckBox, ListItem } from 'native-base';
import styles from 'styles/common'
import Button from 'components/Button'
import { FORGOT_PASSWORD_ROUTE, MAIN_ROUTE } from "../sources/constants/routes";
import formStyles from 'styles/form'
import BrandLayout from "../layouts/BrandLayout";
import I18n from "../locale";
import API from 'API'
import CookieManager from "react-native-cookies"
import { connect } from "react-redux";
import { getUser } from 'actions/user';
import { getUserChannels } from 'actions/userChannels'
import { SECONDARY_COLOR } from "../sources/constants/colors";

class Login extends Component {
    state = {
        // loginName: 'TestChannel',
        // password: 'test1234',
        loginName: '',
        password: '',
        loading: false,
        savePassword: false,
        passwordShown: false
    };

    static navigationOptions = ({navigation}) => {
        const t = I18n.getFixedT();

        return {
            title: t('login:title'),
            headerStyle: styles.headerTransparent,
        }
    };

    componentWillMount() {
        storage.load({
            key: 'loginData',
        }).then(loginData => {
            this.setState(loginData)
        }).catch(err => {});
    }

    toggleSavePassword = () => {
        this.setState({savePassword: !this.state.savePassword})
    };

    fieldsAreFilled = () => {
        return !(this.state.loginName && this.state.password)
    };

    input = (field, value) => {
        let _value;

        if (field === 'loginName') {
            _value = value.replace(/ /g,'');
        } else {
            _value = value
        }

        this.setState({
            [field]: _value
        })
    };

    showPassword = () => {
        this.setState({passwordShown: !this.state.passwordShown})
    };

    submit = () => {
        const { navigation, getUser, getUserChannels } = this.props;
        const { navigate } = navigation;
        const { loginName, password, savePassword } = this.state;

        let loginData = {loginName, savePassword};
        if (savePassword) loginData.password = password;

        let formdata = new FormData();
        formdata.append('loginName', loginName);
        formdata.append('password', password);

        // CookieManager.clearAll();

        this.setState({loading: true});

        API.login(formdata).then(res => {
            if (res.data.success) {
                this.setState({loading: false}, () => {
                    storage.save({
                        key: 'loginData',
                        data: loginData
                    }).then(() => {
                        getUser();
                        getUserChannels();
                        navigate(MAIN_ROUTE);
                    });
                });
            }
        }).catch(err => {
            const { data } = err.response;
            const { error } = data;

            this.setState({loading: false});

            Toast.show({
                text: error.message,
                position: 'bottom',
                duration: 3000,
                type: 'danger',
                buttonText: 'OK'
            });
        })
    };

    render() {
        const { screenProps, navigation } = this.props;
        const { navigate } = navigation;
        const { i18n } = screenProps;

        const t = i18n.getFixedT();

        return (
            <BrandLayout height={'80%'} header>
                <View style={[styles.centerTextContainer, {marginTop: 40}]}>
                    <Text style={[styles.colorWhite, style.text]}>
                        {t('login:text1')}
                    </Text>
                    <Text style={[styles.colorWhite, style.text]}>
                        {t('login:text2')}
                    </Text>
                </View>

                <View style={styles.wrapper}>
                    <Form style={style.form}>
                        <Item style={style.item}>
                            {/*<Label style={{...styles.label, ...styles.colorWhite}} >{t('login:loginName')}</Label>*/}
                            <Input
                                style={styles.colorWhite}
                                value={this.state.loginName}
                                onChangeText={(val) => {
                                    this.input('loginName', val)
                                }}
                                placeholder={t('login:loginName')}
                                placeholderTextColor={'white'}
                            />
                        </Item>
                        <Item style={[style.item]}>
                            {/*<Label style={{...styles.label, ...styles.colorWhite}} >{t('login:password')}</Label>*/}
                            <Input
                                style={styles.colorWhite}
                                secureTextEntry={!this.state.passwordShown}
                                value={this.state.password}
                                onChangeText={(val) => {
                                    this.input('password', val)
                                }}
                                autoCapitalize={'none'}
                                placeholder={t('login:password')}
                                placeholderTextColor={'white'}
                            />

                            {
                                this.state.password ?
                                    <Icon
                                        ios={this.state.passwordShown ? 'ios-eye-off' : 'ios-eye'}
                                        android={this.state.passwordShown ? 'md-eye-off' : 'md-eye'}
                                        style={{color: 'white'}}
                                        onPress={() => this.showPassword()}
                                    /> : null
                            }
                        </Item>

                        <Item style={[style.item, {marginTop: 30, borderBottomWidth: 0}]}>
                            <Label style={{...styles.label, ...styles.colorWhite}} >{t('login:savePassword')}</Label>

                            <CheckBox
                                checked={this.state.savePassword}
                                onPress={() => this.toggleSavePassword()}
                                color={SECONDARY_COLOR}
                            />
                        </Item>
                    </Form>

                    <View>
                        <Button
                            secondary
                            rounded
                            block
                            onPress={() => {
                                this.submit()
                            }}
                            style={style.button}
                            disabled={this.fieldsAreFilled()}
                        >
                            {this.state.loading ? `${t('login:sending')}...` : 'Yalla!'}
                        </Button>
                    </View>

                    <View style={[styles.centerTextContainer, {marginTop: 15}]}>
                        <TouchableHighlight onPress={() => navigate(FORGOT_PASSWORD_ROUTE)}>
                            <Text style={[styles.colorWhite, style.skipText]}>{t('main:forgotPassword')}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </BrandLayout>
        );
    }
}

const fontSize = 18;

const style = StyleSheet.create({
    ...formStyles,
    button: {
        marginTop: 30
    },
    form: {
        marginTop: 10
    },
    skipText: {
        textDecorationLine: 'underline',
        fontSize
    },
    text: {
        textAlign: 'center',
        fontSize
    }
});

function mapDispatchToProps(dispatch) {
    return {
        getUser() {
            dispatch(getUser())
        },
        getUserChannels() {
            dispatch(getUserChannels())
        }
    }
}

export default connect(null, mapDispatchToProps)(Login)
