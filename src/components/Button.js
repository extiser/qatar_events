import React from 'react'
import { Button, Text } from 'native-base';
import { Platform } from 'react-native'
import { PRIMARY_COLOR, SECONDARY_COLOR } from "sources/constants/colors";
import { shadeColor } from "../sources/utils/controlColor";

const CustomButton = ({style, children, textStyle, color, ...props}) => {
    const defaultStyles = {
        backgroundColor: props.transparent ? null : color,
    };

    const defaultTextStyles = {
        color: 'white',
        ...Platform.select({
            ios: {
                lineHeight: 0
            }
        })
    };

    if (!props.transparent) {
        if (props.primary) defaultStyles.backgroundColor = PRIMARY_COLOR;

        if (props.secondary) defaultStyles.backgroundColor = SECONDARY_COLOR;
    }

    if (props.disabled) {
        defaultStyles.backgroundColor = shadeColor(defaultStyles.backgroundColor, -.3);
    }

    return (
        <Button
            style={[defaultStyles, style]}
            {...props}
        >
            <Text style={[defaultTextStyles, textStyle]}>{children}</Text>
        </Button>
    )
};

export default CustomButton