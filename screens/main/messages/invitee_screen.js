import React from 'react';
import {StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AntDesign} from '@expo/vector-icons'; 
import { GlobalProperties, GlobalValues } from '../../../global/global_properties';
import { GlobalEndpoints } from '../../../global/global_endpoints';
import { LoadingScreen } from '../../misc/loading_screen';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: GlobalValues.DARKER_WHITE, //#FFEDE7
            height: '100%',
            width: '100%',
        },
        sections: {
            flexDirection: "column",
            justifyContent: "space-between",
        },
        sub_section: {
            marginTop: '10%',
        },
        title_text: {
            alignSelf: 'center',
            fontFamily: 'Roboto',
            fontSize: 24,
            color: 'black',
            padding: 5,
            marginBottom: 5,
        }, 
        name_text: {
            alignSelf: 'center',
            fontFamily: 'Roboto',
            fontSize: 20,
            color: 'black',
            marginTop: 10,
        },
        name_view: {
            flexDirection: 'row',
            justifyContent: 'center',
        },
        horizontal_bar: {
            width: '94%',
            alignSelf: 'center',
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE
        },
        scroll_view: {
            backgroundColor: GlobalValues.DARKER_WHITE,
        },
    }
);

const info_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white', //#FFCDCD
        marginHorizontal: 8,
        borderRadius: 4,
        marginVertical: 16
    }
});

const actions_styles = StyleSheet.create(
    {
        body: {

        },
        actions_button:  {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
            paddingHorizontal: 10,
        },
        action_button_inner: {
        },
        action_button_icon: {
        },
        action_button_text: {
            color: 'black',
            fontFamily: 'Roboto',
            fontSize: 16,
        }
    }
);

const attribute_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flexDirection: "column",
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    input_text_view: {
        flexDirection:  'row',
        marginBottom: 4,
    },
    multiline_input_text: {
        fontSize: 14, 
        maxHeight: "96px", 
        textAlignVertical: "top",
        fontFamily: 'Roboto'
    },
    title_text: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontFamily: 'Roboto',
        color: 'black',
        marginBottom: 2,
    },    
    text_input: {
        textAlignVertical: "top",
        flex: 1,
        maxHeight: 95,
        borderRadius: 8,
        fontFamily: 'Roboto'
    },
    inner_text: {
        color: 'gray',
        fontSize: 14,
        marginHorizontal: 4,
        fontFamily: 'Roboto'
    },
    slider: {
        alignSelf: 'center',
    },
    title_with_value: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title_value: {
        fontSize: 14,
        alignSelf: 'center',
        fontFamily: 'Roboto'
    }
});

export class InviteeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: this.props.route.params._id,
            sub_header_id: this.props.route.params.sub_header_id,
            invitation_id: this.props.route.params.invitation_id,
            body: this.props.route.params.body,

            //for loading screen
            loading: true,
            reload: false, 
        };

        
        this.state.other_id = this.props.route.params.other_id;

        this.fetchInvitationData = this.fetchInvitationData.bind(this);
        this.acceptInvitation = this.acceptInvitation.bind(this);
        this.removeInvitation = this.removeInvitation.bind(this);

        //once done, lazy update
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    async log_in() {
        
    }
    
    componentDidMount() {
        //init

        //fetch data
        this.fetchInvitationData();
    }

    async fetchInvitationData() {

        if (this.state.reload) {
            this.state.reload = false;
    
            //reload to now hide reload button
            this.lazyUpdate();
        }

        //fetch subheader data
        this.state.subHeader = await GlobalProperties.messagesHandler.getInvitationInformation(this.state.sub_header_id);

        this.state.invitation_id = this.state.subHeader.invitation_id;
        this.state.other_id = this.state.subHeader.other_id;
        this.state.other_type = this.state.subHeader.other_type;
        this.state.loading = false;

        //once done, lazy update
        this.lazyUpdate();
    }

    render() {
        var renderViewOther = {};

        if (this.state.other_type == "person")
        {
            renderViewOther = (
                <View>
                    <View style={main_styles.horizontal_bar} />
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.navigation.navigate("Other Explore Profile Screen", {id: this.state.other_id});}}>
                        <Text style={actions_styles.action_button_text}>
                            View Profile
                        </Text>
                        <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                    </TouchableOpacity>
                </View>
            );
        }
        else if (this.state.other_type == "activity") {
            renderViewOther = (
                <View>
                    <View style={main_styles.horizontal_bar} />
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.navigation.navigate("Other Activity Screen", {id: this.state.other_id});}}>
                        <Text style={actions_styles.action_button_text}>
                            View Activity
                        </Text>
                        <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            renderViewOther = (<View />);
        }
        
        if (this.state.loading == true || this.state.loading == null) {
            return (
                <LoadingScreen tryAgain={this.fetchInvitationData} reload={this.state.reload}/>
            );
        }
        else {
            return (
                <View style={main_styles.page}>
                    <ScrollView style={main_styles.scroll_view}>
                        <View style={info_styles.body} >
                            <View style={attribute_styles.body}>
                                <Text style={[attribute_styles.title_text]}>
                                    {this.state.body}
                                </Text>              
                            </View>  
                        </View>
                        <View style={info_styles.body}>
                            <View style={actions_styles.actions_view}> 
                                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {acceptInvitationAlert(this.acceptInvitation);}}>
                                    <Text style={actions_styles.action_button_text}>
                                        Accept
                                    </Text>
                                    <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                                </TouchableOpacity>
                                <View style={main_styles.horizontal_bar} />
                                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {declineInvitationAlert(this.removeInvitation);}}>
                                    <Text style={actions_styles.action_button_text}>
                                        Decline
                                    </Text>
                                    <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                                </TouchableOpacity>
                                {renderViewOther}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }

    async acceptInvitation() {
        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Generic/AcceptInvitation?id=" + this.state.invitation_id)
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
                //remove invitation from local realm
                GlobalProperties.messagesHandler.delete(this.state._id);

                //reload messages in your message screen upon return
                GlobalProperties.reload_messages = true;

                //then go back
                this.props.navigation.pop(1);
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

    async removeInvitation() {
        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Generic/RejectInvitation?id=" + this.state.invitation_id)
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
                //remove invitation from local realm
                GlobalProperties.messagesHandler.delete(this.state._id);

                //reload messages in your message screen upon return
                GlobalProperties.reload_messages = true;

                //then go back
                this.props.navigation.pop(1);
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

    lazyUpdate() {
        this.forceUpdate();
    }
}

const acceptInvitationAlert = (acceptInvitation) => {
    Alert.alert(
        "Accept Invitation",
        "Are you sure you want to accept this invitation?",
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "Accept",
                onPress: () => acceptInvitation(),
            }
        ],
        {
            cancelable: true,
        }
    );
};

const declineInvitationAlert = (declineInvitation) => {
    Alert.alert(
        "Decline Invitation",
        "Are you sure you want to decline this invitation?",
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "Decline",
                onPress: () => declineInvitation(),
            }
        ],
        {
            cancelable: true,
        }
    );
};