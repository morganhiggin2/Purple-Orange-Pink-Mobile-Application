import { FileSystem } from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import * as Device from 'expo-device';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';

//static values
export const GlobalValues = {
  //for server
  HOST: "https://apitesting.purpleorangepink.com",
  //timout value
  CONNECTION_RETRY_TIME: 8000,

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
  SEARCH_TEXT_INPUT_COLOR: "#DFDFDF",

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
  GAP_OVERLAP_REFRESH_RATIO: 0.25,

  //map current location colors
  MARKER_INSIDE_COLOR: "#186cf2",
  MARKER_OUTSIDE_COLOR: "#c8dbfa",

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
  //SEARCH_PAGE_SIZE: 50,
  SEARCH_PAGE_SIZE: 10,

  //messages
  MESSAGES_PAGE_AMOUNT: 40,

  //ads
  ADMOB_ANDROID_ID: "ca-app-pub-4589296191079889~6156806437",
  ADMOB_IOS_ID: "ca-app-pub-4589296191079889~5676610078"
}

export class GlobalProperties {
    //system values
    static isAndroid = false;

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
    };

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
    static map_filters_updated = true;
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

	  //for adds
    static start_timestamp = 0;

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

    static check_interstitial_ad() {
      var currentTime = Date.now();

      if (currentTime - GlobalProperties.start_timestamp > 900000) {
        GlobalProperties.start_timestamp = currentTime;
        this.showInterstitialAdd();
      }
    }

    static showInterstitialAdd() {
      const productionID = GlobalProperties.isAndroid ? GlobalValues.ADMOB_ANDROID_ID : GlobalValues.ADMOB_IOS_ID;

      // Is a real device and running in production.
      const adUnitID = Device.isDevice && !__DEV__ ? productionID : TestIds.INTERSTITIAL;

      //create request for ad
      const interstitial = InterstitialAd.createForAdRequest(adUnitID, {
        requestNonPersonalizedAdsOnly: false,
        keywords: GlobalProperties.search_attributes,
        location: {
          latitude: GlobalProperties.default_map_params.latitude,
          longitude: GlobalProperties.default_map_params.longitude
        },
      });

      //set event listener for when it is done loading
      var adEventListener = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        interstitial.show();
      });

      //load the ad
      interstitial.load();
	  }

    static async askForInStoreReview() {
      var reviewed = await this.get_key_value_pair("AskedForReviewBoolean")
      .then((val) => {
        return val;
      })
      .catch (() => {
        return null;
      });

      if (reviewed == null || !reviewed) {
        /*if (Platform.OS === 'ios') {
          const itunesItemId = ; //982107779
          // Open the iOS App Store in the browser -> redirects to App Store on iOS
          Linking.openURL(`https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`);
          // Open the iOS App Store directly
          Linking.openURL(
            `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`
          );
        }
        else {
          const androidPackageName = ; //'host.exp.exponent'
          // Open the Android Play Store in the browser -> redirects to Play Store on Android
          Linking.openURL(
            `https://play.google.com/store/apps/details?id=${androidPackageName}&showAllReviews=true`
          );
          // Open the Android Play Store directly
          Linking.openURL(`market://details?id=${androidPackageName}&showAllReviews=true`);
        }*/

        //requires expo's StoreReview npm module
      }
      else {
        await this.put_key_value_pair("AskedForReviewBoolean", true);
      }

      
    }
}