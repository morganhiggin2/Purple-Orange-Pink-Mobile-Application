import React from "react";
import {Text, View, FlatList, StyleSheet, Alert} from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 
import {Feather} from '@expo/vector-icons'; 
import { GlobalProperties, GlobalValues } from "../../../../global/global_properties";
import { GlobalEndpoints } from "../../../../global/global_endpoints";

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: GlobalValues.DARKER_WHITE,
            height: '50%',
            width: '100%',
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
        },
        horizontal_bar: {
            width: '94%',
            alignSelf: 'center',
            borderBottomWidth: 1.5,
            borderColor: '#b8b8b8'
        },
    }
);

const selector_styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: "2%",
        paddingHorizontal: "3%",
        backgroundColor: 'white',
    },
    title_text: {
        alignSelf: 'flex-start',
        alignSelf: 'center',
        fontSize: 16,
        color: 'black',
    },
    arrow: {
        alignSelf: 'center'
    }
});

const actions_styles = StyleSheet.create(
    {
        body: {
            paddingVertical: "2%",
            paddingHorizontal: "3%",
        },
        actions_button:  {
            borderRadius: 3,
            borderWidth: 4,
            backgroundColor: GlobalValues.ORANGE_COLOR,
            borderColor: GlobalValues.ORANGE_COLOR,
            alignSelf: 'center',
            width: "100%",
        },
        action_button_inner: {
            flexDirection: "row",
            alignSelf: 'center',
        },
        action_button_icon: {
            marginRight: 5,
            alignSelf: 'center',
        },
        action_button_text: {
            color: 'white',
            fontSize: 18,
            alignSelf: 'center',
        }
    }
);

const section_styles = {
    body: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#b8b8b8',
    },
};


export class MainSettingsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.signOut = this.signOut.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);

        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    render() {
        const renderComponent = ({item}) => {
            return (
                <View>
                    <View style={section_styles.body}>
                        <TouchableHighlight underlayColor={"#b8b8b8"} onPress = {() => {this.props.navigation.navigate("Reset Password Screen");}}>
                            <View style={selector_styles.body}>
                                <Text style={selector_styles.title_text}>
                                    Reset Password
                                </Text>
                                <MaterialIcons name="keyboard-arrow-right" size={28} color="black" style={selector_styles.arrow}/>
                            </View>
                        </TouchableHighlight>
                        <View style={main_styles.horizontal_bar}/>
                        <TouchableHighlight underlayColor={"#b8b8b8"} onPress = {() => {this.props.navigation.navigate("Reset Email Screen");}}>
                            <View style={selector_styles.body}>
                                <Text style={selector_styles.title_text}>
                                    Reset Email
                                </Text>
                                <MaterialIcons name="keyboard-arrow-right" size={28} color="black" style={selector_styles.arrow}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={section_styles.body}>
                        <TouchableHighlight underlayColor={"#b8b8b8"} onPress = {() => {}}>
                            <View style={selector_styles.body}>
                                <Text style={selector_styles.title_text}>
                                    Notifications
                                </Text>
                                <MaterialIcons name="keyboard-arrow-right" size={28} color="black" style={selector_styles.arrow}/>
                            </View>
                        </TouchableHighlight>
                        <View style={main_styles.horizontal_bar}/>
                        <TouchableHighlight underlayColor={"#b8b8b8"} onPress = {() => {this.props.navigation.navigate("Privacy Screen");}}>
                            <View style={selector_styles.body}>
                                <Text style={selector_styles.title_text}>
                                    Privacy
                                </Text>
                                <MaterialIcons name="keyboard-arrow-right" size={28} color="black" style={selector_styles.arrow}/>
                            </View>
                        </TouchableHighlight>
                        <View style={main_styles.horizontal_bar}/>
                        <TouchableHighlight underlayColor={"#b8b8b8"} onPress = {() => {this.props.navigation.navigate("Contact Support Screen");}}>
                            <View style={selector_styles.body}>
                                <Text style={selector_styles.title_text}>
                                    Contact Support
                                </Text>
                                <MaterialIcons name="keyboard-arrow-right" size={28} color="black" style={selector_styles.arrow}/>
                            </View>
                        </TouchableHighlight>
                        <View style={main_styles.horizontal_bar}/>
                        <TouchableHighlight underlayColor={"#b8b8b8"} onPress = {() => {this.props.navigation.navigate("About Screen");}}>
                            <View style={selector_styles.body}>
                                <Text style={selector_styles.title_text}>
                                    About
                                </Text>
                                <MaterialIcons name="keyboard-arrow-right" size={28} color="black" style={selector_styles.arrow}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={section_styles.body}>
                        <TouchableHighlight underlayColor={"#b8b8b8"} onPress = {() => {signOutAlert(this.signOut);}}>
                            <View style={selector_styles.body}>
                                <Text style={selector_styles.title_text}>
                                    Sign Out
                                </Text>
                                <MaterialIcons name="keyboard-arrow-right" size={28} color="black" style={selector_styles.arrow}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                        <View style={section_styles.body}> 
                            <View style={actions_styles.body}>
                                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {deleteAccountAlert(this.deleteAccount)}}>
                                    <View style={actions_styles.action_button_inner}>
                                        <Feather name="edit" size={20} color="white" style={actions_styles.action_button_icon}/>
                                        <Text style={actions_styles.action_button_text}>
                                            Delete Account
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                </View>
            );
        };

        return (
            <View style={[main_styles.page, {flex: 1}]}>
                <FlatList data={[{id: 1}]} keyExtractor={() => "dummy"} listEmptyComponent={null} renderItem={renderComponent} style={{zIndex: 99, flex: 1}}/>
            </View>
        );
    }

    async deleteAccount() {

    }

    async signOut() {
        if (this.state.reload) {
            this.state.reload = false;

            //reload to now hide reload button
            this.lazyUpdate();
        }

        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/AccountManager/LogOut")
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
                GlobalProperties.is_logged_in = false;
                
                GlobalProperties.put_key_value_pair("User_PurpleOrangePink_Api_Token", "");
                GlobalProperties.put_key_value_pair("User_Password", "");
                GlobalProperties.app_connect();

                return;
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
                this.lazyUpdate();
            
                return;
            }
            else if (result.response.status == 400 && result.response.data) {
                Alert.alert(result.response.data);
                return;
            }
            //handle not found case
            else if (result.response.status == 404) {
                this.lazyUpdate();
                GlobalEndpoints.handleNotFound(false);
            }
            else {
                this.lazyUpdate();
                return;
            }
        }

        //once done, lazy update
        this.lazyUpdate();
    }

    //update the screen
    lazyUpdate() {
        this.forceUpdate();
    }
}
 
const deleteAccountAlert = (deleteAccount) => {
    Alert.alert(
        "Delete",
        "Are you sure you want to delete your account? There is no going back.",
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "Delete",
                onPress: () => {deleteAccount();},
            }
        ],
        {
            cancelable: true,
        }
    );
}

const signOutAlert = (signOut) => {
    Alert.alert(
        "Delete",
        "Are you sure you want to sign out?",
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "Sign Out",
                onPress: () => {signOut();},
            }
        ],
        {
            cancelable: true,
        }
    );
}