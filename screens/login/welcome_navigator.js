import 'react-native-gesture-handler';
import { NavigationContainer,} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {Easing, Image, StyleSheet} from 'react-native';
import React from 'react';

import {WelcomeScreen} from './welcome_screen.js'
import {LoginScreen} from './login_screen.js'
import {BasicInfoScreen} from '../signup/basic_info_screen.js';
import {SetupSelectorScreen} from '../signup/setup_selector_screen.js';
import {ProfileInfoScreen} from '../signup/profile_info_screen.js';
import { ValidateEmailScreen } from '../signup/validate_email_screen.js';
import { ValidatePasswordKeyCodeScreen } from './validate_password_keycode_screen.js';
import { ForgotPasswordScreen } from './forgot_password_screen.js';
import { ResetPasswordScreen } from '../main/your_pages/settings/reset_password_screen.js';
import { ResetForgotPasswordScreen } from './forgot_password_reset_screen.js';

const Stack = createStackNavigator();

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
        <Image style={main_styles.logo} source={require("../../assets/images/LogoWhiteHeader.jpg")} resizeMode='contain'/>
    );
}

export class WelcomeNavigator extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome Screen"  
                    screenOptions={{headerMode:"float", gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center',
                    transitionSpec: {
                        open: transition_config,
                        close: transition_config,
                    }}
                    } animation="fade">

                    {/*main components*/}
                    <Stack.Screen name="Welcome Screen" component={WelcomeScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="Login Screen" component={LoginScreen} options={{headerTitle: () => <ActionBarIcon/>}}/> 
                    
                    {/*signup navigator pages*/}
                    <Stack.Screen name="Basic Info" component={BasicInfoScreen} options={{headerTitle: () => <ActionBarIcon/>}}/>
                    <Stack.Screen name="Profile Info" component={ProfileInfoScreen} options={{headerTitle: () => <ActionBarIcon/>}}/>
                    <Stack.Screen name="Validate Email Screen" component={ValidateEmailScreen} options={{headerTitle: () => <ActionBarIcon/>}}/>
                    <Stack.Screen name="Setup Selector" component={SetupSelectorScreen} options={{headerTitle: () => <ActionBarIcon/>}}/>

                    <Stack.Screen name="Forgot Password Screen" component={ForgotPasswordScreen} options={{headerTitle: () => <ActionBarIcon/>}}/>
                    <Stack.Screen name="Validate Password Keycode Screen" component={ValidatePasswordKeyCodeScreen} options={{headerTitle: () => <ActionBarIcon/>}}/>
                    <Stack.Screen name="Reset Forgot Password Screen" component={ResetForgotPasswordScreen} options={{headerTitle: () => <ActionBarIcon/>}}/>
                </Stack.Navigator>
            </NavigationContainer>
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