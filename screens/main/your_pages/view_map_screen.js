import React from 'react';
import {StyleSheet, View, Text, Dimensions, Alert, TouchableOpacity} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { GlobalProperties, GlobalValues } from '../../../global/global_properties.js';
import * as Location from 'expo-location';
import { LoadingScreen } from '../../misc/loading_screen.js';

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

export class ViewMapScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            reload: false,
            location: this.props.route.params.location,
            initialRegion: null,
            region: null,
            markers: [],

            //map reference
            map_ref: null,
        };

        this.state.initialRegion = {
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude,
            latitudeDelta: 0.092200000,
            longitudeDelta: 0.042100000,
        };
        
        this.state.region = this.state.initialRegion;
        
        this.state.markers = [
            {
                description: "",
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude,
                title: "",
                type: "generic",
            }
        ];

        this.onRegionChange = this.onRegionChange.bind(this);
        this.renderMarkers = this.renderMarkers.bind(this);

        this.lazyUpdate = this.lazyUpdate.bind(this);

        //must do calculations before rendering
        this.state.boundary = null;
        
        this.state.region = this.state.initialRegion;
    }
    
    componentDidMount() {
        GlobalProperties.return_screen = "Search Map Screen";
        GlobalProperties.screen_props = null;

        this.state.isLoading = false;
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
                                onRegionChangeComplete={this.onRegionChange}
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
        var markers = this.state.markers.map((marker, index) => {
            return (
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
    onRegionChange(region) {
        this.state.region = region;

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

    async resetLocation() {
        //grayout button as we are already in said location
        this.state.grayout_reset_location_button = true;

        //animate change
        this.state.map_ref.animateToRegion({
            latitude: this.state.initialRegion.latitude,
            longitude: this.state.initialRegion.longitude,
            latitudeDelta: 0.092200000,
            longitudeDelta: 0.042100000,
        });

        //update map
        this.lazyUpdate();
    }


    lazyUpdate() {
        this.forceUpdate();
    }
}