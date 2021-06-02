import React, { Component } from 'react';
import {
    Text,
    Icon,
    List,
    ListItem,
    Body,
    Right,
    H3,
    Button,
} from "native-base";
import { StyleSheet, View, TouchableHighlight, Platform, Linking, Modal } from "react-native";
import styles from "styles/common";
import { PRIMARY_COLOR } from "sources/constants/colors";
import { WHITE_COLOR, YELLOW_HOVER_COLOR } from "../sources/constants/colors";
import HTMLView from 'react-native-htmlview';
import FastImage from 'react-native-fast-image'
import socialActions from 'sources/socialActions'
import Image from 'react-native-remote-svg'
import I18n from "../locale";
import EventsList from 'components/EventsList'
import API from 'API'
import { BROWSER } from "../sources/constants/routes";

export default class ChannelDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageIsOpen: false
        }
    }

    toggleImage = () => {
        //this.setState({imageIsOpen: !this.state.imageIsOpen})
    };

    socialLinksIsSet = () => {
        const { channel } = this.props;

        let found = false;

        socialActions.some(action => {
            let data = channel[action.name];

            if (data) {
                found = true;
                return !!data
            }
        });

        return found;
    };

    render() {
        const { width, height, channel, navigate, typeColors } = this.props;

        const t = I18n.getFixedT();

        const RATIO = 1.5;

        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.imageIsOpen}
                    onRequestClose={() => this.toggleImage()}
                >
                    <View style={{backgroundColor: 'black'}}>

                        <View style={{position: 'absolute', top: 30, left: 10}}>
                            <Button transparent onPress={() => this.toggleImage()}>
                                <Icon name='close' style={{color: WHITE_COLOR, fontSize: 35}}/>
                            </Button>
                        </View>
                    </View>
                </Modal>

                {
                    channel.photo &&
                    <TouchableHighlight onPress={() => this.toggleImage()}>
                        <FastImage
                            style={{
                                width: width,
                                height: width/RATIO
                            }}
                            source={{
                                uri: channel.photo,
                                priority: FastImage.priority.center,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </TouchableHighlight>
                }

                <View style={styles.padding20}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <H3 style={style.title}>
                            {`${channel.firstName} ${channel.lastName}`}
                        </H3>


                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{marginRight: 5}}>
                                <Text style={{...styles.colorWhite, fontSize: 45, fontWeight: '600'}}>
                                    {channel.eventsCount}
                                </Text>
                            </View>

                            <View style={{justifyContent: 'center'}}>
                                <Text style={{...styles.colorWhite, fontSize: 16, fontWeight: '300', lineHeight: 16}}>
                                    {t('channel:events')}{'\n'}{t('channel:posted')}
                                </Text>
                            </View>
                        </View>

                        {
                            channel.jobTitle ?
                                <View style={style.block}>
                                    <Text style={style.subtitle}>{t('channel:about')}</Text>
                                    <HTMLView
                                        value={`<div>${channel.jobTitle}</div>`}
                                        stylesheet={styles.webView}
                                        addLineBreaks={false}
                                    />
                                </View> : false
                        }

                        <View style={style.block}>
                            <Text style={style.subtitle}>{t('channel:contactInformation')}</Text>
                            <View>
                                {
                                    channel.email ? <Text style={style.centerText}>{channel.email}</Text> : false
                                }

                                {
                                    channel.phone ? <Text style={style.centerText}>{channel.phone}</Text> : false
                                }
                            </View>
                        </View>

                        {
                            this.socialLinksIsSet() ?
                                <View style={style.block}>
                                    <Text style={style.subtitle}>{t('channel:socialMediaLinks')}</Text>
                                    <View style={style.socialBlock}>
                                        {
                                            socialActions.map((action, i) => {
                                                if (channel[action.name]) {
                                                    return (
                                                        <TouchableHighlight
                                                            key={i}
                                                            underlayColor={'transparent'}
                                                            onPress={() => navigate(BROWSER, {uri: channel[action.name]})}
                                                            style={{marginHorizontal: 7}}
                                                        >
                                                            <View>
                                                                <Image
                                                                    source={action.icon[Platform.OS]}
                                                                    style={style.icon}
                                                                />
                                                            </View>
                                                        </TouchableHighlight>
                                                    )
                                                }
                                            })
                                        }
                                    </View>
                                </View> : false
                        }
                    </View>
                </View>

                <View
                    style={{
                        borderBottomColor: '#4c4c4c',
                        borderBottomWidth: 1,
                    }}
                />

                <View style={{marginVertical: 25}}>
                    <Text style={style.eventsTitle}>{t('channel:eventsTitle')}</Text>
                </View>

                <EventsList
                    navigate={navigate}
                    typeColors={typeColors}
                    getData={API.getChannelEvents}
                    authorId={channel.id}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    text: {
        fontSize: 16,
        ...styles.colorWhite
    },
    title: {
        ...styles.colorWhite,
        marginBottom: 5,
        fontSize: 24,
        fontWeight: '600'
    },
    subtitle: {
        textDecorationLine: 'underline',
        ...styles.colorWhite,
        fontSize: 18,
        marginBottom: 10,
    },
    block: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    centerText: {...styles.colorWhite, textAlign: 'center'},
    socialBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    icon: {width: 40, height: 40},
    eventsTitle: {
        fontSize: 22,
        ...styles.colorWhite,
        textAlign: 'center',
        fontWeight: '600'
    }
});