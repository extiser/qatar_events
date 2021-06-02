import React, { Component } from 'react';
import {
    Container,
    Text,
    Button,
    H3
} from "native-base";
import { ActivityIndicator, TouchableHighlight, View } from "react-native";
import styles from "../styles/common";
import makeDateString from "sources/utils/makeDateString";
import FastImage from "react-native-fast-image";

class EventBig extends Component {
    constructor() {
        super();
        this.state = {
            imageIsLoading: false
        }
    }

    render() {
        const { onPress, data, width } = this.props;
        const { imageIsLoading } = this.state;

        const IMG_HEIGHT = 250;

        return (
            <TouchableHighlight onPress={onPress}>
                <View style={{position: 'relative', marginBottom: 10, height: IMG_HEIGHT}}>
                    {
                        imageIsLoading &&
                        <View style={[styles.imageLoadSpinner, {height: IMG_HEIGHT, left: '45%'}]}>
                            <ActivityIndicator />
                        </View>
                    }

                    {
                        data.isPinnedToTop &&
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

                    <FastImage
                        style={{width: width, height: IMG_HEIGHT}}
                        source={{
                            uri: data.photo,
                            priority: FastImage.priority.normal,
                        }}
                        onLoadStart={() => this.setState({imageIsLoading: true})}
                        onLoad={() => this.setState({imageIsLoading: false})}
                    />

                    <View
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            maxHeight: 150,
                            width: width,
                            position: 'absolute',
                            bottom: 0,
                            paddingLeft: 25,
                            paddingRight: 25,
                            paddingTop: 10,
                            paddingBottom: 10,
                        }}
                    >
                        <H3 style={styles.colorWhite}>{data.title}</H3>
                        <Text style={{fontWeight: '400', fontSize: 16, marginTop: 5, ...styles.colorWhite}}>
                            {makeDateString(data.startDate.date, data.endDate.date)}, {data.location && data.location.addressLine1}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

export default EventBig