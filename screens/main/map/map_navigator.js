import 'react-native-gesture-handler';
import { GlobalValues } from '../../../global/global_properties.js';

import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {Easing, Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import { MapScreen } from './map_screen.js';
import { MapFiltersScreen } from './map_filters_screen.js';

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
        <Image style={main_styles.logo} source={require("../../../assets/images/fakelogo.png")} resizeMode='contain'/>
    );
}

const HeaderTitle = (props) => {
    return(
        <Text style={{fontSize: 24, fontFamily: 'Roboto', color: 'black'}}>
            {props.title}
        </Text>
    );
}

export class MapNavigator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <MainStack.Navigator initialRouteName="Map Screen" screenOptions={{headerMode:"float", gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}animation="fade">
                <MainStack.Screen component={MapScreen} name="Map Screen" options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Map"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}}/>
                <MainStack.Screen name="Map Filters Screen" component={MapFiltersScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Filters"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}} />

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
