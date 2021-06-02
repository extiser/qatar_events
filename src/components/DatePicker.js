import React from 'react'
import { StyleSheet } from "react-native";
import RNDatePicker from 'react-native-datepicker'
import { DATE_FORMAT } from "../sources/constants/date";
import { ERROR_COLOR, INPUT_COLOR } from "../sources/constants/colors";

export default function({...props}) {
    return (
        <RNDatePicker
            style={style.date}
            date={props.date}
            mode="date"
            format={DATE_FORMAT}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
                dateInput: {
                    paddingLeft: 10,
                    borderWidth: props.error ? 2 : 0,
                    alignItems: 'flex-start',
                    borderColor: props.error ? ERROR_COLOR : 'transparent'
                },
                dateText: {
                    color: 'white'
                },
                placeholderText: {
                    color: 'white'
                },
                dateTouchBody: {
                    backgroundColor: INPUT_COLOR,
                }
            }}
            {...props}
        />
    )
};

const style = StyleSheet.create({
    date: {
        width: '100%',
        backgroundColor: '#606060',
        marginBottom: 10
    }
});
