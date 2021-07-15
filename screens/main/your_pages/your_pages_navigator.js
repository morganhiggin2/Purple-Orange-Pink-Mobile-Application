import 'react-native-gesture-handler';
import { NavigationContainer, StackActions,} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Easing, Image, StyleSheet, Text} from 'react-native';
import React from 'react';

import {FeedScreen} from './feed_screen.js';
import {YourProfileScreen} from './your_profile_screen.js';
import {ManageScreen} from './manage_screen.js';
import { PostOptionsScreen } from './post_options_screen.js';
import { YourFeedFiltersScreen } from './your_feed_filters_screen.js';
import { ActivityCreationScreen } from './creationScreens/activity_creation_screen.js';
import { ImageCreationScreen } from './creationScreens/image_creation_screen.js';
import { BlurbCreationScreen } from './creationScreens/blurb_creation_screen.js';

const Stack = createStackNavigator();
const FeedStack = createMaterialTopTabNavigator()

const main_styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        flexDirection: 'row-reverse',
    }
});

const ActionBarIcon = (props) => {
    return(
        <Image style={main_styles.logo} source={require("../../../images/fakelogo.jpg")} resizeMode='contain'/>
    );
}

const HeaderTitle = (props) => {
    return(
        <Text style={{fontSize: 24, color: 'black'}}>
            {props.title}
        </Text>
    );
}

class FeedNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <FeedStack.Navigator initialRouteName="Your Feed" swipeEnabled={true} tabBarOptions={{style: {backgroundColor: '#FFEBE7'}, indicatorStyle: {backgroundColor: '#FFEBE7'}}} >
            <FeedStack.Screen component={FeedScreen} name="Your Feed" initialParams={{poop: 5}}/>
            <FeedStack.Screen component={YourProfileScreen} name="Your Profile" />
            <FeedStack.Screen component={ManageScreen} name="Manage"/>
        </FeedStack.Navigator>
        );

        //change the background color for the selected one, not just the text going gray
        /*
            <FeedStack.Screen component={YourFeedScreen} name="Your Feed" />
            <FeedStack.Screen component={YourProfileScreen} name="Your Profile" />
            <FeedStack.Screen component={ManageScreen} name="Manage" />*/
    }
}

// options={{headerTitle: () => <HeaderTitle: () => <HeaderTitle title="Post"/>, headerStyle: {backgroundColor: '#FFEBE7'}, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
//headerTitle: () => <HeaderTitle title="Post"/>, headerStyle: {backgroundColor: '#FFEBE7'},
//                <Stack.Screen name="Your Feed Filters Screen" component={YourFeedFiltersScreen} options={{headerTitle: () => <HeaderTitle title="Post"/>, headerStyle: {backgroundColor: '#FFEBE7'}, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>


export class YourPagesNavigator extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Stack.Navigator screenOptions={{headerShown: false,}}>
                <Stack.Screen component={FeedNavigator} name="Your Feed"/>                
                <Stack.Screen name="Post Options Screen" component={PostOptionsScreen} options={{ gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: false,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Your Feed Filters Screen" component={YourFeedFiltersScreen} options={{headerTitle: () => <HeaderTitle title="Filters"/>, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Activity Creation Screen" component={ActivityCreationScreen} options={{headerTitle: () => <HeaderTitle title="Create Activity"/>, headerStyle: {backgroundColor: '#FFEBE7'}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Image Creation Screen" component={ImageCreationScreen} options={{headerTitle: () => <HeaderTitle title="Create Activity"/>, headerStyle: {backgroundColor: '#FFEBE7'}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Blurb Creation Screen" component={BlurbCreationScreen} options={{headerTitle: () => <HeaderTitle title="Create Activity"/>, headerStyle: {backgroundColor: '#FFEBE7'}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
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

/*
will need to pass in initialParams for feed screen
then can access them at this.props.route.params.[param_name]
*/

/*

            <Stack.Navigator initialRouteName="Your Pages Screen"  
                screenOptions={{gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: false, 
                transitionSpec: {
                    open: transition_config,
                    close: transition_config,
                }}
                } headerMode="float" animation="fade">

                <Stack.Screen name="Your Pages Screen" component={YourPagesScreen}/>

            </Stack.Navigator>
*/