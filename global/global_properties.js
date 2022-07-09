import {useNavigation} from '@react-navigation/native';
import { FileSystem } from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

//static values
export const GlobalValues = {
  //for server
  HOST: "https://api.purpleorangepink.com", //"https://localhost:5001/",
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
  PINK_COLOR: '#FF2DC7',
  PURPLE_COLOR: 'A221FF',

  //for other profiles
  MALE_COLOR: "#1b72e3",
  FEMALE_COLOR: "#EC2783",
  AGE_COLOR: "#facc00",
  DISTANCE_COLOR: "#ff7b29",

  //message colors
  CONVERSATION_COLOR: "#6aa5f7",
  DIRECT_MESSAGE_COLOR: "#ff5b24",
  ANNOUNCEMENT_COLOR: "#ff0000",
  INVITATION_COLOR: "#8599C7",

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

  //for information icons
  ATTRIBUTES_INFORMATION: "These are interests you both will have in common. Use words ending in \'ing\'.\n\nExamples: Swimming, Biking, Jogging, Coding.",
  INVITATION_CAP_INFORMATION: "This limits the number of pending invitations at one time.",
  PARTICIPANT_CAP_INFORMATION: "This limits the number of people that can join your activity.",
  INVITATION_TYPE_INFORMATION: "Anyone: anyone can join\nInvitation Required: anyone can request to join, and you must then accept their invite for them to join.\nInvite Only: Only you can invite people to join",
  SEARCH_LOCATION_IS_ACTIVITY_LOCATION_INFORMATION: "The location in which people can find your activity is the same as the location of your activity.",
  ADDRESS_INFORMATION: "Only people who join you activity are able to see this",

  //search page size
  SEARCH_PAGE_SIZE: 50,

  //messages
  MESSAGES_PAGE_AMOUNT: 40,
}

export class GlobalProperties {
    //dynamic runtime values
    static auth_token = "";
    static expo_push_token = "";
    static user_name = "";
    static user_id = "";

    //used for both explore screens
    static currentExploreScreenSearchUpdate = () => {};

    //global search filters for maps and explore
    static search_attributes = [];
    static search_minAge = 18;
    static search_maxAge = 100;
    static search_gender = "";
    static search_type = "activities";
    static search_radius = 5;
    static use_map_settings = false;
    static medium = "";
    //blank is no preference

    static map_params = null;
    static default_map_params = {
      latitude: 30.2672,
      longitude: -97.7431,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    }

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
    static search_filters_updated = false;

    //for messages page
    static messages_filter_type = "all";

    //if messages should be releoaded when page is opened
    static reload_messages = true;
    static reloadMessages = () => {};
    static messagesHandler = null;

    //for manage items
    static manage_filters_type = "activities";

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