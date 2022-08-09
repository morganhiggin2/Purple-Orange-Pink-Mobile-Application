import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert, FlatList, TouchableHighlight} from 'react-native';

import { GlobalProperties, GlobalValues } from '../../../../global/global_properties.js';
import { GlobalEndpoints } from '../../../../global/global_endpoints.js';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: GlobalValues.DARKER_WHITE,
            height: '50%',
            flexDirection: "column",
            flex: 1,
        },
        sub_section: {
            marginTop: '10%',
        },
        title_text: {
            alignSelf: 'center',
            fontSize: 24,
            color: 'gray',
            padding: 5,
            fontFamily: 'Roboto'
        }, 
        horizontal_bar: {
            width: '94%',
            alignSelf: 'center',
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE,
        },
        error_message: {
            color: 'red',
            fontFamily: 'Roboto',
            fontSize: 12,
            alignSelf: 'center',
            textAlign: 'center',
        }
    }
);

const section_styles = StyleSheet.create({
    body: {
        marginTop: "10%",
        backgroundColor: "white",
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
        marginVertical: "3%",
        marginHorizontal: '2%'
    }
});

const attribute_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flexDirection: "column",
        paddingVertical: "3%",
        paddingHorizontal: "3%",
    },
    input_text_view: {
        flexDirection:  'row',
    },
    multiline_input_text: {
        fontSize: 18, 
        fontFamily: 'Roboto',
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
        flex: 1,
        maxHeight: 95,
        paddingVertical: 4,
        paddingHorizontal: 4,
        backgroundColor: GlobalValues.SEARCH_TEXT_INPUT_COLOR,
        fontSize: 16,
        fontFamily: 'Roboto',
        borderRadius: 4,
    },
    slider: {
        alignSelf: 'center',
    },
    title_with_value: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title_value: {
        fontSize: 16,
        fontFamily: 'Roboto',
        alignSelf: 'center'
    },
});

const post_button_styles = StyleSheet.create({
    button_view: {
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row-reverse',
    },
    button: {
        flexDirection: "row",
        alignItems: 'flex-start',
        borderRadius: 5,
        backgroundColor: GlobalValues.ORANGE_COLOR,
        borderColor: GlobalValues.ORANGE_COLOR,
        paddingHorizontal: 20,
        paddingVertical: 4,
        alignSelf: 'center',
        alignContent: 'center',
    },
    button_text: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center',
    }
});

export class ResetPasswordScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for loading screen
            loading: true,
            reload: false,

            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",

            error_message: "",

            updateMade: false,
        }

        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.updateOldPassword = this.updateOldPassword.bind(this);
        this.updateNewPassword = this.updateNewPassword.bind(this);
        this.updateNewPasswordConfirm = this.updateNewPasswordConfirm.bind(this);
        this.updateUpdateMade = this.updateUpdateMade.bind(this);
        this.validateFields =this.validateFields.bind(this);
        this.syncUpdates = this.syncUpdates.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {

    }

    render() {

        const renderComponent = ({item}) => {
            return (
                <View>
                    <View style={info_styles.body}>
                        <View style={attribute_styles.body}>
                            <Text style={attribute_styles.title_text}>
                                Old Password
                            </Text>
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={attribute_styles.text_input} autoComplete={"password"} secureTextEntry={true} textContentType={"password"} placeholderTextColor="black" editable={true} maxLength={160} onChangeText={(value) => {this.updateOldPassword(value);}}/>
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={attribute_styles.body}>
                            <Text style={attribute_styles.title_text}>
                                New Password
                            </Text>
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={attribute_styles.text_input} placeholderTextColor="black" secureTextEntry={true} textContentType={"password"} editable={true} maxLength={160} onChangeText={(value) => {this.updateNewPassword(value);}}/>
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={attribute_styles.body}>
                            <Text style={attribute_styles.title_text}>
                                Confirm
                            </Text>
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={attribute_styles.text_input} placeholderTextColor="black" secureTextEntry={true} textContentType={"password"} editable={true} maxLength={160} onChangeText={(value) => {this.updateNewPasswordConfirm(value);}}/>
                            </View>
                        </View>
                    </View>
                    {this.renderErrorMessage()}
                    <View style={section_styles.gap} />
                    <View style={section_styles.gap} />
                    <View style={section_styles.gap} />
                </View>
            );
        };

        return (
            <View style={[main_styles.page, {flex: 1}]}>
                <FlatList data={[{id: 1}]} keyExtractor={() => "dummy"} listEmptyComponent={null} renderItem={renderComponent} style={{zIndex: 99, flex: 1}}/>
                <View style={post_button_styles.button_view}>
                    {this.state.updateMade ? (
                        <TouchableHighlight style={post_button_styles.button} underlayColor={'#ff6e6e'} onPress={() => {this.syncUpdates()}}>
                            <Text style={post_button_styles.button_text}>
                                Save Updates
                            </Text>
                        </TouchableHighlight>
                    ) : (
                        <View/>
                    )}
                </View>
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
    
    updateOldPassword(value) {
        this.state.oldPassword = value;
        this.updateUpdateMade(false);
    }

    updateNewPassword(value) {
        this.state.newPassword = value;
        this.updateUpdateMade(false);
    }

    updateNewPasswordConfirm(value) {
        this.state.confirmNewPassword = value;
        this.updateUpdateMade(false);
    }

    validateFields(updatedPassword) {
        if (updatedPassword) {
            if (this.state.oldPassword == "") {
                this.state.error_message = "Old password is empty";
                return false;
            }
            else if (this.state.newPassword == "") {
                this.state.error_message = "New password is empty";
                return false;
            }
            else if (this.state.confirmNewPassword == "") {
                this.state.error_message = "Confirm password is empty";
                return false;
            }
            else if (this.state.newPassword != this.state.confirmNewPassword) {
                this.state.error_message = "Confirm password and new password do not match";
                return false;
            }
        }

        return true;
    }

    updateUpdateMade(mustUpdate) {
        if (!this.state.updateMade || mustUpdate) {
            this.state.updateMade = true;
            this.lazyUpdate();
        }
        else{
            this.state.updateMade = true;
        }
    }

    //update the screen
    lazyUpdate() {
        this.forceUpdate();
    }

    async syncUpdates() {
        var updatedPassword = (this.state.oldPassword != "" || this.state.newPassword != "" || this.state.confirmNewPassword != "");

        //if no updates were made
        if (!updatedPassword) {
                //set return screen values
                GlobalProperties.screen_props = null;
                GlobalProperties.return_screen = "Reset Password Screen";

                //once done, go back
                this.props.navigation.pop(1);
        }

        if (!(await this.validateFields(updatedPassword))) {
            this.lazyUpdate();
            return;
        }

        //add elements
        //make body with requried elements
        var body = {
            old_password: this.state.oldPassword,
            new_password: this.state.newPassword
        };    

        //if request was successful
        var successful = false;

        //make request        
        var result = await GlobalEndpoints.makePostRequest(true, "/api/AccountManager/ResetPassword", body)
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
                //set return screen values
                GlobalProperties.screen_props = null;
                GlobalProperties.return_screen = "Account Info Screen";

                //once done, go back
                this.props.navigation.pop(1);
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

    showError(error) {
        Alert.alert(
            error
        );
    }
}