import React, { Component } from 'react';
import {
    Text,
    Container,
    Content,
    Label,
    Item,
    Input,
    Form,
    Toast
} from 'native-base';
import styles from 'styles/common'
import I18n from "../locale";
import { View, StyleSheet, TextInput, TouchableHighlight, Platform, Linking } from 'react-native'
import { PRIMARY_COLOR } from "../sources/constants/colors";
import Avatar from 'components/Avatar'
import DatePicker from 'components/DatePicker'
import Button from 'components/Button'
import RadioGroup from 'components/RadioGroup'
import Image from 'react-native-remote-svg'
import { connect } from 'react-redux'
import { getUser } from 'actions/user'
import { getInitialValues } from "../sources/commonMethods";
import API from 'API'
import FieldError from 'components/FieldError'
import socialActions from 'sources/socialActions'
import authenticateWith, { FACEBOOK, TWITTER } from "../sources/oauth";
import { BROWSER } from "../sources/constants/routes";

const fields = ['photo','jobTitle', 'firstName', 'lastName', 'birthday', 'gender'];

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            values: {
                facebook: '',
                twitter: ''
            },
            loading: false,
            errors: {}
        };

        this.getInitialValues = getInitialValues.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        const t = I18n.getFixedT();

        return {
            title: t('main:profile'),
        }
    };

    componentDidMount() {
        this.setState({
            values: {
                ...this.state.values,
                ...this.getInitialValues([...fields, FACEBOOK, TWITTER], this.props.user)
            }
        })
    };

    updateFields = (fields, successCallback) => {
        let data = new FormData();

        for (let field in fields) {
            if (fields.hasOwnProperty(field)) {
                data.append(field, fields[field])
            }
        }

        API.postUser(data).then(res => {
            if (res.data.success) {
                successCallback();
            }
        }).catch(err => {
            console.log(err.response.data)
        });
    };

    setAvatar = (response) => {
        this.updateFields({photo: {
                uri: response.uri,
                type: 'image/jpeg', // or photo.type
                name: response.fileName
            }}, () => {
            this.setState({
                values: {
                    ...this.state.values,
                    photo: response.data
                }
            })
        });
    };

    bindSNS = (name) => {
        authenticateWith(
            name,
            (info) => {
                const { user, credentials } = info;

                let data = new FormData();
                let link = '';

                if (name === FACEBOOK) {
                    link = `https://www.facebook.com/${user.link}`;
                } else if (name === TWITTER) {
                    link = `https://twitter.com/${user.screen_name}`;
                }

                data.append('provider', name);
                data.append('credentials', JSON.stringify(credentials));

                API.oauth(data).then(res => {
                    if (res.data.success) {
                        this.setState({
                            values: {
                                ...this.state.values,
                                [name]: link
                            }
                        })
                    }
                })
            },
            (error) => {
                console.log(error)
            },
        )
    };

    onInput = (field, value) => {
        let values = {
            ...this.state.values,
        };

        values[field] = value;

        this.setState({
            values
        })
    };

    submit = () => {
        let data = new FormData();

        this.setState({loading: true});

        fields.forEach(field => {
            if (this.state.values[field]) {
                if (field !== 'photo') data.append(field, this.state.values[field]);
            }
        });

        API.postUser(data).then(res => {
            if (res.data.success) {
                this.setState({loading: false, errors: {}}, () => {
                    Toast.show({
                        text:'Saved!',
                        position: 'bottom',
                        duration: 3000,
                        type: 'success',
                        buttonText: 'OK'
                    });

                    this.props.getUser();
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
        })
    };

    render() {
        const { screenProps, navigation } = this.props;
        const { i18n } = screenProps;
        const { values, errors } = this.state;

        const { firstName, lastName, birthday, gender, jobTitle, photo } = values;

        const t = i18n.getFixedT();

        const BIO_MAX_LENGTH = 300;

        console.log('state', this.state);

        return (
            <Container style={styles.container}>
                <Content style={styles.greyBg}>
                    <View style={[{marginTop: 20}, styles.absCenter]}>

                        <Avatar
                            setAvatar={this.setAvatar}
                            imgSrc={photo}
                            title={t('profile:uploadProfilePicture')}
                        />

                        <Text style={styles.avatarText}>{t('profile:uploadProfilePicture')}</Text>
                    </View>

                    <View style={[styles.wrapper, {marginTop: 25, marginBottom: 30}]}>
                        <View style={styles.field}>
                            <Label style={[style.label, {marginBottom: 10}]}>{t('profile:bio')}</Label>

                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <TextInput
                                    style={style.textarea}
                                    multiline={true}
                                    numberOfLines={5}
                                    value={jobTitle}
                                    onChangeText={(text) => {
                                        this.onInput('jobTitle', text)
                                    }}
                                    maxLength={BIO_MAX_LENGTH}
                                />
                            </View>

                            <Text style={[styles.colorWhite, {marginTop: 10}]}>{t('profile:bioMaxLength')}</Text>
                        </View>

                        <View style={styles.field} error={errors['firstName']}>
                            <Item fixedLabel>
                                <Label style={style.label}>{t('profile:firstName')}</Label>
                                <Input style={styles.colorWhite} value={firstName} onChangeText={(text) => {
                                    this.onInput('firstName', text)
                                }}/>
                                {
                                    errors['firstName'] && <Icon name='close-circle' />
                                }
                            </Item>

                            <View>
                                <FieldError message={errors['firstName']}/>
                            </View>
                        </View>

                        <View style={styles.field} error={errors['lastName']}>
                            <Item fixedLabel>
                                <Label style={style.label}>{t('profile:lastName')}</Label>
                                <Input style={styles.colorWhite} value={lastName} onChangeText={(text) => {
                                    this.onInput('lastName', text)
                                }}/>
                                {
                                    errors['lastName'] && <Icon name='close-circle' />
                                }
                            </Item>

                            <View>
                                <FieldError message={errors['lastName']}/>
                            </View>
                        </View>

                        <View style={styles.field} error={errors['birthday']}>
                            <Label style={[style.label, {marginBottom: 10}]}>{t('profile:birthday')}</Label>
                            <DatePicker
                                date={birthday}
                                placeholder={t('profile:enterBirthday')}
                                onDateChange={(date) => {
                                    this.onInput('birthday', date);
                                }}
                                error={!!errors['birthday']}
                            />
                            {
                                errors['birthday'] && <Icon name='close-circle' />
                            }
                        </View>

                        {
                            (gender === null) || gender ?
                                <View style={styles.field}>
                                    <Label style={[style.label, {marginBottom: 10}]}>{t('profile:gender')}</Label>

                                    <RadioGroup
                                        radioGroupList={[
                                            {label: 'Male', value: 'M'},
                                            {label: 'Female', value: 'F'}
                                        ]}
                                        checkedColor={PRIMARY_COLOR}
                                        uncheckedColor={'white'}
                                        initialValue={gender}
                                        onChange={(val) => {
                                            this.onInput('gender', val)
                                        }}
                                        noPadding
                                    />
                                </View> : false
                        }

                        <View style={[styles.center, {justifyContent: 'space-between'}]}>
                            <View style={styles.absCenter}>
                                <Text style={styles.avatarText}>{t('profile:yourSocialMediaLinks')}</Text>
                            </View>

                            <View style={style.socialBlock}>
                                {
                                    socialActions.map((action, i) => {
                                        if (!action.authenticate) return;

                                        const addIcon = {
                                            ios: require('/static/icons/social/add.svg'),
                                            android: require('/static/icons/social/add-android.png')
                                        };

                                        const addedIcon = {
                                            ios: require('/static/icons/social/added.svg'),
                                            android: require('/static/icons/social/added-android.png')
                                        };

                                        const socialLink = this.state.values[action.name];

                                        return (
                                            <TouchableHighlight
                                                key={i}
                                                underlayColor={'transparent'}
                                                onPress={() => {
                                                    if (socialLink) {
                                                        navigation.navigate(BROWSER, {uri: socialLink});
                                                    } else {
                                                        this.bindSNS(action.name)
                                                    }
                                                }}
                                            >
                                                <View style={style.socialItem}>
                                                    <Image
                                                        source={
                                                            socialLink ?
                                                                addedIcon[Platform.OS] :
                                                                addIcon[Platform.OS]
                                                        }
                                                        style={style.statusIcon}
                                                    />
                                                    <Image
                                                        source={action.icon[Platform.OS]}
                                                        style={style.icon}
                                                    />
                                                </View>
                                            </TouchableHighlight>
                                        )
                                    })
                                }
                            </View>
                        </View>

                        <View style={{marginTop: 30}}>
                            <Button
                                primary
                                rounded
                                block
                                onPress={() => {
                                    this.submit()
                                }}
                                style={style.button}
                            >
                                {this.state.loading ? `${t('login:sending')}...` : t('main:saveChanges')}
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
        ...styles.colorWhite,
        fontSize: 20,
        fontFamily: 'Mada'
    },
    textarea: {
        ...styles.colorWhite,
        ...styles.textarea,
        minHeight: 100
    },
    icon: {width: 50, height: 50},
    statusIcon: {
        width: 14,
        height: 14,
        position: 'absolute',
        zIndex: 1
    },
    socialBlock: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
    },
    socialItem: {
        marginHorizontal: 5
    }
});

function mapStateToProps (state) {
    return {
        user: state.user.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser() {
            dispatch(getUser())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)