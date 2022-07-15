import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert, FlatList} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { GlobalValues, GlobalProperties } from '../../global/global_properties';
import { GlobalEndpoints } from '../../global/global_endpoints';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: 'white',
            height: '100%',
        },
        sub_section: {
            marginTop: '10%',
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
            borderColor: GlobalValues.DARKER_WHITE,
        },
        title_text: {
            alignSelf: 'center',
            fontSize: 24,
            color: 'gray',
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
            alignContent: 'center',
            width: '80%',
            marginBottom: "5%",
        },
        button_text: {
            color: 'white',
            fontFamily: 'Roboto',
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
        horizontal_bar: {
            width: '94%',
            alignSelf: 'center',
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE,
        }
    }
);

const section_styles = StyleSheet.create({
    body: {
        marginTop: "10%",
        backgroundColor: 'white',
    },
    gap: {
        height: 30,
    }
});

const info_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white', //#FFCDCD
        borderRadius: 5,
        paddingVertical: 4,
        marginVertical: "2%",
    }
});

const attribute_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flexDirection: "column",
        width: "80%",
        alignSelf: 'center',
        marginVertical: 8,
        paddingVertical: 10,
    },
    input_text_view: {
        flexDirection:  'row',
    },
    multiline_input_text: {
        fontSize: 18, 
        maxHeight: "96px", 
        textAlignVertical: "top",
    },
    title_text: {
        alignSelf: 'flex-start',
        fontSize: 16,
        color: 'black',
        marginBottom: 6,
        fontFamily: "Roboto",
    },
    text_input: {
        textAlignVertical: "top",
        flex: 1,
        maxHeight: 92,
        paddingVertical: 2,
        paddingHorizontal: 4,
        backgroundColor: 'white',
        borderColor: 'black',
        borderBottomWidth: 1,
        borderRadius: 4,
        fontFamily: "Roboto",
    },
    slider: {
        alignSelf: 'center',
    },
    title_with_value: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title_value: {
        fontFamily: "Roboto",
        fontSize: 16,
        alignSelf: 'center'
    }
});

export class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for the date selector
            username: GlobalProperties.user_name,

            error_message: "",
        }

        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.updateUsername =this.updateUsername.bind(this);
        this.sendForgotPassword = this.sendForgotPassword.bind(this);
    }

    
    //attempt to login with the information in the text fields
    async register() {
        //validate username and password before
        if (!this.validateFirstName() || !this.validateLastName() || !this.validateBirthDate() || !this.validateGender()) {
            this.lazyUpdate();
            return;
        }

        //set error message
        this.state.error_message = "";

        var body = {
            "birthdate": this.state.date.getDate() + "/" + (this.state.date.getMonth() + 1) + "/" + this.state.date.getFullYear(),
            "gender": this.state.gender_dropdown_value,
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
        };

        //if request was successful
        var successful = false;
        //make request        
        var result = await GlobalEndpoints.makePostRequest(true, "/api/User/Generic/UpdateUserInformation", body)
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
                //send validate email request
                if ((await this.validateEmail())) {
                    //go to next page

                    this.props.navigation.navigate("Validate Email Screen");
                }
            }
            else {
                //returned bad response, fetch server generated error message

                Alert.alert(result.data);
                return;
            }
        }
        else {

            //invalid request
            if (result == undefined) {
                Alert.alert("There seems to be a network connection issue.\nCheck your internet.");            
                return;
            }
            else if (result.response.status == 400 && result.response.data) {
                this.state.error_message = result.response.data;
                this.lazyUpdate();
                return;
            }
            //handle not found case
            else if (result.response.status == 404) {
                GlobalEndpoints.handleNotFound(false);
            }
            else {
                Alert.alert("There seems to be a network connection issue.\nCheck your internet.");
                return;
            }
        }
    }

    
    async sendForgotPassword() {

        if (!this.validateUsername()) {
            this.lazyUpdate();
            return;
        }

        GlobalProperties.user_name = this.state.username;

        var successful = false;

        var result = await GlobalEndpoints.makeGetRequest(true, "/api/AccountManager/ForgotPassword?username=" + this.state.username)
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
                this.props.navigation.navigate("Validate Password Keycode Screen");

                return true;
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
                Alert.alert(result.data);
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

        return false;
    }

    render() {
        const renderComponent = ({item}) => {
            return (
                <View>
                    <View style={info_styles.body}>
                        <View style={attribute_styles.body}>
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={attribute_styles.text_input} onChangeText={(input)  => {this.updateUsername(input);}}  placeholderTextColor="gray" placeholder="Username" editable={true} maxLength={160}/>
                            </View>
                        </View>
                        {this.renderErrorMessage()}
                    </View>
                    <View style={section_styles.gap} />
                    <View style={info_styles.body}>
                        
                    </View>

                    <View style={section_styles.gap} />
                    <View style={section_styles.gap} />
                    <View style={section_styles.gap} />
                </View>
            );
        };

        return (
            <View style={[main_styles.page, {flex: 1}]}>
                <FlatList data={[{id: 1}]} keyExtractor={() => "dummy"} listEmptyComponent={null} renderItem={renderComponent} style={{zIndex: 99, flex: 1}}/>
                  <TouchableHighlight style={main_styles.button} underlayColor="#FFE1D6" onPress={() => {this.sendForgotPassword()}}>
                      <Text style={main_styles.button_text} underlayColor="#ffb59c">
                          Next
                      </Text>
                  </TouchableHighlight>
            </View>
        );
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
    
    validateUsername() {
        if (this.state.username == "") {
            this.state.error_message = "Username field is empty";
            return false;
        }

        return true;
    }

    //update the screen
    lazyUpdate() {
        this.forceUpdate();
    }

    //update first name
    updateUsername(value) {
        this.state.username = value;
    }
}