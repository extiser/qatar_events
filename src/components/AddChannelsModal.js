import React from 'react'
import { ADD_CHANNELS_ROUTE } from "../sources/constants/routes";
import { PRIMARY_COLOR } from "../sources/constants/colors";
import BrandModal from 'components/BrandModal'
import Button from 'components/Button'
import { View } from "react-native"

const AddChannelsModal = ({isOpen, onToggle, navigate}) => {
    return (
        <BrandModal
            isVisible={isOpen}
            title='Salam!'
            bodyText='Before you start, subscribe to few channels ...'
            onClose={() => onToggle()}
            renderFooter={() => (
                <View style={{alignSelf: 'stretch'}}>
                    <Button
                        primary
                        block
                        rounded
                        onPress={() => {
                            onToggle();
                            navigate(ADD_CHANNELS_ROUTE);
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

export default AddChannelsModal