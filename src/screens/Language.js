import React, { Component } from 'react'
import { StyleSheet, View, I18nManager, Image } from 'react-native'
import { Text } from 'native-base'
import styles from 'styles/common'
import Button from 'components/Button'
import { MAIN_ROUTE } from 'sources/constants/routes'
import RNRestart from 'react-native-restart';
import BrandLayout from 'layouts/BrandLayout'

export default class Language extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    static setLanguage = lang => {
        storage.save({
            key: 'lang',
            data: lang
        });

        I18nManager.forceRTL(lang === 'ar');

        RNRestart.Restart();
    };

    onChooseLanguage = (lang) => {
        Language.setLanguage(lang);
    };
    
    render() {
        return (
            <BrandLayout animated logo height={'40%'}>
                <View style={[styles.centerTextContainer]}>
                    <Text style={style.text}>Choose the language</Text>
                    <Text style={style.text}>اختر اللغة</Text>
                </View>
                <View style={style.buttonContainer}>
                    <Button block primary rounded style={style.button} onPress={() => {this.onChooseLanguage('en')}}>English</Button>
                    <Button block primary rounded onPress={() => {this.onChooseLanguage('ar')}}>العربية</Button>
                </View>
            </BrandLayout>
        );
    }
}

const style = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 25,
        ...styles.colorWhite
    },
    buttonContainer: {
        marginHorizontal: 60,
        marginTop: 20
    },
    button: {
        marginBottom: 15,
    },
});
