import React from 'react'
import { View, Platform } from 'react-native'
import Image from 'react-native-remote-svg'

const BigLogo = ({dark, width = 200}) => {
    const RATIO = 2.08;

    return (
        (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={
                        dark ?
                            (
                                Platform.OS === 'android' ?
                                    require('/static/images/logo_qe_dark-android.png') :
                                    require('/static/images/logo_qe_dark.svg')
                            )
                            :
                            (
                                Platform.OS === 'android' ?
                                    require('/static/images/QE_logo-android.png') :
                                    require('/static/images/QE_logo.svg')
                            )
                    }
                    style={{width: width, height: width / RATIO}}
                />
            </View>
        )
    )
};

export default BigLogo