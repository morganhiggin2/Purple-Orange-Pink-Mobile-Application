import 'react-native-gesture-handler';
import { NavigationContainer,} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import React from 'react';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 

import {ExploreNavigator} from './explore/explore_navigator.js';
import {YourPagesNavigator} from './your_pages/your_pages_navigator.js';
import { YourMessagesScreen } from './messages/your_messages_screen.js';
import {YourMessagesNavigator} from './messages/messages_navigator.js';
import { MapNavigator } from './map/map_navigator.js';
import { PortalNavigator } from './portal/portal_navigator.js';

import {useNavigation} from '@react-navigation/native';
import { GlobalValues } from '../../global/global_properties.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const main_styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        flexDirection: 'row-reverse',
    }
});

// swipeEnabled={true}?
//tabBarOptions={{showLabel: false, tabStyle: {backgroundColor: GlobalValues.LIGHT_ORANGE_COLOR, borderColor: GlobalValues.LIGHT_ORANGE_COLOR}}}
//                <Tab.Navigator initialRouteName="Explore Screen" screenOptions={{tabBarLabelStyle: false, tabBarStyle: {backgroundColor: GlobalValues.LIGHT_ORANGE_COLOR, borderColor: GlobalValues.LIGHT_ORANGE_COLOR}, tabBarStyle: {display: "flex"}}}>


export class MainNavigator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Explore Screen" screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarStyle: {backgroundColor: GlobalValues.LIGHT_ORANGE_COLOR, borderColor: GlobalValues.LIGHT_ORANGE_COLOR, display: "flex"}}}>
                    <Stack.Screen name="Explore Navigator" component={ExploreNavigator} 
                    options={{
                        showLabel: false,
                        tabBarIcon: () => (
                            <MaterialIcons name="search" size={28} color="black" />
                        ),
                    }} 
                    />
                    <Stack.Screen name="Map Navigator" component={MapNavigator} 
                    options={{
                        showLabel: false,
                        tabBarIcon: () => (
                            <Ionicons name="earth" size={28} color="black" />
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
            </NavigationContainer>
        );
    }
}

/**
 * 
                    <Stack.Screen name="Portal Navigator" component={PortalNavigator}
                    options={{
                        showLabel: false,
                        tabBarIcon: () => (
                            <MaterialCommunityIcons name="google-circles-extended" size={28} color="black" />
                        ),
                    }} 
                    />
 */

/*
                    <Stack.Screen name="Map Navigator" component={MapNavigator} 
                    options={{
                        showLabel: false,
                        tabBarIcon: () => (
                            <Ionicons name="earth" size={28} color="black" />
                        ),
                    }} 
                    /> */

//pass useBottomTabBarHeight() into a prop for each screen so they can use it <AntDesign name="profile" size={28} color="black" />