import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, ScrollView, Dimensions, TouchableOpacity, Alert, FlatList} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign, Feather, MaterialCommunityIcons, Entypo, FontAwesome} from '@expo/vector-icons'; 
import { GlobalProperties, GlobalValues } from '../../../global/global_properties';
import { GlobalEndpoints } from '../../../global/global_endpoints';
import { LoadingScreen } from '../../misc/loading_screen';

const ImageStack = createMaterialTopTabNavigator();


const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: GlobalValues.DARKER_WHITE,
            height: '50%',
            width: '100%',
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
        no_images_buffer: {
            height: 30,
        }, 
    }
);

const section_styles = StyleSheet.create({
    body: {
        marginTop: "10%",
        backgroundColor: GlobalValues.DARKER_WHITE,
    },
    gap: {
        height: 30,
    }
});

const info_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white', //#FFCDCD
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
        paddingVertical: 2,
    },
    input_text_view: {
        flexDirection:  'row',
        paddingVertical: 6
    },
    multiline_input_text: {
        fontSize: 14, 
        maxHeight: "96px", 
        textAlignVertical: "top",
    },
    title_text: {
        alignSelf: 'flex-start',
        fontSize: 16,
        color: 'black',
        marginBottom: 2,
    },
    text_input: {
        textAlignVertical: "top",
        flex: 1,
        maxHeight: 95,
        marginLeft: 2,
        borderRadius: 8,
    },
    inner_text: {
        color: 'gray',
        fontSize: 14,
        marginHorizontal: 4
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
        alignSelf: 'center'
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
            paddingVertical: 1,
            fontSize: 16,
            color: 'white', 
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginHorizontal: 2,
            marginBottom: 8,
            textAlign: 'center',
        },
        tag_inner_text: {
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
            alignSelf: 'center'
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
            fontSize: 16,
        }
    }
);

const image_styles = StyleSheet.create(
    {
        container: {
            width: 204,
            height: 200,
            marginTop: '10%',
            marginBottom: 5,
            alignSelf: 'center',
        },
        box: {
            width: 204,
            height: 200,
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 2,
        },
        image: {
            width: 200,
            height: 200,
        },
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
            name: "",
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
                
                this.state.name = requestJson.user_information.name;
                this.state.age = requestJson.user_information.age;
                this.state.gender = requestJson.user_information.gender;
                this.state.description = requestJson.user_information.description;
                this.state.distance = requestJson.user_information.distance;
                this.state.attributes = requestJson.user_information.attributes;

                //get images
                if (this.state.profile_images.length == 0) {
                    this.state.profile_images = [require("../../../images/default_image.png")];
                }

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
            var descriptionRender = {};

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

        if (this.state.gender == "male") {
            genderRender = (
                <View style={[filter_snaps_styles.tag_inner_text, { backgroundColor: "white", borderColor: GlobalValues.DISTINCT_GRAY}]}>
                    <MaterialCommunityIcons name="gender-male" size={14} color={GlobalValues.MALE_COLOR} style={filter_snaps_styles.icon}/>
                    <Text style={{color: 'black', fontSize: 14}}>
                        Male
                    </Text>
                </View>
            );
        }
        else if (this.state.gender == "female") {
            genderRender = (
                <View style={[filter_snaps_styles.tag_inner_text, { backgroundColor: "white", borderColor: GlobalValues.DISTINCT_GRAY}]}>
                    <MaterialCommunityIcons name="gender-female" size={14} color={GlobalValues.FEMALE_COLOR} style={filter_snaps_styles.icon}/>
                    <Text style={{color: 'black', fontSize: 14}}>
                        Female
                    </Text>
                </View>
            );
        }
        else {
            genderRender = (
                <View style={[filter_snaps_styles.tag_inner_text, { backgroundColor: "white", borderColor: GlobalValues.DISTINCT_GRAY}]}>
                    <MaterialCommunityIcons name="gender-non-binary" size={14} color="black" style={filter_snaps_styles.icon}/>
                    <Text style={{color: 'black', fontSize: 14}}>
                        {this.state.gender}
                    </Text>
                </View>
            );
        }

        var inviteActions = {};

        if (this.state.type == "none") {
            inviteActions = (
                <TouchableOpacity  style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.inviteTo();}}>
                    <Text style={actions_styles.action_button_text}>
                        Invite
                    </Text>
                    <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                </TouchableOpacity>
            );
        }
        else if (this.state.type == "activity" && this.state.viewing == "participants") {
            inviteActions = ( 
                <View>
                    <TouchableOpacity  style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.promoteToAdmin();}}>
                        <Text style={actions_styles.action_button_text}>
                            Promote to Admin
                        </Text>
                        <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                    </TouchableOpacity>
                    <View style={main_styles.horizontal_bar} />   
                    <TouchableOpacity  style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.inviteTo();}}>
                        <Text style={actions_styles.action_button_text}>
                            Invite
                        </Text>
                        <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                    </TouchableOpacity>
                </View>
            );
        }
        else if (this.state.type == "activity" && this.state.viewing == "admins") {
            inviteActions = (
                <TouchableOpacity  style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.inviteTo();}}>
                    <Text style={actions_styles.action_button_text}>
                        Invite
                    </Text>
                    <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                </TouchableOpacity>
            );
        }

        //<FontAwesome name="road" size={12} color="gray" style={filter_snaps_styles.icon}/>

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
                            <View style={[filter_snaps_styles.tag_inner_text, { backgroundColor: "white", borderColor: GlobalValues.DISTINCT_GRAY}]}>
                                <MaterialCommunityIcons name="baby"  size={12} color="gray" style={filter_snaps_styles.icon}/>
                                <Text style={{color: 'black', fontSize: 14}}>
                                    {this.state.age}
                                </Text>
                            </View>
                            <View style={[filter_snaps_styles.tag_inner_text, { backgroundColor: "white", borderColor: GlobalValues.DISTINCT_GRAY}]}>
                                <Feather name="target" size={12} color="gray" style={filter_snaps_styles.icon}/>
                                <Text style={{color: 'black', fontSize: 14}}>
                                    {" " + "4m ago"}
                                </Text>
                            </View>
                            <View style={[filter_snaps_styles.tag_inner_text, { backgroundColor: "white", borderColor: GlobalValues.DISTINCT_GRAY}]}>
                                <FontAwesome name="road" size={12} color="gray" style={filter_snaps_styles.icon}/>
                                <Text style={{color: 'black', fontSize: 14}}>
                                    {this.state.distance + " mi"}
                                </Text>
                            </View>
                        </View>
                        <View style={info_styles.body}>
                            {descriptionRender}
                            <View style={main_styles.horizontal_bar}/>
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
                        </View>
                        <View style={info_styles.body}>
                            <View style={actions_styles.actions_view}> 
                                <TouchableOpacity  style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.sendMessage();}}>
                                    <Text style={actions_styles.action_button_text}>
                                        Send Message
                                    </Text>
                                    <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                                </TouchableOpacity>
                                <View style={main_styles.horizontal_bar} />
                                {inviteActions}
                                <View style={main_styles.horizontal_bar} />
                                <TouchableOpacity  style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.block();}}>
                                    <Text style={actions_styles.action_button_text}>
                                        Block
                                    </Text>
                                    <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                );
            }
        }

            return (
                <View style={main_styles.page}>
                    
                    <FlatList data={[{id: 1}]} keyExtractor={() => "dummy"} listEmptyComponent={null} renderItem={renderComponent} style={[main_styles.page, {zIndex: 99, flex: 1}]}/>
                    
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


//<View style={{ borderBottomColor: '#CCCCCC', borderBottomWidth: 2, width: '95%', alignSelf: 'center', marginBottom: 0,}}/>
//<FilterSnap innerText="light" color="#9A39E2"/>
/*

<View style={frame_styles.box} onPress={() => {this.props.navigation.navigate("Other Profile Screen")}}>
                <Text style={frame_styles.main_text}>
                    {this.props.id}
                </Text>
            </View>

*/