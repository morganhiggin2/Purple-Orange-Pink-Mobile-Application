import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert, FlatList} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons'; 
import { GlobalProperties, GlobalValues } from '../../../global/global_properties';
import { GlobalEndpoints } from '../../../global/global_endpoints';
import { LoadingScreen } from '../../misc/loading_screen';

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
        no_images_buffer: {
            height: 30,
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

const attribute_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flexDirection: "column",
        paddingHorizontal: 10,
        paddingVertical: 2,
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
            paddingVertical: 1,
            fontFamily: 'Roboto',
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
            fontFamily: 'Roboto',
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
        <Text style={{fontSize: 24, fontFamily: 'Roboto', color: 'black'}}>
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

export class OtherExploreProfileScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.route.params.id,
            name: "",
            age: 0,
            gender: "",
            description: "",
            distance: 0.0,

            //for loading screen
            loading: true,
            reload: false,

            name: "",

            profile_images: Array(3),

            attributes: [],
        };

        this.fetchUserData = this.fetchUserData.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.inviteTo = this.inviteTo.bind(this);
        this.blockFromUser = this.blockFromUser.bind(this);

        //once done, lazy update
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    async log_in() {
        
    }
    
    componentDidMount() {
        //init
        GlobalProperties.return_screen = "Other Explore Profile Screen";

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
                var profile_images = requestJson.user_information.profile_image_uris;

                //add default image if nessesary
                if (profile_images.length < 3) {

                    for (let i = 0; i < profile_images.length; i++) {
                        this.state.profile_images[i] = profile_images[i];
                    }
                    for (let i = profile_images.length; i < 3; i++) {
                        this.state.profile_images[i] = "";
                    }
                }

                this.state.loading = false;

                this.lazyUpdate();
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
                return;
            }
            else {
                this.state.reload = true;
                this.lazyUpdate();
                return;
            }
        }
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
                                    console.log("here");
                                    return(handleImageURI(uri));
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
                                    {"Interested in "}
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
                                <TouchableOpacity  style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.inviteTo();}}>
                                    <Text style={actions_styles.action_button_text}>
                                        Invite
                                    </Text>
                                    <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                                </TouchableOpacity>
                                <View style={main_styles.horizontal_bar} />
                                <TouchableOpacity  style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.blockFromUser();}}>
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
                GlobalProperties.return_screen = "Other Explore Profile Screen"
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

    lazyUpdate() {
        this.forceUpdate();
    }
}

function handleImageURI(uri) {
    if (uri == undefined || uri == "") {
        return(require("../../../assets/images/default_image.png"));
    }
    else {
        return({uri: uri});
    }
}


//<View style={{ borderBottomColor: '#CCCCCC', borderBottomWidth: 2, width: '95%', alignSelf: 'center', marginBottom: 0,}}/>
//<FilterSnap innerText="light" color="#9A39E2"/>
/*

<View style={frame_styles.box} onPress={() => {this.props.navigation.navigate("Other Explore Profile Screen")}}>
                <Text style={frame_styles.main_text}>
                    {this.props.id}
                </Text>
            </View>

*/