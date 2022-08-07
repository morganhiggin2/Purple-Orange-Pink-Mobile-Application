import React from 'react';
import {StyleSheet, View, Dimensions, Alert, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { GlobalProperties, GlobalValues } from '../../../../global/global_properties.js';
import { GlobalEndpoints } from '../../../../global/global_endpoints.js';
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
            backgroundColor: GlobalValues.SEARCH_TEXT_INPUT_COLOR,
            borderRadius: 5,
            flexDirection: 'row',
            width: Math.trunc(Dimensions.get('window').width * 0.85),
        },
        text_input: {
            backgroundColor: GlobalValues.SEARCH_TEXT_INPUT_COLOR, //#FECAB9
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
                latitudeDelta: GlobalProperties.default_map_params.latitudeDelta,
                longitudeDelta: GlobalProperties.default_map_params.longitudeDelta,
            };
        }
        else {
            this.state.initialRegion = {
                latitude: givenLocation.latitude,
                longitude: givenLocation.longitude,
                latitudeDelta: GlobalProperties.default_map_params.latitudeDelta,
                longitudeDelta: GlobalProperties.default_map_params.longitudeDelta,
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
                tappable={false}
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
                latitudeDelta: GlobalProperties.default_map_params.latitudeDelta,
                longitudeDelta: GlobalProperties.default_map_params.longitudeDelta,
            });

            //update map
            this.lazyUpdate();
        }
    }

    lazyUpdate() {
        this.forceUpdate();
    }
}