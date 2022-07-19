import axios from 'axios';
import React from 'react';
import {StyleSheet, View, Text, TextInput, Platform} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GlobalEndpoints } from '../../global/global_endpoints';
import { GlobalValues, GlobalProperties } from '../../global/global_properties';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
        },
        main_section: {
            marginTop: '10%',
        },
        main_sub_section: {
            alignItems: 'center',
        },
        text_field: {
            width: "80%",
            backgroundColor: 'white',
            padding: 10,
            marginVertical: 8,
            borderBottomWidth: 1,
            borderColor: 'gray'
        },
        title_text: {
            fontFamily: 'Roboto',
            fontSize: 24,
            color: 'black',
            marginLeft: '10%',
            padding: 5,
            fontFamily: "Roboto",
        },
        button: {
            borderRadius: 5,
            backgroundColor: GlobalValues.ORANGE_COLOR,
            borderColor: GlobalValues.ORANGE_COLOR,
            padding: 2,
            paddingVertical: 6,
            alignSelf: 'center',
            width: '80%',
            marginTop: "5%",
        },
        button_text: {
            color: 'white',
            fontSize: 18,
            alignSelf: 'center',
            fontFamily: "Roboto",
        },
        error_message: {
            color: 'red',
            fontFamily: 'Roboto',
            fontSize: 12,
            alignSelf: 'center',
            textAlign: 'center',
        },
    }
);

export class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: GlobalProperties.user_name,
            password: "",
            error_message: "",
        };

        this.lazyUpdate = this.lazyUpdate.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    onChangeUsername(input) {
        this.state.username = input
    }

    onChangePassword(input) {
        this.state.password = input
    }

    //attempt to login with the information in the text fields
    async log_in() {

        //validate username and password before
        if (!this.validatePassword() || !this.validateUsername()) {
            this.lazyUpdate();

            return;
        }

        //set error message
        this.state.error_message = "";
        
        var successful = false;

        var body = {
            "userName": this.state.username,
            "password": this.state.password,
            "expo_token": GlobalProperties.expo_push_token
        };

        var result = await GlobalEndpoints.makePostRequest(false, "/api/AccountManager/LogIn", body)
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
                this.state.error_message = "Internet connection is unstable\n or Server is down for matainance"; 
                return(error);
            });

        //if there is no error message, request was good
        if (successful) {

            //if result status is ok
            if (result.request.status ==  200) {
                //regex expression
                var reg = RegExp("\=(.*?)\;");

                var token = "";

                //get token
                if (Platform.OS == 'ios') {
                    token = reg.exec(result["request"]["responseHeaders"]["Set-Cookie"])[0];
                }
                else {
                    token = reg.exec(result["request"]["responseHeaders"]["set-cookie"])[0];
                }

                //avoid delimiters
                token = token.substring(1, token.length - 1);

                //if not null
                if (token) {
                    //add token to local
                    GlobalProperties.auth_token = token;

                    //add username and password to memory to memory
                    GlobalProperties.put_key_value_pair("User_Username", JSON.stringify(this.state.username));
                    GlobalProperties.put_key_value_pair("User_PurpleOrangePink_Api_Token", GlobalProperties.auth_token);
                    GlobalProperties.user_id = JSON.parse(result.request.response).user_id;

                    //set logged in to true
                    GlobalProperties.is_logged_in = true;

                    //update app screen
                    GlobalProperties.app_lazy_update();

                    //return
                    return;
                }
                //something went wrong, this should not happen
                else {
                    this.state.error_message = "Try again, an error occured";
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
                Alert.alert("There seems to be a network connection issue.\nCheck your internet.");
                return;
            }
            //invalid request
            if (result.response.status == 400 && result.response.data) {
                this.state.error_message = result.response.data;
                this.lazyUpdate();
            }
            //handle not found case
            else if (result.response.status == 404) {
                GlobalEndpoints.handleNotFound(false);
            }
        }

        this.lazyUpdate();
    }

    //render the error message if there is one 
    renderErrorMessage() {
        if (this.state.error_message != "") {
            return (
                <Text style={main_styles.error_message}>
                    {this.state.error_message}
                </Text>
            );
        }
        else {
            return(
                <View style={{height: 0}} />
            );
        }
    }

    lazyUpdate() {
        this.forceUpdate();
    }

    render () {
        return (
            <View style={main_styles.page}>
                <View style={main_styles.main_section}>  
                    <Text style={main_styles.title_text}>
                        Log in
                    </Text>
                    <View style={main_styles.main_sub_section} >
                        <TextInput style={main_styles.text_field} autoComplete={"username"} textContentType="username" placeholder='Username' defaultValue={this.state.username} placeholderTextColor='gray' onChangeText={(input) => this.onChangeUsername(input)} options={{}}/>
                        <TextInput style={main_styles.text_field} autoComplete={"password"} textContentType="password" placeholder='Password' placeholderTextColor='gray' onChangeText={(input) => this.onChangePassword(input)} secureTextEntry={true}/>
                    </View>
                    {this.renderErrorMessage()}
                    <TouchableOpacity activeOpacity={GlobalValues.ACTIVE_OPACITY} style={main_styles.button} underlayColor="#FFE1D6" onPress={() => this.log_in()}>
                        <Text style={main_styles.button_text}>
                            Next
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={GlobalValues.ACTIVE_OPACITY} underlayColor="#FFE1D6" style={main_styles.button} onPress={() => {this.props.navigation.navigate("Forgot Password Screen");}}>
                        <Text style={main_styles.button_text}>
                            Forgot Password
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    validateUsername() {
        if (this.state.username == "") {
            this.state.error_message = "Empty username field";

            return false;
        }

        return true;
    }

    validatePassword() {
        if (this.state.password == "") {
            this.state.error_message = "empty password field";

            return false;
        }

        return true;
    }
}