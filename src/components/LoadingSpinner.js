import React from 'react'
import { ActivityIndicator, View } from "react-native";

const LoadingSpinner = () => {
    return (
        <View style={{ flex: 1, paddingTop: 20, paddingBottom: 40 }}>
            <ActivityIndicator />
        </View>
    )
};

export default LoadingSpinner
