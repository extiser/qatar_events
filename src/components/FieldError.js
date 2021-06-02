import React from 'react'
import { Text } from 'native-base'
import { ERROR_COLOR } from "../sources/constants/colors";
import { LOGIN_ROUTE } from "../sources/constants/routes";

const FieldError = ({message, navigate}) => {
    return (
        <Text style={{color: ERROR_COLOR, marginTop: 5}}>
            {message}

            {
                message && (message[0].indexOf('has already been taken') !== -1) ?
                    <Text
                        style={{
                            color: 'white',
                            textDecorationLine: 'underline',
                            fontWeight: '600'
                        }}
                        onPress={() => navigate(LOGIN_ROUTE)}
                    >
                        {' '}Login ?
                    </Text> : null
            }
        </Text>
    )
};

export default FieldError