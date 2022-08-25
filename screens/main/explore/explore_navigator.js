import 'react-native-gesture-handler';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {Easing, Image, StyleSheet, Text, StatusBar, View, Dimensions, TextInput, TouchableHighlight, ScrollView, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather} from '@expo/vector-icons'; 
import { GlobalProperties, GlobalValues } from '../../../global/global_properties.js';
import React from 'react';

import {ExploreScreen} from './explore_screen.js';
import { OtherExploreProfileScreen } from './other_explore_profile_screen.js';
import {ExploreFiltersScreen} from './explore_filters_screen.js'
import { InviteToScreen } from './invite_to_screen.js';
import { OtherActivityScreen } from './other_activity_screen.js';
import { ViewAdminsScreen } from '../your_pages/manageScreens/view_admins_screen.js';
import { ViewParticipantsScreen } from '../your_pages/manageScreens/view_participants_screen.js';
import { ActivityCreationScreen } from '../your_pages/creationScreens/activity_creation_screen.js';
import { ViewMapScreen } from '../your_pages/view_map_screen.js';
import { MapScreen } from '../map/map_screen.js';

const MainStack = createStackNavigator();

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: GlobalValues.DARKER_WHITE,
            width: '100%',
            height: '100%',
        },
        logo: {
            width: 50,
            height: 50,
            alignSelf: 'center',
            flexDirection: 'row-reverse',
        },
        search_bar: {
            paddingHorizontal: 7,
            backgroundColor: GlobalValues.SEARCH_TEXT_INPUT_COLOR,
            borderRadius: 5,
            flexDirection: 'row',
            width: Math.trunc(Dimensions.get('window').width * 0.89),
        },
        text_input: {
            backgroundColor: GlobalValues.SEARCH_TEXT_INPUT_COLOR,
            color: 'darkgray',
            fontFamily: 'Roboto',
            fontSize: 16,
            color: 'black',
            width: Math.trunc(Dimensions.get('window').width * 0.85) - 30 - 5 - 14,
            marginLeft: 5,
        },
        top_bar: {
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: 5,
            paddingHorizontal: 6,
            paddingTop: 8,
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE,
        },
        top_bar_area_top: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 6
        },
        top_bar_area_bottom: {
            marginTop: 6,
            flexDirection: 'row',
            justifyContent: 'space-between',
            minHeight: 30
        },
        top_bar_gap: {
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE,
        },
        scroll_area: {
            
        }
    }
);

const filter_snaps_styles = StyleSheet.create(
    {
        inner_text: {
            fontFamily: 'Roboto',
            fontSize: 16,
            textAlign: 'center',
            color: 'white', 
            fontWeight: 'bold',
        },
        
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundColor: 'white',
        },
        box: {
            backgroundColor: GlobalValues.ORANGE_COLOR,
            borderColor: GlobalValues.ORANGE_COLOR,
            borderWidth: 2,
            borderRadius: 5,
            marginBottom: 8,
            marginRight: 6,
            padding: 3
        }
    }
);

const HeaderTitle = (props) => {
    return(
        <Text style={{fontSize: 24, fontFamily: 'Roboto', color: 'black', height: 0}}>
            {props.title}
        </Text>
    );
}

const EmptyTitle = (props) => {
    return(
        <View style={{height: 0}}/>
    )
}

const ExploreStack = createMaterialTopTabNavigator();

export class ListScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            //for the list of acttributes
            attributes_input_handler: null,
        };

        this.lazyUpdate = this.lazyUpdate.bind(this);

        GlobalProperties.messagesHandler.openRealm();        
    }

    componentDidMount() {
        //check if first startup
        GlobalProperties.get_key_value_pair("First_Startup")
        .then((value) => {
            //first startup
            if (value == null) {
                GlobalProperties.put_key_value_pair("First_Startup", "");

                //first startup
                Alert.alert("Join or create an activity to do something with someone new!"); // Make friends by going hiking, swimming, partying, anything you want to do with new people!
            }
        })
        .catch(() => {
            GlobalProperties.put_key_value_pair("First_Startup", "");

            //first startup
            Alert.alert("Join or create an activity to do something with someone new!");
        });
    }

    render() {
        return (
            <SafeAreaView style={{height: '100%', backgroundColor: GlobalValues.DARKER_WHITE}}>
                <View style={main_styles.top_bar}>
                    <View style={main_styles.top_bar_area_top}>
                        <View style={main_styles.search_bar}>
                            <Feather name="search" size={18} color="gray" style={{alignSelf: 'center'}}/>
                            <TextInput style={main_styles.text_input} placeholder={"swimming, biking, poker..."} placeholderTextColor="gray" autoCapitalize={'none'} editable={true} maxLength={160} ref={(input) => {this.state.attributes_input_handler = input}} onEndEditing={(event) => {this.addFilter(event.nativeEvent.text)}}/>
                        </View>
                        <TouchableHighlight style={{alignSelf: 'center'}} underlayColor="white" onPress={() => {this.props.navigation.navigate("Explore Filters Screen");}}>
                            <Feather name="list" size={32} color="gray"/>
                        </TouchableHighlight>
                    </View>
                    <View style={main_styles.top_bar_gap}/>
                    <View style={main_styles.top_bar_area_bottom}>
                        <ScrollView 
                            horizontal={true}
                        >
                            {GlobalProperties.search_attributes.map((attr, index) => {
                                return (
                                    <FilterSnap key={index} id={index} innerText={attr} parent={this}/>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View> 
                <ExploreStack.Navigator screenOptions={{swipeEnabled: false, tabBarStyle: {height: 40, backgroundColor: "white"}, tabBarLabelStyle: {fontSize: 14}, tabBarIndicatorStyle: {backgroundColor: "black"}}} initialRouteName="Explore Screen" >
                    <ExploreStack.Screen component={ExploreScreen} name="Explore Screen" options={{tabBarLabel: "List"}}/>
                    <ExploreStack.Screen component={MapScreen} name="Map Screen" options={{tabBarLabel: "Map"}}/>
                </ExploreStack.Navigator>
            </SafeAreaView>
        );
    }

    //for the filters
    addFilter(input) {
        GlobalProperties.search_filters_updated = true;
        GlobalProperties.map_filters_updated = true;

        this.addAttribute(input);
        //clear the text input
        this.state.attributes_input_handler.clear();

        this.lazyUpdate();
    
        //update current explore screen
        GlobalProperties.currentExploreScreenSearchUpdate();
    }

    addAttribute(attribute) {
        //check if it already exists
        if (!GlobalProperties.search_attributes.includes(attribute)) {
            //if not, add it
            GlobalProperties.search_attributes.push(attribute);
        }
    }

    removeAttribute(attribute) {
        var newAttributes = []

        for (const attr of GlobalProperties.search_attributes) {
            if (attr != attribute) {
                newAttributes.push(attr);
            }
        }

        GlobalProperties.search_attributes = newAttributes;

        this.lazyUpdate();
    
        //update current explore screen
        GlobalProperties.currentExploreScreenSearchUpdate();
    }

    //after delete alert, delete attribute and update screen
    afterDeleteAlertAttributes(attr) {
        GlobalProperties.search_filters_updated = true;
        GlobalProperties.map_filters_updated = true;

        this.removeAttribute(attr);
        this.lazyUpdate();
    }

    lazyUpdate() {
        this.forceUpdate();
    }
}

class FilterSnap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( 
            <TouchableOpacity style={filter_snaps_styles.box} activeOpacity={1} onPress={() => {deleteAlertAttributes(this.props.parent, this.props.innerText)}}>
                <Text style={filter_snaps_styles.inner_text}>
                    {this.props.innerText}
                </Text>
            </TouchableOpacity>
        );
    }
}

const deleteAlertAttributes = (frameComponent, attr) => {
    Alert.alert(
        "Delete",
        "Are you sure you want to delete this attribute?",
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "Delete",
                onPress: () => frameComponent.afterDeleteAlertAttributes(attr),
            }
        ],
        {
            cancelable: true,
        }
    );
}

export class ExploreNavigator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainStack.Navigator initialRouteName="Explore Drawer">
                <MainStack.Screen name="List Screen" component={ListScreen} options={{headerTitle: () => <EmptyTitle/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR, height: StatusBar.currentHeight}, headerShown: true, headerTitleAlign:'center'}}/> 
                <MainStack.Screen name="Explore Filters Screen" component={ExploreFiltersScreen} options={{headerTitle: () => <HeaderTitle title="Filters"/>, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}} />
                <MainStack.Screen name="Other Explore Profile Screen" component={OtherExploreProfileScreen} options={{ headerTitle: () => <EmptyTitle />, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, headerShown: true}} />
                <MainStack.Screen name="Other Activity Screen" component={OtherActivityScreen} options={{ headerTitle: () => <EmptyTitle />, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, headerShown: true}} />

                <MainStack.Screen name="View Admins Screen" component={ViewAdminsScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"View Creators"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <MainStack.Screen name="View Participants Screen" component={ViewParticipantsScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"View Participants"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <MainStack.Screen name="Invite To Screen" component={InviteToScreen} options={{ headerTitle: () => <HeaderTitle title="Invite To"/>, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}} />
                <MainStack.Screen name="Activity Creation Screen" component={ActivityCreationScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Create Activity"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <MainStack.Screen name="View Map Screen" component={ViewMapScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Create Activity"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

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
