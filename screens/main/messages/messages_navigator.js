import 'react-native-gesture-handler';
import { GlobalValues } from '../../../global/global_properties.js';

import { NavigationContainer, StackActions, TabRouter,} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {Easing, Image, StyleSheet, Text} from 'react-native';
import React from 'react';

import { YourMessagesScreen } from './your_messages_screen.js';
import { ConversationScreen } from './conversation_screen.js';
import { InviteScreen } from './invite_screen.js';
import { AnnouncementScreen } from './announcement_screen.js';
import { MessagesFiltersScreen } from './messages_filters_screen.js';

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

//, headerTitle: <HeaderTitle title={route.params.name}/>

//tabBarOptions={{showLabel: false}}
export class YourMessagesNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <Stack.Navigator initialRouteName="Your Messages Screen" screenOptions={{headerMode:"float", gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}} animation="fade" >
            <Stack.Screen component={YourMessagesScreen} name="Your Messages Screen" options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Messages"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}}/>
            <Stack.Screen component={ConversationScreen} name="Conversation Screen" options={({route}) => ({headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}})}/>
            <Stack.Screen component={InviteScreen} name="Invite Screen" options={({route}) => ({headerBackTitle: "back", headerTitle: <HeaderTitle title={route.params.name}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}})}/>
            <Stack.Screen component={AnnouncementScreen} name="Announcement Screen" options={({route}) => ({headerBackTitle: "back", headerTitle: <HeaderTitle title={"Invitation"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}})}/>
            <Stack.Screen component={MessagesFiltersScreen} name="Messages Filters Screen" options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Filters"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}} />
        </Stack.Navigator>
        );

        //change the background color for the selected one, not just the text going gray
        /*
            <FeedStack.Screen component={YourFeedScreen} name="Your Feed" />
            <FeedStack.Screen component={YourProfileScreen} name="Your Profile" />
            <FeedStack.Screen component={ManageScreen} name="Manage" />*/
    }
}

// options={{headerTitle: () => <HeaderTitle: () => <HeaderTitle title="Post"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
//headerTitle: () => <HeaderTitle title="Post"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR},
//                <Stack.Screen name="Your Feed Filters Screen" component={YourFeedFiltersScreen} options={{headerTitle: () => <HeaderTitle title="Post"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

const transition_config = {
    animation: 'timing',
    config: {
        duration: 300,
        easing: Easing.linear
    }
}