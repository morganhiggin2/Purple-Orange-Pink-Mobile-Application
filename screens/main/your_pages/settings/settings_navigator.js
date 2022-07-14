import 'react-native-gesture-handler';
import { NavigationContainer, StackActions,} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Easing, Image, StyleSheet, Text, View, StatusBar} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import React from 'react';
import { GlobalValues } from '../../../../global/global_properties';

import { MainSettingsScreen } from './main_settings_screen';

const Stack = createStackNavigator();

const HeaderTitle = (props) => {
    return(
        <Text style={{fontSize: 24, fontFamily: 'Roboto', color: 'black'}}>
            {props.title}
        </Text>
    );
}


export class SettingsNavigator extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Stack.Navigator screenOptions={{headerTitle: (<View style={{height: 0}}></View>), headerStatusBarHeight: StatusBar.currentHeight, headerStyle: {backgroundColor: "white", height: StatusBar.currentHeight}}} >
                <Stack.Screen component={MainSettingsScreen} name="Main Settings Screen" options={{headerBackTitle: "back", headerStyle: {height: 0}}}/>      
                
            </Stack.Navigator>
        );
    }
}

//                <Stack.Screen name="Account Info Screen" component={AccountInfoScreen} options={{headerShown: false, transitionSpec: { open: transition_config, close: transition_config, }}}/>      

const transition_config = {
    animation: 'timing',
    config: {
        duration: 300,
        easing: Easing.linear
    }
}