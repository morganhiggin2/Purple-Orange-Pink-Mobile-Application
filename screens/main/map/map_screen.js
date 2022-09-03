import React from 'react';
import {StyleSheet, View, Text, Dimensions, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 
import {GlobalProperties, GlobalValues} from '../../../global/global_properties.js';
import { GlobalEndpoints } from '../../../global/global_endpoints.js';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { LoadingScreen } from '../../misc/loading_screen.js';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: 'white',
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
            fontFamily: 'Roboto',
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
        map_button_container: {
            zIndex: 10,
            position: 'absolute',
            bottom: 40,
            alignSelf: 'center',
            flexDirection: 'row'
        },
        map_button: {
            borderRadius: 3,
            borderWidth: 4,
            backgroundColor: GlobalValues.ORANGE_COLOR,
            borderColor: GlobalValues.ORANGE_COLOR,
            padding: 3,
            marginRight: 4,
            alignSelf: 'center',
        },
        map_button_text: {
            color: 'white',
            fontFamily: 'Roboto',
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
        current_location_marker: {
            minWidth: 20,
            minHeight: 20,
            backgroundColor: GlobalValues.MARKER_INSIDE_COLOR,
            borderWidth: 3,
            borderRadius: 10,
            borderColor: GlobalValues.MARKER_OUTSIDE_COLOR
        }
    }
);

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

            //listener
            removeFocusListener: null,

            //for button
            grayout_map_button: false,
            grayout_reset_location_button: true,

            //map reference
            map_ref: null,
        };

        this.renderMarkers = this.renderMarkers.bind(this);

        this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
        
        this.updateGroups = this.updateGroups.bind(this);
        this.updateSearch = this.updateSearch.bind(this);

        this.searchRegion = this.searchRegion.bind(this);
        this.resetLocation = this.resetLocation.bind(this);

        this.lazyUpdate = this.lazyUpdate.bind(this);

        //must do calculations before rendering
        this.state.boundary = null;
        this.state.region = null;

        //set search radius
        GlobalProperties.search_radius = GlobalProperties.get_haversine_distance(GlobalProperties.default_map_params.latitude, GlobalProperties.default_map_params.longitude, GlobalProperties.default_map_params.latitudeDelta, GlobalProperties.default_map_params.longitudeDelta) / 2;

        //call on updating
        GlobalProperties.map_filters_updated = true;
    }
    
    componentDidMount() {
        this.state.removeFocusListener = this.props.navigation.addListener('focus', () => {
            //update lazy update method for current explore screen
            GlobalProperties.currentExploreScreenSearchUpdate = this.updateSearch;

            this.state.global_props = GlobalProperties.screen_props;
            GlobalProperties.screenActivated();

            if (GlobalProperties.map_filters_updated) {
                //update map coordinates, as the map has not moved yet, so it won't have been calculated yet
                this.updateSearch();
                GlobalProperties.map_filters_updated = false;
            }
        });
    }

    componentWillUnmount() {
        this.state.removeFocusListener();
    }

    async updateSearch() {
        //gray out button while loading results
        this.state.grayout_map_button = true;
        this.lazyUpdate();

        let search_radius = GlobalProperties.search_radius;

        //fetch user's location if not using map settings
        if (GlobalProperties.map_params == null) {

            var locationResult = await GlobalEndpoints.getLocation();

            if (!locationResult.granted) {
                Alert.alert("Permission to access location was denied.\nUsing map settings.");

                //use map settings
                GlobalProperties.map_params = GlobalProperties.default_map_params;
            }
            else if (locationResult.location == null) {
                Alert.alert("Location could not be determined.\nUsing map settings.");

                //use map settings
                GlobalProperties.map_params = GlobalProperties.default_map_params;
            }
            else {
                GlobalProperties.map_params = {
                    latitude: locationResult.location.coords.latitude,
                    longitude: locationResult.location.coords.longitude,
                    latitudeDelta: GlobalProperties.default_map_params.latitudeDelta,
                    longitudeDelta: GlobalProperties.default_map_params.longitudeDelta,
                };
            }
        }

        //set region
        this.state.region = GlobalProperties.map_params;

        var body = {};
        var requestUrl = "";

        if (GlobalProperties.search_type == "people") {
            body = {
                "radius": search_radius,
                "minimum_age": GlobalProperties.search_minAge,
                "maximum_age": GlobalProperties.search_maxAge,
                "location": {
                    "latitude": GlobalProperties.map_params.latitude,
                    "longitude": GlobalProperties.map_params.longitude,
                }
            };

            requestUrl = "/api/User/Friends/SearchUsersMap";
        }
        else if (GlobalProperties.search_type == "activities") {
            body = {
                "radius": search_radius,
                "location": {
                    "latitude": GlobalProperties.map_params.latitude,
                    "longitude": GlobalProperties.map_params.longitude,
                },
                "medium": GlobalProperties.medium
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
                Alert.alert(JSON.stringify(result.response.data));
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
        this.state.grayout_map_button = false;

        //once done, lazy update
        this.lazyUpdate();
    }

    render() {
        
        if (this.state.loading == true || this.state.loading == null || GlobalProperties.map_params == null) {
            return (
                <LoadingScreen tryAgain={this.fetchUserData} reload={this.state.reload}/>
            );
        }
        else {
            return (
                <View style={[main_styles.page]}>
                    <View sytle={{flex: 1}}>
                        <MapView 
                            style={map_styles.body}
                            initialRegion={GlobalProperties.default_map_params}
                            onRegionChangeComplete={this.onRegionChangeComplete}
                            ref={(ref) => {this.state.map_ref = ref;}}
                        >
                            {this.renderMarkers()}
                        </MapView>
                    </View>
                    <View style={main_styles.map_button_container}>
                        <TouchableOpacity style={main_styles.map_button} disabled={this.state.grayout_map_button} activeOpacity={this.state.grayout_map_button ? 0.5 : GlobalValues.ACTIVE_OPACITY} onPress={() => {this.searchRegion();}}>
                            <Text style={main_styles.map_button_text}>
                                {this.state.grayout_map_button ? "Loading..." : "Search this region"}
                            </Text>
                        </TouchableOpacity> 
                        <TouchableOpacity style={main_styles.map_button} disabled={this.state.grayout_reset_location_button} activeOpacity={this.state.grayout_reset_location_button ? 0.5 : GlobalValues.ACTIVE_OPACITY} onPress={() => {this.resetLocation();}}>
                            <MaterialIcons name="my-location" size={22} color="white" />
                        </TouchableOpacity> 
                    </View>
                </View>); 
        }
    }

    onRegionChangeComplete(region) {
        //update global values
        GlobalProperties.search_radius = GlobalProperties.get_haversine_distance(region.latitude, region.longitude, region.latitudeDelta, region.longitudeDelta) / 2;
        GlobalProperties.map_params = region;

        //call on updating markers
        GlobalProperties.map_filters_updated = true;
        GlobalProperties.search_filters_updated = true;
        
        //make usable the reset location button
        if (this.state.grayout_reset_location_button) {
            this.state.grayout_reset_location_button = false;

            this.lazyUpdate();
        }
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
        var markers = [];
        
        //add current user location marker
        markers.push(
            <Marker 
                key={-1}
                coordinate={{latitude: GlobalProperties.default_map_params.latitude, longitude:GlobalProperties.default_map_params.longitude}}
            >
                <View style={map_styles.current_location_marker}/>
            </Marker>
        );

        this.state.markers.map((marker, index) => {
            if (marker.type == "people") {
                markers.push(
                    <Marker
                        key={index}
                        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                        pinColor={GlobalValues.ACTIVITY_COLOR}
                        tappable={false}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center', backgroundColor: GlobalValues.PEOPLE_COLOR, borderRadius: 15, borderWidth: 3, borderColor: GlobalValues.PEOPLE_COLOR, minWidth: 30, minHeight: 30}}>
                            {marker.count}
                        </Text>
                    </Marker>
                );
            }
            else if (marker.type == "activity") {
                markers.push(
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
                //return nothing
            }
        });

        return(markers);
    }

    searchRegion() {
        this.updateSearch();
    }

    async resetLocation() {
        //get location
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
            //grayout button as we are already in said location
            this.state.grayout_reset_location_button = true;

            //animate change
            this.state.map_ref.animateToRegion({
                latitude: locationResult.location.coords.latitude,
                longitude: locationResult.location.coords.longitude,
                latitudeDelta: GlobalProperties.map_params.latitudeDelta,
                longitudeDelta: GlobalProperties.map_params.longitudeDelta,
            });

            //set default region
            GlobalProperties.default_map_params = {
                latitude: locationResult.location.coords.latitude,
                longitude: locationResult.location.coords.longitude,
                latitudeDelta: GlobalProperties.map_params.latitudeDelta,
                longitudeDelta: GlobalProperties.map_params.longitudeDelta,
            };

            //set to current region
            GlobalProperties.map_params = GlobalProperties.default_map_params;

            //update map
            this.lazyUpdate();
        }
    }

    lazyUpdate() {
        this.forceUpdate();
    }
}