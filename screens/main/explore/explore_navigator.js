import 'react-native-gesture-handler';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {Easing, Image, StyleSheet, Text, StatusBar, View, Dimensions, TextInput, TouchableHighlight, ScrollView, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AntDesign, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { GlobalProperties, GlobalValues } from '../../../global/global_properties.js';
import React from 'react';

import {ExploreScreen} from './explore_screen.js';
import {OtherProfileScreen} from './other_profile_screen.js'
import {ExploreFiltersScreen} from './explore_filters_screen.js'
import { InviteToScreen } from './invite_to_screen.js';
import { OtherActivityScreen } from './other_activity_screen.js';
import { ViewAdminsScreen } from '../your_pages/manageScreens/view_admins_screen.js';
import { ViewParticipantsScreen } from '../your_pages/manageScreens/view_participants_screen.js';
import { ActivityCreationScreen } from '../your_pages/creationScreens/activity_creation_screen.js';
import { ViewMapScreen } from '../your_pages/view_map_screen.js';
import {ListNavigator} from '../explore/explore_screen';
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
            backgroundColor: '#DFDFDF',
            borderRadius: 5,
            flexDirection: 'row',
            paddingVertical: 0,
            width: Math.trunc(Dimensions.get('window').width * 0.89),
        },
        text_input: {
            backgroundColor: '#DFDFDF', //#FECAB9
            color: 'darkgray',
            fontSize: 14,
            color: 'black',
            width: Math.trunc(Dimensions.get('window').width * 0.85) - 30 - 5 - 14,
            marginLeft: 5,
        },
        top_bar: {
            flexDirection: 'column',
            backgroundColor: 'white', //#FFCDCD
            borderRadius: 5,
            marginHorizontal: 6,
            marginTop: 8,
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
            borderRadius: 5,
            borderWidth: 1,
            paddingHorizontal: 3,
            paddingVertical: 1,
            fontSize: 14,
            color: 'white', 
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginHorizontal: 2,
            marginVertical: 1,
            flexDirection: 'row',
        },
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
        }
    }
);

const ActionBarIcon = (props) => {
    return(
        <Image style={main_styles.logo} source={require("../../../images/fakelogo.png")} resizeMode='contain'/>
    );
}

const HeaderTitle = (props) => {
    return(
        <Text style={{fontSize: 24, color: 'black', height: 0}}>
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

        //add navigation events
        
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

    /**
                        <TouchableHighlight underlayColor="black" onPress={() => {this.props.navigation.navigate("Explore Filters Screen");}}>
                            <Feather name="search" size={20} color="gray"/>
                        </TouchableHighlight> */

    render() {
        return (
            <SafeAreaView style={{height: '100%', backgroundColor: 'white'}}>
                <View style={main_styles.top_bar}>
                    <View style={main_styles.top_bar_area_top}>
                        <View style={main_styles.search_bar}>
                            <Feather name="search" size={18} color="gray" style={{alignSelf: 'center'}}/>
                            <TextInput style={main_styles.text_input} placeholder={"swimming, biking, poker..."} placeholderTextColor="gray" editable={true} maxLength={160} ref={(input) => {this.state.attributes_input_handler = input}} onEndEditing={(event) => {this.addFilter(event.nativeEvent.text)}}/>
                        </View>
                        <TouchableHighlight style={{alignSelf: 'center'}} underlayColor="white" onPress={() => {this.props.navigation.navigate("Explore Filters Screen");}}>
                            <Feather name="list" size={26} color="gray"/>
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

    //                <ExploreStack.Navigator style={{margin: 0, padding: 0, height: 20}} screenOptions={{tabBarStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR, margin: 0, padding: 0, height: 20}, tabBarItemStyle:{margin: 0, padding: 0, height: 20}, tabBarContentContainerStyle:{margin: 0, padding: 0, height: 20}, tabBarIconStyle: {margin: 0, padding: 0, height: 20}, tabBarLabelStyle:{margin: 0, padding: 0, height: 20}, tabBarIndicatorContainerStyle:{margin: 0, padding: 0, height: 20}, tabBarIndicatorStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}} initialRouteName="Explore Screen" >

    //screenOptions={{swipeEnabled: false, tabBarStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, tabBarIndicatorStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}}

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
            <TouchableOpacity activeOpacity={1} onPress={() => {deleteAlertAttributes(this.props.parent, this.props.innerText, this.props.id)}}>
                <Text style={[filter_snaps_styles.inner_text, { backgroundColor: this.props.color, borderColor: this.props.color}]}>
                    {this.props.innerText}
                </Text>
            </TouchableOpacity>
        );
    }
}

FilterSnap.defaultProps = {
    color: GlobalValues.ORANGE_COLOR,
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

//initialParams={{bottomTabBarHeight: 50}}

export class ExploreNavigator extends React.Component {

    constructor(props) {
        super(props);
    }

//gestureEnabled: true, gestureDirection: 'horizontal',
                //screenOptions={{headerMode:"float", cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: true, headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}} animation="fade">

    render() {
        return (
            <MainStack.Navigator initialRouteName="Explore Drawer">
                <MainStack.Screen name="List Screen" component={ListScreen} options={{headerTitle: () => <EmptyTitle/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR, height: StatusBar.currentHeight}, headerShown: true, headerTitleAlign:'center'}}/> 
                <MainStack.Screen name="Explore Filters Screen" component={ExploreFiltersScreen} options={{headerTitle: () => <HeaderTitle title="Filters"/>, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}} />
                <MainStack.Screen name="Other Profile Screen" component={OtherProfileScreen} options={{ headerTitle: () => <EmptyTitle />, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, headerShown: true}} />
                <MainStack.Screen name="Other Activity Screen" component={OtherActivityScreen} options={{ headerTitle: () => <EmptyTitle />, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, headerShown: true}} />

                <MainStack.Screen name="View Admins Screen" component={ViewAdminsScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"View Admins"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <MainStack.Screen name="View Participants Screen" component={ViewParticipantsScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"View Participants"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <MainStack.Screen name="Invite To Screen" component={InviteToScreen} options={{ headerTitle: () => <HeaderTitle title="Invite To"/>, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}} />
                <MainStack.Screen name="Activity Creation Screen" component={ActivityCreationScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Create Activity"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <MainStack.Screen name="View Map Screen" component={ViewMapScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Create Activity"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

            </MainStack.Navigator>
        );
    }

    /**render() {
        return (
            <MainStack.Navigator initialRouteName="Explore Drawer"
                screenOptions={{headerMode:"float", cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}} animation="fade">

                <MainStack.Screen name="Explore Screen" component={ListNavigator} options={{headerTitle: () => <HeaderTitle title="Explore"/>, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}} initialParams={{bottomTabBarHeight: 50}}/>
                <MainStack.Screen name="Explore Filters Screen" component={ExploreFiltersScreen} options={{headerTitle: () => <HeaderTitle title="Filters"/>, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'vertical', cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}} />
                <MainStack.Screen name="Other Profile Screen" component={OtherProfileScreen} options={{ headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}} />
                <MainStack.Screen name="Other Activity Screen" component={OtherActivityScreen} options={{ headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}} />

                <MainStack.Screen name="View Admins Screen" component={ViewAdminsScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"View Admins"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <MainStack.Screen name="View Participants Screen" component={ViewParticipantsScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title={"View Participants"}/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

                <MainStack.Screen name="Invite To Screen" component={InviteToScreen} options={{ headerTitle: () => <HeaderTitle title="Invite To"/>, headerBackTitle: "back", headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}}} />
                <MainStack.Screen name="Activity Creation Screen" component={ActivityCreationScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Create Activity"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>
                <MainStack.Screen name="View Map Screen" component={ViewMapScreen} options={{headerBackTitle: "back", headerTitle: () => <HeaderTitle title="Create Activity"/>, headerStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS, headerShown: true,  headerTitleAlign:'center', transitionSpec: { open: transition_config, close: transition_config, }}}/>

            </MainStack.Navigator>
        );
    } */
}


const transition_config = {
    animation: 'timing',
    config: {
        duration: 300,
        easing: Easing.linear
    }
};
