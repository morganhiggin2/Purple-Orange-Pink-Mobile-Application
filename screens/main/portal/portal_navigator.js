import 'react-native-gesture-handler';
import { GlobalValues } from '../../../global/global_properties.js';

import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {Easing, Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import { PortalScreen } from './portal_screen.js';

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
        <Image style={main_styles.logo} source={require("../../../images/fakelogo.png")} resizeMode='contain'/>
    );
}

const HeaderTitle = (props) => {
    return(
        <Text style={{fontSize: 24, color: 'black'}}>
            {props.title}
        </Text>
    );
}

export class PortalNavigator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <MainStack.Navigator initialRouteName="Portal Screen" screenOptions={{headerMode:"float", gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}} animation="fade">
                <MainStack.Screen component={PortalScreen} name="Portal Screen" options={{headerTitle: () => <HeaderTitle title="Portal"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}}/>
            </MainStack.Navigator>
        );
    }
}

//                <Stack.Screen name="Your Feed Filters Screen" component={YourFeedFiltersScreen} options={{headerTitle: () => <HeaderTitle title="Filters"/>, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>


const transition_config = {
    animation: 'timing',
    config: {
        duration: 300,
        easing: Easing.linear
    }
};
