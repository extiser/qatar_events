import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Linking } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Text, Icon, Toast } from 'native-base';
import styles from 'styles/common'
import Button from 'components/Button'
import { BROWSER, REGISTRATION_RESULT_ROUTE } from "../sources/constants/routes";
import formStyles from 'styles/form'
import BrandLayout from "../layouts/BrandLayout";
import Avatar from 'components/Avatar'
import I18n from "../locale";
import FieldError from 'components/FieldError'
import API from 'API'
import { TERMS_OF_USE_URL } from "../config";

const fields = ['username', 'email', 'newPassword', 'confirmPassword'];

export default class Registration extends Component {
    constructor() {
        super();

        this.state = {
            avatar: null,
            values: {},
            errors: {},
            loading: false,
        };
    }

    static navigationOptions = ({navigation}) => {
        const t = I18n.getFixedT();

        return {
            title: t('main:registration'),
            headerStyle: styles.headerTransparent,
        }
    };

    setAvatar = (avatar) => {
        this.setState({
            avatar
        })
    };

    onInput = (field, value) => {
        let _value;

        if (field === 'username' || field === 'email') {
            _value = value.replace(/ /g,'');
        } else {
            _value = value
        }

        this.setState({
            values: {
                ...this.state.values,
                [field]: _value
            }
        })
    };

    renderFields = () => {
        const { errors } = this.state;
        const { i18n } = this.props.screenProps;

        const t = i18n.getFixedT();

        return fields.map((field, i) => {
            if (field !== 'photo') {
                const isPasswordField = (field === 'newPassword') || (field === 'confirmPassword');

                return (
                    <View style={styles.field} key={i}>
                        <Item floatingLabel error={!!errors[field]}>
                            <Label style={{...styles.label, ...styles.colorWhite}}>{t(`main:${field}`)}</Label>
                            <Input
                                style={styles.colorWhite}
                                value={this.state.values[field]}
                                onChangeText={(text) => {
                                    this.onInput(field, text)
                                }}
                                secureTextEntry={isPasswordField}
                                autoCapitalize={isPasswordField ? 'none' : 'sentences'}
                            />

                            {
                                errors[field] && <Icon name='close-circle'/>
                            }
                        </Item>

                        {
                            errors[field] &&
                            <View style={{marginLeft: 15}}>
                                <FieldError message={errors[field]} navigate={this.props.navigation.navigate}/>
                            </View>
                        }
                    </View>
                )
            }
        })
    };

    submit = () => {
        const { navigate } = this.props.navigation;

        const { values } = this.state;
        let data = new FormData();

        if (values.newPassword === values.confirmPassword) {
            fields.forEach(field => {
                if (this.state.values[field]) {
                    if (field === ' photo') {
                        //TODO
                    } else {
                        if (field !== 'confirmPassword') {
                            data.append(field, this.state.values[field]);
                        }
                    }
                }
            });

            API.saveUser(data).then(res => {
                let data = res.data;

                if (data.success) {
                    this.setState({loading: false, errors: {}}, () => {
                        Toast.show({
                            text:'Saved!',
                            position: 'bottom',
                            duration: 3000,
                            type: 'success',
                            buttonText: 'OK'
                        });

                        setTimeout(() => {
                            navigate(REGISTRATION_RESULT_ROUTE)
                        }, 1000)
                    });
                } else if (data.errors) {
                    this.setState({
                        loading: false,
                        errors: data.errors
                    });
                }
            }).catch(err => {
                const { data } = err.response;
                const { message } = data;

                this.setState({loading: false}, () => {
                    Toast.show({
                        text: message,
                        position: 'bottom',
                        duration: 3000,
                        type: 'success',
                        buttonText: 'OK'
                    });
                });
            });
        } else {
            this.setState({
                errors: {confirmPassword: 'Password do not match'}
            })
        }
    };

    render() {
        const { screenProps, navigation } = this.props;
        const { navigate } = navigation;
        const { i18n } = screenProps;

        const t = i18n.getFixedT();

        return (
            <BrandLayout animated header>
                <View>
                    <ScrollView>
                        <View style={[{marginTop: 20}, styles.absCenter]}>
                            <Text style={style.subtitle}>
                                {t('registration:subTitle')}
                            </Text>

                            <Avatar
                                setAvatar={this.setAvatar}
                                imgSrc={null}
                                title={t('registration:selectAvatar')}
                            />
                        </View>

                        <View style={styles.wrapper}>
                            <Form style={style.form}>
                                {this.renderFields()}
                            </Form>

                            <View style={style.textContainer}>
                                <Text style={style.text}>
                                    {t('registration:text1')} {''}
                                    <Text
                                        onPress={() => navigate(BROWSER, {uri: TERMS_OF_USE_URL})}
                                        style={[style.skipText, style.text]}
                                    >
                                        {t('registration:termsAndConditions')} {''}
                                    </Text>.
                                </Text>

                                <Text style={style.text}>
                                    {t('registration:text2')}
                                </Text>
                            </View>

                            <Button
                                primary
                                rounded
                                block
                                onPress={() => {
                                    this.submit()
                                }}
                                style={style.button}
                            >
                                {this.state.loading ? `${t('login:sending')}...` : 'Yalla!'}
                            </Button>
                        </View>
                    </ScrollView>
                </View>
            </BrandLayout>
        );
    }
}

const style = StyleSheet.create({
    ...formStyles,
    button: {
        marginVertical: 20,
    },
    textContainer: {
        marginTop: 20,
    },
    text: {
        fontWeight: '200',
        ...styles.colorWhite,
        fontSize: 16
    },
    skipText: {
        textDecorationLine: 'underline',
    },
    subtitle: {
        ...styles.colorWhite,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 35
    }
});
