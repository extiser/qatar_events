import React, { Component } from 'react';
import {
    Content,
    List,
    ListItem,
    Container,
    Text,
    Segment,
    Button
} from "native-base";
import { StyleSheet, View } from "react-native";
import styles from "../styles/common";
import { PRIMARY_COLOR, PRIMARY_HOVER_COLOR } from "../sources/constants/colors";

class TabBar extends Component {
    render() {
        const { tabs, children } = this.props;

        return (
            <View>
                <Segment style={style.segment}>
                    {
                        tabs && tabs.map((tab, i, arr) => {
                            return (
                                <Button
                                    key={i}
                                    style={[
                                        style.button,
                                        {backgroundColor: this.props.tabIndex === i ? PRIMARY_HOVER_COLOR : PRIMARY_COLOR}
                                        ]}
                                    first={i === 0}
                                    last={arr.length - 1 === i}
                                    active={this.props.tabIndex === i}
                                    onPress={() => {
                                        this.props.onChange(tab.key, i)
                                    }}
                                >
                                    <Text style={styles.colorWhite}>{tab.title}</Text>
                                </Button>
                            )
                        })
                    }
                </Segment>

                {
                    children.length > 1 ?
                        children[this.props.tabIndex] : children
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    segment: {
        marginVertical: 2,
        backgroundColor: 'transparent'
    },
    button: {
        borderColor: 'transparent'
    },
});

export default TabBar