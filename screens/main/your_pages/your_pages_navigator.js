import 'react-native-gesture-handler';
import { GlobalValues } from '../../../global/global_properties.js';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import {Easing, Text, View, StatusBar, Dimensions, Platform} from 'react-native';
import React from 'react';

import {YourProfileScreen} from './your_profile_screen.js';
import {ManageScreen} from './manage_screen.js';
import { ActivityCreationScreen } from './creationScreens/activity_creation_screen.js';
import { ManageActivityScreen } from './manageScreens/manage_activity_screen.js';
import { SettingsNavigator } from './settings/settings_navigator.js';
import { EditImagesScreen } from './edit_images_screen.js';
import { SearchMapScreen } from './creationScreens/search_map_screen.js';
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
import { OtherActivityProfileScreen } from './manageScreens/other_activity_profile_screen.js';
import { MakeAnnouncementScreen } from './manageScreens/make_announcement_screen.js';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const FeedStack = createMaterialTopTabNavigator();

const EmptyTitle = (props) => {
    return(
        <View style={{height: 0}}/>
    )
}

//style={{backgroundColor:'orange', maxHeight: Dimensions.get('window').height - btbh * 2 - 50}} screenOptions={{swipeEnabled: true, tabBarStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, tabBarIndicatorStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}}

const FeedNavigator = (props) => {
    const btbh = useBottomTabBarHeight();

    return(
        <FeedStack.Navigator initialRouteName="Manage" style={{maxHeight: Dimensions.get('window').height - btbh * 2}} screenOptions={{swipeEnabled: true, tabBarStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, tabBarIndicatorStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}}>
            
            <FeedStack.Screen component={ManageScreen} name="Manage"/>
            <FeedStack.Screen component={YourProfileScreen} name="Your Profile"/>
            <FeedStack.Screen component={SettingsNavigator} name = "Settings"/>

        </FeedStack.Navigator>
        );
}

const HeaderTitle = (props) => {
    const btbh = useBottomTabBarHeight();
    return(
        <Text style={{fontSize: 24, fontFamily: 'Roboto', color: 'black'}}>
            {props.title}
        </Text>
    );
}

export class YourPagesNavigator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Stack.Navigator initialRouteName='Your Feed'>
                <Stack.Screen name="Your Feed" component={FeedNavigator} options={{headerTitle: () => <EmptyTitle/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR, height: StatusBar.currentHeight}, headerShown: true, headerTitleAlign:'center'}}/>                
                <Stack.Screen name="Activity Creation Screen" component={ActivityCreationScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Create Activity"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <Stack.Screen name="Manage Activity Screen"  component={ManageActivityScreen} options={{headerBackTitle: "back", headerTitle: () => <EmptyTitle title={"Manage Activity"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <Stack.Screen name="Edit Activity Screen" component={EditActivityScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Edit Activity"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Make Announcement Screen" component={MakeAnnouncementScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Make Announcement"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <Stack.Screen name="Edit Images Screen" component={EditImagesScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Edit Images"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <Stack.Screen name="Map Search Screen" component={SearchMapScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Search Map"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="View Map Screen" component={ViewMapScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="View Map"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <Stack.Screen name="View Admins Screen" component={ViewAdminsScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"View Creators"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="View Participants Screen" component={ViewParticipantsScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"View Participants"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Other Activity Profile Screen" component={OtherActivityProfileScreen} options={{ headerTitle: () => <EmptyTitle />, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, headerShown: true}} />
                <Stack.Screen name="Other Activity Screen" component={OtherActivityScreen} options={{ headerTitle: () => <EmptyTitle />, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, headerShown: true}} />

                <Stack.Screen name="Reset Password Screen" component={ResetPasswordScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Reset Password"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Reset Email Screen" component={ResetEmailScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Reset Email"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Privacy Screen" component={PrivacyScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Privacy"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="Contact Support Screen" component={ContactSupportScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"Feedback and Support"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <Stack.Screen name="About Screen" component={AboutScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"About"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

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