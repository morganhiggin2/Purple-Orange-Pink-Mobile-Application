import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert, FlatList, TouchableHighlight} from 'react-native';

import { GlobalProperties, GlobalValues } from '../../../../global/global_properties.js';
import { GlobalEndpoints } from '../../../../global/global_endpoints.js';
import { LoadingScreen } from '../../../misc/loading_screen.js';

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
        textAlignVertical: "top",
        flex: 1,
        maxHeight: 95,
        paddingVertical: 4,
        paddingHorizontal: 4,
        backgroundColor: '#EAEAEA',
        borderRadius: 8,
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

const inline_attribute_styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: "3%",
        paddingHorizontal: "3%",
    },
    title_text: {
        alignSelf: 'flex-start',
        alignSelf: 'center',
        fontSize: 16,
        color: 'black',
        fontFamily: 'Roboto'
    },
    input_text_view: {
        flexDirection:  'row',
        width: "70%",
    },
    text_input: {
        textAlignVertical: "center",
        paddingVertical: 2,
        paddingHorizontal: 4,
        width: '100%',
        
        textAlign: 'right',
        backgroundColor: GlobalValues.DARKER_OUTLINE,
        borderRadius: 4,
        fontSize: 16, 
    },
    numeric_text_input: {
        textAlignVertical: "center",
        paddingVertical: 4,
        paddingHorizontal: 4,
        width: 100,
        backgroundColor: '#EAEAEA',
        borderRadius: 4,
        textAlign: 'left',
        fontSize: 18,
        textAlign: 'right',
    },
    numeric_input_text_view: {
        flexDirection:  'row',
        width: "70%",
        justifyContent: 'flex-end'
    },
    drop_down_selector: {
        paddingHorizontal: 4,
    },
    drop_down_selector_gap: {
        height: 100,
    },
    date_picker: {
        width: 200,
    }
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

export class ResetEmailScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for loading screen
            loading: true,
            reload: false,

            newEmail: "",
            newEmailConfirm: "",

            updateMade: false,
        }

        this.fetchEmail = this.fetchEmail.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updateEmailConfirm = this.updateEmailConfirm.bind(this);
        this.updateUpdateMade = this.updateUpdateMade.bind(this);
        this.validateFields =this.validateFields.bind(this);
        this.syncUpdates = this.syncUpdates.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if (GlobalProperties.return_screen == "Validate Reset Email Screen" && GlobalProperties.screen_props != null) {
                if (GlobalProperties.screen_props.validated) {
                    this.fetchEmail();
                }
            }

            GlobalProperties.screenActivated();
        });

        this.fetchEmail();
    }

    async fetchEmail() {
        if (this.state.reload) {
            this.state.reload = false;

            //reload to now hide reload button
            this.lazyUpdate();
        }

        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/AccountManager/GetEmail")
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
                //get request body
                var email = JSON.parse(result.request.response).email;

                this.state.email = email;

                this.state.loading = false;

                this.lazyUpdate();
            }
            else {
                //returned bad response, fetch server generated error message
                //and set 
                Alert.alert(result.data);
                return;
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
                Alert.alert(JSON.stringify(result.response.data));
                return;
            }
            //handle not found case
            else if (result.response.status == 404) {
                this.state.reload = true;
                this.lazyUpdate();
                GlobalEndpoints.handleNotFound(false);
            }
            else {
                this.state.reload = true;
                this.lazyUpdate();
                return;
            }
        }

        //once done, lazy update
        this.lazyUpdate();
    }

    render() {
        const renderComponent = ({item}) => {
            return (
                <View>
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Current Email
                            </Text>
                            <View style={[inline_attribute_styles.input_text_view, {flexDirection: 'row-reverse'}]}>
                                <Text style={inline_attribute_styles.title_text}>
                                    {this.state.email}
                                </Text>
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={attribute_styles.body}>
                            <Text style={attribute_styles.title_text}>
                                New Email
                            </Text>
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={attribute_styles.text_input} keyboardType={"email-address"} textContentType={"emailAddress"} placeholderTextColor="black" editable={true} maxLength={160} onChangeText={(value) => {this.updateEmail(value);}}/>
                            </View>
                        </View>
                        <View style={attribute_styles.body}>
                            <Text style={attribute_styles.title_text}>
                                Confirm
                            </Text>
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={attribute_styles.text_input} keyboardType={"email-address"} textContentType={"emailAddress"} placeholderTextColor="black" editable={true} maxLength={160} onChangeText={(value) => {this.updateEmailConfirm(value);}}/>
                            </View>
                        </View>
                    </View>
                    <View style={section_styles.gap} />
                    <View style={section_styles.gap} />
                    <View style={section_styles.gap} />
                </View>
            );
        };

        if (this.state.loading) {
            return (
                <LoadingScreen tryAgain={this.fetchActivityInformation } reload={this.state.reload}/>
            );
        }
        else {
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
    }

    updateEmail(value) {
        this.state.newEmail = value;
        this.updateUpdateMade(false);
    }

    updateEmailConfirm(value) {
        this.state.newEmailConfirm = value;
        this.updateUpdateMade(false);
    }

    validateFields(updatedEmail) {
        if (updatedEmail) {
            if (this.state.newEmail != this.state.newEmailConfirm) {
                this.state.error_message = "New email and confirm email do not match";
                return false;
            }

            var re = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        
            if (this.state.newEmail == "") {
                this.state.error_message = "New Email field is empty";
                return false;
            }
            if (!re.test(this.state.newEmail)) {
                this.state.error_message = "New Email is invalid";
                return false;
            }
            
            if (this.state.newEmailConfirm == "") {
                this.state.error_message = "Confirm Email field is empty";
                return false;
            }
            if (!re.test(this.state.newEmailConfirm)) {
                this.state.error_message = "Confirm Email is invalid";
                return false;
            }

            return true;
        }
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
        var updatedEmail = (this.state.newEmail != "" || this.state.newEmailConfirm != "");

        if (!(await this.validateFields(updatedEmail))) {
            Alert.alert(this.state.error_message);
            return;
        }

        //add elements
        //make body with requried elements
        var body = {
            "email": this.state.newEmail
        };

        //if request was successful
        var successful = false;
        //make request        
        var result = await GlobalEndpoints.makePostRequest(true, "/api/AccountManager/RequestToVerifyEmail", body)
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
                this.props.navigation.navigate("Validate Reset Email Screen")
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
                Alert.alert(JSON.stringify(result.response.data));
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