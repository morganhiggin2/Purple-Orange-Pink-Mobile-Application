import React from 'react';
import {StyleSheet, View, Text, Image, Alert, ScrollView,  Dimensions} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import {GlobalProperties, GlobalValues} from '../../../global/global_properties.js'
import { readDirectoryAsync } from 'expo-file-system';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: GlobalValues.DARKER_WHITE,
            height: '50%',
            width: '100%',
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
        }, 
        horizontal_bar: {
            width: '94%',
            alignSelf: 'center',
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE,
        }
    }
);

const section_styles = StyleSheet.create({
    body: {
        marginTop: "10%",
        backgroundColor: "white",
    },
    gap: {
        height: 30,
    }
});

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
            //marginLeft: Math.trunc(Dimensions.get('window').width * 0.08),
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

//<ImageStack.Screen key={data.id} name={"Testing" + data.id} children={() => <ProfileImage id={data.id} state={this.state}/>}/>

export class EditImagesScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for the image selector
            selected_image_location: null,

            profile_images: this.props.route.params.profile_images,
        }

        this.chooseImage = this.chooseImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentDidMount() {

        /*var profile_images = [];

        //if there were image uri's sent
        if (this.props.route.params.profile_images) {
            for (var i = 0; i < this.props.route.params.profile_images.length; i++) {
                profile_images.push(this.props.route.params.profile_images[i]);
            }
        }
        //we have a problem, houston
        else {
            console.log("no images passed to the edit images, will display nothing!");
        }
        
        this.setState({
            profile_images: profile_images,
        });*/

        GlobalProperties.return_screen = "Edit Images Screen";
        GlobalProperties.screen_props = {
            profile_images: this.state.profile_images
        };
    }

    render() {
        return (
            <View style={[main_styles.page, {flex: 1}]}>
                <ScrollView contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", flexGrow: 1}}>
                    {this.state.profile_images.map((data, key) => (
                        <ProfileImage key={key} chooseImage={this.chooseImage} uri={data} id={key}/>
                    ))}
                    <EmptySpace key={0}/>
                </ScrollView>
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
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') 
            {
              //alert('Sorry, we need camera roll permissions to make this work!');
              console.log("permission to camera roll not allowed!");
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

            //call the pass function, the function that will use this value
            //check if the pass function is null
            this.state.profile_images[id] = result.uri;

            //update global params
            GlobalProperties.screen_props.profile_images[id] = result.uri;

            this.lazyUpdate();
        }
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
    
    async uploadImage() {
        //upload image to server
        //have it or this handle overriding or new case
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
                <Image style={image_styles.image} source={{uri: "https://ichef.bbci.co.uk/news/976/cpsprodpb/EAB5/production/_121158006_gettyimages-1328227222.jpg"}}/>
            </TouchableOpacity>
            );
        }
    }
}

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