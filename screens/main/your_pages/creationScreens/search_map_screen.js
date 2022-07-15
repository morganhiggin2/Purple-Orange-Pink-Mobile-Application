import React from 'react';
import {StyleSheet, View, Text, Dimensions, Alert, TouchableOpacity} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { GlobalProperties, GlobalValues } from '../../../../global/global_properties.js';
import { GlobalEndpoints } from '../../../../global/global_endpoints.js';
import * as Location from 'expo-location';
import { LoadingScreen } from '../../../misc/loading_screen.js';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
        },
        search_bar: {
            paddingHorizontal: 7,
            backgroundColor: '#DFDFDF',
            borderRadius: 5,
            flexDirection: 'row',
            width: Math.trunc(Dimensions.get('window').width * 0.85),
        },
        text_input: {
            backgroundColor: '#DFDFDF', //#FECAB9
            color: 'darkgray',
            padding: 0,
            margin: 0,
            borderWidth: 0,
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
        scroll_area: {
            
        }
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

export class SearchMapScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            reload: false,
            global_props: null,
            initialized: false,

            markers: [],

            //map reference
            map_ref: null,
        };

        this.updateSearch = this.updateSearch.bind(this);
        this.onPress = this.onPress.bind(this);
        this.renderMakers = this.renderMarkers.bind(this);

        this.lazyUpdate = this.lazyUpdate.bind(this);

        //must do calculations before rendering
        this.state.boundary = null;

        var givenLocation = this.props.route.params;

        if (givenLocation.latitude == null || givenLocation.longitude == null) {
            this.state.initialRegion = {
                latitude: GlobalProperties.map_latitude,
                longitude: GlobalProperties.map_longitude,
                latitudeDelta: 0.092200000,
                longitudeDelta: 0.042100000,
            };
        }
        else {
            this.state.initialRegion = {
                latitude: givenLocation.latitude,
                longitude: givenLocation.longitude,
                latitudeDelta: 0.092200000,
                longitudeDelta: 0.042100000,
            };
            this.state.markers = [
                {
                    description: "",
                    latitude: givenLocation.latitude,
                    longitude: givenLocation.longitude,
                    title: "",
                    type: "generic",
                }
            ];
        }
        
        this.state.region = this.state.initialRegion;
    }
    
    componentDidMount() {

        this.state.global_props = GlobalProperties.screen_props;

        GlobalProperties.return_screen = "Search Map Screen";

        this.updateSearch();
    }

    async updateSearch() {
        var givenLocation = this.props.route.params;

        //if they did not give us a location
        if (givenLocation.latitude == null || givenLocation.longitude == null) {
            var location = null;

            //fetch user's location if not using map settings
            if (!this.state.initialized) {

                var locationResult = await GlobalEndpoints.getLocation();

                if (!locationResult.granted) {
                    Alert.alert("Permission to access location was denied.\nUsing map settings.");
                }
                else if (locationResult.location == null) {
                    Alert.alert("Location could not be determined.\nUsing map settings.");
                }
                else {
                    location = locationResult.location;
                }

                this.state.initialized = true;
            }

            if (location != null) {
                //set region
                this.state.region.latitude = location.coords.latitude;
                this.state.region.longitude = location.coords.longitude;

                //set both regions equal
                this.state.initialRegion = this.state.region;
            }
        }

        this.state.isLoading = false;

        //once done, lazy update
        this.lazyUpdate();
    }

    render() {
        return (
            <View style={main_styles.page}>
                    {this.state.isLoading ? 
                    (
                        <LoadingScreen reload={this.state.reload} tryAgain={() => {}} />
                    ) : (
                    <View style={{flex: 1}}>
                        <View style={{flex: 1}}>
                            <MapView 
                                style={map_styles.body}
                                initialRegion={this.state.initialRegion}
                                onPress={this.onPress}
                                ref={(ref) => {this.state.map_ref = ref;}}
                            >
                                {this.renderMarkers()}
                            </MapView>
                        </View>
                        <View style={main_styles.map_button_container}>
                            <TouchableOpacity style={main_styles.map_button} onPress={() => {this.resetLocation();}}>
                                <MaterialIcons name="my-location" size={24} color="white" />
                            </TouchableOpacity> 
                        </View>
                    </View>) 
                    }
            </View>
        );
    }

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


        //add other markers
        this.state.markers.map((marker, index) => {
            markers.push(
                <Marker
                    key={index}
                    coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                    title={marker.title}
                    description={marker.description}
                    pinColor={GlobalValues.ACTIVITY_COLOR}
                    onPress={() => {}}
                />
            );
        });

        return(markers);
    }

    //when the region on the map changes
    onRegionChangeComplete(region) {

        if (this.state.region == null) {
            //skip
            return;
        }
        if (this.state.boundary == null) {
            //assuming at this point region is not null, 
            this.state.boundary = this.state.region;
            return;
        }
    }

    onPress(event) {
        this.state.markers = [
            {
                description: "",
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude,
                title: "",
                type: "generic",
            }
        ];

        //update global values
        GlobalProperties.screen_props = {
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
            search_radius: GlobalProperties.get_haversine_distance(this.state.region.latitude, this.state.region.longitude, this.state.region.latitudeDelta, this.state.region.longitudeDelta),
        }

        //lazy update
        this.lazyUpdate();
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
                latitudeDelta: 0.092200000,
                longitudeDelta: 0.042100000,
            });

            //update map
            this.lazyUpdate();
        }
    }


    lazyUpdate() {
        this.forceUpdate();
    }

    //return weither or not they are outside the boundary
    isOutsideBoundary() {
        //get overlaps of lat and long of the two squares/regions

        /*var boundaryWidth = 10;
        var boundaryHeight = 10;
        var boundaryLong = this.state.boundary.longitude;
        var boundaryLat = this.state.boundary.latitude;

        var regionWidth = 10;
        var regionHeight = 10;
        var regionLong = this.state.region.longitude;
        var regionLat = this.state.region.latitude;*/

        //HANDLE CASE FOR ZOOMING OUT

        var x1 = this.state.region.longitude - (this.state.region.longitudeDelta / 2);
        var y1 = this.state.region.latitude - (this.state.region.latitudeDelta / 2);
        var deltaX1 = this.state.region.longitudeDelta;
        var deltaY1 = this.state.region.latitudeDelta;

        var x0 = this.state.boundary.longitude - (this.state.boundary.longitudeDelta / 2);
        var y0 = this.state.boundary.latitude - (this.state.boundary.latitudeDelta / 2);
        var deltaX0 = this.state.boundary.longitudeDelta;
        var deltaY0 = this.state.boundary.latitudeDelta;
        
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
            this.state.boundary = this.state.region;

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