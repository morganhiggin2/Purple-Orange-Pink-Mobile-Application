import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert, FlatList, Switch, Platform, TouchableHighlight, Dimensions, Image} from 'react-native';
import * as Location from 'expo-location';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { PickerIOS } from '@react-native-picker/picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Feather, Ionicons } from '@expo/vector-icons';
import Dialog from 'react-native-dialog';
import * as ImagePicker from 'expo-image-picker';

import { GlobalProperties, GlobalValues } from '../../../../global/global_properties.js';
import { GlobalEndpoints } from '../../../../global/global_endpoints.js';
import { LoadingScreen } from '../../../misc/loading_screen.js';

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
            borderColor: GlobalValues.DISTINCT_GRAY
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
        maxHeight: 95,
        paddingVertical: 4,
        paddingHorizontal: 4,
        backgroundColor: '#EAEAEA',
        borderRadius: 8,
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
    },
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
        paddingVertical: 4,
        paddingHorizontal: 4,
        width: '100%',
        backgroundColor: '#EAEAEA',
        borderRadius: 4,
        textAlign: 'right',
        fontSize: 18,
    },
    numeric_text_input: {
        textAlignVertical: "center",
        paddingVertical: 4,
        paddingHorizontal: 4,
        width: 100,
        backgroundColor: '#EAEAEA',
        borderRadius: 4,
        textAlign: 'left',
        fontSize: 18,
        textAlign: 'right',
    },
    numeric_input_text_view: {
        flexDirection:  'row',
        width: "70%",
        justifyContent: 'flex-end'
    },
    drop_down_selector: {
        paddingHorizontal: 4,
    },
    drop_down_selector_gap: {
        height: 100,
    },
    date_picker: {
        width: 200,
    }
});

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

//map selector, goes to map to select location
//if they enter an address, it finds its longitude and latitude
//  if it cannot be found, says address cannot be found, use map selector as well
//if they choose map selector for location
//  it clears address field if address was found (because you overrode it)
//  it sets the search radius in this class to what it is there as well, but does NOT enable search radius searching
//    just sets it so when it is enables the map can be used to set the radius
//savess physical address and lat and long to server and local
//default of search location is your location (if it was never set)
    //if your location cannot be used, show error message and go back to manage page (cannot be allowed to create activity)

export class EditActivityScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for loading screen
            loading: true,
            reload: false,

            //title
            title: "",
            id: this.props.route.params.id,
            description: "",

            //images
            activity_images: [],

            //attributes
            attributes: [],

            //points
            points: [],
            
            //new points
            new_points: [],

            //ids of points who's images have changed
            new_point_images: [],

            //for managing points locally
            max_point_index: 0,

            //if we need to add existing points to updateBody
            addPointsToUpdateBody: false,

            //if we need to include new points
            addNewPointsToUpdateBody: false,

            //for the date selector
            date: new Date(Date.now()),
            showDatePicker: false,
            showTimePicker: false,

            //for locations
            search_latitude: null,
            search_longitude: null,
            target_latitude: null,
            target_longitude: null,

            //is physical or virtual event
            is_physical_event: true,

            //for virtual address
            virtual_link: "",

            //for physical address
            target_address: "",

            //for getting search map information
            searchMapRequest: "",

            //for the list of activities
            attributes_input_handler: null,

            //for values
            invite_cap_value: 0,
            participants_cap_value: 0,

            //for dropdowns
            gender_dropdown_value: 'all',
            invitation_type_dropdown_value: 'invite_required',

            //for the enable
            setSearchLocationToTargetLocation: true,
            setSearchRadiusToEnable: false,
            invite_cap_enable: false,
            participants_cap_enable: false,
            advanced_settings_enabled: false,

            //for sliders
            age_range_values: [18, 100],
            search_range: 5.0,

            //for update made
            updateMade: false,

            //loading
            loading: true,

            //update body
            updateBody: {
                id: this.props.route.params.id
            },
        }

        this.fetchActivityInformation = this.fetchActivityInformation.bind(this);
        this.requestLocation = this.requestLocation.bind(this);

        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.updateVirtualLink = this.updateVirtualLink.bind(this);
        this.updateSearchRange = this.updateSearchRange.bind(this);
        this.updateGenderDropDownValue = this.updateGenderDropDownValue.bind(this);
        this.updateInvitationTypeValueOnRender = this.updateInvitationTypeValueOnRender.bind(this);
        this.updateAgeRangeValues = this.updateAgeRangeValues.bind(this);
        this.updateInviteCapValue = this.updateInviteCapValue.bind(this);
        this.updateInviteCapEnable = this.updateInviteCapEnable.bind(this);
        this.updateDateTime = this.updateDateTime.bind(this);
        this.updateEnableValue = this.updateEnableValue.bind(this);
        this.updateSliderValue = this.updateSliderValue.bind(this);
        this.updateSetSearchLocationToTargetLocation = this.updateSetSearchLocationToTargetLocation.bind(this);
        this.updateSetSearchRadiusToEnable = this.updateSetSearchRadiusToEnable.bind(this);
        this.updateSetPhysicalEventToEnable = this.updateSetPhysicalEventToEnable.bind(this);
        this.updateParticipantsCap = this.updateParticipantsCap.bind(this);
        this.updateParticipantsCapEnable = this.updateParticipantsCapEnable.bind(this);
        this.deletePoint = this.deletePoint.bind(this);
        this.deletePointAlert = this.deletePointAlert.bind(this);
        this.addPoint = this.addPoint.bind(this);
        this.pointsUpdatedCaption = this.pointsUpdatedCaption.bind(this);
        this.pointsUpdatedImage = this.pointsUpdatedImage.bind(this);
        this.updateUpdateMade = this.updateUpdateMade.bind(this);
        this.updateAdvancedSettingsEnable = this.updateAdvancedSettingsEnable.bind(this);
        this.validateFields = this.validateFields.bind(this);
        this.updateAdvancedSettingsEnable = this.updateAdvancedSettingsEnable.bind(this);
        this.syncUpdates = this.syncUpdates.bind(this);
        this.showError = this.showError.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {
        for (let i = 0; i < 2; i++) {
            //this.state.group_images[i] = "https://cdn.theatlantic.com/thumbor/Zsv9f5L_2qK1Rwr7TVj_4E2K8xI=/0x281:5574x3416/1600x900/media/img/mt/2020/03/RTS37HPB-1/original.jpg";
            this.state.activity_images[i] = null;
        }

        this.fetchActivityInformation();

        this.props.navigation.addListener('focus', () => {
            this.state.global_props = GlobalProperties.screen_props;

            //we returned from the search screen with getting new activity/target location
            if (GlobalProperties.return_screen == "Search Map Screen" && this.state.searchMapRequest == "Target" && GlobalProperties.screen_props != null) {

                //update search coordinates
                this.state.target_latitude = GlobalProperties.screen_props.latitude;
                this.state.target_longitude = GlobalProperties.screen_props.longitude;
                this.state.updateBody["target_location"] = {
                    latitude: this.state.target_latitude,
                    longitude: this.state.target_longitude
                };

                this.state.searchMapRequest = "";

                GlobalProperties.screenActivated();

                this.updateUpdateMade(false);
            }
            //we returned from the search screen with getting new search location
            else if (GlobalProperties.return_screen == "Search Map Screen" && this.state.searchMapRequest == "Search" && GlobalProperties.screen_props != null) {
                //update search coordinates
                this.state.search_latitude = GlobalProperties.screen_props.latitude;
                this.state.search_longitude = GlobalProperties.screen_props.longitude;
                this.state.search_range = Math.trunc(GlobalProperties.screen_props.search_radius);

                this.state.updateBody["search_location"] = {
                    latitude: this.state.search_latitude,
                    longitude: this.state.search_longitude
                };

                this.state.updateBody["search_radius"] = this.state.search_range;

                this.state.searchMapRequest = "";

                GlobalProperties.screenActivated();

                //update for change in search radius
                this.updateUpdateMade(true);
            }
            else if (GlobalProperties.return_screen == "Edit Activity Images Screen") {
                this.state.group_images = GlobalProperties.screen_props.group_images;

                GlobalProperties.screenActivated();
            }
        });

        //this.requestLocation();
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
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Friends/GetActivityInformation?id=" + this.state.id)
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

                this.state.address = activity_information.address;
                this.state.attributes = activity_information.attributes;
                this.state.invitation_type_dropdown_value = activity_information.invitation_type;
                this.state.date = new Date(activity_information.date);
                this.state.description = activity_information.description;
                this.state.gender_dropdown_value = activity_information.gender;
                this.state.invite_cap_value = parseInt(activity_information.invite_cap);
                this.state.participants_cap_value = parseInt(activity_information.participants_cap);
                this.state.is_physical_event = activity_information.is_physical;
                this.state.age_range_values = [activity_information.minimum_age, activity_information.maximum_age];
                this.state.title = activity_information.title;
                this.state.target_latitude = activity_information.target_location.latitude;
                this.state.target_longitude = activity_information.target_location.longitude;
                this.state.search_latitude = activity_information.search_location.latitude;
                this.state.search_longitude = activity_information.search_location.longitude;
                this.state.points = activity_information.points;

                if (!this.state.is_physical_event) {
                    this.state.virtual_link = this.state.address;
                }

                if (this.state.target_latitude == this.state.search_latitude && this.state.target_longitude == this.state.search_longitude) {
                    this.state.setSearchLocationToTargetLocation = true;
                }
                else {
                    this.state.setSearchLocationToTargetLocation = false;
                }

                //set values

                if (this.state.invite_cap_value == 2147483647) {
                    this.state.invite_cap_enable = false;
                    this.state.invite_cap_value = 0;
                }
                else {
                    this.state.invite_cap_enable = true;
                }

                if (this.state.participants_cap_value == 2147483647) {
                    this.state.participants_cap_enable = false;
                    this.state.participants_cap_value = 0;
                }
                else {
                    this.state.participants_cap_enable = true;
                }

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

    async requestLocation() {
        //see if we have permission
        Location.getForegroundPermissionsAsync()
        .then(() => {
            //get location
            Location.getCurrentPositionAsync()
            .then((loc) => {
                this.state.target_latitude = loc.coords.latitude;
                this.state.target_longitude = loc.coords.longitude;
            })
            .catch((error) => {
                Alert.alert("Location could not be retrieved");
                
                this.props.navigation.pop(2);
            });
        })
        .catch((error) => {
            Alert.alert("Permission to access location was denied. Location is required to use this app");
                
            this.props.navigation.pop(2);
        });
    }

    //TODO add images and edit images

/*
                <View style={inline_attribute_styles.body}>
                    <Text style={inline_attribute_styles.title_text}>
                        Search Location
                    </Text>
                    <View style={inline_attribute_styles.input_text_view}>
                        <Text>
                            Map select button goes here, set this.state.searchMapRequest = "Search"
                        </Text>
                    </View>
                </View>
                
                
                            {ACTIVITIES.map((data, key) => {
                                return (
                                    <FilterSnap key={key} id={data.id} innerText={data.name} parent={this} data={ACTIVITIES}/>
                                );
                            })}*/

    render() {
        let searchLocationRender;
        let inviteCapRender;
        let physicalEventLocation;
        let participantsCapRender;
        let searchRadiusRender;
        let advancedPhysicalEventLocation;
        let advancedSettings;

        //if they decide to set search location elsewhere, then show options 
        if (!this.state.setSearchLocationToTargetLocation) {
            searchLocationRender = (
                <View>
                    <View style={actions_styles.body}> 
                        <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => 
                            {
                                this.state.searchMapRequest = "Search";
                                this.props.navigation.navigate("Map Search Screen", {
                                    latitude: this.state.search_latitude,
                                    longitude: this.state.search_longitude
                                });
                                this.updateUpdateMade(false);
                            }}>
                            <View style={actions_styles.action_button_inner}>
                                <Feather name="map-pin" size={20} color="white" style={actions_styles.action_button_icon}/>
                                <Text style={actions_styles.action_button_text}>
                                    Set Search Location
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        else {

        }
        
        //if they decide to set search radius, then show options 
        if (this.state.setSearchRadiusToEnable) {
            searchRadiusRender = (
            <View>
                <View style={attribute_styles.body}>
                    <View style={attribute_styles.title_with_value}>
                        <Text style={attribute_styles.title_text}>
                            Search Range
                        </Text>
                        <Text style={attribute_styles.title_value}>
                            {this.state.search_range + " miles"}
                        </Text>

                    </View>
                    <View style={attribute_styles.slider}>
                        <Slider twoSlider={false} onChangeValue={this.updateSearchRange} min={0} max={20} step={1} initialValue={this.state.search_range} backgroundColor={'#FF7485'}/> 
                    </View>
                </View>
            </View>
            );
        }
        else {
            searchRadiusRender = (
                    <View/>
                );
        }

        //if they decide to set a cap on invites
        if (this.state.invite_cap_enable) {
            inviteCapRender = (
            <View>
                <View style={inline_attribute_styles.body}>
                    <Text style={inline_attribute_styles.title_text}>
                        Invitation Cap
                    </Text>
                    <View style={inline_attribute_styles.numeric_input_text_view}>
                        <TextInput style={inline_attribute_styles.numeric_text_input} placeholderTextColor="black" keyboardType={'numeric'} editable={true} maxLength={9} defaultValue={this.state.invite_cap_value.toString()} onChangeText={(value) => {this.updateInviteCapValue(value); this.updateUpdateMade(false);}}/>
                    </View>
                </View>
            </View>
            );
        }
        else {

        }

        if (this.state.participants_cap_enable) {
            participantsCapRender = (
                <View>
                    <View style={inline_attribute_styles.body}>
                        <Text style={inline_attribute_styles.title_text}>
                            Participants Cap
                        </Text>
                        <View style={inline_attribute_styles.numeric_input_text_view}>
                            <TextInput style={inline_attribute_styles.numeric_text_input} placeholderTextColor="black" keyboardType={'numeric'} editable={true} maxLength={9} placeholder={this.state.participants_cap_value.toString()} onChangeText={(value) => {this.updateParticipantsCap(value);}}/>
                        </View>
                    </View>
                </View>
            );
        }
        else {
            
        }

        if (this.state.is_physical_event) {
            physicalEventLocation = (
                <View>
                    <View style={attribute_styles.body}>
                        <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => 
                            {
                                this.state.searchMapRequest = "Target";
                                this.props.navigation.navigate("Map Search Screen", {
                                    latitude: this.state.target_latitude,
                                    longitude: this.state.target_longitude
                                });
                            }}>
                            <View style={actions_styles.action_button_inner}>
                                <Feather name="map-pin" size={20} color="white" style={actions_styles.action_button_icon}/>
                                <Text style={actions_styles.action_button_text}>
                                    Set Activity Location
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={main_styles.horizontal_bar}/>
                    <View style={inline_attribute_styles.body}>
                        <View style={inline_attribute_styles.title_view}>
                            <Text style={inline_attribute_styles.title_text}>
                                {"Address "}
                            </Text>
                            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} activeOpacity={1} onPress={() => {Alert.alert("Invitation Type", GlobalValues.ADDRESS_INFORMATION);}}>
                                <AntDesign name="infocirlceo" size={14} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={inline_attribute_styles.input_text_view}>
                            <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" autoCorrect={false} editable={true} maxLength={160} defaultValue={this.state.target_address} onChangeText={(value) => {this.updateAddress(value);}} onEndEditing={(event) => {this.updateUpdateMade(false);}}/>
                        </View>
                    </View>
                </View>
            );

            if (this.state.advanced_settings_enabled) {
                advancedPhysicalEventLocation = (
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <View style={inline_attribute_styles.title_view}>
                                <Text style={inline_attribute_styles.title_text}>
                                    {"Activity location is Search Location "}
                                </Text>
                                <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} activeOpacity={1} onPress={() => {Alert.alert("Invitation Type", GlobalValues.SEARCH_LOCATION_IS_ACTIVITY_LOCATION_INFORMATION);}}>
                                    <AntDesign name="infocirlceo" size={14} color="black" />
                                </TouchableOpacity>
                            </View>
                            <Switch
                                trackColor = {{false: GlobalValues.DISTINCT_GRAY, true: GlobalValues.ORANGE_COLOR}}
                                thumbColor = {this.state.setSearchLocationToTargetLocation ? 'white': 'white'}
                                ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                                onValueChange = {this.updateSetSearchLocationToTargetLocation}
                                value = {this.state.setSearchLocationToTargetLocation}
                            />
                        </View>
                        {searchLocationRender}
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Only show to people in search radius
                            </Text>
                            <Switch
                                trackColor = {{false: GlobalValues.DISTINCT_GRAY, true: GlobalValues.ORANGE_COLOR}}
                                thumbColor = {'white'}
                                ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                                onValueChange = {this.updateSetSearchRadiusToEnable}
                                value = {this.state.setSearchRadiusToEnable}
                            />
                        </View>
                        {searchRadiusRender}
                    </View>
                );
            }
            else {
                advancedPhysicalEventLocation = (
                    <View>

                    </View>
                );
            }
        }
        else {
            /*if (this.state.vitrual_event_search_location_enable) {
                virtualEventSearch = (
                    <View>
                        <View style={attribute_styles.body}>
                            <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => 
                                {
                                    this.state.searchMapRequest = "Search";
                                    this.props.navigation.navigate("Map Search Screen", {
                                        latitude: this.state.search_latitude,
                                        longitude: this.state.search_longitude
                                    });
                                    this.updateUpdateMade(false);
                                }}>
                                <View style={actions_styles.action_button_inner}>
                                    <Feather name="map-pin" size={20} color="white" style={actions_styles.action_button_icon}/>
                                    <Text style={actions_styles.action_button_text}>
                                        Set Search Location
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={attribute_styles.body}>
                            <View style={attribute_styles.title_with_value}>
                                <Text style={attribute_styles.title_text}>
                                    Search Range
                                </Text>
                                <Text style={attribute_styles.title_value}>
                                    {(this.state.search_range == -1 ? "max" : this.state.search_range + " miles")}
                                </Text>
                            </View>
                            <View style={attribute_styles.slider}>
                                <Slider twoSlider={false} onChangeValue={this.updateSearchRange} min={0} max={20} step={1} initialValue={this.state.search_range} backgroundColor={GlobalValues.ORANGE_COLOR}/> 
                            </View>
                        </View>
                    </View>
                );
            }
            else {
                
            }*/

            physicalEventLocation = (
                <View>
                    <View style={inline_attribute_styles.body}>
                        <Text style={inline_attribute_styles.title_text}>
                            Virtual Link
                        </Text>
                        <View style={inline_attribute_styles.input_text_view}>
                            <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" autoCorrect={false} editable={true} maxLength={160} defaultValue={this.state.virtual_link} onChangeText={(value) => {this.updateVirtualLink;}} onEndEditing={() => {this.updateUpdateMade(false);}}/>
                        </View>
                    </View>
                    <View style={main_styles.horizontal_bar}/>
                    <View style={attribute_styles.body}>
                        <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => 
                            {
                                this.state.searchMapRequest = "Search";
                                this.props.navigation.navigate("Map Search Screen", {
                                    latitude: this.state.search_latitude,
                                    longitude: this.state.search_longitude
                                });
                                this.updateUpdateMade(false);
                            }}>
                            <View style={actions_styles.action_button_inner}>
                                <Feather name="map-pin" size={20} color="white" style={actions_styles.action_button_icon}/>
                                <Text style={actions_styles.action_button_text}>
                                    Set Search Location
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );

            if (this.state.advanced_settings_enabled) {
                advancedPhysicalEventLocation = (
                    <View style={info_styles.body}>
                        <View style={attribute_styles.body}>
                            <View style={attribute_styles.title_with_value}>
                                <Text style={attribute_styles.title_text}>
                                    Search Range
                                </Text>
                                <Text style={attribute_styles.title_value}>
                                    {(this.state.search_range == -1 ? "max" : this.state.search_range + " miles")}
                                </Text>
                            </View>
                            <View style={attribute_styles.slider}>
                                <Slider twoSlider={false} onChangeValue={this.updateSearchRange} min={0} max={20} step={1} initialValue={this.state.search_range} backgroundColor={GlobalValues.ORANGE_COLOR}/> 
                            </View>
                        </View>
                    </View>
                );
            }
            else {
                advancedPhysicalEventLocation = (
                    <View>

                    </View>
                );
            }
        }

        if (this.state.advanced_settings_enabled) {
            advancedSettings = (
                <View>
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <View style={inline_attribute_styles.title_view}>
                                <Text style={inline_attribute_styles.title_text}>
                                    {"Invitation Type "}
                                </Text>
                                <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} activeOpacity={1} onPress={() => {Alert.alert("Invitation Type", GlobalValues.INVITATION_TYPE_INFORMATION);}}>
                                    <AntDesign name="infocirlceo" size={14} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={[inline_attribute_styles.drop_down_selector, Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH} : {width: '50%', alignSelf: 'flex-end'}]}>
                                    <DropDown 
                                        style={Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH, flexDirection: 'row'} : {}}
                                        items={[{label: "Anyone", value: "anyone"}, {label: 'Invitation Required', value: 'invite_required', }, {label: 'Invite Only', value: 'invite_only'}]}
                                        onChangeValue = {this.updateInvitationTypeValueOnRender}
                                        currentValue={this.state.invitation_type_dropdown_value}
                                        />
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <View style={inline_attribute_styles.title_view}>
                                <Text style={inline_attribute_styles.title_text}>
                                    {"Cap invitation count "}
                                </Text>
                                <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} activeOpacity={1} onPress={() => {Alert.alert("Attributes", GlobalValues.INVITATION_CAP_INFORMATION);}}>
                                        <AntDesign name="infocirlceo" size={14} color="black" />
                                </TouchableOpacity>
                            </View>
                            <Switch
                                trackColor = {{false: GlobalValues.DISTINCT_GRAY, true: GlobalValues.ORANGE_COLOR}}
                                thumbColor = {this.state.invite_cap_enable ? 'white': 'white'}
                                ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                                onValueChange = {this.updateInviteCapEnable}
                                value = {this.state.invite_cap_enable}
                            />
                        </View>
                        {inviteCapRender}
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <View style={inline_attribute_styles.title_view}>
                                <Text style={inline_attribute_styles.title_text}>
                                    {"Cap participant count "}
                                </Text>
                                <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} activeOpacity={1} onPress={() => {Alert.alert("Attributes", GlobalValues.PARTICIPANT_CAP_INFORMATION);}}>
                                        <AntDesign name="infocirlceo" size={14} color="black" />
                                </TouchableOpacity>
                            </View>
                            <Switch
                                trackColor = {{false: GlobalValues.DISTINCT_GRAY, true: GlobalValues.ORANGE_COLOR}}
                                thumbColor = {this.state.participants_cap_enable ? 'white': 'white'}
                                ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                                onValueChange = {this.updateParticipantsCapEnable}
                                value = {this.state.participants_cap_enable}
                            />
                        </View>
                        {participantsCapRender}
                    </View>
                    <View style={section_styles.gap} />
                    {advancedPhysicalEventLocation}
                    <View style={section_styles.gap} />
                    <View style={section_styles.gap} />
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Participant gender
                            </Text>
                            <View style={[inline_attribute_styles.drop_down_selector, Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH} : {width: '50%', alignSelf: 'flex-end'}]}>
                                    <DropDown 
                                        style={Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH, flexDirection: 'row'} : {}}
                                        items={[{label: 'All', value: 'all'}, {label: 'Male', value: 'male'}, {label: 'Female', value: 'female', }, {label: "Other", value: "other"}]}
                                        onChangeValue = {this.updateGenderDropDownValue}
                                        currentValue = {this.state.gender_dropdown_value}
                                        />
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={attribute_styles.body}>
                            <View style={attribute_styles.title_with_value}>
                                <Text style={attribute_styles.title_text}>
                                   Participant age range
                                </Text>
                                <Text style={attribute_styles.title_value}>
                                    {this.state.age_range_values[0] + " to " + this.state.age_range_values[1]}
                                </Text>

                            </View>
                            <View style={attribute_styles.slider}>
                                <Slider twoSlider={true} onChangeValue={this.updateAgeRangeValues} min={18} max={100} step={2} initialValue={this.state.age_range_values} backgroundColor={GlobalValues.ORANGE_COLOR}/> 
                            </View>
                        </View>
                    </View>
                </View>
            );
        }

        //TODO add physical option to virtual component (both setting location and search radius)

        const renderComponent = ({item}) => {
            return (
                <View>
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Title
                            </Text>
                            <View style={inline_attribute_styles.input_text_view}>
                                <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" editable={true} maxLength={160} defaultValue={this.state.title} onChangeText={(value) => {this.updateTitle(value);}} onEndEditing={() => {this.updateUpdateMade(false);}}/>
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Date
                            </Text>       
                            <View style={attribute_styles.input_text_view}>
                                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                                    <Text style={{color: 'blue'}}>
                                            {this.showDate()} 
                                            {" "}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({showTimePicker: true})}>
                                    <Text style={{color: 'blue'}}>
                                        {this.showTime()}
                                    </Text>
                                </TouchableOpacity>
                            </View>   
                        </View>
                        {this.showDatePicker()}
                        {this.showTimePicker()}
                        <View style={main_styles.horizontal_bar}/>
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
                                <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" editable={true} maxLength={160} ref={(input) => {this.state.attributes_input_handler = input}} onEndEditing={(event) => {this.addFilter(event.nativeEvent.text)}}/>
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
                                <TextInput style={[attribute_styles.text_input, {fontSize: 18, textAlignVertical: "top"}]} multiline={true} editable={true} maxLength={160} numberOfLines={4} scrollEnables={true} defaultValue={this.state.description} onChangeText={(value) => {this.updateDescription(value);}} onEndEditing={() => {this.updateUpdateMade(false);}}/>
                            </View>                   
                        </View>                          
                    </View>
                    <View style={section_styles.gap} />
                    <View style={info_styles.body}>
                        <View style={actions_styles.body}>
                            <Text style={info_styles.title_text}>
                                Images
                            </Text>
                            <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.updateUpdateMade(false); this.props.navigation.navigate("Edit Activity Images Screen", {activity_images: this.state.activity_images})}}>
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
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Is physical event
                            </Text>
                            <Switch
                                trackColor = {{false: GlobalValues.DISTINCT_GRAY, true: GlobalValues.ORANGE_COLOR}}
                                thumbColor = {'white'}
                                ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                                onValueChange = {this.updateSetPhysicalEventToEnable}
                                value = {this.state.is_physical_event}
                            />
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        {physicalEventLocation}
                    </View>
                    <View style={section_styles.gap} />
                    <View style={info_styles.body}>
                        <TouchableOpacity style={inline_attribute_styles.body}  activeOpacity={1.0} onPress={() => {this.updateAdvancedSettingsEnable(!this.state.advanced_settings_enabled);}}>
                            <Text style={inline_attribute_styles.title_text}>
                                Advanced Settings
                            </Text>       
                            <AntDesign name={this.state.advanced_settings_enabled ? "down" : "up"} size={20} color="black" style={actions_styles.action_button_icon}/>
                        </TouchableOpacity>
                    </View>
                    {advancedSettings}
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
                <LoadingScreen tryAgain={this.fetchActivityInformation } reload={this.state.reload}/>
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


    //for the time setting
    showDate() {
        //when you press cancel, it gives an undefined date
        //so check if is undefined (cancel has been pressed, or other)
        if (this.state.date == undefined) {
            this.state.date = Date.now();
        }

        return (this.state.date.toDateString());
    }

    showTime() {
        //when you press cancel, it gives an undefined date
        if (this.state.date == undefined) {
            this.state.date = Date.now();
        }

        //calulate the format for the time
        var hours = this.state.date.getHours();
        var partOfDay = "AM";

        if (hours - 12 > 0) {
            partOfDay = "PM";
        }

        hours = hours % 12;

        var minutes = this.state.date.getMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return (hours + ":" + minutes + " " + partOfDay);
    }

    //show the date picker
    showDatePicker() {
        if (this.state.showDatePicker) {
            this.state.showDatePicker = false;

            return(
                <DateTimePicker mode="date" value={this.state.date} is24Hour={true} display="default" onChange={(event, newDate) => {this.updateDateTime(newDate);}}/>            
            );
        }
        else {
            return (<View/>);
        }
    }

    //show the time picker
    showTimePicker() {
        if (this.state.showTimePicker) {
            this.state.showTimePicker = false;

            return(
                <DateTimePicker mode="time" value={this.state.date} is24Hour={false} display="default" onChange={(event, newDate) => {this.updateDateTime(newDate);}}/>            
            );
        }
        else {
            return (<View/>);
        }
    }

    //for the filters
    addFilter(input) {
        //add it
        //this.state.attributes.push({id: this.state.attributes.length, name: input});
        this.state.attributes.push(input);
        //clear the text input
        this.state.attributes_input_handler.clear();
        
        this.state.updateBody["attributes"] = this.state.attributes;
        //update the screen
        this.lazyUpdate();
    }

    //delete a data component from a json data structure with id attributes, each different
    deleteDataComponent(id, DATA) {
        for (var i = 0; i < DATA.length; i++) {
            if (i == id) {
                DATA.splice(i, 1);
            }
        }
    }

    
    //TODO feed location to search map if clicked

    //request to get longitude and latitude of location
    //called when text field is done editing
    async getGeoLocationFromAddress() {
        if (this.state.target_address != "") {
            await Location.geocodeAsync(this.state.target_address)
            .then((location) => {
                //set address
                this.target_latitude = location.latitude;
                this.target_longitude = location.longitude;

                return true;
            })
            .catch((error) => {
                //address not found for network error
                //alert user of error, say location will be set to your current location instead, unless try again
                return false;
            }); 
        }
    }

    updateDateTime(value) {
        this.state.date = new Date(value);
        this.state.updateBody["date_time"] = this.state.date.getDate() + "/" + this.state.date.getMonth() + "/" + this.state.date.getFullYear() + " " + this.state.date.getHours() + ":" + this.state.date.getMinutes();
        this.updateUpdateMade(true);
    }

    updateTitle(value) {
        this.state.title = value;
        this.state.updateBody["title"] = this.state.title;
    }

    updateDescription(value) {
        this.state.description = value;
        this.state.updateBody["description"] = this.state.description;
    }

    updateVirtualLink(value) {
        this.state.virtual_link = value;
        this.state.updateBody["address"] = this.state.virtual_link;
    }

    updateAddress(value) {
        this.state.target_address = value;
        this.state.updateBody["address"] = this.state.address;
    }
    
    updateParticipantsCapEnable(value) {
        this.state.participants_cap_enable = value;
        this.updateUpdateMade(true);
    }

    updateAdvancedSettingsEnable(value) {
        this.setState({advanced_settings_enabled: value});
    }

    updateParticipantsCap(value) {
        this.state.participants_cap_value = value;
        this.state.updateBody["participants_cap"] = this.state.participants_cap_value;
        this.updateUpdateMade(false);
    }

    //update search range
    updateSearchRange(value) {
        this.setState({search_range: Math.floor(value[0] + Math.pow(value[0], 1.13535))});
        this.state.updateBody["search_range"] = this.state.search_range;
        this.updateUpdateMade(false);
    }

    //update the dropdown selector for activities
    updateGenderDropDownValue(value) {
        GlobalProperties.search_gender = value;

        this.state.gender_dropdown_value = value;

        this.state.updateBody["gender"] = this.state.gender_dropdown_value;
        
        this.updateUpdateMade(false);
    }
    
    updateInvitationTypeValueOnRender(value) {
        this.state.invitation_type_dropdown_value = parseInt(value);
        this.state.updateBody["invitation_method"] = this.state.invitation_type_dropdown_value;
        this.updateUpdateMade(false);
    }

    updateInviteCapEnable(value) {
        this.setState({invite_cap_enable: value});
        this.updateUpdateMade(false);
    }

    //update the enable value
    updateEnableValue(value) {
        this.setState({enable_value: value});
    }

    updateAgeRangeValues(value) {
        this.setState({age_range_values: value});
        this.state.updateBody["minimum_age"] = this.state.age_range_values[0];
        this.state.updateBody["maximum_age"] = this.state.age_range_values[1];
        this.updateUpdateMade(false);
    }

    updateInviteCapValue(value) {
        this.state.invite_cap_value = value;
        this.state.updateBody["invite_cap"] = this.state.invite_cap_value;
    }
    
    //update setSearchLocationToTargetLocation value
    updateSetSearchLocationToTargetLocation(value) {
        this.setState({setSearchLocationToTargetLocation: value});
        
        this.updateUpdateMade(false);
    }

    //update set search radius value
    updateSetSearchRadiusToEnable(value) {
        this.setState({setSearchRadiusToEnable: value});
        
        this.updateUpdateMade(true);
    }

    updateSetPhysicalEventToEnable(value) {
        this.setState({is_physical_event: value});
        this.state.updateBody["is_physical"] = value;
        this.updateUpdateMade(false);
    }

    updateSliderValue(value) {
        this.setState({slider_value: value});
    }

    //after the delete alert, and delete has been pressed
    afterDeleteAlert(id, DATA) {
        this.deleteDataComponent(id, DATA);
        this.state.updateBody["attributes"] = this.state.attributes;
        this.lazyUpdate();
    }

    updateUpdateMade(mustUpdate) {
        if (!this.state.updateMade || mustUpdate) {
            this.state.updateMade = true;
            this.lazyUpdate();
        }
        else{
            this.state.updateMade = true;
        }
    }

    async syncUpdates() {
        if (!(await this.validateFields())) {
            return;
        }
        
        //if request was successful
        var successful = false;
            
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
        
        //make request        
        var result = await GlobalEndpoints.makePostRequest(true, "/api/User/Friends/UpdateActivity", this.state.updateBody)
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

                //once done, go back
                this.props.navigation.pop(1);
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

    async validateFields() {
        //validate name field
        if (this.state.title.length == 0) {
            this.showError("title field must not be empty");
            return false;
        }

        if (this.state.title.length > 256) {
            this.showError("title field is too long");
            return false;
        }

        //validate description
        if (this.state.description.length == 0) {
            this.showError("description field must not be empty");
            return false;
        }

        if (this.state.description.length > 2048) {
            this.showError("description field is too long");
            return false;
        }

        //validate date
        if (this.state.date.getTime() < Date.now()) {
            this.showError("date needs to be in the future, not in the past");
            return false;
        }

        //validate attributes
        if (this.state.attributes.length == 0) {
            this.showError("must have at least one attribute");
            return false;
        }

        //validate address
        //can be null
        if (this.state.is_physical_event) {
            if (this.state.target_address != "") {
                //validate address
                var result = await this.getGeoLocationFromAddress(this.state.address);

                if (!result) {
                    this.showError("invalid address");
                    return false;
                }
            }
        }

        //validate activity location
        if (this.state.target_latitude == null || this.state.target_longitude == null) {
            this.showError("must set activity location by pin");
            return false;
        }

        //validate set search
        if (!this.state.setSearchLocationToTargetLocation && (this.state.search_latitude == null || this.state.search_longitude == null)) {
            this.showError("must set search location if \"Search location is activity location\" is enabled");
            return false;
        } 

        //validate invitation cap
        if (this.state.invite_cap_enable && this.state.invite_cap_value == 0){
            this.showError("Cap must be set or be greater than 0 if \"Cap invitation count\" is enabled");
            return false;
        }

        return true;
    }

    showError(error) {
        Alert.alert(
            error
        );
    }
}

class DropDown extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        open: false,
        value: props.currentValue,
        items: props.items
      };
  
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

        this.onChangeValues = this.onChangeValues.bind(this);
    }
    
    onChangeValues(values) {
        this.state.value = values;
        this.props.onChangeValue(values);
    }

    render() {
        //if this is a slider with two markers
        if (this.props.twoSlider) {
            return(
                <MultiSlider
                    values = {[this.state.value[0], this.state.value[1]]}
                    onValuesChange = {this.props.onChangeValue}
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    sliderLength={300}
                    isMarkersSeparated = {true}
                    width={'100%'}
                    snapped={true}
                    allowOverlap={false}
                    showSteps = {true}
                    showStepLabels = {true}
                    trackStyle = {{backgroundColor: GlobalValues.DISTINCT_GRAY, height: 4}}
                    selectedStyle={{backgroundColor: this.props.backgroundColor, height: 4}}
                    markerStyle={{backgroundColor: 'white', borderColor: GlobalValues.DISTINCT_GRAY, borderWidth: 1, padding: 8}}
                    ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                />
            );
        }
        //one slider
        else {
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
                    snapped={true}
                    showSteps = {true}
                    showStepLabels = {true}
                    trackStyle = {{backgroundColor: GlobalValues.DISTINCT_GRAY, height: 4}}
                    selectedStyle={{backgroundColor: this.props.backgroundColor, height: 4}}
                    markerStyle={{backgroundColor: 'white', borderColor: GlobalValues.DISTINCT_GRAY, borderWidth: 1, padding: 8}}
                    ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                />
            );
        }
    }
}

function handleImageURI(uri) {
    if (uri == undefined) {
        return(require("../../../../images/default_image.png"));
    }
    else {
        return({uri: uri});
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

//description not working
//replace all placeholder texts for input texts with value and make it work