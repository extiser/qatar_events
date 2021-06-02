import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RNMultiSlider from '@ptomasroos/react-native-multi-slider'
import { BORDER_COLOR, DRAWER_BG_COLOR } from "../sources/constants/colors";

export default class MultiSlider extends Component {
    renderMarker = ({currentValue}) => {
        return (
            <View style={{
                marginBottom: 25,
                alignItems: 'center'
            }}>
                <View style={{marginBottom: 5}}>
                    <View style={style.label}>
                        <Text style={[style.labelText, {fontSize: 16}]}>{currentValue}</Text>
                    </View>

                    <View style={style.triangleContainer}>
                        <View style={style.triangle}/>
                    </View>
                </View>

                <View style={style.marker}/>
            </View>
        )
    };

    render() {
        const {min, max} = this.props;
        return (
            <View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
                    <Text style={style.labelText}>{min}</Text>
                    <Text style={style.labelText}>{max}</Text>
                </View>
                <RNMultiSlider
                    sliderLength={270}
                    snapped
                    selectedStyle={{
                        backgroundColor: '#441160',
                    }}
                    unselectedStyle={{
                        backgroundColor: '#606060',
                    }}
                    containerStyle={{
                        height: 15,
                    }}
                    trackStyle={{
                        height: 10,
                    }}
                    customMarker={this.renderMarker}
                    {...this.props}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    label: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        backgroundColor: '#441160',
    },
    labelText: {
        color: 'white'
    },
    marker: {
        marginTop: -6,
        borderWidth: 6,
        borderColor: '#441160',
        backgroundColor: '#694180',
        padding: 6,
        width: 10,
        height: 10
    },
    triangleContainer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#441160'
    }
});

