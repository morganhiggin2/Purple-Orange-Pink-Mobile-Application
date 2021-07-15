import 'react-native-gesture-handler';
import { NavigationContainer,} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import React from 'react';
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons'; 

import {ExploreNavigator} from './explore/explore_navigator.js';
import {YourPagesNavigator} from './your_pages/your_pages_navigator.js';

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

export class MainNavigator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Explore Screen" tabBarOptions={{showLabel: false}}>
                    <Stack.Screen name="Explore Navigator" component={ExploreNavigator} 
                    options={{
                        showLabel: false,
                        tabBarIcon: () => (
                            <MaterialIcons name="search" size={28} color="black" />
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

//pass useBottomTabBarHeight() into a prop for each screen so they can use it <AntDesign name="profile" size={28} color="black" />