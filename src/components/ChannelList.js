import React, { Component } from 'react';
import { CHANNEL_ROUTE } from "../sources/constants/routes";
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import {
    Text,
    Item,
    List,
    ListItem,
    Thumbnail,
    Icon,
    Button
} from 'native-base';
import styles from 'styles/common'
import API from 'API'
import { SUBSCRIBE_CHANNEL_URL, UNSUBSCRIBE_CHANNEL_URL } from "../API/urls";
import OneSignal from 'react-native-onesignal';

class ChannelList extends Component {
    openChannel = (id) => {
        const { navigate } = this.props;

        navigate(
            CHANNEL_ROUTE,
            {
                id
            }
        )
    };

    toggleSubscribe = (id, isSubscribed = true) => {
        let callback, tagCallback;

        if (isSubscribed) {
            callback = API.unsubscribeChannel;
        } else {
            callback = API.subscribeChannel;
        }

        callback(id).then(res => {
            if (res.data && res.data.success) {
                if (!isSubscribed) {
                    OneSignal.sendTag(`channel${id}`, '1')
                } else {
                    OneSignal.deleteTag(`channel${id}`)
                }
                this.props.updateChannel(id)
            }
        }).catch(err => {
            console.log(err.response);
        })
    };

    isSubscribed = (channel) => {
        if (channel.isSubscribed === undefined) return true;

        return channel.isSubscribed
    };

    render() {
        const { channels } = this.props;

        return (
            <List>
                {
                    channels.map(channel => {
                        return (
                            <ListItem style={style.listItem} key={channel.id}>
                                <View
                                    style={{flex: .8}}
                                >
                                    <TouchableHighlight
                                        onPress={() => this.openChannel(channel.id)}
                                        underlayColor={'transparent'}
                                    >
                                        <View style={{flexDirection : 'row', marginLeft: 8}}>
                                            <View style={{marginRight: 15}}>
                                                <Thumbnail
                                                    source={{uri:
                                                        channel.photo ||
                                                        'https://www.w3schools.com/bootstrap/img_avatar2.png'
                                                    }}
                                                />
                                            </View>

                                            <Text style={style.listItemText}>
                                                {`${channel.firstName ? channel.firstName : ''} ${channel.lastName ? channel.lastName : ''}`}
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>

                                <View
                                    style={{flex: .2, flexDirection : 'row', justifyContent: 'flex-end'}}
                                >
                                    <Button
                                        transparent
                                        onPress={() => this.toggleSubscribe(channel.id, channel.isSubscribed)}
                                    >
                                        <Icon
                                            ios={this.isSubscribed(channel) ?
                                                'ios-checkmark-circle-outline' : 'ios-add-circle-outline'}
                                            android={this.isSubscribed(channel) ?
                                                'md-checkmark-circle' : 'md-add-circle'}
                                            style={{color: this.isSubscribed(channel) ? '#b0cb1f' : 'white'}}
                                        />
                                    </Button>
                                </View>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }
}

const style = StyleSheet.create({
    listItem: {
        ...styles.listItem,
        ...styles.darkBg,
        borderBottomWidth: 0,
        flex: 1,
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 8
    },
    listItemText: {
        ...styles.colorWhite,
        fontSize: 18
    },
    channelIcon: {backgroundColor: 'black', width: 50, height: 50, borderRadius: 100/2, marginRight: 15},
});

export default ChannelList