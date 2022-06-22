import 'react-native-gesture-handler';
import { GlobalValues } from '../../../global/global_properties.js';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {Easing, Image, StyleSheet, Text} from 'react-native';
import React from 'react';

import {ExploreScreen} from './explore_screen.js';
import {OtherProfileScreen} from './other_profile_screen.js'
import {ExploreFiltersScreen} from './explore_filters_screen.js'
import { InviteToScreen } from './invite_to_screen.js';
import { OtherActivityScreen } from './other_activity_screen.js';
import { ViewAdminsScreen } from '../your_pages/manageScreens/view_admins_screen.js';
import { ViewParticipantsScreen } from '../your_pages/manageScreens/view_participants_screen.js';

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

export class ExploreNavigator extends React.Component {

    constructor(props) {
        super(props);
    }

//gestureEnabled: true, gestureDirection: 'horizontal',

    render() {
        return (
            <MainStack.Navigator initialRouteName="Explore Drawer"
                screenOptions={{headerMode:"float", cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}} animation="fade">

                <MainStack.Screen name="Explore Screen" component={ExploreScreen} options={{headerTitle: () => <ActionBarIcon />, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}} initialParams={{bottomTabBarHeight: 50}}/>
                <MainStack.Screen name="Explore Filters Screen" component={ExploreFiltersScreen} options={{headerTitle: () => <HeaderTitle title="Filters"/>, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}} />
                <MainStack.Screen name="Other Profile Screen" component={OtherProfileScreen} options={{ headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}} />
                <MainStack.Screen name="Other Activity Screen" component={OtherActivityScreen} options={{ headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}} />

                <MainStack.Screen name="View Admins Screen" component={ViewAdminsScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"View Admins"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <MainStack.Screen name="View Participants Screen" component={ViewParticipantsScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"View Participants"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <MainStack.Screen name="Invite To Screen" component={InviteToScreen} options={{ headerTitle: () => <HeaderTitle title="Invite To"/>, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}} />
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
