import 'react-native-gesture-handler';
import { GlobalValues } from '../../../global/global_properties.js';
import { NavigationContainer, StackActions,} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Easing, Image, StyleSheet, Text, View, StatusBar} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import React from 'react';

import {YourProfileScreen} from './your_profile_screen.js';
import {ManageScreen} from './manage_screen.js';
import { ActivityCreationScreen } from './creationScreens/activity_creation_screen.js';
import { ManageActivityScreen } from './manageScreens/manage_activity_screen.js';
import { SettingsNavigator } from './settings/settings_navigator.js';
import { EditImagesScreen } from './edit_images_screen.js';
import { SearchMapScreen } from './creationScreens/search_map_screen.js';
import { EditActivityImagesScreen } from './manageScreens/edit_activity_images.js';
import { ViewAdminsScreen } from './manageScreens/view_admins_screen.js';
import { ViewParticipantsScreen } from './manageScreens/view_participants_screen.js';
import { EditActivityScreen } from './edit screens/edit_activity_screen.js';
import { ResetPasswordScreen } from './settings/reset_password_screen.js';
import { ResetEmailScreen } from './settings/reset_email_screen.js';
import { PrivacyScreen } from './settings/privacy_screen.js';
import { ValidateResetEmailScreen } from './settings/validate_email_screen.js';
import { ContactSupportScreen } from './settings/contact_support.js';
import { AboutScreen } from './settings/about.js';
import { ViewMapScreen } from './view_map_screen.js';
import { OtherActivityScreen } from '../explore/other_activity_screen.js';
import { OtherProfileScreen } from '../explore/other_profile_screen.js';
import { MakeAnnouncementScreen } from './manageScreens/make_announcement_screen.js';

const Stack = createStackNavigator();
const FeedStack = createMaterialTopTabNavigator();

const main_styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        flexDirection: 'row-reverse',
    }
});

const EmptyTitle = (props) => {
    return(
        <View style={{height: 0}}/>
    )
}

const ActionBarIcon = (props) => {
    return(
        <Image style={main_styles.logo} source={require("../../../images/fakelogo.png")} resizeMode='contain'/>
    );
}

//<FeedStack.Screen component={FeedScreen} name="Your Feed" initialParams={{poop: 5}}/>
//screenOptions={{headerShown: true, alignSelf: 'center', headerTitleAlign:'center'}} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Map"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}} HeaderTitleStyle={{alignSelf: 'center'}} tabBarOptions={{style: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, indicatorStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}}

//tabBarOptions={{style: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, indicatorStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}}

class FeedNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <FeedStack.Navigator initialRouteName="Manage" screenOptions={{swipeEnabled: true, tabBarStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, tabBarIndicatorStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}}>
            
            <FeedStack.Screen component={ManageScreen} name="Manage"/>
            <FeedStack.Screen component={YourProfileScreen} name="Your Profile" />
            <FeedStack.Screen component={SettingsNavigator} name = "Settings"/>

        </FeedStack.Navigator>
        );
    }
}

// options={{headerTitle: () => <HeaderTitle: () => <HeaderTitle title="Post"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
//headerTitle: () => <HeaderTitle title="Post"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR},
//                <Stack.Screen name="Your Feed Filters Screen" component={YourFeedFiltersScreen} options={{headerTitle: () => <HeaderTitle title="Post"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>



const HeaderTitle = (props) => {
    return(
        <Text style={{fontSize: 24, color: 'black'}}>
            {props.title}
        </Text>
    );
}

export class YourPagesNavigator extends React.Component {

    constructor(props) {
        super(props);
    }
    
    //headerStatusBarHeight:StatusBar.currentHeight , headerStyle: {backgroundColor: "white", height: StatusBar.currentHeight}}
    //headerTitle: (<View style={{height: 0}}></View>), 
    // screenOptions={{headerStatusBarHeight:StatusBar.currentHeight, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}}
    //options={{headerStatusBarHeight:StatusBar.currentHeight, headerStyle: {backgroundColor: "white", alignSelf: 'center', headerShown: true}}}
    //headerStatusBarHeight:StatusBar.currentHeight, 

    //                <Stack.Screen name="Manage Filters Screen" component={ManageFiltersScreen} options={{headerTitle: () => <HeaderTitle title="Filters"/>, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}} />


    render() {
        return (
            <Stack.Navigator >
                <Stack.Screen name="Your Feed" component={FeedNavigator} options={{headerTitle: () => <EmptyTitle/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR, height: StatusBar.currentHeight}, headerShown: true, headerTitleAlign:'center'}}/>                
                <Stack.Screen name="Activity Creation Screen" component={ActivityCreationScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Create Activity"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <Stack.Screen name="Manage Activity Screen"  component={ManageActivityScreen} options={{headerBackTitle: "back", headerTitle: () => <EmptyTitle title={"Manage Activity"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <Stack.Screen name="Edit Activity Screen" component={EditActivityScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Edit Activity"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Make Announcement Screen" component={MakeAnnouncementScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Make Announcement"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <Stack.Screen name="Edit Images Screen" component={EditImagesScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Edit Images"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Edit Activity Images Screen" component={EditActivityImagesScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Edit Group Images"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <Stack.Screen name="Map Search Screen" component={SearchMapScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Search Map"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="View Map Screen" component={ViewMapScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="View Map"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <Stack.Screen name="View Admins Screen" component={ViewAdminsScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"View Creators"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="View Participants Screen" component={ViewParticipantsScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"View Participants"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Other Profile Screen" component={OtherProfileScreen} options={{ headerTitle: () => <EmptyTitle />, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, headerShown: true}} />
                <Stack.Screen name="Other Activity Screen" component={OtherActivityScreen} options={{ headerTitle: () => <EmptyTitle />, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, headerShown: true}} />

                <Stack.Screen name="Reset Password Screen" component={ResetPasswordScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Reset Password"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Reset Email Screen" component={ResetEmailScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Reset Email"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Privacy Screen" component={PrivacyScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Privacy"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Contact Support Screen" component={ContactSupportScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Privacy"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="About Screen" component={AboutScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Privacy"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <Stack.Screen name="Validate Reset Email Screen" component={ValidateResetEmailScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Validate Email"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

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
                screenOptions={{headerMode:"float", gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false, 
                transitionSpec: {
                    open: transition_config,
                    close: transition_config,
                }}
                } animation="fade">

                <Stack.Screen name="Your Pages Screen" component={YourPagesScreen}/>

            </Stack.Navigator>
*/