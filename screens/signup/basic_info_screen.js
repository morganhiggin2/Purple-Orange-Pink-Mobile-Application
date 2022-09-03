import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert} from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { GlobalEndpoints } from '../../global/global_endpoints';
import { GlobalValues, GlobalProperties } from '../../global/global_properties';
import { WebView } from 'react-native-webview';

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
        webview: {
            maxWidth: 200,
            height: 200
        },
        text_field: {
            width: "80%",
            backgroundColor: 'white',
            padding: 10,
            paddingVertical: 10,
            marginVertical: 8,
            color: 'darkgray',
            borderBottomWidth: 1,
            borderColor: 'gray'
        },
        title_text: {
            fontSize: 24,
            color: 'black',
            marginBottom: '0 %',
            marginLeft: '10%',
            padding: 5,
            width: '100%',
            fontFamily: "Roboto",
        },
        button: {
            borderRadius: 5,
            backgroundColor: GlobalValues.ORANGE_COLOR,
            borderColor: GlobalValues.ORANGE_COLOR,
            padding: 2,
            paddingVertical: 6,
            alignSelf: 'center',
            alignContent: 'center',
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
            marginTop: "5%",
        },
    }
);

export class BasicInfoScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            validationPassword: '',
            error_message: '',
            error_message: "",
            eulaColor: 'blue',
            viewedEULA: false
        };

        this.validateEmailAddress = this.validateEmailAddress.bind(this);
        this.validatePasswords = this.validatePasswords.bind(this);
        this.validateUsername = this.validateUserName.bind(this);
        this.validateAge = this.validateAge.bind(this);

        this.updateEmailAddress = this.updateEmailAddress.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateValidationPassword = this.updateValidationPassword.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.viewEULA = this.viewEULA.bind(this);
    }
    
    //attempt to login with the information in the text fields
    async register() {
        //validate username and password before
        if (!this.validateUserName() || !this.validateEmailAddress() || !this.validatePasswords()) {
            this.lazyUpdate();
            return;
        }

        //if they have not viewed the eula policy
        if (!this.state.viewedEULA) {
            this.state.error_message = "Must view EULA Policy";
            this.lazyUpdate();
            return;
        }

        //ask to make sure they are over 18, wait for response
        var validateAgeResult = false;
        
        await this.validateAge()
        .then((result) => {
            if (result) {
                validateAgeResult = true;
            }
            else {
                validateAgeResult = false;
            }
        })
        .catch((error) => {
            validateAgeResult = false;
        });

        //is not over 18, cannot join
        if (!validateAgeResult) {
            return;
        }

        //set error message
        this.state.error_message = "";

        var successful = false;

        var body = {
            "username": this.state.username,
            "email": this.state.email,
            "password": this.state.password,
            "expo_token": GlobalProperties.expo_push_token
        };

        var result = await GlobalEndpoints.makePostRequest(true, "/api/AccountManager/Register", body)
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
                    //go to next page
                    this.props.navigation.navigate("Profile Info");

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
                Alert.alert(JSON.stringify(result.response.data));
            }
            //handle not found case
            else if (result.response.status == 404) {
                GlobalEndpoints.handleNotFound(false);
            }
            else {
                this.state.error_message = "There seems to be a network connection issue.\nCheck your internet.";
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

    viewEULA() {
        this.setState({
            eulaColor: GlobalValues.DISTINCT_GRAY,
            viewedEULA: true
        });
        this.props.navigation.navigate("EULA Policy Screen");
    }

    lazyUpdate() {
        this.forceUpdate();
    }

    render () {
        return (
            <View style={main_styles.page}>
                <View style={main_styles.main_section}>
                    <Text style={main_styles.title_text}>
                        Create an Account
                    </Text>
                    <View style={main_styles.main_sub_section} >
                        <TextInput style={main_styles.text_field} onChangeText={(input)  => {this.updateUsername(input);}} textContentType="username" placeholder='Username' placeholderTextColor='gray' options={{}}/>
                        <TextInput style={main_styles.text_field} onChangeText={(input)  => {this.updateEmailAddress(input);}} textContentType="emailAddress" placeholder='Email' autoCorrect={false} placeholderTextColor='gray' options={{}}/>
                        <TextInput style={main_styles.text_field} onChangeText={(input)  => {this.updatePassword(input);}} textContentType="password" placeholder='Password' placeholderTextColor='gray' secureTextEntry={true}/>
                        <TextInput style={main_styles.text_field} onChangeText={(input)  => {this.updateValidationPassword(input);}} textContentType="password" placeholder='Confirm Password' placeholderTextColor='gray' secureTextEntry={true}/>
                    </View>
                    {this.renderErrorMessage()}
                    <WebView source={{ uri: 'https://reactnative.dev/' }} />
                    <TouchableHighlight style={[main_styles.button, {backgroundColor: this.state.eulaColor, borderColor: this.state.eulaColor}]} underlayColor={this.state.eulaColor} onPress={() => {this.viewEULA();}}>
                        <Text style={main_styles.button_text}>
                            View EULA Policy
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={main_styles.button} underlayColor={GlobalValues.ORANGE_COLOR} onPress={() => this.register()}>
                        <Text style={main_styles.button_text}>
                            Next
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    validateAge() {
        return (new Promise((resolve, reject) => {
            Alert.alert(
                "Verify Age",
                "Are you 18 years of age or older and agree to the terms and conditions of the eula agreement?\nClick confirm if so.",
                [
                    {
                        text: "Cancel",
                        onPress: () => {resolve(false)},
                        style: "cancel",
                    },
                    {
                        text: "Confirm",
                        onPress: () => {resolve(true)},
                        style: "default",
                    }
                ],
                {
                    cancelable: false
                }
            );
        }));
    }

    validateUserName() {
        if (this.state.username == "") {
            this.state.error_message = "Username field is empty";
            return false;
        }

        return true;
    }

    validateEmailAddress() {
        var re = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        
        if (this.state.email == "") {
            this.state.error_message = "Email field is empty";
            return false;
        }
        if (re.test(this.state.email)) {
            return true;
        }
        else {
            this.state.error_message = "Email is invalid";
            return false;
        }
    }
    
    validatePasswords(){
        if (this.state.password == "") {
            this.state.error_message = "Password field is empty";
            return false;
        }
        else if (this.state.validationPassword == "") {
            this.state.error_message = "Validation password field is empty";
            return false;
        }
        else if (this.state.password == this.state.validationPassword) {
            return true;
        }
        else {
            this.state.error_message = "Passwords do not match";
            return false;
        }
    }

    updateUsername(username) {
        this.state.username = username;
    }

    updatePassword(password) {
        this.state.password = password;
    }

    updateValidationPassword(validationPassword) {
        this.state.validationPassword = validationPassword;
    }

    updateEmailAddress(email) {
        this.state.email = email;
    }
}