import React from 'react';
import {StyleSheet, View, Image, Alert, ScrollView,  Dimensions, Platform, Text} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import {GlobalProperties, GlobalValues} from '../../../global/global_properties.js'
import {GlobalEndpoints} from '../../../global/global_endpoints.js';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: GlobalValues.DARKER_WHITE,
            height: '50%',
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
            fontFamily: 'Roboto'
        }, 
        horizontal_bar: {
            width: '94%',
            alignSelf: 'center',
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE,
        }
    }
);

const image_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: "white",
        },
        body: {
            flex: 1,
            flexWrap: 'wrap',
            alignContent: 'space-around',
            backgroundColor: 'white',
            marginHorizontal: '2%',
            marginTop: '5%',
            borderRadius: 5,
        },
        box: {
            marginTop: Math.trunc(Dimensions.get('window').width * 0.10),
            marginLeft: Math.trunc(Dimensions.get('window').width * 0.10),
            marginBottom: Math.trunc(Dimensions.get('window').width * 0.029),
            height: Math.trunc(Dimensions.get('window').width * 0.35),
            width: Math.trunc(Dimensions.get('window').width * 0.35),
        },
        image: {
            borderWidth: 2,
            borderColor: 'gray',
            height: Math.trunc(Dimensions.get('window').width * 0.35),
            width: Math.trunc(Dimensions.get('window').width * 0.35),
        },
    }
);

const post_button_styles = StyleSheet.create({
    button_view: {
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 99
    },
    button: {
        flexDirection: "row",
        alignItems: 'flex-start',
        borderRadius: 5,
        backgroundColor: GlobalValues.DISTINCT_GRAY,
        borderColor: GlobalValues.DISTINCT_GRAY,
        paddingHorizontal: 20,
        paddingVertical: 4,
        alignSelf: 'center',
        alignContent: 'center',
    },
    button_text: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center',
    }
});

export class EditImagesScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for the image selector
            selected_image_location: null,

            uploading_image: false,

            profile_images: this.props.route.params.profile_images,
        }

        this.chooseImage = this.chooseImage.bind(this);
        this.renderProfileImages = this.renderProfileImages.bind(this);
    }

    componentDidMount() {
        GlobalProperties.return_screen = "Edit Images Screen";
        GlobalProperties.screen_props = {
            edit_image: false
        }
    }

    renderProfileImages() {
        var profileImages = [];

        for (var i = 0; i < GlobalValues.FRIENDS_NUM_PROFILE_IMAGES; i++) {
            if (i >= this.state.profile_images.length) {
                profileImages.push(<ProfileImage key={i} chooseImage={this.chooseImage} id={i}/>);   
            }
            else {
                profileImages.push(<ProfileImage key={i} chooseImage={this.chooseImage} uri={this.state.profile_images[i]} id={i}/>);  
            }
        }

        return profileImages;
    }

    render() {
        return (
            <View style={[main_styles.page, {flex: 1}]}>
                <ScrollView contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", flexGrow: 1}}>
                        {this.renderProfileImages()}
                    <EmptySpace key={0}/>
                </ScrollView>
                <View style={post_button_styles.button_view}>
                    {this.state.uploading_image ? (
                        <View style={post_button_styles.button} onPress={() => {this.syncUpdates()}}>
                            <Text style={post_button_styles.button_text}>
                                Uploading Image
                            </Text>
                        </View>
                    ) : (
                        <View />
                    )}
                </View>
            </View>
        );
    }

    //update the screen
    lazyUpdate() {
        this.forceUpdate();
    }

    //choose image from camera roll
    async chooseImage (id) {
        //check if we are not on the web and we have permission to the camera roll
        if (Platform.OS !== 'web') 
        {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            .then((status) => {return (status);})
            .catch((error) => {return null;});
            
            if (status !== 'granted') 
            {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
        }

        //get the image, allow editing
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        //handle the result if an image is selected
        if(!result.cancelled) {
            //set uploading image to true
            this.setState({uploading_image: true});

            //call the pass function, the function that will use this value
            //check if the pass function is null
            this.state.profile_images[id] = result.uri;

            //convert image to compressed jpg
            const result_change = await manipulateAsync(
                result.uri, [
                    {resize: {width: 400, height: 400}}
                ],
                { compress: 1, format: SaveFormat.PNG} //compress: 0
            );

            var image_uri = Platform.OS === 'android' ? result_change.uri : result_change.uri.replace('file://', '');

            //upload to server
            var body = new FormData();
            body.append('num', id);
            body.append('image', {
                uri: image_uri,
                type: 'image/png',
                name: 'photo.png'
            });

            //if request was successful
            var successful = false;

            //make request
            result = await GlobalEndpoints.makePostRequestFormData(true, "/api/User/Friends/UploadProfileImage", body)
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
                    GlobalProperties.return_screen = "Edit Images Screen";
                    GlobalProperties.screen_props = {
                        edit_images: true
                    }

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
        }
       
        this.setState({uploading_image: false});
    }
    
    //delete a data component from a json data structure with id attributes, each different
    deleteDataComponent(id, DATA) {
        for (let [i, data] of DATA.entries()) {
            if (data.id == id) {
                DATA.splice(i, 1);
            }
        }
    }

    //after the delete alert, and delete has been pressed
    afterDeleteAlert(id, DATA) {
        this.deleteDataComponent(id, DATA);
        this.lazyUpdate();
    }
}

//create a delete alert for deleting an attribute of id=id from
// a json data structure with id attributes, each different.
const deleteAlert = (frameComponent, DATA, id) => {
    Alert.alert(
        "Delete",
        "Are you sure you want to delete this attribute?",
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "Delete",
                onPress: () => frameComponent.afterDeleteAlert(id, DATA),
            }
        ],
        {
            cancelable: true,
        }
    );
}
/*
        <View key={props.id} style={image_styles.box}>
            <Image style={image_styles.image} source={{uri: "https://ichef.bbci.co.uk/news/976/cpsprodpb/EAB5/production/_121158006_gettyimages-1328227222.jpg"}}/>
        </View>*/

class ProfileImage extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        if (this.props.uri) { 
            return (
                <TouchableOpacity style={image_styles.box} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.chooseImage(this.props.id)}}>
                    <Image style={image_styles.image} source={{uri: this.props.uri}}/>
                </TouchableOpacity>
            );
        }
        //default image
        else {
            return (
                <TouchableOpacity style={image_styles.box} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.chooseImage(this.props.id)}}>
                    <Image style={image_styles.image} source={require("../../../assets/images/default_image.png")}/>
                </TouchableOpacity>
            );
        }
    }
}
//source={{uri: "../../../assets/" + GlobalValues.DEFAULT_IMAGE}}

//get the profile image for the profile images
const ProfileImage_ = (props) => {
    //see if exists yet (see if setState in the promise of didComponentMount was called)
    if (props.uri) { 
        return (
            <TouchableOpacity key={props.id} style={image_styles.box} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {props.chooseImage(props.passFunction, props)}}>
                <Image style={image_styles.image} source={{uri: props.uri}}/>
            </TouchableOpacity>
        );
    }
    //default image
    else {
        return (
        <TouchableOpacity key={props.id} style={image_styles.box} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {props.chooseImage(props.passFunction, props)}}>
            <Image style={image_styles.image} source={{uri: "https://ichef.bbci.co.uk/news/976/cpsprodpb/EAB5/production/_121158006_gettyimages-1328227222.jpg"}}/>
        </TouchableOpacity>
        );
    }
}

const EmptySpace = (props) => {
    const btbh = useBottomTabBarHeight();

    return(
        <View style={{height: btbh, width: '100%'}}>
        </View>
    )
}

/*



                
*/