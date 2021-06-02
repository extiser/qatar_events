import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Text } from 'native-base';
import styles from 'styles/common'
import Button from 'components/Button'
import { MAIN_ROUTE } from "../sources/constants/routes";
import BrandLayout from "../layouts/BrandLayout";
import I18n from "../locale";

export default class RegistrationResult extends Component {
    static navigationOptions = ({navigation}) => {
        const t = I18n.getFixedT();

        return {
            title: t('main:registration'),
            headerStyle: styles.headerTransparent,
        }
    };

    render() {
        const { screenProps, navigation } = this.props;
        const { navigate } = navigation;
        const { i18n } = screenProps;

        const t = i18n.getFixedT();

        return (
            <BrandLayout animated height={'80%'} header>
                <View style={[styles.wrapper, styles.center]}>
                    <View style={styles.centerTextContainer}>
                        <Text style={style.text}>{t('registrationResult:text1')}</Text>
                        <Text style={style.text}>{t('registrationResult:text2')}</Text>
                        <Text style={style.text}>{t('registrationResult:text3')}</Text>
                    </View>

                    <Button
                        primary
                        rounded
                        block
                        onPress={() => {
                            navigate(MAIN_ROUTE)
                        }}
                    >
                        Yalla!
                    </Button>
                </View>
            </BrandLayout>
        );
    }
}

const style = StyleSheet.create({
    text: {
        ...styles.colorWhite,
        fontSize: 20,
        marginBottom: 30,
        textAlign: 'center'
    }
});
