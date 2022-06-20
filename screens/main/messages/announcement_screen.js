import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, ScrollView, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign, Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'; 
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

export class AnnouncementScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.route.params.id,
            type: "",
            name: "",
            body: "",

            //for loading screen
            loading: false,
            reload: false,

            profile_images: ["https://ichef.bbci.co.uk/news/976/cpsprodpb/EAB5/production/_121158006_gettyimages-1328227222.jpg", "https://ichef.bbci.co.uk/news/976/cpsprodpb/EAB5/production/_121158006_gettyimages-1328227222.jpg"],
        };

        if (this.state.type == "activity") {
            this.state.activity_id = this.props.route.params.activity_id;
        }
        else if (this.state.type == "group") {
            this.state.group_id = this.props.route.params.group_id;
        }

        this.fetchInvitationData = this.fetchInvitationData.bind(this);
        this.acceptInvitation = this.acceptInvitation.bind(this);
        this.removeInvitation = this.removeInvitation.bind(this);

        //once done, lazy update
        this.lazyUpdate = this.lazyUpdate.bind(this);
        this.cleanImages = this.cleanImages.bind(this);
        this.handleImageURI = this.handleImageURI.bind(this);
    }

    async log_in() {
        
    }
    
    componentDidMount() {
        //init

        //fetch data
        //this.fetchInvitationData();
    }

    async fetchInvitationData() {
        if (this.state.reload) {
            this.state.reload = false;
    
            //reload to now hide reload button
            this.lazyUpdate();
        }

        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, ("/api/User/Generic/ViewInvitation?id=" + this.state.id))
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
                var invitation_information = JSON.parse(result.request.response).invitation_information;

                //add user information
                this.state.view_type = invitation_information.type;

                if (this.state.view_type == "person") {
                    this.state.name = invitation_information.first_name + " " + invitation_information.last_name;
                }
                else if (this.state.view_type == "activity") {
                    this.state.name = invitation_information.name;
                }

                this.state.invitation_message = invitation_information.invitation_type_message;
                this.state.invitation_id = invitation_information.invitation_id;
                this.state.view_id = invitation_information.id;
                this.state.view_type = invitation_information.type;
                this.state.is_invitee = invitation_information.is_invitee;

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
                Alert.alert(JSON.parse(result.response.data));
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

        this.props.navigation.setOptions({headerTitle: () => <HeaderTitle title={this.state.name}/>});
    }

    render() {
        var renderViewOther = {};

        if (this.state.type == "person")
        {
            renderViewOther = (
                <View>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.navigation.navigate("Other Profile Screen", {id: this.state.person_id, type: "none", viewing:""});}}>
                        <View style={actions_styles.action_button_inner}>
                            <AntDesign name="message1" size={20} color="white" style={actions_styles.action_button_icon}/>
                            <Text style={actions_styles.action_button_text}>
                                View Profile
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            renderViewOther = (
                <View>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.navigation.navigate("Other Activity Screen", {id: this.state.activity_id, type: "none", viewing:""});}}>
                        <View style={actions_styles.action_button_inner}>
                            <AntDesign name="message1" size={20} color="white" style={actions_styles.action_button_icon}/>
                            <Text style={actions_styles.action_button_text}>
                                View Activity
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
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
                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Announcement
                            </Text>
                            <Text style={info_styles.inner_text}>
                                {this.state.body}
                            </Text>
                        </View>
                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Actions
                            </Text>
                            <View style={actions_styles.actions_view}> 
                                {renderViewOther}
                            </View>
                        </View>
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

    lazyUpdate() {
        this.forceUpdate();
    }
}
