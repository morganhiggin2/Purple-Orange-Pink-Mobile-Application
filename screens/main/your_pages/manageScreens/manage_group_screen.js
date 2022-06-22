import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, ScrollView, FlatList} from 'react-native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {TouchableHighlight, TouchableOpacity} from 'react-native-gesture-handler';
import { AntDesign, Feather } from '@expo/vector-icons'; 
import {SliderBox } from "react-native-image-slider-box";

import { GlobalValues, GlobalProperties } from '../../../../global/global_properties';

const ImageStack = createMaterialTopTabNavigator();

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: '#FFEDE7', //#FFEDE7
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

const PROFILE_IMAGES = [
    {
        id: 1,
        image_url: "../../../images/fakelogo.png",
    }, 
    {
        id: 2,
        image_url: "../../../images/fakelogo.png",
    }, 
    {
        id: 3,
        image_url: "../../../images/fakelogo.png",
    }
];

const ACTIVITIES = [
    {
        name: "mountain biking"
    },
    {
        name: "fishing"
    },
    {
        name: "travel"
    },
    {
        name: "camping"
    }
];

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

/*<ImageStack.Navigator initialRouteName="Testing" swipeEnabled={true} tabBarOptions={{showLabel: false, style: {height: 3, backgroundColor: 'gray'}, tabStyle: {height: 0}, indicatorStyle: {height: 3, backgroundColor: 'white'}}}>
                    
                            {PROFILE_IMAGES.map((data, key) => {
                                return(
                                    <ImageStack.Screen key={data.id} name={"Testing" + data.id} children={() => <ProfileImage image_url={data.image_url} />}/>)
                            })}
                        </ImageStack.Navigator>*/

                        //../../../images/fakelogo.jpg

export class ManageGroupScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //is loading
            loading: true,

            group_images: [
                "https://ichef.bbci.co.uk/news/976/cpsprodpb/EAB5/production/_121158006_gettyimages-1328227222.jpg",
                "https://ichef.bbci.co.uk/news/976/cpsprodpb/EAB5/production/_121158006_gettyimages-1328227222.jpg",
                "https://ichef.bbci.co.uk/news/976/cpsprodpb/EAB5/production/_121158006_gettyimages-1328227222.jpg",
            ],

            //name of group
            title: "Car Group",

            //id of the group
            id: "590c909vf",
        }

        this.handleImageURI = this.handleImageURI.bind(this);
        this.viewInvitations = this.viewInvitations.bind(this);
        this.viewAdmins = this.viewAdmins.bind(this);
        this.viewParticipants = this.viewParticipants.bind(this);
        
        this.cleanImages = this.cleanImages.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {
        //init

        

        //get information from server
        /*if (this.state.type == 'activity') {

        }
        else if (this.state.type == 'group') {

        }

        //update search
        var body = {
            "radius": search_radius,
            "page_size": 1,
            "page_number": 1,
            "minimumAge": GlobalProperties.search_minAge,
            "maxiumumAge": GlobalProperties.search_maxAge,
            "attributes": GlobalProperties.search_attributes,
        };

        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makePostRequest(true, "/api/User/Friends/SearchUsers", body)
            .then((result) => {
                successful = true;
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
                var users = JSON.parse(result.request.response).users;

                //add groups
                this.state.participants = users;

                //update users
                this.updateparticipants();

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
            if (result.response.status == 400 && result.response.data) {
                Alert.alert(JSON.parse(result.response.data));
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
        }*/

        //TODO this goes in fetch code for valid case
        //gets the images from the response
        //...
        //clean images
        this.cleanImages();

        //TODO remove once get infomation from server is added
        this.state.loading = false;

        this.props.navigation.setOptions({headerTitle: () => <HeaderTitle title={"Manage Car Group"}/>});

        this.lazyUpdate();
    }

    async log_in() {
        
    }

    render() {
        var imagesRender;

        if (this.state.group_images.length > 0) {
            imagesRender = (
                <View style={image_styles.container}>
                    <SliderBox
                        images={this.state.group_images.map(uri => {
                            return(this.handleImageURI(uri));
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

        const renderComponent = () => {
            if (this.state.loading == true || this.state.loading == null) {
                return (
                <View style={main_styles.page}>
                    <Text>
                        Loading...
                    </Text>
                </View>
                );
            }
            else {
                return (
                    <View>
                        {imagesRender}

                        <View style={main_styles.name_view}>
                            <Text style={main_styles.title_text}>
                                Car Group
                            </Text>
                        </View>
                        <View style={filter_snaps_styles.profile_container}>
                            <View style={[filter_snaps_styles.inner_text, { backgroundColor: "#e31b50", borderColor: "#e31b50"}]}>
                                <AntDesign name="lock" size={18} color="white" style={filter_snaps_styles.icon}/>
                                <Text style={{color: 'white', fontSize: 18}}>
                                    Private
                                </Text>
                            </View>
                            <View style={[filter_snaps_styles.inner_text, { backgroundColor: "green", borderColor: "green"}]}>
                                <AntDesign name="eyeo" size={20} color="white" style={filter_snaps_styles.icon}/>
                                <Text style={{color: 'white', fontSize: 18}}>
                                    10,503 Members
                                </Text>
                            </View>
                        </View>

                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Description
                            </Text>
                            <Text style={info_styles.inner_text}>
                                This is the section about the info and i dont know if this is going to wrap but it should around the edge dammit this should fit
                            </Text>
                        </View>
                        
                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Attributes
                            </Text>
                            <View style={filter_snaps_styles.container}> 
                                {ACTIVITIES.map((data, key) => {
                                    return (
                                        <FilterSnap key={key} innerText={data.name} />
                                    );
                                })}
                            </View>
                        </View>

                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Actions
                            </Text>
                            <View style={actions_styles.actions_view}> 
                                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {}}>
                                    <View style={actions_styles.action_button_inner}>
                                        <Feather name="edit" size={20} color="white" style={actions_styles.action_button_icon}/>
                                        <Text style={actions_styles.action_button_text}>
                                            Edit Group
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {}}>
                                    <View style={actions_styles.action_button_inner}>
                                        <Feather name="edit" size={20} color="white" style={actions_styles.action_button_icon}/>
                                        <Text style={actions_styles.action_button_text}>
                                            Send Invitation
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.viewInvitations();}}>
                                    <View style={actions_styles.action_button_inner}>
                                        <Feather name="edit" size={20} color="white" style={actions_styles.action_button_icon}/>
                                        <Text style={actions_styles.action_button_text}>
                                            View Invitations
                                        </Text>
                                    </View>
                                </TouchableOpacity>
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

        for (var i = 0; i <= this.state.group_images.length; i++) {
            if (this.state.group_images[i] != null && this.state.group_images[i] != "") {
                cleaned_images.push(this.state.group_images[i]);
            }
        }

        this.state.group_images = cleaned_images;
    }

    handleImageURI(uri) {
        if (uri == undefined) {
            return(require("../../../../images/default_image.png"));
        }
        else {
            return(uri);
        }
    }
    
    viewInvitations() {
        //screen
        GlobalProperties.return_screen = "Manage Group Screen";

        //filters
        GlobalProperties.screen_props = {
            filters: {
                type: "invitation",
                invitation_type: "group",
                id: this.state.id,
            }
        };

        //go to screen
        //dangerouslyGetParent()
        //this.props.navigation.navigate("Your Messages Screen");
        this.props.navigation.navigate("Your Messages Navigator", {screen: "Your Messages Screen"});
    }

    viewAdmins() {
        this.props.navigation.navigate("View Admins Screen", {type: "group"});
    }

    viewParticipants() {
        this.props.navigation.navigate("View Participants Screen", {type: "group"});
    }
}

/*function ProfileImage (props) {
    return(
        <Image style={image_styles.image} source={{uri: 'https://media.istockphoto.com/photos/nicelooking-attractive-gorgeous-glamorous-elegant-stylish-cheerful-picture-id1165055006?k=20&m=1165055006&s=612x612&w=0&h=OD4-_BceL_R2eaaBzDQrXNIyydwYXOJX-m-0z12z17s='}}/>
    );
}*/