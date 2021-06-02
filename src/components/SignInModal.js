import React from 'react'
import { AUTH_ROUTE } from "../sources/constants/routes";
import { PRIMARY_COLOR } from "../sources/constants/colors";
import BrandModal from 'components/BrandModal'
import Button from 'components/Button'
import { View } from "react-native"

const SignInModal = ({isOpen, onToggle, navigate}) => {
    return (
        <BrandModal
            isVisible={isOpen}
            title='Salam!'
            bodyText='Register or Login to get access to extra features!'
            onClose={() => onToggle()}
            renderFooter={() => (
                <View style={{alignSelf: 'stretch'}}>
                    <Button
                        primary
                        block
                        rounded
                        onPress={() => {
                            onToggle();
                            navigate('loginStack');
                        }}
                    >
                        Yalla!
                    </Button>

                    <Button
                        block
                        transparent
                        onPress={() => onToggle()}
                        style={{height: 40}}
                        textStyle={{
                            color: PRIMARY_COLOR,
                            textDecorationLine: 'underline',
                        }}
                    >
                        LATER
                    </Button>
                </View>
            )}
        />
    )
};

export default SignInModal