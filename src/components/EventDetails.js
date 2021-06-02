import React, { Component } from 'react';
import {
    Text,
    Icon,
    List,
    ListItem,
    Body,
    Right,
    H3,
    Thumbnail
} from "native-base";
import { StyleSheet, View, TouchableHighlight, ScrollView, Linking, Modal, ActivityIndicator } from "react-native";
import styles from "styles/common";
import eventStyles from "styles/event";
import { PRIMARY_COLOR } from "sources/constants/colors";
import { WHITE_COLOR, YELLOW_HOVER_COLOR } from "../sources/constants/colors";
import makeDateString from "sources/utils/makeDateString";
import HTMLView from 'react-native-htmlview';
import FastImage from 'react-native-fast-image'
import makePriceString from "../sources/utils/makePriceString";
import PhotoView from 'react-native-photo-view'
import I18n from "../locale";
import Button from 'components/Button'
import { BROWSER, CHANNEL_ROUTE } from "../sources/constants/routes";

export default class EventDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inDetail: false,
            imageIsOpen: false
        }
    }

    toggleImage = () => {
        this.setState({imageIsOpen: !this.state.imageIsOpen})
    };



    render() {
        const { width, height, event, addToCalendar, getContacts, getDirections, types, navigate } = this.props;
        const { inDetail } = this.state;

        const t = I18n.getFixedT();

        const categoryColor = types.colors[event.category];

        const webViewStyles = StyleSheet.create({
            div: {
                color: 'white',
                fontSize: 16,
                fontFamily: 'Mada',
            },
            a: {
                color: 'white',
            }
        });

        const prices = event.prices;

        const location = event.location;

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
                        <PhotoView
                            source={{uri: event.photoSrc}}
                            minimumZoomScale={1}
                            maximumZoomScale={5}
                            androidScaleType="center"
                            style={{
                                width: width,
                                height: height
                            }}
                        />

                        <View style={{position: 'absolute', top: 30, left: 10}}>
                            <Button transparent onPress={() => this.toggleImage()}>
                                <Icon name='close' style={{color: WHITE_COLOR, fontSize: 35}}/>
                            </Button>
                        </View>
                    </View>
                </Modal>

                {
                    event.isPinnedToTop &&
                    <View style={{
                        paddingHorizontal: 30,
                        paddingVertical: 3,
                        backgroundColor: '#fecc00',
                        position: 'absolute',
                        top: 10,
                        right: 0,
                        zIndex: 500
                    }}>
                        <Text style={styles.colorWhite}>Featured</Text>
                    </View>
                }

                {
                    event.photo &&
                    <TouchableHighlight onPress={() => this.toggleImage()}>
                        <FastImage
                            style={{
                                width: width,
                                height: width/RATIO
                            }}
                            source={{
                                uri: event.photo,
                                priority: FastImage.priority.center,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </TouchableHighlight>
                }

                <ScrollView style={styles.padding20}>

                    <View style={{
                        marginBottom: 20,
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            paddingHorizontal: 30,
                            paddingVertical: 3,
                            backgroundColor: categoryColor,
                            borderRadius: 100/2,
                        }}>
                            <Text style={styles.colorWhite}>{types.names[event.category]}</Text>
                        </View>

                        <View style={{
                            backgroundColor: categoryColor,
                            width: 20,
                            height: 20,
                            borderRadius: 100/2,
                            marginLeft: 10
                        }}/>
                    </View>

                    <View>
                        <H3 style={style.title}>{event.title}</H3>

                        {
                            inDetail ?
                                <HTMLView
                                    value={`<div>${event.body}</div>`}
                                    stylesheet={webViewStyles}
                                    addLineBreaks={false}
                                />
                                :
                                <Text style={[style.text, styles.colorWhite]}>
                                    {event.summary}
                                </Text>
                        }
                    </View>

                    <View style={style.leftsideBlock}>
                        <TouchableHighlight onPress={() => this.setState({inDetail: !this.state.inDetail}) }>
                            <Text style={style.readMore}>{inDetail ? 'Roll up' : 'Read more...'}</Text>
                        </TouchableHighlight>
                    </View>

                    <View style={{marginTop: 10}}>
                        
                        {
                            prices ?
                                <View>
                                    <View style={styles.flexRow}>
                                        <Icon name='pricetag' style={eventStyles.icon} />
                                        <Text style={eventStyles.info}>
                                            {prices[0].ticketType}
                                            {prices[0].ticketType === '' ? '' : '- '}

                                            {prices[0].priceValue === '' ?
                                                'N/A'
                                                :
                                                prices[0].priceValue === '0' ?
                                                    'Free' : prices[0].priceValue}

                                        </Text>
                                    </View>

                                    {
                                        prices.length ?
                                        <View style={[styles.flexColumn, {marginLeft: 16}]}>
                                            {
                                                prices && prices.map((price, i) => {
                                                    if (i > 0) {
                                                        return (
                                                            <Text key={i} style={eventStyles.info}>
                                                                {price.ticketType}
                                                                {price.ticketType === '' ? '' : '- '}
                                                                {price.priceValue === '' ?
                                                                    'N/A'
                                                                    :
                                                                    prices.priceValue === '0' ?
                                                                        'Free' : prices.priceValue}
                                                            </Text>
                                                        )
                                                    }
                                                })
                                            }
                                        </View> : false
                                    }
                                </View> : false
                        }

                        <View style={styles.flexRow}>
                            <Icon name='time' style={eventStyles.icon} />
                            <Text style={eventStyles.info}>
                                {makeDateString(event.startDate && event.startDate.date, event.endDate && event.endDate.date)}
                            </Text>
                        </View>

                        <TouchableHighlight underlayColor={'transparent'} onPress={getDirections}>
                            <View style={styles.flexRow}>
                                <Icon name='pin' style={[eventStyles.icon, {marginLeft: 3}]} />
                                <Text style={[eventStyles.info, {textDecorationLine: 'underline'}]}>
                                    {event.location && event.location.addressLine1}
                                </Text>
                            </View>
                        </TouchableHighlight>

                        {
                            (event.author && !event.author.isChannel) &&
                            <View style={style.leftsideBlock}>
                                <Text style={styles.colorWhite}>
                                    Posted by {event.author.username}
                                </Text>
                            </View>
                        }

                        {
                            (event.author && event.author.isChannel) &&
                            <View style={{flexDirection : 'row', marginTop: 20}}>
                                <View style={{marginRight: 10, flex: .2, justifyContent: 'center'}}>
                                    <Thumbnail
                                        source={{uri:
                                            event.author.photo ||
                                            'https://www.w3schools.com/bootstrap/img_avatar2.png'
                                        }}
                                    />
                                </View>

                                <View style={{justifyContent: 'center', flex: .4}}>
                                    <View>
                                        <Text style={{...styles.colorWhite, fontSize: 14}}>
                                            Posted by
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{...styles.colorWhite, fontSize: 18}}>
                                            {event.author.firstName} {event.author.lastName && (' ' + event.author.lastName) }
                                        </Text>
                                    </View>
                                </View>

                                <View style={{
                                    flex: .4,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}>
                                    <Button
                                        color={categoryColor}
                                        rounded
                                        small
                                        onPress={() => {
                                            navigate(CHANNEL_ROUTE, {id: event.author.id})
                                        }}
                                        style={{
                                            alignSelf: 'center'
                                        }}
                                    >
                                        View Channel
                                    </Button>
                                </View>
                            </View>
                        }


                    </View>

                    <View style={{paddingVertical: 20}}>
                        <List>
                            <ListItem style={style.listItem} onPress={getContacts}>
                                <Body>
                                <Text style={style.listItemText}>{t('event:getContactInformation')}</Text>
                                </Body>

                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>

                            {
                                location && (location.latitude && location.longitude) ?
                                    <ListItem style={style.listItem} onPress={getDirections}>
                                        <Body>
                                        <Text style={style.listItemText}>{t('event:getDirections')}</Text>
                                        </Body>

                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </ListItem> : false
                            }

                            <ListItem style={style.listItem} onPress={addToCalendar}>
                                <Body>
                                <Text style={style.listItemText}>{t('event:addToCalendar')}</Text>
                                </Body>

                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>

                            {
                                event.onlineTicketLink ?
                                    <ListItem style={style.listItem} onPress={() => navigate(BROWSER, {uri:event.onlineTicketLink})}>
                                        <Body>
                                        <Text style={style.listItemText}>Buy a ticket</Text>
                                        </Body>

                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </ListItem> : false
                            }
                        </List>
                    </View>
                </ScrollView>
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
        marginBottom: 10,
        fontWeight: '600'
    },
    leftsideBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    readMore: {
        textDecorationLine: 'underline',
        ...styles.colorWhite,
        fontSize: 15
    },
    listItem: {
        ...styles.listItem,
        ...styles.darkBg,
    },
    listItemText: {
        ...styles.colorWhite,
        marginLeft: 0,
    },
});
