
import { GlobalValues, GlobalProperties } from "./global_properties";
import * as Location from 'expo-location';

export class GlobalEndpoints {

    static makeGetRequest(auth, endpoint) {
        var axios = require('axios');

        if (auth) {
            config = {
                method: 'get',
                url: GlobalValues.HOST + endpoint,
                headers: { 
                    'Accept': '*/*', 
                    'Content-Type': 'application/json', 
                    'Cookie': '.AspNetCore.Identity.Application=' + GlobalProperties.auth_token,
                },
            };
        }
        else {
            config = {
                method: 'get',
                url: GlobalValues.HOST + endpoint,
                headers: { 
                    'Accept': '*/*', 
                    'Content-Type': 'application/json', 
                },
            };
        }

        //timeout promise
        var timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(resolve, GlobalValues.CONNECTION_RETRY_TIME);
        });

        return (Promise.race([timeoutPromise, axios(config)]));
    }

    static makeDeleteRequest(auth, endpoint) {
        var axios = require('axios');

        if (auth) {
            config = {
                method: 'delete',
                url: GlobalValues.HOST + endpoint,
                headers: { 
                    'Accept': '*/*', 
                    'Content-Type': 'application/json', 
                    'Cookie': '.AspNetCore.Identity.Application=' + GlobalProperties.auth_token,
                },
            };
        }
        else {
            config = {
                method: 'delete',
                url: GlobalValues.HOST + endpoint,
                headers: { 
                    'Accept': '*/*', 
                    'Content-Type': 'application/json', 
                },
            };
        }

        //timeout promise
        var timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(resolve, GlobalValues.CONNECTION_RETRY_TIME);
        });

        return (Promise.race([timeoutPromise, axios(config)]));
    }

    static makePostRequest(auth, endpoint, body) {
        var axios = require('axios');

        var data = JSON.stringify(body);
        var config = {};

        if (auth) {
            config = {
                method: 'post',
                url: GlobalValues.HOST + endpoint,
                headers: { 
                    'Accept': '*/*', 
                    'Content-Type': 'application/json', 
                    'Cookie': '.AspNetCore.Identity.Application=' + GlobalProperties.auth_token,
                },
                data : data
            };
        }
        else {
            config = {
                method: 'post',
                url: GlobalValues.HOST + endpoint,
                headers: { 
                    'Accept': '*/*', 
                    'Content-Type': 'application/json', 
                },
                data : data
            };
        }

        //timeout promise
        var timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(resolve, GlobalValues.CONNECTION_RETRY_TIME);
        });

        return (Promise.race([timeoutPromise, axios(config)]));
    }

    static makePostRequestFormData(auth, endpoint, body) {
        var axios = require('axios');

        var config = {};

        if (auth) {
            config = {
                method: 'post',
                url: GlobalValues.HOST + endpoint,
                headers: { 
                    'Accept': '*/*', 
                    "content-type": "multipart/form-data",
                    'Cookie': '.AspNetCore.Identity.Application=' + GlobalProperties.auth_token,
                },
                data : body
            };
        }
        else {
            config = {
                method: 'post',
                url: GlobalValues.HOST + endpoint,
                headers: { 
                    'Accept': '*/*', 
                    "content-type": "multipart/form-data",
                },
                data : body
            };
        }

        //timeout promise
        var timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(resolve, GlobalValues.CONNECTION_RETRY_TIME);
        });

        return (Promise.race([timeoutPromise, axios(config)]));
    }

    static handleNotFound(auth) {
        //if not found, if auth required, user kicked off
        if (auth) {
            GlobalProperties.is_logged_in = false;
            GlobalProperties.app_lazy_update();
        }
    }
    
    //get location
    static async getLocation() {
        //see if we have permission
        let permissionResult = await Location.getForegroundPermissionsAsync();
  
        var returnResult = {};

        //if we don't notify user
        if (permissionResult.status != 'granted') {
            returnResult = {
                granted: false,
                location: null,
            }
  
            return (returnResult);
        }
        
        var timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(resolve, GlobalValues.CONNECTION_RETRY_TIME);
        });
        
        var result;
          result = 
            await Promise.race([
                timeoutPromise,
                Location.getCurrentPositionAsync({
                  accuracy: Location.Accuracy.Low
                })
            ]);  
        
            
        if (result == null) {
            //if low setting, get high setting.
            //this prevents infinite reccursion
          
            result = await Location.getLastKnownPositionAsync();

            if (result == null) {
                returnResult = {
                    granted: true, 
                    location: null,
                };
            }
            else {
                returnResult = {
                    granted: true, 
                    location: result,
                };
  
                //send location to server for friend user
                var body = {
                  location: {
                    latitude: returnResult.location.coords.latitude,
                    longitude: returnResult.location.coords.longitude,
                  }
                }
      
                GlobalEndpoints.makePostRequest(true, "/api/User/Friends/UpdateUserInformation", body);

                //set initial location
                GlobalProperties.default_map_params = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: GlobalProperties.default_map_params.latitudeDelta,
                    longitudeDelta: GlobalProperties.default_map_params.longitudeDelta,
                };
            }          
        }
        else {
            returnResult = {
                granted: true, 
                location: result,
            };
  
            //send location to server for friend user
            var body = {
              location: {
                latitude: returnResult.location.coords.latitude,
                longitude: returnResult.location.coords.longitude,
              }
            }
  
            GlobalEndpoints.makePostRequest(true, "/api/User/Friends/UpdateUserInformation", body);

            //set initial location
            GlobalProperties.default_map_params = {
                latitude: returnResult.location.coords.latitude,
                longitude: returnResult.location.coords.longitude,
                latitudeDelta: GlobalProperties.default_map_params.latitudeDelta,
                longitudeDelta: GlobalProperties.default_map_params.longitudeDelta,
            };
        }
  
        return (returnResult);
    }
  
}