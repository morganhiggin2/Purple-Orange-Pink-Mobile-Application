import 'react-native-gesture-handler';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {Easing, Image, StyleSheet, Text} from 'react-native';
import React from 'react';

import {ExploreScreen} from './explore_screen.js';
import {OtherProfileScreen} from './other_profile_screen.js'
import {ExploreFiltersScreen} from './explore_filters_screen.js'

const MainStack = createStackNavigator();
//const RootStack = createStackNavigator();

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

/*
<MainStack.Screen name="Map Screen" component={MapScreen} options={{headerTitle: () => <ActionBarIcon />, headerStyle: {backgroundColor: '#FFEBE7'}}} initialParams={{bottomTabBarHeight: 50}}/>
                <MainStack.Screen name="Map Filters Screen" component={MapFiltersScreen} options={{headerTitle: () => <HeaderTitle title="Filters"/>, headerStyle: {backgroundColor: '#FFEBE7'}, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}} />
                <MainStack.Screen name="Social Circle Screen" component={SocialCircleScreen} options={{headerTitle: () => <ActionBarIcon />, headerStyle: {backgroundColor: '#FFEBE7'}}} />
*/

export class ExploreNavigator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <MainStack.Navigator initialRouteName="Map Drawer"
                screenOptions={{gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}} headerMode="float" animation="fade">

                
            </MainStack.Navigator>
        );
    }
}


const transition_config = {
    animation: 'timing',
    config: {
        duration: 300,
        easing: Easing.linear
    }
};
