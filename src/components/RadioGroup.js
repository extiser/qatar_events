import React, {Component} from 'react'
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native'

export default class RadioGroup extends Component {
    state = {
        value: this.props.initialValue || ''
    };

    checkRadio = (value) => {
        this.setState({
            value
        }, () => {
            this.props.onChange(value)
        })
    };

    render() {
        const { radioGroupList, checkedColor, uncheckedColor, label, noPadding } = this.props;
        return (
            <View style={noPadding ? {} : {marginVertical: 15}}>
                {
                    label && <Text style={style.label}>{label}</Text>
                }
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                        radioGroupList.map(radio => {
                            return (
                                <TouchableHighlight
                                    key={radio.value}
                                    style={{marginRight: 40}}
                                    onPress={() => this.checkRadio(radio.value)}
                                    underlayColor={'transparent'}
                                >
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                        <View style={[style.circle, {
                                            backgroundColor: radio.value === this.state.value ? checkedColor : uncheckedColor,
                                            width: 15,
                                            height: 15,
                                            marginRight: 10,
                                            alignSelf: 'center',
                                        }]} />

                                        <Text style={style.text}>{radio.label}</Text>
                                    </View>
                                </TouchableHighlight>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

const textStyle = {
    color: 'white',
    fontFamily: 'Mada',
    fontSize: 22,
};

const style = StyleSheet.create({
    circle: {
        borderRadius: 100/2,
    },
    label: {
        ...textStyle,
        fontWeight: '600',
        marginBottom: 5,
    },
    text: {
        ...textStyle
    }
});