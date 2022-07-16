import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import React from 'react';
import { MaterialIcons, AntDesign} from '@expo/vector-icons'; 

import {ExploreNavigator} from './explore/explore_navigator.js';
import {YourPagesNavigator} from './your_pages/your_pages_navigator.js';
import {YourMessagesNavigator} from './messages/messages_navigator.js';
import { StatusBar } from 'expo-status-bar';

import { GlobalValues } from '../../global/global_properties.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export class MainNavigator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Explore Navigator" screenOptions={{tabBarHideOnKeyboard: true, headerMode:"float", headerShown: false, tabBarShowLabel: false, tabBarStyle: {backgroundColor: GlobalValues.LIGHT_ORANGE_COLOR, borderColor: GlobalValues.LIGHT_ORANGE_COLOR, display: "flex"}}}>
                    <Stack.Screen name="Explore Navigator" component={ExploreNavigator} 
                    options={{
                        showLabel: false,
                        tabBarIcon: () => (
                            <MaterialIcons name="search" size={28} color="black" />
                        ),
                    }} 
                    />
                    <Stack.Screen name="Your Messages Navigator" component={YourMessagesNavigator}
                    options={{
                        showLabel: false,
                        tabBarIcon: () => (
                            <AntDesign name="message1" size={28} color="black" />
                        ),
                    }} 
                    />
                    <Stack.Screen name="Your Pages Navigator" component={YourPagesNavigator}
                    options={{
                        showLabel: false,
                        tabBarIcon: () => (
                            <AntDesign name="profile" size={28} color="black" />
                        ),
                    }} 
                    />
                </Tab.Navigator>
                <StatusBar backgroundColor={GlobalValues.HEADER_BACKGROUND_COLOR}/>
            </NavigationContainer>
        );
    }
}