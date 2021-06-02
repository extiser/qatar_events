import React, { Component } from 'react';
import {
    Text,
    Container,
    Content,
    Label,
    Item,
    Input,
    Form,
    List,
    ListItem,
    Thumbnail,
    Icon
} from 'native-base';
import styles from 'styles/common'
import I18n from "../locale";
import { View, StyleSheet } from 'react-native'

export default class AboutApp extends Component {

    static navigationOptions = ({ navigation }) => {
        const t = I18n.getFixedT();

        return {
            title: t('main:aboutApp'),
        }
    };

    render() {
        const { screenProps, navigation } = this.props;
        const { navigate } = navigation;
        const { i18n } = screenProps;

        const t = i18n.getFixedT();

        return (
            <Container style={styles.container}>
                <Content style={styles.darkBg}>
                    <View style={[styles.wrapper, {marginTop: 20}]}>
                        <Text style={style.text}>
                            Just like you, we were tired of always hearing about events after they were done. Waking up in the morning and hearing that everybody just went to a lit AF concert that you never heard is always a strange feeling. Did you wake up in another dimension?
                        </Text>

                        <Text style={style.text}>
                            Well fret no more! The Qatar Events team has you covered. We started off as a twitter account that would share whatever events we could find online for you all! We then launched our Facebook page and loads of you appreciated what we were doing. All 250,000 of you on Facebook and Twitter!
                        </Text>

                        <Text style={style.text}>
                            We’ve grown! Grown A LOT. Not only are we a part of the ILQ Network, we’ve got our own weekend roundup show on youtube, and a weekly newsletter too!
                            To take things to the next level, we’ve launched this app to make your lives even more convenient. It might have a few bugs here and there, but we’re committed to making this app rock and to regularly update it, so make sure you share your feedback with us. Make sure you also follow some channels, you’ll get notifications whenever they have a cool new event too!
                        </Text>

                        <Text style={style.text}>
                            This app was built between two nations. Qatar & Uzbekistan. Make sure you show Uzbeks some love!
                        </Text>
                    </View>
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    text: {
        ...styles.colorWhite,
        marginBottom: 10
    }
});
