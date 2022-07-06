import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, SafeAreaView, ScrollView, Dimensions, FlatList, ImageBackground, Alert, RefreshControl, TouchableOpacity} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { AntDesign, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Route} from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { render } from 'react-dom';
import { GlobalProperties, GlobalValues } from '../../../global/global_properties.js';
import { GlobalEndpoints } from '../../../global/global_endpoints.js';
import * as Location from 'expo-location';
import { LoadingScreen } from '../../misc/loading_screen.js';
import { MapScreen } from '../map/map_screen.js';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: GlobalValues.DARKER_WHITE,
            width: '100%',
            height: '100%',
        },
        search_bar: {
            paddingHorizontal: 7,
            backgroundColor: '#DFDFDF',
            borderRadius: 5,
            flexDirection: 'row',
            width: Math.trunc(Dimensions.get('window').width * 0.86),
        },
        text_input: {
            backgroundColor: '#DFDFDF', //#FECAB9
            color: 'darkgray',
            padding: 0,
            margin: 0,
            borderWidth: 0,
            fontSize: 20,
            color: 'black',
            width: Math.trunc(Dimensions.get('window').width * 0.85) - 30 - 5 - 14,
            marginLeft: 5,
        },
        top_bar: {
            flexDirection: 'column',
            backgroundColor: 'white', //#FFCDCD
            borderRadius: 5,
            padding: 8,
        },
        top_bar_area_top: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        top_bar_gap: {
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE,
            marginVertical: '2%'
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
            fontSize: 16,
            color: 'white', 
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginHorizontal: 2,
            marginVertical: 2,
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

    }
    //____>>>>>>>search bar creates attributes from even spaces, and adds them to the ones in the filter page
 

        /*var body = {
            "radius": 10.0,
            "pageSize": 20,
            "pageNumber": 1,
            "maximumAge": GlobalProperties.search_maxAge,
            "minimumAge": GlobalProperties.search_minAge,
            "attributes": ["kzli", "igyz"],
        };*/

    render() {
        return (
            <View style={main_styles.page}>
                <View style={{minHeight: '100%', flex: 1}}>
                    <View style={main_styles.top_bar}>
                        <View style={main_styles.top_bar_area_top}>
                            <View style={main_styles.search_bar}>
                                <Feather name="search" size={30} color="gray" style={{alignSelf: 'center'}}/>
                                <TextInput style={main_styles.text_input} placeholder={"swimming, biking, poker..."} placeholderTextColor="gray" editable={true} maxLength={160} ref={(input) => {this.state.attributes_input_handler = input}} onEndEditing={(event) => {this.addFilter(event.nativeEvent.text)}}/>
                            </View>
                            <TouchableHighlight underlayColor="white" onPress={() => {this.props.navigation.navigate("Explore Filters Screen");}}>
                                <Feather name="list" size={36} color="gray" />
                            </TouchableHighlight>
                        </View>
                        <View style={main_styles.top_bar_gap}/>
                        <View style={main_styles.top_bar_area_top}>
                            <ScrollView 
                                style={{minHeight: 30}}
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
                    <ExploreStack.Navigator initialRouteName="List Screen" screenOptions={{swipeEnabled: true, tabBarStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR}, tabBarIndicatorStyle: {backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR, height: 20}}}>
                        
                        <ExploreStack.Screen component={MapScreen} name="Map Screen"/>

                    </ExploreStack.Navigator>
                </View> 
            </View>
        );
    }

    //

/**
                                 
                        <TouchableHighlight style={post_styles.post_button} underlayColor="white" onPress={() => {this.props.navigation.navigate("Activity Creation Screen")}} onHideUnderlay={() => {}} onShowUnderlay={() => {}}>         
                                <Text style={post_styles.post_button_text}>
                                    Create
                                </Text>
                        </TouchableHighlight>      */

//                                <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" editable={true} maxLength={160} ref={(input) => {this.state.attributes_input_handler = input}} onEndEditing={(event) => {this.addFilter(event.nativeEvent.text)}}/>


    /**
     * 
                            <View style={main_styles.search_bar}>
                                <Feather name="search" size={30} color="gray" style={{alignSelf: 'center'}}/>
                                <TextInput style={main_styles.text_input} placeholderTextColor="black"/>
                            </View>

                            
                            <TouchableHighlight underlayColor="white" onPress={() => {this.props.navigation.navigate("Activity Creation Screen")}} onHideUnderlay={() => {}} onShowUnderlay={() => {}}>
                                <View style={post_styles.post_button}>
                                    <Text style={post_styles.post_button_text}>
                                        Create
                                    </Text>
                                </View>
                            </TouchableHighlight>
     */

    // contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", flexGrow: 1}} 

    //for the filters
    addFilter(input) {
        GlobalProperties.search_filters_updated = true;
        GlobalProperties.map_filters_updated = true;

        this.addAttribute(input);
        //clear the text input
        this.state.attributes_input_handler.clear();
        //update the screen
        this.lazyUpdate();
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

//<Feather name="search" size={30} color="gray" style={{alignSelf: 'center'}}/>
//<View style={{ borderBottomColor: '#CCCCCC', borderBottomWidth: 2, width: '97%', alignSelf: 'center'}}/> 
//#FFC2B5 was border color for underline

//fix it not going into the slot

/*
<ScrollView contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", flexGrow: 1}}>  
                                {frames.map((component) => (component))}
                            </ScrollView>
*/

//use flatlist to not reder all components at once? or just keep adding to it when reaching bottom, though this can create performance issues. {frames.map((component) => (component))}



//find the real height of UseBottomTabBarHeight or set the height yourself