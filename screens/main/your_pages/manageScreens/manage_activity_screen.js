import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, ScrollView, FlatList, Alert, Dimensions} from 'react-native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {TouchableHighlight, TouchableOpacity} from 'react-native-gesture-handler';
import { AntDesign, MaterialIcons, Feather, Entypo } from '@expo/vector-icons'; 
import {SliderBox } from "react-native-image-slider-box";

import { GlobalProperties, GlobalValues } from '../../../../global/global_properties';
import { GlobalEndpoints } from '../../../../global/global_endpoints';
import { LoadingScreen } from '../../../misc/loading_screen';

const ImageStack = createMaterialTopTabNavigator();

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor:GlobalValues.DARKER_WHITE,
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
            fontSize: 24,
            color: 'black',
            padding: 5,
            marginBottom: 5,
        }, 
        name_text: {
            alignSelf: 'center',
            fontSize: 20,
            color: 'black',
            marginTop: 10,
        },
        name_view: {
            flexDirection: 'row',
            justifyContent: 'center',
        },
        scroll_view: {
            backgroundColor: "white",
        },
        no_images_buffer: {
            height: 30,
        }, 
        horizontal_bar: {
            width: '94%',
            alignSelf: 'center',
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE,
        }
    }
);

const actions_styles = StyleSheet.create(
    {
        actions_view: {

        },
        actions_button:  {
            borderRadius: 3,
            borderWidth: 4,
            backgroundColor: GlobalValues.ORANGE_COLOR,
            borderColor: GlobalValues.ORANGE_COLOR,
            padding: 3,
            paddingVertical: 3,
            alignSelf: 'center',
            width: "100%",
            marginTop: 10,
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

const image_styles = StyleSheet.create(
    {
        container: {
            backgroundColor: "white",
            width: 254,
            height: 250,
            marginVertical: '10%',
            marginBottom: 5,
            alignSelf: 'center',
        },
        image: {
            width: 250,
            height: 250,
        },
    }
);

const info_styles = StyleSheet.create(
    {
        body: {
            backgroundColor: 'white', //#FFCDCD
            borderRadius: 5,
            padding: 8,
            marginVertical: "2%",
            marginHorizontal: '2%'
        },
        title_text: {
            color: 'black',
            fontSize: 16,
            marginLeft: 5,
        }, 
        inner_text: {
            color: 'gray',
            fontSize: 14,
            marginLeft: 5,
        },
        horizontal_gap: {
            height: 10,
        },
        horizontal_bar: {
            width: '100%',
            alignSelf: 'center',
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE,
            marginTop: 8,
            marginBottom: 4,
        }
    }
);

const filter_snaps_styles = StyleSheet.create(
    {
        profile_container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: 10,
            flexWrap: 'wrap',
            width: '80%',
        },
        inner_text: {
            borderRadius: 5,
            borderWidth: 2,
            paddingHorizontal: 3,
            paddingVertical: 1,
            fontSize: 16,
            color: 'white', 
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginHorizontal: 2,
            marginVertical: 2,
            textAlign: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center'
        },
        icon: {
            alignSelf: 'center',
            marginRight: 4
        },
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        }
    }
);

const point_styles = StyleSheet.create(
    {
        body: {
            borderColor: GlobalValues.ORANGE_COLOR,
            borderTopWidth: 3,
            borderBottomWidth: 3,
        },
        container: {

        },
        text: {
            fontSize: 16,
            alignSelf: 'center',
        },
        image: {
            marginTop: 10,
            width: Math.trunc(Dimensions.get('window').width * 0.90),
            height: Math.trunc(Dimensions.get('window').width * 0.90), 
        },
        trash_icon: {
            flexDirection: 'row-reverse',
        }
    }
);

export class ManageActivityScreen extends React.Component {
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

            //images
            activity_images: [],

            //address
            address: "",

            //attributes
            attributes: [],

            //is physical event
            is_phiscal: true,

            //name of activity
            title: this.props.route.params.name,

            //id of the activity
            id: this.props.route.params.id,
        }

        this.props.navigation.setOptions({headerTitle: () => <HeaderTitle title={"Manage Activity"}/>});
        
        this.viewInvitations = this.viewInvitations.bind(this);
        this.viewAdmins = this.viewAdmins.bind(this);
        this.viewParticipants = this.viewParticipants.bind(this);
        this.fetchActivityInformation = this.fetchActivityInformation.bind(this);
        this.leave = this.leave.bind(this);
        this.leaveAlert = this.leaveAlert.bind(this);
        this.createAllConversation = this.createAllConversation.bind(this);
        this.createAdminConversation = this.createAdminConversation.bind(this);

        this.lazyUpdate = this.lazyUpdate.bind(this);
        this.cleanImages = this.cleanImages.bind(this);
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.fetchActivityInformation();
        });

        this.fetchActivityInformation();

        //TODO this goes in fetch code for valid case
        //gets the images from the response
        //...
        //clean images
        this.cleanImages();

        GlobalProperties.return_screen = "Manage Activity Screen";

        this.lazyUpdate();
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
                this.state.address = activity_information.address;
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
        var imagesRender;
        var distanceRender;
        var addressTitle;
        var actionsRender;

        if (this.state.activity_images.length > 0) {
            imagesRender = (
                <View style={image_styles.container}>
                    <SliderBox
                        images={this.state.activity_images.map(uri => {
                            return(handleImageURI(uri));
                        })}
                        parentWidth={image_styles.image.width}
                        sliderBoxHeight={image_styles.image.height}
                        dotColor={GlobalValues.ORANGE_COLOR}
                        inactiveDotColor={GlobalValues.DISTINCT_GRAY}
                    />
                </View>
            );
        }
        else {
            imagesRender = (
                <View style={main_styles.no_images_buffer}/>
            )
        }

        var joinRender;

        if (this.state.invitation_type == "anyone") {
            joinRender = (
                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {}}>
                    <View style={actions_styles.action_button_inner}>
                        <Text style={actions_styles.action_button_text}>
                            Join
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
        else if (this.state.invitation_type == "invite_required") {
            joinRender = (
                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {}}>
                    <View style={actions_styles.action_button_inner}>
                        <Text style={actions_styles.action_button_text}>
                            Request to Join
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }

        if (this.state.distance) {
            distanceRender = (
                <View style={[filter_snaps_styles.inner_text, { backgroundColor: "white", borderColor: GlobalValues.DISTINCT_GRAY}]}>
                    <Entypo name="location-pin" size={24} color="red" style={filter_snaps_styles.icon}/>
                    <Text style={{color: 'black', fontSize: 18}}>
                        {this.state.distance + " mi"}
                    </Text>
                </View>
            );
        }

        if (this.state.is_physical) {
            addressTitle = "Address";
        }
        else {
            addressTitle = "Virtual Link";
        }

        if (this.state.is_admin) {
            actionsRender = (
                <View>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.navigation.navigate("Edit Activity Screen", {id: this.state.id});}}>
                        <View style={actions_styles.action_button_inner}>
                            <Text style={actions_styles.action_button_text}>
                                Edit Activity
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.createAllConversation()}}>
                        <View style={actions_styles.action_button_inner}>
                            <Text style={actions_styles.action_button_text}>
                                Message Everyone
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.createAllConversation()}}>
                        <View style={actions_styles.action_button_inner}>
                            <Text style={actions_styles.action_button_text}>
                                Message Admins
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.leaveAlert();}}>
                        <View style={actions_styles.action_button_inner}>
                            <Text style={actions_styles.action_button_text}>
                                Leave
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        else if (this.state.is_participant) {
            actionsRender = (
                <View>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.leaveAlert()}}>
                        <View style={actions_styles.action_button_inner}>
                            <Text style={actions_styles.action_button_text}>
                                Leave
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.createAllConversation()}}>
                        <View style={actions_styles.action_button_inner}>
                            <Text style={actions_styles.action_button_text}>
                                Message Everyone
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }   
        else {
            actionsRender = (
                <View>

                </View>
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
                        {imagesRender}
                        <View style={main_styles.name_view}>
                            <Text style={main_styles.title_text}>
                                {this.state.title}
                            </Text>
                        </View>
                        <View style={filter_snaps_styles.profile_container}>
                            {distanceRender}
                            <View style={[filter_snaps_styles.inner_text, { backgroundColor: "white", borderColor: "#d6d6d6"}]}>
                                <Text style={{color: 'black', fontSize: 18}}>
                                    {this.state.is_phiscal ? "Physical" : "Virtual"}
                                </Text>
                            </View>
                            <View style={[filter_snaps_styles.inner_text, { backgroundColor: "white", borderColor: "#d6d6d6"}]}>
                                <MaterialIcons name="person" size={20} color="black" style={filter_snaps_styles.icon}/>
                                <Text style={{color: 'black', fontSize: 18}}>
                                    {this.state.num_members}
                                </Text>
                            </View>
                        </View>
                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Description
                            </Text>
                            <Text style={info_styles.inner_text}>
                                {this.state.description}
                            </Text>
                            <View style={info_styles.horizontal_bar} />
                            <Text style={info_styles.title_text}>
                                {addressTitle}
                            </Text>
                            <Text style={info_styles.inner_text}>
                                {this.state.address}
                            </Text>
                            <View style={info_styles.horizontal_bar} />
                            <Text style={info_styles.title_text}>
                                Date
                            </Text>
                            <Text style={info_styles.inner_text}>
                                {this.state.date}
                            </Text>
                        </View>
    
                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Attributes
                            </Text>
                            <View style={filter_snaps_styles.container}> 
                                {this.state.attributes.map((data, key) => {
                                    return (
                                        <FilterSnap key={key} parent={this} innerText={data} data={this.state.attributes} id={key}/>
                                    );
                                })}
                            </View> 
                        </View>
    
                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Actions
                            </Text>
                            <View style={actions_styles.actions_view}> 
                                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.navigation.navigate("View Map Screen", {location: this.state.location})}}>
                                    <View style={actions_styles.action_button_inner}>
                                        <Feather name="edit" size={20} color="white" style={actions_styles.action_button_icon}/>
                                        <Text style={actions_styles.action_button_text}>
                                            View Location
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                {actionsRender}
                            </View>
                        </View>
                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Members
                            </Text>
                            <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.viewAdmins();}}>
                                <View style={actions_styles.action_button_inner}>
                                    <Feather name="edit" size={20} color="white" style={actions_styles.action_button_icon}/>
                                    <Text style={actions_styles.action_button_text}>
                                        View Admins
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.viewParticipants();}}>
                                <View style={actions_styles.action_button_inner}>
                                    <Feather name="edit" size={20} color="white" style={actions_styles.action_button_icon}/>
                                    <Text style={actions_styles.action_button_text}>
                                        View Participants
                                    </Text>
                                </View>
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

    //get rid of any null entries
    cleanImages() {
        var cleaned_images = [];

        for (var i = 0; i <= this.state.activity_images.length; i++) {
            if (this.state.activity_images[i] != null && this.state.activity_images[i] != "") {
                cleaned_images.push(this.state.activity_images[i]);
            }
        }

        this.state.activity_images = cleaned_images;
    }

    viewInvitations() {
        //screen
        GlobalProperties.return_screen = "Manage Activity Screen";

        //filters
        GlobalProperties.screen_props = {
            filters: {
                type: "invitation",
                invitation_type: "activity",
                id: this.state.id,
            }
        };

        //go to screen
        //dangerouslyGetParent()
        //this.props.navigation.navigate("Your Messages Screen");
        this.props.navigation.navigate("Your Messages Navigator", {screen: "Your Messages Screen"});
    }

    viewAdmins() {
        this.props.navigation.navigate("View Admins Screen", {type: "activity", id: this.state.id});
    }

    viewParticipants() {
        this.props.navigation.navigate("View Participants Screen", {type: "activity", id: this.state.id});
    }

    async createAllConversation() {

        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Friends/Messages/FriendActivityCreateConversation?activity_id=" + this.state.id + "&includes=all")
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
                //get name and conversation id
                var conversation_information = JSON.parse(result.request.response).conversation_information;
                GlobalProperties.screen_props = {
                    sendMessage: true,
                    _id: "",
                };
        
                GlobalProperties.return_screen = "Manage Activity Screen";
                GlobalProperties.reload_messages = true;
        
                //open the realm
                await GlobalProperties.messagesHandler.openRealm();
        
                //create message
                var header_id = await GlobalProperties.messagesHandler.createConversation(conversation_information.id, conversation_information.title);
        
                GlobalProperties.screen_props._id = header_id;
        
                this.props.navigation.navigate("Your Messages Navigator", {screen: "Your Messages Screen"});

                //no need to laxy update as mongodb realm triggers that
                //return;
            }
            else {
                //returned bad response, fetch server generated error message

                Alert.alert(result.data);
            }
        }
        else {

            //invalid request
            if (result == undefined) {

            }
            else if (result.response.status == 400 && result.response.data) {
                Alert.alert(JSON.stringify(result.response.data));
                return;
            }
            //handle not found case
            else if (result.response.status == 404) {
                GlobalEndpoints.handleNotFound(false);
            }
        }

        //once done, lazy update
        this.lazyUpdate();
    }

    createAdminConversation() {

    }

    leaveAlert() {
        Alert.alert(
            "Delete",
            "Are you sure you want to leave this activity?",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "Leaeve",
                    onPress: () => this.leave(),
                }
            ],
            {
                cancelable: true,
            }
        );
    }

    async leave() {
        //if request was successful
        var successful = false;

        var url = "";

        if (this.state.is_admin) {
            url = "/api/User/Friends/RemoveFromCreatedActivity?id=" + this.state.id;
        }
        else if (this.state.is_participant) {
            url = "/api/User/Friends/LeaveActivityAsParticipant?id=" + this.state.id;
        }

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, url)
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
                GlobalProperties.return_screen = "Manage Activity Screen"
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

const HeaderTitle = (props) => {
    return(
        <Text style={{fontSize: 24, color: 'black'}}>
            {props.title}
        </Text>
    );
}

FilterSnap.defaultProps = {
    color: GlobalValues.ORANGE_COLOR,
}

function handleImageURI(uri) {
    if (uri == undefined) {
        return(require("../../../../images/default_image.png"));
    }
    else {
        return({uri: uri});
    }
}
