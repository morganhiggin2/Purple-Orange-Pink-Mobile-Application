import {useNavigation} from '@react-navigation/native';
import { FileSystem } from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

//static values
export const GlobalValues = {
  //for server
  HOST: "https://www.purpleorangepink.com", //"https://localhost:5001/",
  //timout value
  CONNECTION_RETRY_TIME: 5000,

  //colors
  WELCOME_SCREENS_COLOR: "#FFE1D6",
  ORANGE_COLOR: "#ff5b24",
  LIGHT_ORANGE_COLOR: "#FFE1D6",
  HEADER_BACKGROUND_COLOR: "#FFEBE7",
  PEOPLE_COLOR: "#ffb300",
  ACTIVITY_COLOR: "#ff0000",
  GROUP_COLOR: "#00eb8d",
  DARKER_WHITE: "#f1f1f1",//"#f2f2f2",
  DARKER_OUTLINE: "#ebebeb",
  DISTINCT_GRAY: '#c9c9c9',

  //for other profiles
  MALE_COLOR: "#1b72e3",
  FEMALE_COLOR: "#EC2783",
  AGE_COLOR: "#facc00",
  DISTANCE_COLOR: "#ff7b29",


  //buttons
  ACTIVE_OPACITY: 0.7,

  //map
  MARKER_IMAGE_PATHS: ["https://cpng.pikpng.com/pngl/s/43-430057_pixel-heart-pixel-heart-png-transparent-clipart.png", "path_from_base_image_2"],
  GAP_OVERLAP_REFRESH_RATIO: 0.25,

  //your profile
  FRIENDS_NUM_PROFILE_IMAGES: 3,

  //IOS
  //dropdown
  IOS_DROPDOWN_WIDTH: 250,

  //misc
  SALMON_COLOR: '#FF7485',
}

export class GlobalProperties {
    //dynamic runtime values
    static auth_token = "";
    static expo_push_token = "";
    static user_name = "";

    //global search filters for maps and explore
    static search_attributes = [];
    static search_minAge = 18;
    static search_maxAge = 100;
    static search_gender = "";
    static search_type = "activities";
    static search_radius = 50;
    static use_map_settings = false;
    //blank is no preference

    //for the map
    static map_search_radius = 5;
    static map_latitude = 30.2672;
    static map_longitude = -97.7431;
    static map_latitude_delta = 0.1;
    static map_longitude_delta = 0.1;

    //the props for the currently passed screen
    static return_screen = "";
    static screen_props = null;

    //are we logged in
    //TODO change to false
    static is_logged_in = false;
    //update main app screen
    static app_lazy_update = null;
    //connect to server and log in
    static app_connect = null;

    //handlers for the filters going back to their modified screens
    static map_filters_updated = false;

    //if messages should be releoaded when page is opened
    static reload_messages = true;
    static reloadMessages = () => {};

    //user information
    static birthdate = new Date(Date.now());

    //when navigating to the next screen, call this method
    //pass in the navigation variable, screen name, and params
    static goToScreen(navigation, screen_name, params) {
        GlobalProperties.screen_props = params;

        navigation.navigate(screen_name);
    }

    //call once the global screen props have been stored locally
    static screenActivated() {
        GlobalProperties.screen_props = null;
        GlobalProperties.return_screen = "";
    }

    //update user location, send to server
    static updateLocation(latitude, longitude) {
      
    }
    
    //download file to directory
    static async download_to(fileName, uri) {
        const downloadResumable = FileSystem.createDownloadResumable(
            uri,
            FileSystem.documentDirectory + 'profile_images/' + fileName,
            {},
            callback
          );

        try {
            const { dir } = await downloadResumable.downloadAsync();
                console.log('Finished downloading to ', dir);
          } catch (e) {
            console.error(e);
          }
    }

    //EXPO SECURE STORE SYSTEM
    //create key value pair
    static put_key_value_pair(key, value) {
        
        var val = SecureStore.setItemAsync(key, value).then(token => {return(token);});

        return val;
    }

    //get key value pair
    static async get_key_value_pair(key) {
        try {
            const data = await SecureStore.getItemAsync(key);
            if (data !== null) {
              return data;
            }
            else {
              return null;
            }
          } catch (error) {
            console.log(error);
            return null;
          }
    }

    //get key value pair, but if it is not found, create one with that default
    static async get_key_value_pair_with_def(key, def) {
        //attempt to get the key value pair
        let value = null;

        value = await GlobalProperties.get_key_value_pair(key).then(value => {return(value);});

        /*setTimeout(() => {
            console.log(GlobalProperties.get_key_value_pair(key).then(value => {return(value);}).result);
        }, 200);*/

        /*let promise = new Promise(resolve => {
            setTimeout(function() {
                console.log(GlobalProperties.get_key_value_pair(key).then(value => {return(value);}));
            }, 2000);
        });/*/

        //value = new Promise(this.get_key_value_pair(key))

        //console.log(value);

        //if none was returned, create the key value pair with a default blank image
        if (!value) {
            value = def;
        }

        //return the uri of the image
        return value;
    }

    static get_haversine_distance(latitude, longitude, width, height) {
      let p = Math.PI / 180.0;
      let a = 0.5 - Math.cos(width * p) / 2 + Math.cos(latitude * p) * Math.cos((latitude + height) * p) * (1 - Math.cos((height) * p)) / 2;

      return 7926.3812 * Math.asin(Math.sqrt(a));
    }
}

//download default profile image and have path to it locally stored here

/*
onRegionChangeComplete={this.onRegionChange}


<MapView.Callout
            title={true}
            width={210}
            onPress={() => {
              props.navigation.navigate("PlaceDetail", {
                placeTitle: marker.title,
                placeId: marker.id,
              });
            }}
          ></MapView.Callout>
          
          <MapView.Marker
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                onPress={() => this.markerClick()}
                //for IOS, it is rumoed to be onSelect instead of onPress
              />

            //to change color of default marker, choose pinColor prop

          */