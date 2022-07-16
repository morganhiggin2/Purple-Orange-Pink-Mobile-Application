import 'react-native-gesture-handler';
import { createStackNavigator} from '@react-navigation/stack';
import {Easing, View, StatusBar} from 'react-native';
import React from 'react';

import { MainSettingsScreen } from './main_settings_screen';

const Stack = createStackNavigator();

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

const transition_config = {
    animation: 'timing',
    config: {
        duration: 300,
        easing: Easing.linear
    }
}