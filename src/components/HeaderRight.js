import React, { Component } from 'react';
import {
    Button,
    Icon
} from 'native-base';
import styles from "../styles/common";
import { View } from 'react-native'

const HeaderRight = ({actions}) => {
    const renderAction = (obj, key) =>
        <Button key={key} transparent onPress={obj.callback}>
            <Icon
                name={obj.icon}
                ios={obj.ios}
                android={obj.android}
                style={[
                    styles.colorWhite,
                    (obj.rotate && {marginRight: 15, marginLeft: 0, transform: [{ rotate: `${obj.rotate}deg` }]})
                ]}
            />
        </Button>;

    return (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {
                actions &&
                (
                    Array.isArray(actions) ?
                        actions.map((action, i) =>
                            renderAction(action, i)
                        )
                        :
                        renderAction(actions)
                )

            }
        </View>
    )
};

export default HeaderRight