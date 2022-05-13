import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, SafeAreaView, ScrollView, Dimensions, FlatList, ImageBackground, TouchableWithoutFeedbackBase, Alert} from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'; 
import {Route} from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { render } from 'react-dom';
import {GlobalProperties, GlobalValues} from '../../../global/global_properties.js';
import { GlobalEndpoints } from '../../../global/global_endpoints.js';
//import {MapView} from 'react-native-maps';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { makeDirectoryAsync, readDirectoryAsync } from 'expo-file-system';
import * as Location from 'expo-location';
import { LoadingScreen } from '../../misc/loading_screen.js';

//button to reset to my location

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
        },
        search_bar: {
            paddingHorizontal: 7,
            backgroundColor: GlobalValues.DARKER_OUTLINE,
            borderRadius: 5,
            flexDirection: 'row',
            width: Math.trunc(Dimensions.get('window').width * 0.85),
        },
        text_input: {
            backgroundColor: GlobalValues.DARKER_OUTLINE, //#FECAB9
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
            flexDirection: 'row',
            padding: "3%",
            backgroundColor: 'white',
        },
        scroll_area: {
            
        },
        map_button: {
            zIndex: 10,
            position: 'absolute',
            bottom: 40,
            borderRadius: 3,
            borderWidth: 4,
            backgroundColor: GlobalValues.ORANGE_COLOR,
            borderColor: GlobalValues.ORANGE_COLOR,
            padding: 3,
            paddingVertical: 3,
            alignSelf: 'center',
        },
        map_button_text: {
            color: 'white',
            fontSize: 18,
            alignSelf: 'center',
        },
    }
);

const map_styles = StyleSheet.create(
    {
        body: {
            width: '100%',
            height: '100%',
        },
    }
);

/*
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height, */

const EmptySpace = (props) => {
    const btbh = useBottomTabBarHeight();

    return(
        <View style={{height: 100, width: '100%'}}>
        </View>
    )
}

export class MapScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            global_props: null,

            //for loading screen
            loading: true,
            reload: false,

            //for map
            markers: [],
            initialized: false,

            //for button
            grayout_button: false
        };

        this.renderMarkers = this.renderMarkers.bind(this);

        this.onRegionChange = this.onRegionChange.bind(this);
        this.isOutsideBoundary = this.isOutsideBoundary.bind(this);
        
        this.updateGroups = this.updateGroups.bind(this);
        this.updateSearch = this.updateSearch.bind(this);

        this.validateAttributes = this.validateAttributes.bind(this);
        this.searchRegion = this.searchRegion.bind(this);

        this.lazyUpdate = this.lazyUpdate.bind(this);

        //must do calculations before rendering
        this.state.boundary = null;
        this.state.region = null;
        this.state.initialRegion = {
            latitude: GlobalProperties.map_latitude,
            longitude: GlobalProperties.map_longitude,
            latitudeDelta: GlobalProperties.map_latitude_delta,
            longitudeDelta: GlobalProperties.map_longitude_delta,
        };
    }
    
    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.state.global_props = GlobalProperties.screen_props;
            GlobalProperties.screenActivated();

            if (GlobalProperties.map_filters_updated) {
                //update map coordinates, as the map has not moved yet, so it won't have been calculated yet
                this.onRegionChangeComplete(this.state.initialRegion);
                this.updateSearch();
                GlobalProperties.map_filters_updated = false;
            }
        });

        this.updateSearch();
    }

    async updateSearch() {
        //gray out button while loading results
        this.state.grayout_button = true;
        this.lazyUpdate();

        let search_radius = GlobalProperties.map_search_radius;

        //make sure the attriutes are good
        /*if (!this.validateAttributes()) {
            return;
        }*/

        var location = null;

        //fetch user's location if not using map settings
        if (!this.state.initialized) {

            var locationResult = await GlobalEndpoints.getLocation();

            if (!locationResult.granted) {
                Alert.alert("Permission to access location was denied.\nUsing map settings.");

                //use map settings
                GlobalProperties.use_map_settings = true;
            }
            else if (locationResult.location == null) {
                Alert.alert("Location could not be determined.\nUsing map settings.");

                //use map settings
                GlobalProperties.use_map_settings = true;
            }
            else {
                location = {
                    latitude: locationResult.location.coords.latitude,
                    longitude: locationResult.location.coords.longitude,
                };

                //set initial region
                this.state.initialRegion = {
                    latitude: locationResult.location.coords.latitude,
                    longitude: locationResult.location.coords.longitude,
                    latitudeDelta: GlobalProperties.map_latitude_delta,
                    longitudeDelta: GlobalProperties.map_longitude_delta,
                };
            }

            this.state.initialized = true;
        }
        else {
            if (this.state.region != null) {
                location = {
                    latitude: this.state.region.latitude,
                    longitude: this.state.region.longitude,
                }
            }
            else {
                location = {
                    latitude: this.state.initialRegion.latitude,
                    longitude: this.state.initialRegion.longitude,
                }
            }
        }

        if (location == null) {
            location = {
                latitude: GlobalProperties.map_latitude,
                longitude: GlobalProperties.map_longitude,
            };
        }
        else {
            location = {
                latitude: location.latitude,
                longitude: location.longitude,
            };
        }

        //update search
        /*var body = {
            "radius": search_radius,
            "page_size": 1,
            "page_number": 1,
            "minimumAge": GlobalProperties.search_minAge,
            "maxiumumAge": GlobalProperties.search_maxAge,
            "attributes": GlobalProperties.search_attributes,
        };*/

        var body = {};
        var requestUrl = "";

        if (GlobalProperties.search_type == "people") {
            body = {
                "radius": search_radius,
                "page_size": 20,
                "page_number": 1,
                "minimum_age": GlobalProperties.search_minAge,
                "maximum_age": GlobalProperties.search_maxAge,
                "location": {
                    "latitude": location.latitude,
                    "longitude": location.latitude,
                }
            };

            requestUrl = "/api/User/Friends/SearchUsersMap";
        }
        else if (GlobalProperties.search_type == "activities") {
            body = {
                "radius": search_radius,
                "page_size": 20,
                "page_number": 1,
                "location": {
                    "latitude": location.latitude,
                    "longitude": location.longitude,
                }
            };

            if (GlobalProperties.search_gender != "") {
                body["gender"] = GlobalProperties.search_gender;
            }    

            requestUrl = "/api/User/Friends/SearchActivitiesMap";
        }

        if (GlobalProperties.search_attributes.length != null) {
            body["attributes"] = GlobalProperties.search_attributes;
        }

        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makePostRequest(true, requestUrl, body)
            .then((result) => {
                if (result == undefined) {
                    successful = false;
                }
                else {
                    successful = true;
                }
                return(result);
            })
            .catch((error) => {
                successful = false;
                return(error);
            });

        //if there is no error message, request was good
        if (successful) {

            //if result status is ok
            if (result.request.status ==  200) {
                this.state.loading = false;

                if (GlobalProperties.search_type == "people") {
                    //get request body
                    var groups = JSON.parse(result.request.response).groups;
    
                    //update users
                    this.updateGroups(groups);
                }
                else if (GlobalProperties.search_type == "activities") {
                    //get request body
                    var activities = JSON.parse(result.request.response).activities;

                    //update users
                    this.updateGroups(activities);
                }
            }
            else {
                //returned bad response, fetch server generated error message
                //and set 
                Alert.alert(result.data);
            }
        }
        else {

            //invalid request
            if (result == undefined) {
                this.state.reload = true;
            }
            else if (result.response.status == 400 && result.response.data) {
                Alert.alert(JSON.parse(result.response.data));
            }
            //handle not found case
            else if (result.response.status == 404) {
                this.state.reload = true;
                GlobalEndpoints.handleNotFound(false);
            }
            else {
                Alert.alert("There seems to be a network connection issue.\nCheck your internet.");
            }
        }

        //un-gray out button
        this.state.grayout_button = false;

        //once done, lazy update
        this.lazyUpdate();
    }

    render() {
        if (this.state.loading == true || this.state.loading == null) {
            return (
                <LoadingScreen tryAgain={this.fetchUserData} reload={this.state.reload}/>
            );
        }
        else {
            return (
                <View style={[main_styles.page]}>
                    <View style={main_styles.top_bar}>
                        <View style={main_styles.search_bar}>
                            <Feather name="search" size={30} color="gray" style={{alignSelf: 'center'}}/>
                            <TextInput style={main_styles.text_input} placeholderTextColor="black"/>
                        </View>
                        <TouchableHighlight style={{marginLeft: 5}} underlayColor="white" onPress={() => {this.props.navigation.navigate("Map Filters Screen")}}>
                            <Feather name="list" size={36} color="gray" />
                        </TouchableHighlight>
                    </View>
                    <View sytle={{flex: 1}}>
                        <MapView 
                            style={map_styles.body}
                            initialRegion={this.state.initialRegion}
                            onRegionChangeComplete={this.onRegionChange}
                        >
                            {this.renderMarkers()}
                        </MapView>
                    </View>
                    <View style={main_styles.map_button}>
                        <TouchableOpacity disabled={this.state.grayout_button} activeOpacity={this.state.grayout_button ? 0.5 : GlobalValues.ACTIVE_OPACITY} onPress={() => {this.searchRegion();}}>
                            <Text style={main_styles.map_button_text}>
                                {this.state.grayout_button ? "Loading..." : "Search this region"}
                            </Text>
                        </TouchableOpacity> 
                    </View>
                </View>); 
        }
    }

    /**<TouchableOpacity style={main_styles.map_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {}}>
                        <Text style={main_styles.map_button_text}>
                            Search this region
                        </Text>
                    </TouchableOpacity> */
    
    //, {flex: 1, flexDirection: 'row'}

    /**<View style={main_styles.top_bar}>
                            <View style={main_styles.search_bar}>
                                <Feather name="search" size={30} color="gray" style={{alignSelf: 'center'}}/>
                                <TextInput style={main_styles.text_input} placeholderTextColor="black"/>
                            </View>
                            <TouchableHighlight style={{marginLeft: 5}} underlayColor="white" onPress={() => {this.props.navigation.navigate("Map Filters Screen")}}>
                                <Feather name="list" size={36} color="gray" />
                            </TouchableHighlight>
                        </View> */
    /**
                        <View sytle={{flex: 1}}>
                            <MapView 
                                style={map_styles.body}
                                initialRegion={this.state.initialRegion}
                                onRegionChangeComplete={this.onRegionChange}
                            >
                                {this.renderMarkers()}
                            </MapView>
                        </View> */

    validateAttributes() {
        if (GlobalProperties.map_filters_updated && (typeof(GlobalProperties.search_attributes) == "undefined" || typeof(GlobalProperties.search_attributes) == "null" || GlobalProperties.search_attributes.length == 0)) {
            Alert.alert("You must specify attributes for searching\nattributes are set in the filters page");
            return false;
        }

        return true;
    }

    //when the region on the map changes
    onRegionChange(region) {
        this.region = region;

        if (this.region == null) {
            //skip
            return;
        }
        if (this.boundary == null) {
            //assuming at this point region is not null, 
            this.boundary = this.region;
            return;
        }

        /*if (this.isOutsideBoundary() || this.isInNextZoomLevel()) {
            this.fetchNewMarkers();
        }
            */

        //console.log((this.region.longitudeDelta / this.region.latitudeDelta) + " " + (Dimensions.get('window').width / Dimensions.get('window').height));

        //this.isOutsideBoundary();

        //if (this.region.longitude > -122.3) {
        //    this.state.markers[0].longitude = -122.28;
            //this.lazyUpdate() ?
        //}
        //logic
        //region updates, it if is outside a certain boundry, fetch new markers, erase old ones (overriten, async), update state markers (does this automatically)
    }

    onRegionChangeComplete(region) {
        //update global values

        GlobalProperties.map_latitude = region.latitude;
        GlobalProperties.map_longitude = region.longitude;
        GlobalProperties.map_search_radius = GlobalProperties.get_haversine_distance(region.latitude, region.longitude, region.latitudeDelta, region.longitudeDelta);
        GlobalProperties.map_latitude_delta = region.latitudeDelta;
        GlobalProperties.map_longitude_delta = region.longitudeDelta;

        if (GlobalProperties.use_map_settings) {
            GlobalProperties.search_radius = GlobalProperties.map_search_radius;
        }

        //call on updating markers
    }

    updateGroups(groups) {
        this.state.markers = [];

        for (var i = 0; i < groups.length; i++) { 
            var json = groups[i];
            if (GlobalProperties.search_type == "people") {
                this.state.markers.push({
                    type: "people",
                    latitude: json.latitude,
                    longitude: json.longitude,
                    count: parseInt(json.count).toString(),
                });
            }
            else if (GlobalProperties.search_type == "activities") {
                this.state.markers.push({
                    type: "activity",
                    latitude: json.latitude,
                    longitude: json.longitude,
                    id: json.id,
                });
            }
        }
    }

    //render the markers on the map
    renderMarkers() {
        var markers = this.state.markers.map((marker, index) => {
            if (marker.type == "people") {
                return (
                    <Marker
                        key={index}
                        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                        pinColor={GlobalValues.ACTIVITY_COLOR}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center', backgroundColor: GlobalValues.ACTIVITY_COLOR, borderRadius: 12, padding: 3}}>
                            {marker.count}
                        </Text>
                    </Marker>
                );
            }
            else if (marker.type == "activity") {
                return (
                    <Marker
                        key={index}
                        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                        title={marker.title}
                        description={marker.description}
                        pinColor={GlobalValues.ACTIVITY_COLOR}
                        onPress={() => {this.props.navigation.navigate("Other Activity Screen", {id: marker.id, type: "none", viewing:""});}}
                    >
                    </Marker>
                );
            }
            else {
                //return nothing, don't know what the hell this is
            }
        });

        return(markers);
    }

    searchRegion() {
        this.updateSearch();
    }

    lazyUpdate() {
        this.forceUpdate();
    }

    //return weither or not they are outside the boundary
    isOutsideBoundary() {
        //get overlaps of lat and long of the two squares/regions

        /*var boundaryWidth = 10;
        var boundaryHeight = 10;
        var boundaryLong = this.boundary.longitude;
        var boundaryLat = this.boundary.latitude;

        var regionWidth = 10;
        var regionHeight = 10;
        var regionLong = this.region.longitude;
        var regionLat = this.region.latitude;*/

        //HANDLE CASE FOR ZOOMING OUT

        var x1 = this.region.longitude - (this.region.longitudeDelta / 2);
        var y1 = this.region.latitude - (this.region.latitudeDelta / 2);
        var deltaX1 = this.region.longitudeDelta;
        var deltaY1 = this.region.latitudeDelta;

        var x0 = this.boundary.longitude - (this.boundary.longitudeDelta / 2);
        var y0 = this.boundary.latitude - (this.boundary.latitudeDelta / 2);
        var deltaX0 = this.boundary.longitudeDelta;
        var deltaY0 = this.boundary.latitudeDelta;
        
        // Length of intersecting part i.e
        // start from max(l1.x, l2.x) of
        // x-coordinate and end at min(r1.x,
        // r2.x) x-coordinate by subtracting
        // start from end we get required
        // lengths
        const x_dist = Math.min(x0 + deltaX0, x1 + deltaX1)
                    - Math.max(x0, x1);
        const y_dist = (Math.min(y0 + deltaY0, y1 + deltaY1)
                    - Math.max(y0, y1));
        var gap = 0;

        if( x_dist > 0 && y_dist > 0 )
        {
            gap = x_dist * y_dist;
        }

        //get the area of the current region
        var regionArea = (deltaX0 * deltaY0);

        /*
        var longOverlap = 0; //(regionLong + regionWidth) - boundaryLong;
        var latOverlap = 0; //(regionLat + regionHeight) - boundaryLat;

        if (x0 < x1) {
            longOverlap = (x0 + deltaX0) - x1;
        }
        else {
            longOverlap = (x1 + deltaX1) - x0;
        }

        if (y0 < y1) {
            latOverlap = (y0 + deltaY0) - y1;
        }
        else {
            latOverlap = (y1 + deltaY1) - y0;
        }

        //if one dimension of it is well inside (causing on outside gap, or total 100% overlap in that dimension), set it to be so that there is exacly the maximum amount
        //of overlap allowed in that direction with no gap (this is to account for the case where the regions may only have one demension of it creating a gap and don't wnant
        //to create any negitive or zera gap area)

        //EMERGENCY if square somehow goes outside of intial region before reloading, means there is zero overlap

        if (longOverlap < 0 || latOverlap < 0) {
            latOverlap = 0;
            longOverlap = 0;
        }

        //get the area of the boundary
        var boundaryArea = (deltaX0 * deltaY0);

        //get the area of the gap created
        var gap = boundaryArea - (longOverlap * latOverlap);

        //get the area of the current region
        var regionArea = (deltaX0 * deltaY0);*/

        //if more than 25 percent of the current screen area is gap, then refresh markers
        if (gap / regionArea > GlobalValues.GAP_OVERLAP_REFRESH_RATIO) { //&& the stopped moving the screen
            //refresh boundary
            this.boundary = this.region;

            return(true);
        }
        //not too far out of boundary, don't refresh
        else {
            return(false);
        }
    }
}

/*
                        <SafeAreaView style={{flexWrap: "wrap", flexGrow: 1}}>
                            <MapView style={map_styles.body}/>
                            <EmptySpace/>
                        </SafeAreaView> */

//this.props.navigation.navigate("Explore Filters Screen", {id: this.props.id})

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