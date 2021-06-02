import React, { Component } from 'react';
import {
    Text,
    Container,
    Content
} from 'native-base';
import styles from 'styles/common'
import I18n from "../locale";
import { View } from 'react-native'
import ChannelList from 'components/ChannelList'
import { connect } from 'react-redux'
import { getUserChannels, removeChannel } from 'actions/userChannels'

class MyChannels extends Component {

    static navigationOptions = ({ navigation }) => {
        const t = I18n.getFixedT();

        return {
            title: t('main:myChannels'),
        }
    };

    removeChannel = (id) => {
        this.props.removeChannel(id);
    };

    render() {
        const { navigation, channels } = this.props;
        const { navigate } = navigation;

        return (
            <Container style={styles.container}>
                <Content style={styles.darkBg}>
                    <View style={styles.channels}>
                        {
                            channels ?
                            <ChannelList
                                navigate={navigate}
                                channels={channels}
                                updateChannel={this.removeChannel}
                            /> : false
                        }
                    </View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps (state) {
    return {
        channels: state.userChannels,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeChannel(id) {
            dispatch(removeChannel(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyChannels)
