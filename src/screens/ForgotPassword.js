import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Text } from 'native-base';
import styles from 'styles/common'
import Button from 'components/Button'
import { FORGOT_PASSWORD_RESULT_ROUTE } from "../sources/constants/routes";
import formStyles from 'styles/form'
import BrandLayout from "../layouts/BrandLayout";
import I18n from "../locale";

export default class ForgotPassword extends Component {
    static navigationOptions = ({navigation}) => {
        const t = I18n.getFixedT();

        return {
            title: t('main:forgotPassword'),
            headerStyle: styles.headerTransparent,
        }
    };

    render() {
        const { screenProps, navigation } = this.props;
        const { navigate } = navigation;
        const { i18n } = screenProps;

        const t = i18n.getFixedT();

        return (
            <BrandLayout animated height={'80%'}>
                <View style={[styles.wrapper, styles.center]}>
                    <Form style={style.form}>
                        <Item floatingLabel style={style.item}>
                            <Label style={{...styles.label, ...styles.colorWhite}}>{t('main:email')}</Label>
                            <Input style={styles.colorWhite} />
                        </Item>
                    </Form>

                    <Button
                        secondary
                        rounded
                        block
                        onPress={() => {
                            navigate(FORGOT_PASSWORD_RESULT_ROUTE)
                        }}
                        style={style.button}
                    >
                        Yalla!
                    </Button>
                </View>
            </BrandLayout>
        );
    }
}

const style = StyleSheet.create({
    ...formStyles,
    button: {
        marginTop: 20
    },
    form: {
        marginTop: 20
    },
});
