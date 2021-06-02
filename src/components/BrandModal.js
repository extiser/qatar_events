import React from 'react'
import Modal from 'react-native-modal'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { Text, Icon } from 'native-base'
import { PRIMARY_COLOR, WHITE_COLOR } from "../sources/constants/colors";
import BigLogo from 'components/BigLogo'

const BrandModal = ({isVisible, title, bodyText, onClose, renderFooter, ...props}) => {
    return (
        <Modal
            isVisible={isVisible}
            backdropOpacity={.5}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            onSwipe={onClose}
            swipeDirection={'up'}
            {...props}
        >
            <TouchableHighlight
                onPress={onClose}
                style={{flex: .05, justifyContent: 'flex-end', flexDirection: 'row'}}
                underlayColor={'transparent'}
            >
                <Icon ios="ios-close-circle-outline" android="md-close-circle" style={{color: WHITE_COLOR}}/>
            </TouchableHighlight>

            <View style={style.container}>
                <View style={{flex: .3}}>
                    <BigLogo dark width={200}/>
                </View>

                <View style={[style.block, {flex: .4}]}>
                    <Text style={style.title}>{title}</Text>
                    <Text style={style.bodyText}>{bodyText}</Text>
                </View>

                {
                    renderFooter ?
                        <View style={[style.block, {alignSelf: 'stretch', justifyContent: 'flex-end', flex: .3}]}>
                            {renderFooter()}
                        </View> : false
                }
            </View>
        </Modal>
    )
};

const style = StyleSheet.create({
    container: {
        flex: .6,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: WHITE_COLOR,
        padding: 25,
        borderRadius: 15,
        marginHorizontal: 20
    },
    title: {
        fontSize: 27,
        color: PRIMARY_COLOR,
        fontWeight: '500',
        marginBottom: 15,
        marginTop: 25
    },
    bodyText: {
        fontSize: 18,
        color: PRIMARY_COLOR,
        textAlign: 'center',
        marginHorizontal: 20
    },
    block: {
        alignItems: 'center',
        backgroundColor: WHITE_COLOR,
    }
});

export default BrandModal