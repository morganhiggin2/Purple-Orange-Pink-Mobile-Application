import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, Alert, FlatList, Switch, Dimensions, Platform, TouchableHighlight, ActivityIndicator, Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Feather, AntDesign, Ionicons} from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { PickerIOS } from '@react-native-picker/picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import * as ImagePicker from 'expo-image-picker';
import { SliderBox } from "react-native-image-slider-box";
import Dialog from "react-native-dialog";

import {GlobalProperties, GlobalValues} from '../../../global/global_properties.js'
import { GlobalEndpoints } from '../../../global/global_endpoints.js';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { LoadingScreen } from '../../misc/loading_screen.js';

var ImageStack = createMaterialTopTabNavigator();

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
            borderBottomWidth: 1.5,
            borderColor: '#b8b8b8'
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

const info_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white', //#FFCDCD
        borderRadius: 5,
        paddingVertical: 4,
        marginVertical: "3%",
        marginHorizontal: '2%'
    },
    title_text: {
        alignSelf: 'flex-start',
        fontSize: 16,
        color: 'black',
        marginBottom: 6,
    }, 
    inner_text: {
        color: 'gray',
        fontSize: 14,
        marginLeft: 5,
    }
});

const attribute_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flexDirection: "column",
        paddingVertical: "3%",
        paddingHorizontal: "3%",
    },
    input_text_view: {
        flexDirection:  'row',
    },
    multiline_input_text: {
        fontSize: 18, 
        maxHeight: "96px", 
        textAlignVertical: "top",
    },
    title_text: {
        alignSelf: 'flex-start',
        fontSize: 16,
        color: 'black',
        marginBottom: 6,
    },
    text_input: {
        textAlignVertical: "top",
        flex: 1,
        maxHeight: 92,
        paddingVertical: 2,
        paddingHorizontal: 4,
        backgroundColor: '#EAEAEA',
        borderRadius: 8,
        fontSize: 18, 
    },
    slider: {
        alignSelf: 'center',
    },
    title_with_value: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title_value: {
        fontSize: 16,
        alignSelf: 'center'
    }
});

const inline_attribute_styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: "3%",
        paddingHorizontal: "3%",
    },
    title_view: {
        flexDirection: 'row',
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
        paddingVertical: 2,
        paddingHorizontal: 4,
        width: '100%',
        backgroundColor: '#EAEAEA',
        borderRadius: 4,
        textAlign: 'right',
        fontSize: 18, 
    },
    drop_down_selector: {
        paddingHorizontal: 4,
    },
    date_picker: {
        width: 200,
    }
});

const actions_styles = StyleSheet.create(
    {
        body: {
            paddingVertical: "2%",
            paddingHorizontal: "3%",
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

const post_button_styles = StyleSheet.create({
    button_view: {
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row-reverse',
    },
    button: {
        flexDirection: "row",
        alignItems: 'flex-start',
        borderRadius: 5,
        backgroundColor: GlobalValues.ORANGE_COLOR,
        borderColor: GlobalValues.ORANGE_COLOR,
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
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
        }
    }
);

const image_styles = StyleSheet.create(
    {
        container: {
            backgroundColor: "white",
            width: 250,
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

export class YourProfileScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //user values
            first_name: "",
            last_name: "",
            description: "",
            attributes: [],
            points: [],
            gender: "",
            shown: false,

            //new points
            new_points: [],

            //ids of points who's images have changed
            new_point_images: [],

            //for managing points locally
            max_point_index: 0,

            //is loading
            loading: true,
            reload: false,

            //if we need to add existing points to updateBody
            addPointsToUpdateBody: false,

            //if we need to include new points
            addNewPointsToUpdateBody: false,

            //for the date selector
            date: GlobalProperties.birthdate,
            showDatePicker: false,

            //for the list of activities
            attributes_input_handler: null,

            //for the activity dropdown
            gender_dropdown_value: "other",
            
            //for profile images
            profile_images: ["https://prod-images.tcm.com/Master-Profile-Images/MorganFreeman.jpg", "https://www.biography.com/.image/t_share/MTgwNjE3NzgwMzg1NTU1NTQ0/gettyimages-56349854-copy.jpg"],

            //if update made
            updateMade: false,

            //update json body
            updateBody: {},
        }

        //TODO REMOVE
        this.state.points = [
            {
                id: "4lk09s0df89v0js90",
                caption: "this is a point, we went to a point and made a point, this is a cool point",
                image_uri: ""
            }, 
            {
                id: "5lk09s0df89v0js90",
                caption: "this is a point, we went to a point and made a point, this is a cool point",
                image_uri: "https://www.biography.com/.image/t_share/MTgwNjE3NzgwMzg1NTU1NTQ0/gettyimages-56349854-copy.jpg"
            }
        ];

        this.fetchProfileInformation = this.fetchProfileInformation.bind(this);
        this.updateUpdateMade = this.updateUpdateMade.bind(this);
        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateLastName = this.updateLastName.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.updateActivityDropDownValue = this.updateActivityDropDownValue.bind(this);
        this.updateGenderDropDownValue = this.updateGenderDropDownValue.bind(this);
        this.syncUpdates = this.syncUpdates.bind(this);
        this.updateShown = this.updateShown.bind(this);
        //this.validateFields = this.validateFields.bind(this);
        this.cleanImages = this.cleanImages.bind(this);
        this.showError = this.showError.bind(this);
        this.deletePoint = this.deletePoint.bind(this);
        this.deletePointAlert = this.deletePointAlert.bind(this);
        this.addPoint = this.addPoint.bind(this);
        this.pointsUpdatedCaption = this.pointsUpdatedCaption.bind(this);
        this.pointsUpdatedImage = this.pointsUpdatedImage.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {
        //get information from server for profile
        this.fetchProfileInformation();

        //get profile images
        //get all the promises
        //get the profile images promises
        /*for (let i = 0; i < 3; i++) {
            profile_images[i] = GlobalProperties.get_key_value_pair("profile_image_" + i);
        }

        //make sure all promises finish before continuing, with a set timeout

        Promise.all(profile_images) //put all promises in this array [one, two, ...]
        .then(promises => {
            //set state

            this.setState({
                profile_images: promises, 
            });

            this.cleanImages();
        }); */

        this.props.navigation.addListener('focus', () => {
            this.state.global_props = GlobalProperties.screen_props;

            if (GlobalProperties.return_screen == "Edit Images Screen" && GlobalProperties.screen_props != null) {
                this.state.profile_images = GlobalProperties.screen_props.profile_images;

                //TODO call async function to upload image to server, also add loading circle for app to prevent user from doing anything else while showing it's uploadwith with gif animation

                this.lazyUpdate();
            }

            GlobalProperties.screenActivated();
        });
    }

    async fetchProfileInformation() {
        if (this.state.reload) {
            this.state.reload = false;
    
            //reload to now hide reload button
            this.lazyUpdate();
        }

        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Friends/GetCurrentFriendUserInformation")
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
                var user_information = JSON.parse(result.request.response).user_information;

                //set values
                this.state.first_name = user_information.first_name;
                this.state.last_name = user_information.last_name;
                this.state.description = user_information.description;
                this.state.shown = user_information.shown;
                this.state.attributes = user_information.attributes;
                this.state.date = new Date(Date.parse(user_information.birthdate, "dd/MM/yyyy"));
                this.state.gender_dropdown_value = user_information.gender;
                this.state.points = user_information.points;

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

        //once done, lazy update
        this.lazyUpdate();
    }

    render() { 
        var pointsRender = [];//this.state.points;

        /*for (var i = 0; i < this.state.points.length; i++) {
            pointsRender.push(<Point key={i + this.state.points.length} index={i} data={this.state.points[i]} parentLazyUpdate={() => {this.lazyUpdate();}} deleteAlert={this.deletePointAlert} pointsUpdatedImage={this.pointsUpdatedImage} pointsUpdatedCaption={this.pointsUpdatedCaption}/>);
            //pointsRender[i]["index"]
        }*/

        /*{this.state.points.map((data, key) => {
                        console.log(data);
                        console.log(":::" + key);
                        return (
                            <Point key={data.id} index={key} data={data} parentLazyUpdate={() => {this.lazyUpdate();}} deleteAlert={this.deletePointAlert} pointsUpdatedImage={this.pointsUpdatedImage} pointsUpdatedCaption={this.pointsUpdatedCaption}/>
                        );
                    })} */

        const renderComponent = ({item}) => {
            return (
                <View>
                    <View style={image_styles.container}>
                        <SliderBox
                            images={this.state.profile_images.map(uri => {
                                return(handleImageURI(uri));
                            })}
                            parentWidth={image_styles.image.width}
                            sliderBoxHeight={image_styles.image.height}
                            dotColor={GlobalValues.ORANGE_COLOR}
                            inactiveDotColor={GlobalValues.DISTINCT_GRAY}
                        />
                    </View>
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                First Name
                            </Text>
                            <View style={inline_attribute_styles.input_text_view}>
                                <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" editable={true} maxLength={160} defaultValue={this.state.first_name} onChangeText={(value) => {this.updateFirstName(value);}} onEndEditing={(value) => {this.updateUpdateMade(false)}}/>
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/><View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Last Name
                            </Text>
                            <View style={inline_attribute_styles.input_text_view}>
                                <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" editable={true} maxLength={160} defaultValue={this.state.last_name} onChangeText={(value) => {this.updateLastName(value);}} onEndEditing={(value) => {this.updateUpdateMade(false)}}/>
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Gender
                            </Text>
                            <View style={[inline_attribute_styles.drop_down_selector, Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH} : {width: 120, alignSelf: 'flex-end'}]}>
                                <DropDown 
                                        style={Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH, flexDirection: 'row'} : {}}
                                        items={[{label: 'Male', value: 'male'}, {label: 'Female', value: 'female', }, {label: "Other", value: "other"}]}
                                        onChangeValue = {this.updateGenderDropDownValue}
                                        currentValue = {this.state.gender_dropdown_value}
                                        />
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Birthdate
                            </Text>       
                            <View style={attribute_styles.input_text_view}>
                                <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                                    <Text style={{color: 'blue'}}>
                                            {this.showDate()} 
                                            {" "}
                                    </Text>
                                </TouchableOpacity>
                            </View>   
                        </View>
                        {this.showDatePicker()}
                    </View>
                    <View style={section_styles.gap} />
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <View style={inline_attribute_styles.title_view}>
                                <Text style={inline_attribute_styles.title_text}>
                                    {"Attributes "}
                                </Text>
                                <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} activeOpacity={1} onPress={() => {Alert.alert("Attributes", GlobalValues.ATTRIBUTES_INFORMATION);}}>
                                    <AntDesign name="infocirlceo" size={14} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={inline_attribute_styles.input_text_view}>
                                <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" editable={true} maxLength={160} ref={(input) => {this.state.attributes_input_handler = input}} onEndEditing={(event) => {this.addFilter(event.nativeEvent.text);}}/>
                            </View>
                        </View>
                        <View style={filter_snaps_styles.container}> 
                            {this.state.attributes.map((data, key) => {
                                return (
                                    <FilterSnap key={key} parent={this} innerText={data} data={this.state.attributes} id={key}/>
                                );
                            })}
                        </View>  
                        <View style={main_styles.horizontal_bar}/>
                        <View style={attribute_styles.body}>
                            <Text style={attribute_styles.title_text}>
                                Description
                            </Text>     
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={[attribute_styles.text_input, {fontSize: 18, textAlignVertical: "top"}]} multiline={true} editable={true} maxLength={160} numberOfLines={4} scrollEnables={true} defaultValue={this.state.description} onChangeText={(value) => {this.updateDescription(value);}} onEndEditing={(value) => {this.updateUpdateMade(false)}}/>
                            </View>                   
                        </View>                    
                    </View>
                    <View style={section_styles.gap} />
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Shown
                            </Text>    
                            <Switch
                                trackColor = {{false: GlobalValues.DISTINCT_GRAY, true: GlobalValues.ORANGE_COLOR}}
                                thumbColor = {this.state.shown ? 'white': 'white'}
                                ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                                onValueChange = {this.updateShown}
                                value = {this.state.shown}
                            /> 
                        </View>                        
                    </View>
                    <View style={section_styles.gap} />
                    <View style={info_styles.body}>
                        <View style={actions_styles.body}> 
                            <Text style={info_styles.title_text}>
                                Actions
                            </Text>
                            <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.navigation.navigate("Edit Images Screen", {profile_images: this.state.profile_images})}}>
                                <View style={actions_styles.action_button_inner}>
                                    <Feather name="edit" size={20} color="white" style={actions_styles.action_button_icon}/>
                                    <Text style={actions_styles.action_button_text}>
                                        Edit Images
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={section_styles.gap} />
                    <TouchableOpacity style={[info_styles.body, {flexDirection: "row", justifyContent: 'center'}]} onPress={() => {this.addPoint();}}>
                        <Ionicons name="add-circle-outline" size={20} color={GlobalValues.ORANGE_COLOR} style={actions_styles.action_button_icon}/>
                        <Text style={[actions_styles.action_button_text, {color: GlobalValues.ORANGE_COLOR}]}>
                            {"Add Point "}
                        </Text>
                    </TouchableOpacity>
                    {this.state.points.map((data, key) => {
                        return (
                            <Point key={data.id} data={data} parentLazyUpdate={() => {this.lazyUpdate();}} deleteAlert={this.deletePointAlert} pointsUpdatedImage={this.pointsUpdatedImage} pointsUpdatedCaption={this.pointsUpdatedCaption}/>
                        );
                    })}
                    <View style={section_styles.gap} />
                    <View style={section_styles.gap} />
                    <View style={section_styles.gap} />
                </View>
            );
        };

        if (this.state.loading) {
            return (
                <LoadingScreen tryAgain={this.fetchProfileInformation} reload={this.state.reload}/>
            );
        }
        else {
            return (
                <View style={[main_styles.page, {flex: 1}]}>
                    <FlatList data={[{}]} keyExtractor={() => "dummy"} listEmptyComponent={null} renderItem={renderComponent} style={{zIndex: 99, flex: 1}}/><View style={post_button_styles.button_view}>
                    
                    {this.state.updateMade ? (
                        <TouchableHighlight style={post_button_styles.button} underlayColor={'#ff6e6e'} onPress={() => {this.syncUpdates()}}>
                        <Text style={post_button_styles.button_text}>
                            Save Updates
                        </Text>
                        </TouchableHighlight>
                    ) : (
                        <View/>
                    )}
                    
                    </View>
                </View>
            );
        }
    }

    /*{this.state.points.map((data, key) => {
                        return (
                            Point(data.id, data.description, data.image_uri)
                        );
                    })}*/

    /*<View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Enable
                            </Text>
                            <Switch
                                trackColor = {{false: GlobalValues.DISTINCT_GRAY, true: GlobalValues.ORANGE_COLOR}}
                                thumbColor = {this.state.enable_value ? 'white': 'white'}
                                ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                                onValueChange = {this.updateEnableValue}
                                value = {this.state.enable_value}
                            />
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={attribute_styles.body}>
                            <View style={attribute_styles.title_with_value}>
                                <Text style={attribute_styles.title_text}>
                                    Slider
                                </Text>
                                <Text style={attribute_styles.title_value}>
                                    {this.state.slider_value}
                                </Text>
                            </View>
                            <View style={attribute_styles.slider}>
                                <Slider onChangeValue={this.updateSliderValue} min={0} max={10} step={1} initialValue={0} backgroundColor={'#FF7485'}/>
                            </View>
                        </View>*/

    //update the screen
    lazyUpdate() {
        this.forceUpdate();
    }

    addPoint() {
        //we have to set the id of the new points as it is the key of the point.
        this.state.points.push(
            {
                id: "new_point_" + this.state.max_point_index,
                caption: "",
                image_uri: ""
            }
        );

        this.state.max_point_index++;

        this.state.addNewPointsToUpdateBody = true;

        this.updateUpdateMade(true);
    }

    pointsUpdatedCaption(id, value) {
        for (let [i, data] of this.state.points.entries()) {
            if (data.id == id) {
                if (!data.id.startsWith("new_point")) {
                    this.state.addPointsToUpdateBody = true;
                }

                this.state.points[i].caption = value;

                this.updateUpdateMade(false);
                return;
            }
        }
    }

    pointsUpdatedImage(id, value) {
        for (let [i, data] of this.state.points.entries()) {
            if (data.id == id) {
                if (!data.id.startsWith("new_point")) {
                    this.state.addPointsToUpdateBody = true;

                    this.state.new_point_images.push(data.id);
                }

                this.state.points[i].image_uri = value;

                this.updateUpdateMade(false);
                return;
            }
        }
    }

    deletePoint(id) {
        for (let [i, data] of this.state.points.entries()) {
            if (data.id == id) {
                if (!data.id.startsWith("new_point")) {
                    this.state.addPointsToUpdateBody = true;
                }

                this.state.points.splice(i, 1);
                this.updateUpdateMade(true);
                return;
            }
        }
    }
    
    deletePointAlert(id) {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete this point?",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {this.deletePoint(id);}
                }
            ],
            {
                cancelable: true,
            }
        );
    }

    //get rid of any null entries
    cleanImages() {
        //this is not working right
        var cleaned_images = [];

        for (var i = 0; i <= this.state.profile_images.length; i++) {
            if (this.state.profile_images[i] != null && this.state.profile_images[i] != "") {
                cleaned_images.push(this.state.profile_images[i]);
            }
        }

        if (cleaned_images.length == 0) {
            cleaned_images.push(require("../../../images/default_image.png"));
        }

        this.state.profile_images = cleaned_images;
    }

    //for the time setting
    showDate() {
        //when you press cancel, it gives an undefined date
        //so check if is undefined (cancel has been pressed, or other)

        if (this.state.date == undefined) {
            this.state.date = new Date(Date.now());
        }

        return (this.state.date.toDateString());
    }

    //show the date picker
    showDatePicker() {
        if (this.state.showDatePicker) {
            this.state.showDatePicker = false;

            return(
                <DateTimePicker mode="date" value={this.state.date} is24Hour={true} display="default" onChange={(event, newDate) => {this.updateDate(newDate)}}/>            
            );
        }
        else {
            return (<View/>);
        }
    }

    updateDate(value) { 
        console.log(value);
        this.state.date = value;

        this.state.updateBody["birthdate"] = this.state.date.getDate() + "/" + this.state.date.getMonth() + "/" + this.state.date.getFullYear();
        
        this.updateUpdateMade(true);
    }
    
    addFilter(input) {
        //add it
        //this.state.attributes.push({id: this.state.attributes.length, name: input});
        this.state.attributes.push(input);
        //clear the text input
        this.state.attributes_input_handler.clear();
        //update updatebody
        this.state.updateBody["attributes"] = this.state.attributes;
        //update variable and update the screen (method calls lazy update)
        this.updateUpdateMade(true);
    }

    //delete a data component from a json data structure with id attributes, each different
    deleteDataComponent(id, DATA) {
        for (var i = 0; i < DATA.length; i++) {
            if (i == id) {
                DATA.splice(i, 1);
            }
        }
    }

    updateUpdateMade(mustUpdate) {
        if (mustUpdate || !this.state.updateMade) {
            this.state.updateMade = true;
            this.lazyUpdate();
        }
        else {
            this.state.updateMade = true;
        }
    }

    updateFirstName(value) {
        this.state.first_name = value;

        //update updatebody
        this.state.updateBody["first_name"] = this.state.first_name;
    }

    updateLastName(value) {
        this.state.last_name = value;

        //update updatebody
        this.state.updateBody["last_name"] = this.state.last_name;
    }

    updateDescription(value) {
        this.state.description = value;

        this.state.updateBody["description"] = this.state.description;
    }

    updateShown(value) {
        this.state.shown = value;

        this.state.updateBody["shown"] = this.state.shown;

        this.updateUpdateMade(true);
    }

    //update the dropdown selector for activities
    updateActivityDropDownValue(value) {
        this.state.activity_dropdown_value = value;
    }

    //update the dropdown selector for activities
    updateGenderDropDownValue(value) {
        GlobalProperties.search_gender = value;

        this.state.gender_dropdown_value = value;

        this.state.updateBody["gender"] = this.state.gender_dropdown_value;

        this.updateUpdateMade(false);
    }

    async syncUpdates() {
        if (!(await this.validateFields())) {
            return;
        }

        //if updated points
        if (this.state.addPointsToUpdateBody) {
            this.state.updateBody["points"] = [];

            for (let [i, data] of this.state.points.entries()) {
                if (!data.id.startsWith("new_point")) {
                    this.state.updateBody["points"].push(data.id);
                }
            }
        }

        //if added new points
        if (this.state.addNewPointsToUpdateBody) {
            this.state.updateBody["new_points"] = [];

            for (let [i, data] of this.state.points.entries()) {
                if (data.id.startsWith("new_point")) {
                    this.state.updateBody["new_points"].push(data.caption);
                }
            }
        }
        
        //if request was successful
        var successful = false;
        //make request        
        var result = await GlobalEndpoints.makePostRequest(true, "/api/User/Friends/UpdateUserInformation", this.state.updateBody)
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
                if (this.state.addNewPointsToUpdateBody) {
                    //get new points
                    var newPointIds = JSON.parse(result.request.response).new_point_ids;

                    for (let [i, id] of newPointIds.entries()) {
                        //set indexes
                        var newPointIdIndex = 0;

                        for (let [i, data] of this.state.points.entries()) {
                            if (data.id.startsWith("new_point")) {
                                this.state.points[i].id = newPointIds[newPointIdIndex];
                                newPointIdIndex++;
                            }
                        }

                        //call async method to upload images of new points
                    }
                }

                if (this.state.addPointsToUpdateBody) {
                    //upload images of points that were changed
                    for (let [i, id] of this.state.new_point_images.entries()) {
                        //get image uri (going to be local)
                        var image_uri = this.state.points.find((p) => {return(p.id == id);}).image_uri;

                        //uploadImageToServer(id, image_uri)
                    }
                }

                //once done, clear updatebody and variables
                this.state.updateBody = {};
                this.state.addPointsToUpdateBody = false;
                this.state.addNewPointsToUpdateBody = false;
                this.state.updateMade = false;

                this.lazyUpdate();
            }
            else {
                //returned bad response, fetch server generated error message

                Alert.alert(result.data);
                return;
            }
        }
        else {

            //invalid request
            if (result == undefined) {
                Alert.alert("There seems to be a network connection issue.\nCheck your internet.");            
                return;
            }
            else if (result.response.status == 400 && result.response.data) {
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
        }
    }

    /*doneEditingFirstName() {
        
        //validate first name field
        if (this.state.first_name.length == 0) {
            this.showError("first name field must not be empty");
            this.state.updateUpdateMade = false;
            this.lazyUpdate();
            return false;
        }

        if (this.state.first_name.length > 256) {
            this.showError("first name field is too long");
            this.state.updateUpdateMade = false;
            this.lazyUpdate();
            return false;
        }

        this.updateUpdateMade();
    }

    doneEditingFirstName() {
        //validate last name field
        if (this.state.last_name.length == 0) {
            this.showError("last name field must not be empty");
            this.state.updateUpdateMade = false;
            this.lazyUpdate();
            return false;
        }

        if (this.state.laset_name.length > 256) {
            this.showError("last name field is too long");
            this.state.updateUpdateMade = false;
            this.lazyUpdate();
            return false;
        }

        this.updateUpdateMade();
    }

    doneEditingDescription() {
        //validate description
        if (this.state.description.length == 0) {
            this.showError("description field must not be empty");
            this.state.updateUpdateMade = false;
            this.lazyUpdate();
            return false;
        }

        if (this.state.description.length > 2048) {
            this.showError("description field is too long");
            this.state.updateUpdateMade = false;
            this.lazyUpdate();
            return false;
        }

        this.updateUpdateMade();
    }

    doneEditingAttributes() {
        //validate attributes
        if (this.state.attributes.length == 0) {
            this.showError("must have at least one attribute");
            this.state.updateUpdateMade = false;
            this.lazyUpdate();
            return false;
        }

        this.updateUpdateMade();
    }

    doneEditingDate() {
        var validDate = new Date(Date.now());
        validDate.setFullYear(dateNow.getFullYear() + 18);

        //validate birthdate
        if (this.state.date.getTime() >= validDate) {
            this.showError("you must be at least 18 years old to use this app");
            return false;
        }

        this.updateUpdateMade();
    }*/
    
    async validateFields() {
        //validate first name field
        if (this.state.first_name.length == 0) {
            this.showError("first name field must not be empty");
            return false;
        }

        if (this.state.first_name.length > 256) {
            this.showError("first name field is too long");
            return false;
        }

        //validate last name field
        if (this.state.last_name.length == 0) {
            this.showError("last name field must not be empty");
            return false;
        }

        if (this.state.last_name.length > 256) {
            this.showError("last name field is too long");
            return false;
        }

        if (this.state.description.length > 2048) {
            this.showError("description field is too long");
            return false;
        }

        //validate attributes
        if (this.state.attributes.length == 0) {
            this.showError("must have at least one attribute");
            return false;
        }

        var validDate = new Date(Date.now());
        validDate.setFullYear(validDate.getFullYear() - 18);

        //validate birthdate
        if (this.state.date.getTime() >= validDate) {
            this.showError("you must be at least 18 years old to use this app");
            return false;
        }

        return true;
    }
    
    showError(error) {
        Alert.alert(
            error
        );
    }

    //after the delete alert, and delete has been pressed
    afterDeleteAlert(id, DATA) {
        //delete attribute
        this.deleteDataComponent(id, DATA);
        //update updatebody
        this.state.updateBody["attributes"] = this.state.attributes;
        //update variable and update the screen (method calls lazy update)
        this.updateUpdateMade(true);
    }
}

function handleImageURI(uri) {
    if (uri == undefined) {
        return(require("../../../images/default_image.png"));
    }
    else {
        return({uri: uri});
    }
}

class DropDown extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        open: false,
        value: null,
        items: props.items
      };

      if (this.props.currentValue != null) {
          this.state.value = this.props.currentValue;
      }
  
      this.setValue = this.setValue.bind(this);
      this.changeValue = this.changeValue.bind(this);
    }
  
    //set the open state
    setOpen = (open) => {
      this.setState({
        open: open
      });
    }
  
    //set the value (ANDROID, involves a callback)
    setValue = (callback) => {
        //call the changeitem method from props
        this.props.onChangeValue(callback());

        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    changeValue = (item) => {
        this.props.onChangeValue(item);

        this.setState(state => ({
            value: item
        }));
    }
  
    //set the items (ANDROID, involves a callback)
    setItems = (callback) => {
      this.setState(state => ({
        items: callback(state.items)
      }));
    }
  
    render() {

      const { open, value, items } = this.state;
  
      return (
        items ? (
            Platform.OS == 'ios' ? (
                open ? (
                    <PickerIOS
                        //open={open}
                        selectedValue={this.state.value}
                        //onValueChange={(value) => {this.setState({value: value, open: false});}}
                        onValueChange={(value) => {this.changeValue(value); this.setOpen(false)}}
                        style={{width: GlobalValues.IOS_DROPDOWN_WIDTH}}
                        >
                            {items.map((data) => {
                                return (
                                <PickerIOS.Item
                                   key={data.label}
                                   label={data.label}
                                   value={data.value}
                                />);
                            })}
                    </PickerIOS>
                ) : (
                    //, flexBasis: 'sp'
                    <View style={{alignSelf: 'flex-end'}}>
                        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.setState({open: true})}}>
                            <Text style={{marginRight: 5}}>
                                {this.state.value == null ? "Select" : this.state.items.find(e => e.value == this.state.value).label} 
                            </Text>
                            <AntDesign style={{alignSelf: 'center'}} name="down" size={14} color="black"/>
                        </TouchableOpacity>
                    </View>
                )
            ) : (
                <View>
                    <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={this.setOpen}
                    setValue={this.setValue}
                    setItems={this.setItems}
                    listMode={"SCROLLVIEW"}
                    style={{borderWidth: 0, borderRadius: 4, height: 40}}
                    dropDownContainerStyle={{borderWidth: 0, borderRadius: 4}}
                    maxHeight={120}
                    placeholder={"Select"}
                    />

                    {open ? (
                        <View style={{height: 120}}/>
                    ) : (
                        <View/>
                    )}
                </View>
            )
        ) : (
            <View>

            </View>
        )
      );
    }
}

class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.initialValue
        }
    }

    render() {
        return(
            <MultiSlider
                values = {this.value}
                onValuesChange = {this.props.onChangeValue}
                min={this.props.min}
                max={this.props.max}
                step={this.props.step}
                sliderLength={300}
                isMarkersSeparated = {true}
                width={'100%'}
                showSteps = {true}
                showStepLabels = {true}
                trackStyle = {{backgroundColor: '#b8b8b8', height: 4}}
                selectedStyle={{backgroundColor: this.props.backgroundColor, height: 4}}
                markerStyle={{backgroundColor: 'white', borderColor: '#b8b8b8', borderWidth: 1, padding: 8}}
                ios_backgroundColor = {'#b8b8b8'}
            />
        );
    }
}


class FilterSnap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( 
            <TouchableOpacity activeOpacity={1} onPress={() => {deleteAlert(this.props.parent, this.props.data, this.props.id)}}>
                <Text style={[filter_snaps_styles.inner_text, { backgroundColor: this.props.color, borderColor: this.props.color}]}>
                    {this.props.innerText}
                </Text>
            </TouchableOpacity>
        );
    }
}

FilterSnap.defaultProps = {
    color: GlobalValues.ORANGE_COLOR,
}

//TODO fix react native buttons (all, even in manage screen files for ones with onHideUnderlay and onShowUnderlay) click twice
//work around: onPress is only called once, so put main stuff in there that is triggered with the button besides the color state variables

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

        this.onEditCaptionButtonPress = this.onEditCaptionButtonPress.bind(this);
        this.onEditCaptionButtonRelease = this.onEditCaptionButtonRelease.bind(this);
        this.onEditImageButtonPress = this.onEditImageButtonPress.bind(this);
        this.onEditImageButtonRelease = this.onEditImageButtonRelease.bind(this);
        this.onTrashButtonPress = this.onTrashButtonPress.bind(this);
        this.onTrashButtonRelease = this.onTrashButtonRelease.bind(this);
        this.showEditCaptionDialog = this.showEditCaptionDialog.bind(this);

        this.onEditedCaption = this.onEditedCaption.bind(this);
        this.chooseImage = this.chooseImage.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    render() {
        var renderImageOrSelector = {};

        if (this.state.image_uri == "") {
            renderImageOrSelector = (
                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.chooseImage();}}>
                    <View style={actions_styles.action_button_inner}>
                        <Feather name="edit" size={20} color="white" style={actions_styles.action_button_icon}/>
                        <Text style={actions_styles.action_button_text}>
                            Choose Image
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
        else {
            renderImageOrSelector = (
                <Image style={[point_styles.image, {alignSelf: 'center'}]} source={handleImageURI(this.state.image_uri)}/>
            );
        }
        return(
            <View style={[info_styles.body, point_styles.body]}>
                <View style={[actions_styles.body, point_styles.container]}> 
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight style={point_styles.trash_icon} underlayColor="white" onPressIn={() => {this.setState({show_edit_caption_dialog: true});}} onHideUnderlay={() => {this.onEditCaptionButtonRelease()}} onShowUnderlay={() => {this.onEditCaptionButtonPress()}}> 
                            <Feather name="edit" size={20} color={this.state.editCaptionColor} style={actions_styles.action_button_icon}/>
                        </TouchableHighlight>
                        <TouchableHighlight style={point_styles.trash_icon} underlayColor="white" onPressIn={() => {this.chooseImage();}} onHideUnderlay={() => {this.onEditImageButtonRelease()}} onShowUnderlay={() => {this.onEditImageButtonPress()}}> 
                            <Feather name="image" size={20} color={this.state.editImageColor} style={actions_styles.action_button_icon}/>
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight style={point_styles.trash_icon} underlayColor="white" onPressIn={() => {this.props.deleteAlert(this.props.data.id);}} onHideUnderlay={() => {this.onTrashButtonRelease()}} onShowUnderlay={() => {this.onTrashButtonPress()}}> 
                        <Feather name="trash-2" size={20} color={this.state.trashColor} />
                    </TouchableHighlight>
                </View>
                    <Text style={[info_styles.title_text, {textAlign: 'left'}]}>
                        {this.state.caption}
                    </Text>
                    <View style={[main_styles.horizontal_bar, {width: '100%'}]}/>
                    {renderImageOrSelector}
                </View>
                {this.showEditCaptionDialog()}
            </View>
        );
    }

    //choose image from camera roll
    async chooseImage() {
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

            //set the value of the image uri
            this.state.image_uri = result.uri;

            //update class value
            this.props.pointsUpdatedImage(this.props.data.id, this.state.image_uri);
        }

        this.props.parentLazyUpdate();
    }

    onEditedCaption(value) {
        this.state.caption = value;

        //update class value
        this.props.pointsUpdatedCaption(this.props.data.id, this.state.caption);
    }

    onTrashButtonPress() {
        this.setState({trashColor: "red"});
    }

    onTrashButtonRelease() {
        this.setState({trashColor: "black"});
    }

    onEditCaptionButtonPress() {
        this.setState({editCaptionColor: "red"});
    }

    onEditCaptionButtonRelease() {
        this.setState({editCaptionColor: "black"});
    }

    onEditImageButtonRelease() {
        this.setState({editImageColor: "black"});
    }

    onEditImageButtonPress() {
        this.setState({editImageColor: "red"});
    }

    showEditCaptionDialog() {
        return (
            <Dialog.Container visible={this.state.show_edit_caption_dialog}>
                <Dialog.Title>
                    Edit Caption
                </Dialog.Title>
                <Dialog.Input onEndEditing={(event) => {this.onEditedCaption(event.nativeEvent.text);}} defaultValue={this.props.data.caption}/>
                <Dialog.Button label="Done" onPress={() => {this.setState({show_edit_caption_dialog: false});}}/>
            </Dialog.Container>
        );
    }

    lazyUpdate() {
        this.forceUpdate();
    }
}

/*<View style={actions_styles.body}> 
                <Text style={info_styles.title_text}>
                    {description}
                </Text>
                <FastImage style={point_styles.image} source={{uri: require("../../../images/default_image.png")}}/>
            </View>*/

// resizeMode={FastImage.resizeMode.contain}

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