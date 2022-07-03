import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, Alert} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
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
            width: '100%'
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
        },
        error_message: {
            color: 'red',
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
        };

        this.validateEmailAddress = this.validateEmailAddress.bind(this);
        this.validatePasswords = this.validatePasswords.bind(this);
        this.validateUsername = this.validateUserName.bind(this);
        this.validateAge = this.validateAge.bind(this);

        this.updateEmailAddress = this.updateEmailAddress.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateValidationPassword = this.updateValidationPassword.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
    }
    
    //attempt to login with the information in the text fields
    async register() {
        //validate username and password before
        if (!this.validateUserName() || !this.validateEmailAddress() || !this.validatePasswords()) {
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

                //get token
                var token = reg.exec(result["request"]["responseHeaders"]["set-cookie"])[0];

                //avoid delimiters
                token = token.substring(1, token.length - 1);

                //if not null
                if (token) {
                    //add token to local
                    GlobalProperties.auth_token = JSON.stringify(token);

                    var json = JSON.stringify(result);

                    //set username and password
                    GlobalProperties.put_key_value_pair("User_Username", JSON.stringify(this.state.username));
                    GlobalProperties.put_key_value_pair("User_Password", JSON.stringify(this.state.password));
                    GlobalProperties.put_key_value_pair("User_PurpleOrangePink_Api_Token", JSON.stringify(GlobalProperties.auth_token));
    
                    //go to next page
                    this.props.navigation.navigate("Profile Info");
                }
                else {
                    this.state.error_message = "Could not get token";
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
                Alert.alert(result.response.data);
            }
            //handle not found case
            else if (result.response.status == 404) {
                GlobalEndpoints.handleNotFound(false);
            }
            else {
                this.state.error_message = "There seems to be a network connection issue.\nCheck your internet.";
            }
        }

        //result.hasOwnProperty("")

        this.lazyUpdate();

        /*
        //check if the email is valid
        if (!this.validateEmailAddress()) {
            this.state.error_message = "Email is invalid";
            this.renderErrorMessage();
        }

        //check if passwords match
        if (!this.validatePasswords()) {
            this.state.error_message = "Passwords do not match";
            this.renderErrorMessage();
        }

        //make the call to the server and see if it exists
        var result = GlobalEndpoints.makePostRequest(false, "/api/AccountManager/Register");

        if (typeof(result) == 'string') {
            console.log(result);
            //something bad happened
        }
        else {
            //we must have got json back then
             to check if json has property, use
            
            if(result.hasOwnProperty(""))
            {

            }

            
        }

        //if it does exist, redirect to the next page, else, show error
        var successful = true;

        if (successful) {
            //set login to true, feeding it the auth token
            //refesh the app page so it can reload (did it in some other file in this program altough i forget which one)
            this.props.navigation.navigate("Profile Info")
        }
        else {
            //show the error message (maybe get it from the request to the server for specifid like invlid username or invalid password)
            this.state.error_message = "Invalid Login Information"
        }

        this.lazyUpdate();*/

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

//(input)  => {this.state.updateUsername(input);
// onChangeText={(input) => {this.state.username = input}}

    render () {
        return (
            <View style={main_styles.page}>
                <View style={main_styles.main_section}>
                    <Text style={main_styles.title_text}>
                        Create an Account
                    </Text>
                    <View style={main_styles.main_sub_section} >
                        <TextInput style={main_styles.text_field} onChangeText={(input)  => {this.updateUsername(input);}} textContentType="username" placeholder='Username' placeholderTextColor='gray' options={{}}/>
                        <TextInput style={main_styles.text_field} onChangeText={(input)  => {this.updateEmailAddress(input);}} textContentType="emailAddress" placeholder='Email' placeholderTextColor='gray' options={{}}/>
                        <TextInput style={main_styles.text_field} onChangeText={(input)  => {this.updatePassword(input);}} textContentType="password" placeholder='Password' placeholderTextColor='gray' secureTextEntry={true}/>
                        <TextInput style={main_styles.text_field} onChangeText={(input)  => {this.updateValidationPassword(input);}} textContentType="password" placeholder='Confirm Password' placeholderTextColor='gray' secureTextEntry={true}/>
                    </View>
                    {this.renderErrorMessage()}
                    <TouchableHighlight style={main_styles.button} underlayColor={GlobalValues.ORANGE_COLOR} onPress={() => this.register()}>
                        <Text style={main_styles.button_text} underlayColor={GlobalValues.ORANGE_COLOR}>
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
                "Are you 18 years of age or older?\nClick confirm if so.",
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

    //make sure it is valid email address
}