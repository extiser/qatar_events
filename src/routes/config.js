import { PRIMARY_COLOR, WHITE_COLOR } from "../sources/constants/colors";
import HeaderLeft from "../components/HeaderLeft";
import React, { Component } from 'react';

export default {
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: PRIMARY_COLOR,
            shadowOpacity: 0,
            elevation: 0,
        },
        headerTitleStyle: {
            fontFamily: 'Mada',
            color: WHITE_COLOR,
            fontSize: 20,
            fontWeight: "400"
        },
        headerLeft: (
            <HeaderLeft iconName='arrow-back' onPress={() => navigation.goBack(null)} />
        ),
        drawerLockMode: 'locked-closed'
    }),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
};