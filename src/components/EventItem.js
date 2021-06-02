import React, { Component } from 'react';
import {
    Container,
    Text,
    Button,
    Icon,
} from "native-base";
import { StyleSheet, View, TouchableHighlight, ActivityIndicator } from "react-native";
import styles from "styles/common";
import eventStyles from "styles/event";
import { PRIMARY_COLOR } from "sources/constants/colors";
import makeDateString from "sources/utils/makeDateString";
import FastImage from 'react-native-fast-image'
import makePriceString from "../sources/utils/makePriceString";

class EventItem extends Component {
    constructor() {
        super();
        this.state = {
            imageIsLoading: false
        }
    }

    render() {
        const { width, onPress, data, typeColors } = this.props;

        const leftColWidth = width * 0.4;
        const rightColWidth = width * 0.57;

        const price = makePriceString(data.prices);

        const style = StyleSheet.create({
            left: {
                width: leftColWidth
            },
            right: {
                marginHorizontal: 10,
                width: rightColWidth,
                borderRightWidth: 6,
                borderRightColor: typeColors[data.category] || PRIMARY_COLOR,
            },
            title: {
                ...styles.colorWhite,
                fontSize: 18
            }
        });

        const IMG_HEIGHT = 110;
        
        return (
            <TouchableHighlight onPress={onPress}>
                <View style={[styles.flexRow, { marginBottom: 10 }]}>
                    <View style={style.left}>
                        <View>
                            {
                                this.state.imageIsLoading &&
                                <View style={[styles.imageLoadSpinner, {height: IMG_HEIGHT}]}>
                                    <ActivityIndicator />
                                </View>
                            }
                            

                            <FastImage
                                style={{width: leftColWidth, height: IMG_HEIGHT}}
                                source={{
                                    uri: data.photo,
                                    priority: FastImage.priority.normal,
                                }}
                                onLoadStart={() => this.setState({imageIsLoading: true})}
                                onLoad={() => this.setState({imageIsLoading: false})}
                            />
                        </View>
                    </View>

                    <View style={style.right}>
                        <Text numberOfLines={1} style={style.title}>{data.title}</Text>

                        <View>
                            <View style={[styles.flexRow, {width: rightColWidth}]}>
                                <View style={styles.flexRow}>
                                    <Icon name='pricetag' style={eventStyles.icon} />
                                    <Text style={eventStyles.info}>
                                        {price && price.min} {(price.min === price.max) || price.max === '' ?
                                        ''
                                        :
                                        ' - ' + price.max}
                                    </Text>
                                </View>
                            </View>

                            <View style={[styles.flexRow, {width: rightColWidth}]}>
                                <Icon name='time' style={eventStyles.icon} />
                                <View>
                                    <Text style={eventStyles.info}>
                                        {makeDateString(data.startDate.date, data.endDate.date)}
                                    </Text>
                                </View>
                            </View>

                            <View style={[styles.flexRow, {width: rightColWidth}]}>
                                <Icon name='pin' style={[eventStyles.icon, {marginLeft: 3}]} />
                                <Text numberOfLines={1} style={[eventStyles.info, {textDecorationLine: 'underline'}]}>
                                    {data.location && data.location.addressLine1}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

export default EventItem