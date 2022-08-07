import React from 'react';
import {StyleSheet, View, Text, FlatList, Alert} from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons'; 

import { GlobalValues, GlobalProperties } from '../../../global/global_properties';
import { GlobalEndpoints } from '../../../global/global_endpoints';
import { LoadingScreen } from '../../misc/loading_screen';
import { cancelScheduledNotificationAsync } from 'expo-notifications';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: GlobalValues.DARKER_WHITE,
            height: '50%',
            flexDirection: "column",
            flex: 1,
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
            fontSize: 22,
            color: 'black',
            padding: 5,
        }, 
        horizontal_bar: {
            width: '94%',
            alignSelf: 'center',
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE
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
            marginTop: 16
        },
        scroll_view: {
            backgroundColor: "white",
        },
    }
);

const info_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        marginHorizontal: 8,
        borderRadius: 4,
        marginVertical: 16
    }
});

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

const inline_attribute_styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    title_view: {
        flexDirection: 'row',
    },
    text_view: {
        paddingVertical: 4
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
        paddingHorizontal: 4,
        width: '100%',
        textAlign: 'right',
        borderRadius: 4,
        fontSize: 16, 
        fontFamily: 'Roboto'
    },
    drop_down_selector: {
        marginRight: -10
    },
    drop_down_selector_gap: {
        height: 100,
    },
    date_picker: {
        width: 200,
    }
});

const filter_snaps_styles = StyleSheet.create(
    {
        inner_text: {
            borderRadius: 5,
            borderWidth: 2,
            paddingHorizontal: 3,
            paddingVertical: 0,
            fontFamily: 'Roboto',
            fontSize: 16,
            textAlign: 'center',
            color: 'white', 
            fontWeight: 'bold',
            alignSelf: 'center',
            marginHorizontal: 2,
            marginVertical: 1,
            marginBottom: 8
        },
        tag_inner_text: {
            borderRadius: 5,
            borderWidth: 2,
            paddingHorizontal: 3,
            paddingVertical: 1,
            fontFamily: 'Roboto',
            fontSize: 16,
            color: 'white', 
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginHorizontal: 2,
            marginVertical: 2,
            textAlign: 'center',
            flexDirection: 'row',
            alignSelf: 'center'
        },
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            backgroundColor: 'white',
            marginHorizontal: 8
        },
        profile_container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: 10,
            flexWrap: 'wrap',
            width: '80%',
        },
        icon: {
            alignSelf: 'center',
            marginRight: 4
        }
    }
);

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

export class OtherActivityScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //is loading
            loading: true,
            reload: false,

            description: "",
            date: "",
            invitation_type: "",
            is_admin: false,
            is_participant: false,

            //address
            address: "",

            //attributes
            attributes: [],

            //name of activity
            title: this.props.route.params.name,

            //id of the activity
            id: this.props.route.params.id,
        }
        
        this.joinOtherActivity = this.joinOtherActivity.bind(this);
        this.viewAdmins = this.viewAdmins.bind(this);
        this.viewParticipants = this.viewParticipants.bind(this);
        this.fetchActivityInformation = this.fetchActivityInformation.bind(this);
        this.blockFromUser = this.blockFromUser.bind(this);
        this.block = this.block.bind(this);

        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {
        GlobalProperties.check_interstitial_ad();
        this.fetchActivityInformation();
    }

    async fetchActivityInformation() {
        if (this.state.reload) {
            this.state.reload = false;
    
            //reload to now hide reload button
            this.lazyUpdate();
        }

        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Friends/GetBasicActivityInformation?id=" + this.state.id)
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
                var activity_information = JSON.parse(result.request.response).activity_information;
 
                this.state.title = activity_information.title;
                this.state.attributes = activity_information.attributes;
                this.state.date = activity_information.date;
                this.state.is_physical = activity_information.is_physical;
                this.state.description = activity_information.description;
                this.state.invitation_type = activity_information.invitation_type;
                this.state.num_members = activity_information.num_members;
                this.state.distance = activity_information.distance;
                this.state.is_admin = activity_information.is_admin;
                this.state.is_participant = activity_information.is_participant;
                this.state.is_in_activity = activity_information.is_in_activity;
                this.state.location = activity_information.location;

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
        var distanceRender;
        var joinRender;
        var descriptionRender;

        if (this.state.invitation_type == "anyone") {
            joinRender = (
                <View>
                    <View style={main_styles.horizontal_bar} />
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.joinOtherActivity();}}>
                        <Text style={actions_styles.action_button_text}>
                            Join
                        </Text>
                        <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                    </TouchableOpacity>
                    <View style={main_styles.horizontal_bar} />
                </View>
            );
        }
        else if (this.state.invitation_type == "invite_required") {
            joinRender = (
                <View>
                    <View style={main_styles.horizontal_bar} />
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.joinOtherActivity();}}>
                        <Text style={actions_styles.action_button_text}>
                            Request to Join
                        </Text>
                        <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                    </TouchableOpacity>
                    <View style={main_styles.horizontal_bar} />
                </View>
            );
        }
        else {
            joinRender = (<View />);
        }

        if (this.state.distance) {
            distanceRender = (
                <View style={[filter_snaps_styles.tag_inner_text, { backgroundColor: "white", borderColor: GlobalValues.DISTINCT_GRAY}]}>
                    <FontAwesome name="road" size={12} color="gray" style={filter_snaps_styles.icon}/>
                    <Text style={{color: 'black', fontSize: 14}}>
                        {this.state.distance + " mi"}
                    </Text>
                </View>
            );
        }
        else {
            distanceRender = (<View />);
        }

        if (this.state.description.length > 0) {
            descriptionRender = (
                <View>
                    <View style={main_styles.horizontal_bar}/>
                    <View style={attribute_styles.body}>
                        <Text style={attribute_styles.title_text}>
                            Description
                        </Text>     
                        <View style={attribute_styles.input_text_view}>
                            <Text style={attribute_styles.text_input}>
                                {this.state.description}
                            </Text>
                        </View>                   
                    </View>  
                </View>
            );
        }
        else {
            descriptionRender = (
                <View />
            );
        }
        
        const renderComponent = () => {
            if (this.state.loading == true) {
                return (
                    <View>
                        <LoadingScreen tryAgain={this.fetchActivityInformation} reload={this.state.reload}/>
                    </View>
                );
            }
            else {
                return (
                    <View>
                        <View style={main_styles.name_view}>
                            <Text style={main_styles.title_text}>
                                {this.state.title}
                            </Text>
                        </View>
                        <View style={filter_snaps_styles.profile_container}>
                            {distanceRender}
                            <View style={[filter_snaps_styles.tag_inner_text, { backgroundColor: "white", borderColor: "#d6d6d6"}]}>
                                <Text style={{color: 'black', fontSize: 14}}>
                                    {this.state.is_physical ? "Physical" : "Virtual"}
                                </Text>
                            </View>
                            <View style={[filter_snaps_styles.tag_inner_text, { backgroundColor: "white", borderColor: "#d6d6d6"}]}>
                                <MaterialIcons name="person" size={18} color="black" style={filter_snaps_styles.icon}/>
                                <Text style={{color: 'black', fontSize: 14}}>
                                    {this.state.num_members}
                                </Text>
                            </View>
                        </View>
                        <View style={info_styles.body}>
                            <View style={inline_attribute_styles.body}>
                                <Text style={inline_attribute_styles.title_text}>
                                    <Text style={{color: "gray"}}>
                                        {"It is on "} 
                                    </Text>
                                    {this.state.date}
                                </Text>
                            </View>
                            <View style={main_styles.horizontal_bar} />  
                            <View style={inline_attribute_styles.body}>
                                <Text style={inline_attribute_styles.title_text}>
                                    It's about
                                </Text>
                            </View>
                            <View style={filter_snaps_styles.container}> 
                                {this.state.attributes.map((data, key) => {
                                    return (
                                        <FilterSnap key={key} parent={this} innerText={data} data={this.state.attributes} id={key}/>
                                    );
                                })}
                            </View>
                            {descriptionRender}
                        </View>
                        <View style={info_styles.body}> 
                            {joinRender}
                            <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.navigation.navigate("View Map Screen", {location: this.state.location})}}>
                                <Text style={actions_styles.action_button_text}>
                                    View Location
                                </Text>
                                <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                            </TouchableOpacity>     
                            <View style={main_styles.horizontal_bar} />             
                            <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.viewAdmins();}}>
                                <Text style={actions_styles.action_button_text}>
                                    View Creators
                                </Text>
                                <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                            </TouchableOpacity>
                            <View style={main_styles.horizontal_bar} />   
                            <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.viewParticipants();}}>
                                <Text style={actions_styles.action_button_text}>
                                    View Participants
                                </Text>
                                <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }
        };

        return (
            <View style={main_styles.page}>
                
                <FlatList data={[{id: 1}]} keyExtractor={() => "dummy"} listEmptyComponent={null} renderItem={renderComponent} style={[main_styles.page, {zIndex: 99, flex: 1}]}/>
                
            </View>
        );
    }

    lazyUpdate() {
        this.forceUpdate();
    }

    block() {
        if (this.state.type == "none") {
            this.blockFromUser();
        }
    }

    async blockFromUser() {
        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Friends/Block/UserActivity?activity_id=" + this.state.id)
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
                //go back, pass id of user to delete
                GlobalProperties.return_screen = "Other Activity Screen"
                GlobalProperties.screen_props = {
                    action: "remove",
                    id: this.state.id,
                }

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

    async joinOtherActivity() {
        var requestUrl = "/api/User/Friends/RequestToJoinActivityAsParticipant?id=" + this.state.id;
        

        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, requestUrl)
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
                if (this.state.invitation_type == "invite_required") {
                    //create alert
                    invitationSentAlert();
                }
                else {
                    //create alert
                    joinedAlert();
                }

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

    viewAdmins() {
        this.props.navigation.navigate("View Admins Screen", {type: "activity", is_admin: false, id: this.state.id});
    }

    viewParticipants() {
        this.props.navigation.navigate("View Participants Screen", {type: "activity", is_admin: false, id: this.state.id});
    }
}

const joinedAlert = () => {
    Alert.alert(
        "Joined",
        "Successfully joined!"
    )
}

const invitationSentAlert = () => {
    Alert.alert(
        "Invitation Sent",
        "Invitation was successfully sent"
    )
}

class FilterSnap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( 
            <Text style={[filter_snaps_styles.inner_text, { backgroundColor: this.props.color, borderColor: this.props.color}]}>
                {this.props.innerText}
            </Text>
        );
    }
}

FilterSnap.defaultProps = {
    color: GlobalValues.ORANGE_COLOR,
}