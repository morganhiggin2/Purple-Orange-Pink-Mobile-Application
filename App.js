/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import React, { lazy } from 'react';

import {WelcomeNavigator} from './screens/login/welcome_navigator.js';
import {MainNavigator} from './screens/main/main_navigator.js';
import { GlobalProperties, GlobalValues } from './global/global_properties.js';
import { GlobalEndpoints } from './global/global_endpoints.js';
import { Alert, LogBox } from 'react-native';

import { LoadingScreen } from './screens/misc/loading_screen.js';
import { MessageHandler } from './global/messages_handler.js';

//expo
Notifications.setNotificationHandler({
  handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
  })
});

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      reload: false,
    };

    this.lazyUpdate = this.lazyUpdate.bind(this);
    this.connect = this.connect.bind(this);
    this.validateUserLogin = this.validateUserLogin.bind(this);
    this.validateServerConnection = this.validateServerConnection.bind(this);
    this.getRandomTempToken = this.getRandomTempToken.bind(this);
    this.registerForPushNotifications = this.registerForPushNotifications.bind(this);
    this.handleNotification = this.handleNotification.bind(this);
    this.handleNotificationResponse = this.handleNotificationResponse.bind(this);

    GlobalProperties.app_lazy_update = this.lazyUpdate;
    GlobalProperties.app_connect = this.connect;
  }

  componentDidMount() {
    //open realm
    GlobalProperties.messagesHandler = new MessageHandler();
    GlobalProperties.messagesHandler.start();

    //get username
    GlobalProperties.get_key_value_pair("User_Username")
    .then((value) => {
      GlobalProperties.user_name = JSON.parse(value);
    })
    .catch(() => {
      GlobalProperties.put_key_value_pair("User_Username");
    });

    //add notification listeners
    Notifications.addNotificationReceivedListener(this.handleNotification);
    Notifications.addNotificationResponseReceivedListener(this.handleNotificationResponse);
    //Notifications.addPushTokenListener(registerDevicePushTokenAsync);
    
    /*this.props.navigation.addListener('focus', () => {
        this.state.global_props = GlobalProperties.screen_props;

        if (GlobalProperties.return_screen == "Validate Email Screen" && GlobalProperties.screen_props != null) {
            
            if (screen_props.success) {
              this.connect();
            }
        }

        GlobalProperties.screenActivated();
    });*/

    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
      'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.'
    ]);

    //ask user permission to get location
    let status = Location.requestForegroundPermissionsAsync()
    .then(() => {
      //successful, do nothing
    })
    .catch((error) => {
      Alert.alert("Permission to access location was denied. Location is required to use this app");
    });

    this.connect();
  
    //Alert.alert("There seems to be a network connection issue.\nCheck your internet.");

    //if so, update server with new location
    
      /*//check if valid api token via endpoint

      //make body
      var body = {
        "ApiToken": key,
      };

      var successful = false;

      //make request
      var foundResult = await GlobalEndpoints.makePostRequest(false, "/api/AccountManager/ValidateUserApiToken", body)
          .then((result) => {
              successful = true;
              return(result);
          })
          .catch((error) => {
              successful = false;
              return(error);
          });
      
      if (successful) {
        var found = result.body.found;

        if (found) {
          //auth token is valid, can start using it to log in
          this.state.is_logged_in = true;
        }
        else {
          this.state.is_logged_in = false;
          //not found, go to login screen
        }
      }
      else {
        this.state.is_logged_in = false;
        //network error
      }
      

      //if valid, logged in, set global value

      //else, not logged in*/

      //assumed auth token is still valid
  }

  async connect() {
    this.state.loading = true;
    /*const timeoutPromise = new Promise((resolve, reject) => {
      var timeout = setTimeout(() => {
        resolve();
      }, 1000);
      //reject();
    });

    timeoutPromise.then(() => {
      console.log("finished right");
    }).catch(() => {
      console.log("not in a good place");
    });

    console.log("here");*/

    if (this.state.reload) {
      this.state.reload = false;

      //reload to now hide reload button
      this.lazyUpdate();
    }

    //validate server connection
    this.validateServerConnection()
    .then((validated) => {
      if (validated) {
        this.registerForPushNotifications()
        .then((expo_token) => {
          if (expo_token != ""){
            //save token and set globally
            GlobalProperties.put_key_value_pair("expo_push_notifications_token", expo_token);
            GlobalProperties.expo_push_token = expo_token;

            //get keys from memeory (and check if they exist)
            GlobalProperties.get_key_value_pair("User_PurpleOrangePink_Api_Token")
            .then((val) => {
              //validate api token
              this.validateUserLogin(val).then(() => {
                //if logged in
                if (GlobalProperties.is_logged_in) {
                  this.state.loading = false;

                  //refresh
                  this.lazyUpdate();
                }
                else {
                  //failed, move on
                  this.state.loading = false;

                  this.lazyUpdate();
                }
              }).catch((error) => {
                Alert.alert("Error with validating user login");
              });
            })
            .catch((exception) => {
              GlobalProperties.put_key_value_pair("User_PurpleOrangePink_Api_Token");
        
              //token does not exist, assume never logged in before and move on
            });
          }
          else {
            //could not connect to server
            this.state.reload = true;
            this.lazyUpdate();
          }
        })
        .catch(() => {
          //could not connect to server
          this.state.reload = true;
          this.lazyUpdate();
        });
      }
      else {
        //could not connect to server
        this.state.reload = true;
        this.lazyUpdate();
      }
    })
    .catch(//wait
      () => {
        //could not connect to server
        this.state.reload = true;
        this.lazyUpdate();
      }
    );
  }

  async validateServerConnection() {
    //check if api token is valid

    //if request was successful
    var successful = false;

    //test if server is online

    //make request
    var result = await GlobalEndpoints.makeGetRequest(false, "/api/AccountManager/ValidateServerConnection")
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
            return true;
        }
        else {
            //returned bad response, fetch server generated error message
            return false;
        }
    }
    else {

        //invalid request
        if (result.response.status == 400 && result.response.data) {
            //token not found
            return false;
        }
        //handle not found case
        else if (result.response.status == 404) {
            return false;
        }
        else {
            return false;
        }
    }
  }

  async registerForPushNotifications() {
    var token = "";

    if (Device.isDevice) {
      const existingStatus = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus != 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus != 'granted') {
        //if token already was generated, use it
        token = await GlobalProperties.get_key_value_pair("expo_push_notifications_token");

        //else, generate fake token from server
        if (token == null) {
          token = "";
        }
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;

    } else {
      token = "";
    }
  
    if (token != "" && Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (token == "") {
      token = await this.getRandomTempToken();
    }

    return token;
  }

  async validateUserLogin(token) {
    //check if api token is valid

    //if request was successful
    var successful = false;

    //set global token to token
    GlobalProperties.auth_token = token;

    //test if server is online

    //make request
    var result = await GlobalEndpoints.makeGetRequest(true, "/api/AccountManager/ValidateUserApiToken")
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
          GlobalProperties.is_logged_in = true;

          return true;
        }
        else {
            GlobalProperties.auth_token = "";
            return false;
        }
    }
    else {
        //invalid request
        if (result == undefined) {
          this.state.reload = true;
          this.lazyUpdate();
          
          return;
        }
        else if (result.response.status == 400 && result.response.data) {
          GlobalProperties.auth_token = "";
          return false;
        }
        //handle not found case
        else if (result.response.status == 404) {
          GlobalProperties.auth_token = "";
          return false;
        }
        else {
          GlobalProperties.auth_token = "";
          return false;
        }
    }
  }

  
  async getRandomTempToken() {
    //if request was successful
    var successful = false;

    //test if server is online

    //make request
    var result = await GlobalEndpoints.makeGetRequest(true, "/api/AccountManager/GetTemporaryExpoToken")
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
          return JSON.parse(result.request.response).expo_token;
        }
        else {
            return "";
        }
    }
    else {
        return "";
    }
  }

  //expo
  //when a notification is recieved in the foreground
  handleNotification(notification) {
    //set message page should reload when on focus to true
    GlobalProperties.reload_messages = true;

    //reload messages when when not on the page
    GlobalProperties.reloadMessages();
  }

  //when notification is recieved in the background
  handleBackgroundNotification(notification) {
    //set messgage page should reload when open again to true
    GlobalProperties.reload_messages = true;

    //get badge count
    Notifications.getBadgeCountAsync()
    .then((badgeCount) => {
      //increment badge count
      Notifications.setBadgeCountAsync(badgeCount + 1);
    })
    .catch();

  }

  //when a notification in the background or killed is handled with
  handleNotificationResponse(response) {
    //set messgage page should reload when open again to true
    GlobalProperties.reload_messages = true;

    //go to messages page and load
    if (this.props.navigation) {
      this.props.navigation.navigate("Your Messages Navigator");
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingScreen tryAgain={this.connect} reload={this.state.reload}/>
      );
    }
    else {
      if (GlobalProperties.is_logged_in) {
        return (<MainNavigator />);
      }
      else {
        return (<WelcomeNavigator />);
      }
    }
  }

  lazyUpdate() {
      this.forceUpdate();
  }
}

export default App;

/**
 * TODO
 * add another other profile and other activity screen to other navigators and reference 
 * thoughs so goback goes back to the previous page on that stack and not just back to the explore screen
 */

/*
cd App
- npm start # you can open iOS, Android, or web from here, or run them directly with the commands below.
- npm run android
- npm run ios # requires an iOS device or macOS for access to an iOS simulator
- npm run web
*/

/*
https://docs.expo.dev/versions/latest/sdk/securestore/
https://docs.expo.dev/versions/latest/sdk/async-storage/
*/

/*
fix drop box not showing what is selected
fix going back to other pages arrow overlapping with header title
edit images thing with not all the images appearing when it expands
*/

//gps: for android timeout issue: https://github.com/Agontuk/react-native-geolocation-service

//to confirm email is correct, notify them when registering saying "look for an email in your inbox"