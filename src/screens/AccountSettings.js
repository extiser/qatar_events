import React, { Component } from 'react';
import {
    Text,
    Container,
    Content,
    Label,
    Item,
    Input,
    Form,
    Thumbnail,
    Toast,
    Icon
} from 'native-base';
import styles from 'styles/common'
import I18n from "../locale";
import { View, StyleSheet } from 'react-native'
import { INPUT_COLOR, PRIMARY_COLOR, YELLOW_COLOR } from "../sources/constants/colors";
import DatePicker from 'components/DatePicker'
import Button from 'components/Button'
import { connect } from 'react-redux'
import { getUser } from 'actions/user'
import { getInitialValues } from "../sources/commonMethods"
import API from 'API'
import FieldError from 'components/FieldError'
import { DEFAULT_CHANNEL_AVATAR_URL, DEFAULT_USER_AVATAR_URL } from "../sources/constants/user";

const fields = ['photo','username', 'email', 'phone', 'password', 'newPassword'];

class AccountSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatar: null,
            values: {},
            loading: false,
            errors: {}
        };

        this.getInitialValues = getInitialValues.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        const t = I18n.getFixedT();

        return {
            title: t('main:accountSettings'),
        }
    };

    componentDidMount() {
        const { user } = this.props;

        this.setState({
            firstName: user && user.firstName,
            lastName: user && user.lastName,
            values: this.getInitialValues(fields, user)
        })
    }

    submit = () => {
        let data = new FormData();

        fields.forEach(field => {
            if (this.state.values[field]) {
                if (field === ' photo') {
                    //TODO
                } else {
                    data.append(field, this.state.values[field]);
                }
            }
        });

        API.postUser(data).then(res => {
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
        });
    };

    onInput = (field, value) => {
        this.setState({
            values: {
                ...this.state.values,
                [field]: value
            }
        })
    };

    renderFields = () => {
        const { errors } = this.state;
        const { i18n } = this.props.screenProps;

        const t = i18n.getFixedT();

        return fields.map((field, i) => {
            if (field !== 'photo') {
                return (
                    <View style={styles.field} key={i}>
                        <Item fixedLabel error={!!errors[field]}>
                            <Label style={style.label}>{t(`account:${field}`)}</Label>
                            <Input
                                style={styles.colorWhite}
                                value={this.state.values[field]}
                                onChangeText={(text) => {
                                    this.onInput(field, text)
                                }}
                                secureTextEntry={(field === 'password') || (field === 'newPassword')}
                            />
                            {
                                errors[field] && <Icon name='close-circle' />
                            }
                        </Item>

                        <View>
                            <FieldError message={errors[field]}/>
                        </View>
                    </View>
                )
            }
        })
    };

    render() {
        const { screenProps, user } = this.props;
        const { i18n } = screenProps;
        const { firstName, lastName, values } = this.state;
        const { photo } = values;

        const t = i18n.getFixedT();

        return (
            <Container style={styles.container}>
                <Content style={styles.greyBg}>
                    <View style={[{marginTop: 20}, styles.absCenter]}>
                        <View>
                            <Thumbnail large source={{ uri: photo }} />
                        </View>

                        <Text style={styles.avatarText}>
                            {firstName ? firstName : ''}
                            {lastName ? ' ' + lastName : '' }
                        </Text>
                    </View>


                    <View style={[styles.wrapper, {marginTop: 25, marginBottom: 30}]}>
                        {this.renderFields()}

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
        fontSize: 18,
        fontFamily: 'Mada'
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings)
