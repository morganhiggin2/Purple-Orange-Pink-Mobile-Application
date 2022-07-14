import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SliderBox } from "react-native-image-slider-box";
import { GlobalValues } from '../../../global/global_properties';
import { AntDesign, Feather } from '@expo/vector-icons'; 
import { GlobalValues } from '../../../../global/global_properties';

const ImageStack = createMaterialTopTabNavigator();

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: 'white', //#FFEDE7
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
        scroll_view: {
            backgroundColor: "white",
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
            backgroundColor: 'white', //#FFCDCD
            borderRadius: 5,
            padding: 8,
            marginVertical: "2%",
            marginHorizontal: '2%'
        },
        title_text: {
            color: 'black',
            fontFamily: 'Roboto',
            fontSize: 16,
            marginLeft: 5,
        }, 
        inner_text: {
            color: 'gray',
            fontFamily: 'Roboto',
            fontSize: 14,
            marginLeft: 5,
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
            fontFamily: 'Roboto',
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
        image_url: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    }, 
    {
        id: 2,
        image_url: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    }, 
    {
        id: 3,
        image_url: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    }
];

const images_list = ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fprofile%2F&psig=AOvVaw0qz3suAVBWP7JEMcpW7eZ4&ust=1644709514611000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJiVq8Xq-PUCFQAAAAAdAAAAABAD",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fprofile%2F&psig=AOvVaw0qz3suAVBWP7JEMcpW7eZ4&ust=1644709514611000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJiVq8Xq-PUCFQAAAAAdAAAAABAD", 
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&psig=AOvVaw1gialiSbdzLXWxMva5s75l&ust=1644708207280000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIitg9bl-PUCFQAAAAAdAAAAABAD"
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

export class AdminProfileScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "Joe Smith",
            age: 19,
            distance: 0.0,
            description: "",
            gender: "male",

            profile_images: [
                "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            ],

            attributes: [
                "mountain biking", 
                "fishing",
                "travel",
                "camping"
            ],


        };

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
        }*/

        //TODO this goes in fetch code for valid case
        //gets the images from the response
        //...
        //clean images
        this.cleanImages();

        //TODO remove once above is working
        this.state.loading = false;

        //once done, lazy update
        this.lazyUpdate();

        this.props.navigation.setOptions({headerTitle: () => <HeaderTitle title={this.state.name}/>});
    }

    render() {
        
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
                            <Text style={[main_styles.title_text, {color: 'black'}]}>
                                19
                            </Text>
                        </View>
                        <View style={filter_snaps_styles.profile_container}>
                            <View style={[filter_snaps_styles.inner_text, { backgroundColor: "#EC2783", borderColor: "#EC2783"}]}>
                                <AntDesign name="lock" size={18} color="white" style={filter_snaps_styles.icon}/>
                                <Text style={{color: 'white', fontSize: 18}}>
                                    Single
                                </Text>
                            </View>
                            <View style={[filter_snaps_styles.inner_text, { backgroundColor: "green", borderColor: "green"}]}>
                                <Text style={{color: 'white', fontSize: 18}}>
                                    Active: 4m ago
                                </Text>
                            </View>
                            <View style={[filter_snaps_styles.inner_text, { backgroundColor: "orange", borderColor: "orange"}]}>
                                <Text style={{color: 'white', fontSize: 18}}>
                                    Distance: {this.state.distance + " mi"}
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
                            <View style={info_styles.horizontal_bar} />
                            <Text style={info_styles.title_text}>
                                Gender
                            </Text>
                            <Text style={info_styles.inner_text}>
                                male
                            </Text>
                        </View>
                        <View style={info_styles.body}>
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
                                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {}}>
                                    <View style={actions_styles.action_button_inner}>
                                        <Feather name="edit" size={20} color="white" style={actions_styles.action_button_icon}/>
                                        <Text style={actions_styles.action_button_text}>
                                            Edit Activity
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
                                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {}}>
                                    <View style={actions_styles.action_button_inner}>
                                        <Feather name="edit" size={20} color="white" style={actions_styles.action_button_icon}/>
                                        <Text style={actions_styles.action_button_text}>
                                            View Invitations
                                        </Text>
                                    </View>
                                </TouchableOpacity>
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

        for (var i = 0; i <= this.state.group_images.length; i++) {
            if (this.state.group_images[i] != null && this.state.group_images[i] != "") {
                cleaned_images.push(this.state.group_images[i]);
            }
        }

        this.state.group_images = cleaned_images;
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

function ProfileImage (props) {
    return(
        <Image style={image_styles.image} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Morgan_Freeman_Deauville_2018.jpg'}}/>
    );
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