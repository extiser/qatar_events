import React, { Component } from 'react';
import {
    Button,
    Icon
} from 'native-base';
import styles from "../styles/common";
import { View } from "react-native";

const HeaderLeft = ({onPress, iconName}) => (
    <View>
        <Button transparent onPress={onPress}>
            <Icon
                name={iconName}
                style={styles.colorWhite}
            />
        </Button>
    </View>
);

export default HeaderLeft