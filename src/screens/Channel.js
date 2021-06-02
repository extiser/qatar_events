import React, { Component } from 'react';
import {
    Content,
    List,
    ListItem,
    Container,
    Segment,
    Footer,

} from 'native-base'
import styles from "../styles/common"
import { Dimensions, View, ActivityIndicator, Linking } from "react-native"
import ChannelDetails from 'components/ChannelDetails'
import I18n from "../locale"
import HeaderRight from 'components/HeaderRight'
import { PRIMARY_COLOR, YELLOW_COLOR, YELLOW_HOVER_COLOR } from "../sources/constants/colors"
import share from 'sources/utils/share'
import Button from 'components/Button'
import { shadeColor } from "../sources/utils/controlColor"
import API from 'API'
import HeaderLeft from 'components/HeaderLeft'
import { toggleAddChannelsModal, toggleSignInModal } from "../actions/modals";
import { connect } from "react-redux";
import { getUserChannels } from 'actions/userChannels'

class Channel extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            data: {},
            error: null,
        }
    }

    componentDidMount() {
        const { state } = this.props.navigation;
        const { params } = state;

        this.getChannel(params.id);
    }

    static navigationOptions = ({ navigation }) => {
        const t = I18n.getFixedT();

        return {
            title: t('channel:title'),
        }
    };

    getChannel = (id) => {
        this.setState({
            loading: true
        });

        API.getChannel(id).then(res => {
            const data = res.data;

            this.setState({
                data,
                loading: false,
                error: null,
            })
        }).catch(error => {
            this.setState({
                error,
                loading: false
            })
        });
    };

    toggleSubscribe = () => {
        let callback;
        const { id, isSubscribed } = this.state.data;

        if (isSubscribed) {
            callback = API.unsubscribeChannel
        } else {
            callback = API.subscribeChannel
        }

        callback(id).then(res => {
            if (res.data && res.data.success) {
                this.setState({
                    data: {
                        ...this.state.data,
                        isSubscribed: !isSubscribed
                    }
                }, () => {
                    this.props.getUserChannels()
                });
            }
        }).catch(err => {
            console.log(err.response)
        })
    };

    render() {
        const { width, height } = Dimensions.get('window');
        const { screenProps, navigation } = this.props;
        const { navigate } = navigation;
        const { i18n } = screenProps;

        const t = i18n.getFixedT();

        const { params } = navigation.state;
        const { loading, data } = this.state;
        const bgColor = params ? params.bgColor : PRIMARY_COLOR;

        return (
            <Container style={styles.container}>
                <Content style={styles.darkBg}>
                    {
                        loading ?
                            <View style={{ flex: 1, padding: 20 }}>
                                <ActivityIndicator />
                            </View>
                            :
                            <ChannelDetails
                                width={width}
                                height={height}
                                channel={data}
                                navigate={navigate}
                                typeColors={this.props.typeColors}
                            />
                    }
                </Content>

                {
                    !loading &&
                    <Footer style={{
                        backgroundColor: shadeColor(bgColor || PRIMARY_COLOR, -0.2),
                        shadowOpacity: 0,
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        height: 65,
                    }}>
                        <View style={{
                            marginTop: 0,
                            paddingTop: 10,
                            width: '80%'
                        }}>
                            <Button
                                block
                                rounded
                                color={bgColor || PRIMARY_COLOR}
                                textStyle={{textAlign: 'center'}}
                                onPress={() => this.toggleSubscribe()}
                            >
                                {
                                    data && data.isSubscribed ? t('main:unfollow') : t('main:follow')
                                }
                            </Button>
                        </View>
                    </Footer>
                }
            </Container>
        );
    }
}

function mapStateToProps (state) {
    return {
        typeColors: state.types.colors,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserChannels() {
            dispatch(getUserChannels())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Channel)

