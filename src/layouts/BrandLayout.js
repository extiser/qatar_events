import React, { Component } from 'react'
import styles from 'styles/common'
import { StyleSheet, View, StatusBar, Animated } from 'react-native'
import { Container, Text } from 'native-base'
import BigLogo from 'components/BigLogo'
import { HEIGHT, isSmallHeight } from "../styles/breakpoints";
import { MediaQueryStyleSheet } from "react-native-responsive";

StatusBar.setBarStyle('light-content');

const MIN = 0;
const MAX = 1;
const DURATION = 20000;

class BrandLayout extends Component {
    constructor () {
        super();
        this.spinValue = new Animated.Value(0);
    }

    componentDidMount () {
        this.spin()
    }

    spin = () => {
        this.spinValue.setValue(0);

        Animated.sequence([
            Animated.timing(this.spinValue, {
                toValue: MAX,
                duration: DURATION,
            }),
            Animated.timing(this.spinValue, {
                toValue: MIN,
                duration: DURATION,
            })
        ]).start(() => {
            this.spin()
        });
    };

    render() {
        const {children, height, logo, header, animated} = this.props;

        const scale = animated ?
        this.spinValue.interpolate({
            inputRange: [MIN, MAX],
            outputRange: ['100%', '125%']
        }) : '100%';

        return (
            <Container style={[styles.container]}>

                <Animated.Image
                    source={require('/static/images/bg.jpg')}
                    style={{
                        backgroundColor: '#ccc',
                        resizeMode: 'cover',
                        position: 'absolute',
                        width: scale,
                        height: scale,
                        justifyContent: 'center',
                    }}
                />

                <View style={[style.content, styles.backgroundContent, {marginTop: header && 64}]}>
                    {
                        logo &&
                        <View style={style.logo}>
                            <BigLogo
                                width={isSmallHeight ? 150 : undefined}
                            />
                        </View>
                    }

                    <View style={{height: height || '100%'}}>
                        {children}
                    </View>

                    <View style={[styles.centerTextContainer, {marginBottom: 20}]}>
                        <Text style={[style.versionText, style.smallText10]}>Version 1.2</Text>
                    </View>
                </View>
            </Container>
        )
    }
}

const style = MediaQueryStyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    logo: {marginTop: HEIGHT/7},
    versionText: {
        ...styles.colorWhite
    }
},
    {
        [`@media (max-device-height: 480)`]: {
            smallText10: {
                fontSize: 10
            }
        }
    }
);

export default BrandLayout