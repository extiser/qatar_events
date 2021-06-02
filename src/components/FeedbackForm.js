import React from 'react'
import { View, TextInput, StyleSheet } from "react-native"
import styles from "../styles/common";
import Button from 'components/Button'
import { Text } from 'native-base';

const FeedbackForm = ({onChange, onSubmit, height, text, buttonDisabled}) => {

    const style = StyleSheet.create({
        textarea: {
            ...styles.colorWhite,
            ...styles.textarea,
            minHeight: height/4,
            marginBottom: 20
        },
        text: {
            ...styles.colorWhite,
            marginBottom: 10
        }
    });

    return (
        <View>
            {
                text ?
                    <Text style={style.text}>{text}</Text> : false
            }
            <TextInput
                style={style.textarea}
                multiline={true}
                numberOfLines={10}
                onChangeText={(text) => {
                    onChange(text)
                }}
            />

            <Button
                block
                primary
                rounded
                disabled={buttonDisabled}
                onPress={() => onSubmit()}
            >
                Yalla!
            </Button>
        </View>
    )
};

export default FeedbackForm