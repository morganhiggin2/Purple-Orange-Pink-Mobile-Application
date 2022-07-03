import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, ScrollView, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign, Feather, MaterialCommunityIcons, Entypo} from '@expo/vector-icons'; 
import { GlobalProperties, GlobalValues } from '../../../global/global_properties';
import { GlobalEndpoints } from '../../../global/global_endpoints';
import { LoadingScreen } from '../../misc/loading_screen';

const ImageStack = createMaterialTopTabNavigator();

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
            backgroundColor: GlobalValues.DARKER_WHITE,
        },
    }
);

const image_styles = StyleSheet.create(
    {
        container: {
            width: 254,
            height: 250,
            marginTop: '10%',
            marginBottom: 5,
            alignSelf: 'center',
        },
        box: {
            width: 254,
            height: 250,
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 2,
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
            backgroundColor: "white", //#FFCDCD
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
            marginVertical: 4,
        },
        horizontal_bar: {
            width: '100%',
            alignSelf: 'center',
            borderBottomWidth: 1,
            borderColor: '#b8b8b8',
            marginTop: 8,
            marginBottom: 4,
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
            backgroundColor: GlobalValues.ORANGE_COLOR,//'#ff4576'
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
            borderWidth: 1,
            paddingHorizontal: 3,
            paddingVertical: 1,
            fontSize: 16,
            color: 'white', 
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginHorizontal: 2,
            marginVertical: 2,
            flexDirection: 'row',
        },
        icon: {
            alignSelf: 'center',
            marginRight: 4
        },
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginVertical: 4,
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

const HeaderTitle = (title) => {
    return(
        <Text style={{fontSize: 24, color: 'black'}}>
            {title.title}
        </Text>
    );
}

class FilterSnap extends React.Component {
    constructor(props) {
        super(props)
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

export class OtherProfileScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.route.params.id,
            type: this.props.route.params.type,
            viewing: this.props.route.params.viewing,
            first_name: "",
            last_name: "",
            age: 19,
            gender: "",
            description: "",
            distance: 0.0,

            //for loading screen
            loading: true,
            reload: false,

            name: "",

            profile_images: [],

            attributes: [],

            points: [],
        };

        if (this.state.type == "activity") {
            this.state.activity_id = this.props.route.params.activity_id;
        }
        else if (this.state.type == "group") {
            this.state.group_id = this.props.route.params.group_id;
        }

        this.fetchUserData = this.fetchUserData.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.inviteTo = this.inviteTo.bind(this);
        this.promoteToAdmin = this.promoteToAdmin.bind(this);
        this.blockFromUser = this.blockFromUser.bind(this);
        this.blockFromActivity = this.blockFromActivity.bind(this);
        this.block = this.block.bind(this);

        //once done, lazy update
        this.lazyUpdate = this.lazyUpdate.bind(this);
        this.cleanImages = this.cleanImages.bind(this);
        this.handleImageURI = this.handleImageURI.bind(this);
    }

    async log_in() {
        
    }
    
    componentDidMount() {
        //init
        GlobalProperties.return_screen = "Other Profile Screen";

        //fetch data
        this.fetchUserData();
    }

    async fetchUserData() {
        if (this.state.reload) {
            this.state.reload = false;
    
            //reload to now hide reload button
            this.lazyUpdate();
        }

        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, ("/api/User/Friends/GetBasicUserInformation?id=" + this.state.id))
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
                var requestJson = JSON.parse(result.request.response);

                //add user information
                
                this.state.first_name = requestJson.user_information.first_name;
                this.state.last_name = requestJson.user_information.last_name;
                this.state.age = requestJson.user_information.age;
                this.state.gender = requestJson.user_information.gender;
                this.state.description = requestJson.user_information.description;
                this.state.distance = requestJson.user_information.distance;
                this.state.attributes = requestJson.user_information.attributes;
                this.state.points = requestJson.user_information.points;

                //get images
                if (this.state.profile_images.length == 0) {
                    this.state.profile_images = [require("../../../images/default_image.png")];
                }

                this.state.name = this.state.first_name + " " + this.state.last_name;

                this.props.navigation.setOptions({headerTitle: () => <HeaderTitle title={this.state.name}/>});

                this.state.loading = false;
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

        //TODO this goes in fetch code for valid case
        //gets the images from the response
        //...
        //clean images
        this.cleanImages();

        //once done, lazy update
        this.lazyUpdate();
    }

    render() {
        
        if (this.state.loading == true || this.state.loading == null) {
            return (
                <LoadingScreen tryAgain={this.fetchUserData} reload={this.state.reload}/>
            );
        }
        else {
            var genderRender = {};

            if (this.state.gender == "male") {
                genderRender = (
                    <View style={[filter_snaps_styles.inner_text, { backgroundColor: "white", borderColor: "#d6d6d6"}]}>
                        <MaterialCommunityIcons name="gender-male" size={18} color={GlobalValues.MALE_COLOR} style={filter_snaps_styles.icon}/>
                        <Text style={{color: 'black', fontSize: 18}}>
                            Male
                        </Text>
                    </View>
                );
            }
            else if (this.state.gender == "female") {
                genderRender = (
                    <View style={[filter_snaps_styles.inner_text, { backgroundColor: "white", borderColor: "#d6d6d6"}]}>
                        <MaterialCommunityIcons name="gender-female" size={18} color={GlobalValues.FEMALE_COLOR} style={filter_snaps_styles.icon}/>
                        <Text style={{color: 'black', fontSize: 18}}>
                            Female
                        </Text>
                    </View>
                );
            }
            else {
                genderRender = (
                    <View style={[filter_snaps_styles.inner_text, { backgroundColor: "white", borderColor: "#d6d6d6"}]}>
                        <MaterialCommunityIcons name="gender-non-binary" size={18} color="black" style={filter_snaps_styles.icon}/>
                        <Text style={{color: 'black', fontSize: 18}}>
                            Other
                        </Text>
                    </View>
                );
            }

            var inviteActions = {};

            if (this.state.type == "none") {
                inviteActions = (
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.inviteTo()}}>
                        <View style={actions_styles.action_button_inner}>
                            <Text style={actions_styles.action_button_text}>
                                Invite
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            }
            else if (this.state.type == "activity" && this.state.viewing == "participants") {
                inviteActions = ( 
                    <View>
                        <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.promoteToAdmin()}}>
                            <View style={actions_styles.action_button_inner}>
                                <Text style={actions_styles.action_button_text}>
                                    Promote to Admin
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.inviteTo()}}>
                            <View style={actions_styles.action_button_inner}>
                                <Text style={actions_styles.action_button_text}>
                                    Invite
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            }
            else if (this.state.type == "activity" && this.state.viewing == "admins") {
                inviteActions = (
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.inviteTo()}}>
                        <View style={actions_styles.action_button_inner}>
                            <Text style={actions_styles.action_button_text}>
                                Invite
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            }

            var distanceRender = {};

            if (this.state.type == "none") {
                distanceRender = (
                    <View style={[filter_snaps_styles.inner_text, { backgroundColor: "white", borderColor: "#d6d6d6"}]}>
                        <Entypo name="location-pin" size={24} color="red" style={filter_snaps_styles.icon}/>
                        <Text style={{color: 'black', fontSize: 18}}>
                            {this.state.distance + " mi"}
                        </Text>
                    </View>
                );
            }
            else if (this.state.type == "activity") {
                distanceRender = (
                    <View style={[filter_snaps_styles.inner_text, { backgroundColor: "white", borderColor: "#d6d6d6"}]}>
                        <Entypo name="location-pin" size={24} color="red" style={filter_snaps_styles.icon}/>
                        <Text style={{color: 'black', fontSize: 18}}>
                            {this.state.distance + " mi"}
                        </Text>
                    </View>
                );
            }
            else if (this.state.type == "group") {
                distanceRender = (
                    <View style={[filter_snaps_styles.inner_text, { backgroundColor: "white", borderColor: "#d6d6d6"}]}>
                        <Entypo name="location-pin" size={24} color="red" style={filter_snaps_styles.icon}/>
                        <Text style={{color: 'black', fontSize: 18}}>
                            {this.state.distance + " mi"}
                        </Text>
                    </View>
                );
            }

            return (
                <View style={main_styles.page}>
                    <ScrollView style={main_styles.scroll_view}>
                        <View style={image_styles.container}>
                            <SliderBox
                            images={this.state.profile_images.map(uri => {
                                return(this.handleImageURI(uri));
                            })}
                            parentWidth={image_styles.image.width}
                            sliderBoxHeight={image_styles.image.height}
                            dotColor={GlobalValues.ORANGE_COLOR}
                            inactiveDotColor={GlobalValues.DISTINCT_GRAY}
                        />
                        </View>

                        <View style={main_styles.name_view}>
                            <Text style={main_styles.title_text}>
                                {this.state.name}
                            </Text>
                        </View>
                        <View style={filter_snaps_styles.profile_container}>
                            {genderRender}
                            <View style={[filter_snaps_styles.inner_text, { backgroundColor: "white", borderColor: "#d6d6d6"}]}>
                                <MaterialCommunityIcons name="baby" size={18} color="lightskyblue" style={filter_snaps_styles.icon}/>
                                <Text style={{color: 'black', fontSize: 18}}>
                                    {this.state.age}
                                </Text>
                            </View>
                            <View style={[filter_snaps_styles.inner_text, { backgroundColor: "white", borderColor: "#d6d6d6"}]}>
                                <Feather name="target" size={18} color="green" style={filter_snaps_styles.icon}/>
                                <Text style={{color: 'black', fontSize: 18}}>
                                    {" " + "4m ago"}
                                </Text>
                            </View>
                            {distanceRender}
                        </View>

                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Description
                            </Text>
                            <Text style={info_styles.inner_text}>
                                This is the section about the info and i dont know if this is going to wrap but it should around the edge dammit this should fit
                            </Text>
                            <View style={info_styles.horizontal_bar}/>
                            <Text style={info_styles.title_text}>
                                Attributes
                            </Text>
                            <View style={filter_snaps_styles.container}> 
                                {this.state.attributes.map((data, key) => {
                                    return (
                                        <FilterSnap key={key} innerText={data} />
                                    );
                                })}
                            </View>
                        </View>
                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Actions
                            </Text>
                            <View style={actions_styles.actions_view}> 
                                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.sendMessage()}}>
                                    <View style={actions_styles.action_button_inner}>
                                        <AntDesign name="message1" size={20} color="white" style={actions_styles.action_button_icon}/>
                                        <Text style={actions_styles.action_button_text}>
                                            Send Message
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                {inviteActions}
                                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.block()}}>
                                    <View style={actions_styles.action_button_inner}>
                                        <MaterialCommunityIcons name="block-helper" size={20} color="white" style={actions_styles.action_button_icon}/>
                                        <Text style={actions_styles.action_button_text}>
                                            Block
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Points
                            </Text>
                        </View>
                        {this.state.points.map((data, key) => {
                            return (
                                <Point key={data.id} data={data}/>
                            );
                        })}
                    </ScrollView>
                </View>
            );
        }
    }

    //get rid of any null entries
    cleanImages() {
        var cleaned_images = [];

        for (var i = 0; i <= this.state.profile_images.length; i++) {
            if (this.state.profile_images[i] != null && this.state.profile_images[i] != "") {
                cleaned_images.push(this.state.profile_images[i]);
            }
        }

        this.state.profile_images = cleaned_images;
    }

    handleImageURI(uri) {
        if (uri == undefined) {
            return(require("../../../images/default_image.png"));
        }
        else {
            return(uri);
        }
    }

    async sendMessage() {
        GlobalProperties.screen_props = {
            sendMessage: true,
            _id: "",
        };

        GlobalProperties.return_screen = "Manage Activity Screen";
        GlobalProperties.reload_messages = true;

        //open the realm
        await GlobalProperties.messagesHandler.openRealm();

        //create message
        var header_id = await GlobalProperties.messagesHandler.createDirectMessage(this.state.id, this.state.name);

        GlobalProperties.screen_props._id = header_id;

        this.props.navigation.navigate("Your Messages Navigator", {screen: "Your Messages Screen"});
        
    }

    inviteTo() {
        this.props.navigation.navigate("Invite To Screen", {id: this.state.id});
    }

    async promoteToAdmin() {
        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Friends/RequestToPromoteParticipantToAdmin?activity_id=" + this.state.activity_id + "&participant_id=" + this.state.id)
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
                //create alert
                invitationSentAlert();

                //then go back
                this.props.navigation.goBack();
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

    block() {
        if (this.state.type == "none") {
            this.blockFromUser();
        }
        else if (this.state.type == "activity") {
            this.blockFromActivity();
        }
    }

    async blockFromUser() {
        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Friends/Block/User?user_id=" + this.state.id)
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
                GlobalProperties.return_screen = "Other Profile Screen"
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

    async blockFromActivity() {
        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Friends/Block/ActivityUser?activity_id=" + this.state.activity_id + "&user_id=" + this.state.id)
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
                GlobalProperties.return_screen = "Other Profile Screen"
                GlobalProperties.screen_props = {
                    action: "remove",
                    id: this.state.id,
                }

                //then go back
                this.props.navigation.goBack();
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

const invitationSentAlert = () => {
    Alert.alert(
        "Invitation Sent",
        "Invitation was successfully sent"
    )
}

function handleImageURI(uri) {
    if (uri == undefined) {
        return(require("../../../images/default_image.png"));
    }
    else {
        return({uri: uri});
    }
}


class Point extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image_uri: this.props.data.image_uri,
            caption: this.props.data.caption,
            trashColor: 'black',
            editCaptionColor: 'black',
            editImageColor: 'black',
            show_edit_caption_dialog: false,
        }
    }

    render() {
        var renderImageOrNone = {};

        if (this.state.image_uri == "") {
            renderImageOrNone = (
                <View>

                </View>
            );
        }
        else {
            renderImageOrNone = (
                <View>
                    <Image style={[point_styles.image, {alignSelf: 'center'}]} source={handleImageURI(this.state.image_uri)}/>
                </View>
            );
        }
        return(
            <View style={[info_styles.body, point_styles.body]}>
                <View style={[actions_styles.body, point_styles.container]}> 
                    <Text style={[info_styles.title_text, {textAlign: 'left'}]}>
                        {this.state.caption}
                    </Text>
                    {renderImageOrNone}
                </View>
            </View>
        );
    }

    lazyUpdate() {
        this.forceUpdate();
    }
}

//<View style={{ borderBottomColor: '#CCCCCC', borderBottomWidth: 2, width: '95%', alignSelf: 'center', marginBottom: 0,}}/>
//<FilterSnap innerText="light" color="#9A39E2"/>
/*

<View style={frame_styles.box} onPress={() => {this.props.navigation.navigate("Other Profile Screen")}}>
                <Text style={frame_styles.main_text}>
                    {this.props.id}
                </Text>
            </View>

*/