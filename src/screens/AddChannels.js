import React, { Component } from 'react';
import {
    Text,
    Container,
    Content
} from 'native-base';
import styles from 'styles/common'
import I18n from "../locale";
import { View, StyleSheet } from 'react-native'
import API from 'API'
import LoadingSpinner from "../components/LoadingSpinner";
import ChannelList from 'components/ChannelList'
import { getUserChannels } from 'actions/userChannels'
import { connect } from "react-redux";

class AddChannels extends Component {

    static navigationOptions = ({ navigation }) => {
        const t = I18n.getFixedT();

        return {
            title: t('main:addChannels'),
        }
    };

    state = {
        loading: false,
        channels: [],
        meta: {}
    };

    componentDidMount() {
        this.getChannels();
    }

    getChannels = () => {
        this.setState({loading: true});

        API.getChannels().then(res => {
            const channels = res.data;

            this.setState({
                channels: channels.data,
                meta: channels.meta,
                loading: false
            });
        })
    };

    updateChannel = (id) => {
        let channels = [...this.state.channels];
        let newState = [];

        newState = channels.map(channel => {
            if (channel.id == id) {
                channel.isSubscribed = !channel.isSubscribed
            }

            return channel
        });

        this.setState({
            channels: newState
        }, () => {
            this.props.getUserChannels()
        })
    };

    render() {
        const { screenProps, navigation } = this.props;
        const { navigate } = navigation;
        const { i18n } = screenProps;

        const t = i18n.getFixedT();

        const { channels, loading } = this.state;

        return (
            <Container style={styles.container}>
                <Content style={styles.darkBg}>
                    <View style={[styles.wrapper, {marginTop: 20}]}>
                        <Text style={style.subtitle}>{t('channels:subtitle')}</Text>
                    </View>

                    <View style={styles.channels}>
                        {
                            loading ? <LoadingSpinner /> : false
                        }

                        {
                            (!loading && channels) ?
                            <ChannelList
                                navigate={navigate}
                                channels={channels}
                                updateChannel={this.updateChannel}
                            /> : false
                        }
                    </View>
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    subtitle: {
        ...styles.colorWhite,
        textAlign: 'center'
    }
});

function mapDispatchToProps(dispatch) {
    return {
        getUserChannels() {
            dispatch(getUserChannels())
        }
    }
}

export default connect(null, mapDispatchToProps)(AddChannels)
