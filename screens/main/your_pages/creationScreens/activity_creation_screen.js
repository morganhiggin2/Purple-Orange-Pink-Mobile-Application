import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert, FlatList, Switch, Platform, TouchableHighlight, Dimensions, Image} from 'react-native';
import * as Location from 'expo-location';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AntDesign, Ionicons} from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { PickerIOS } from '@react-native-picker/picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Feather } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import * as ImagePicker from 'expo-image-picker';

import { GlobalProperties, GlobalValues } from '../../../../global/global_properties.js';
import { GlobalEndpoints } from '../../../../global/global_endpoints.js';
import { setNotificationHandler } from 'expo-notifications';

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
            borderColor: GlobalValues.DARKER_OUTLINE
        }
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
    input_text_view_continuation: {
        flexDirection:  'row',
    },
    text_input: {
        textAlignVertical: "center",
        paddingHorizontal: 4,
        width: '100%',
        textAlign: 'right',
        borderRadius: 4,
        fontSize: 16, 
    },
    text_input_continuation: {
        textAlignVertical: "center",
        paddingRight: 4,
        width: '100%',
        textAlign: 'left',
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

export class ActivityCreationScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for loading screen
            loading: true,
            reload: false,

            //title
            title: "",
            description: "",

            //images
            activity_images: [],

            //attributes
            attributes: [],

            //max point index
            max_point_index: 0,

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
            participants_cap: 0,

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
        }

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
        this.updateEnableValue = this.updateEnableValue.bind(this);
        this.updateSliderValue = this.updateSliderValue.bind(this);
        this.updateSetSearchLocationToTargetLocation = this.updateSetSearchLocationToTargetLocation.bind(this);
        this.updateSetSearchRadiusToEnable = this.updateSetSearchRadiusToEnable.bind(this);
        this.updateSetPhysicalEventToEnable = this.updateSetPhysicalEventToEnable.bind(this);
        this.updateParticipantsCap = this.updateParticipantsCap.bind(this);
        this.updateParticipantsCapEnable = this.updateParticipantsCapEnable.bind(this);
        this.updateAdvancedSettingsEnable = this.updateAdvancedSettingsEnable.bind(this);
        this.validateFields = this.validateFields.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
        this.showError = this.showError.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {
        for (let i = 0; i < 2; i++) {
            //this.state.group_images[i] = "https://cdn.theatlantic.com/thumbor/Zsv9f5L_2qK1Rwr7TVj_4E2K8xI=/0x281:5574x3416/1600x900/media/img/mt/2020/03/RTS37HPB-1/original.jpg";
            this.state.activity_images[i] = null;
        }

        this.props.navigation.addListener('focus', () => {
            this.state.global_props = GlobalProperties.screen_props;

            //we returned from the search screen with getting new activity/target location
            if (GlobalProperties.return_screen == "Search Map Screen" && this.state.searchMapRequest == "Target" && GlobalProperties.screen_props != null) {

                //update search coordinates
                this.state.target_latitude = GlobalProperties.screen_props.latitude;
                this.state.target_longitude = GlobalProperties.screen_props.longitude;

                this.state.searchMapRequest = "";

                GlobalProperties.screenActivated();
            }
            //we returned from the search screen with getting new search location
            else if (GlobalProperties.return_screen == "Search Map Screen" && this.state.searchMapRequest == "Search" && GlobalProperties.screen_props != null) {
                //update search coordinates
                this.state.search_latitude = GlobalProperties.screen_props.latitude;
                this.state.search_longitude = GlobalProperties.screen_props.longitude;
                this.state.search_range = Math.trunc(GlobalProperties.screen_props.search_radius);

                this.state.searchMapRequest = "";

                GlobalProperties.screenActivated();
                
                //update for change in search radius
                this.lazyUpdate();
            }
        });

        //this.requestLocation();
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
        let advancedPhysicalEventLocation;
        let participantsCapRender;
        let searchRadiusRender;
        let advancedSettings;

        //if they decide to set search location elsewhere, then show options 
        if (!this.state.setSearchLocationToTargetLocation) {
            searchLocationRender = (
            <View>                
                <View style={attribute_styles.body}>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => 
                        {
                            this.state.searchMapRequest = "Search";
                            this.props.navigation.navigate("Map Search Screen", {
                                latitude: this.state.search_latitude,
                                longitude: this.state.search_longitude
                            });
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
                            <TextInput style={inline_attribute_styles.numeric_text_input} placeholderTextColor="black" keyboardType={'numeric'} editable={true} maxLength={9} placeholder={this.state.invite_cap_value.toString()} onChangeText={(value) => {this.updateInviteCapValue(value);}}/>
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
                            <TextInput style={inline_attribute_styles.numeric_text_input} placeholderTextColor="black" keyboardType={'numeric'} editable={true} maxLength={9} placeholder={this.state.invite_cap_value.toString()} onChangeText={(value) => {this.updateParticipantsCap(value);}}/>
                        </View>
                    </View>
                </View>
            );
        }
        else {
            
        }

        /**<View style={inline_attribute_styles.title_view}>
                            <Text style={inline_attribute_styles.title_text}>
                                {"Address "}
                            </Text>
                            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} activeOpacity={1} onPress={() => {Alert.alert("Invitation Type", GlobalValues.ADDRESS_INFORMATION);}}>
                                <AntDesign name="infocirlceo" size={14} color="black" />
                            </TouchableOpacity>
                        </View> */

        if (this.state.is_physical_event) {
            physicalEventLocation = (
                <View>
                    <View style={inline_attribute_styles.body}>
                        <Text style={inline_attribute_styles.title_text}>
                            {"It will be at "}
                        </Text>
                        <View style={inline_attribute_styles.input_text_view}>
                            <TextInput style={inline_attribute_styles.text_input} placeholder="1111 sharron drive" placeholderTextColor="gray" autoCorrect={false} editable={true} maxLength={160} defaultValue={this.state.target_address} onChangeText={(value) => {this.updateAddress(value);}} onEndEditing={(event) => {}}/>
                        </View>
                    </View>
                    <View style={main_styles.horizontal_bar}/>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => 
                        {
                            this.state.searchMapRequest = "Target";
                            this.props.navigation.navigate("Map Search Screen", {
                                latitude: this.state.target_latitude,
                                longitude: this.state.target_longitude
                            });
                        }}>
                        <Text style={actions_styles.action_button_text}>
                        Drop Pin
                        </Text>
                        <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                    </TouchableOpacity>
                    
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

            physicalEventLocation = (
                <View>
                    <View style={attribute_styles.body}>
                        <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => 
                            {
                                this.state.searchMapRequest = "Search";
                                this.props.navigation.navigate("Map Search Screen", {latitude: this.state.search_latitude, longitude: this.state.search_longitude});
                            }}>
                            <View style={actions_styles.action_button_inner}>
                                <Feather name="map-pin" size={20} color="white" style={actions_styles.action_button_icon}/>
                                <Text style={actions_styles.action_button_text}>
                                    Set Search Location
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={main_styles.horizontal_bar}/>
                    <View style={inline_attribute_styles.body}>
                        <Text style={inline_attribute_styles.title_text}>
                            Virtual Link
                        </Text>
                        <View style={inline_attribute_styles.input_text_view}>
                            <TextInput style={inline_attribute_styles.text_input} placeholder="discord, steam..." placeholderTextColor="gray" autoCorrect={false} editable={true} maxLength={160} placeholder={this.state.virtual_link} onChangeText={(value) => {this.updateVirtualLink;}}/>
                        </View>
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
                                <Slider twoSlider={false} onChangeValue={this.updateSearchRange} min={0} max={20} step={1} initialValue={this.state.search_range} backgroundColor={'#FF7485'}/> 
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
                        <View style={attribute_styles.body}>
                            <Text style={attribute_styles.title_text}>
                                Description
                            </Text>     
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={attribute_styles.text_input} multiline={true} editable={true} maxLength={160} numberOfLines={4} scrollEnables={true} onChangeText={(value) => {this.updateDescription(value);}}/>
                            </View>                   
                        </View>
                        <View style={main_styles.horizontal_bar}/>    
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
                                <Slider twoSlider={true} onChangeValue={this.updateAgeRangeValues} min={18} max={100} step={2} initialValue={this.state.age_range_values} backgroundColor={'#FF7485'}/> 
                            </View>
                        </View>
                    </View>
                    <View style={section_styles.gap} />
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
                    
                </View>
            );
        }
        else {
            advancedSettings = (
                <View>

                </View>
            );
        }

        const renderComponent = ({item}) => {
            return (
                <View>
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                {"We are going to "}
                            </Text>
                            <View style={inline_attribute_styles.input_text_view}>
                                <TextInput style={inline_attribute_styles.text_input} placeholder={"play videogames"} placeholderTextColor="gray" editable={true} maxLength={160} onChangeText={(value) => {this.updateTitle(value);}}/>
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        {physicalEventLocation}
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                It's at
                            </Text>       
                            <View style={attribute_styles.input_text_view}>
                                <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                                    <Text style={{color: GlobalValues.ORANGE_COLOR}}>
                                        {this.showDate()} 
                                        {" "}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({showTimePicker: true})}>
                                    <Text style={{color: GlobalValues.ORANGE_COLOR}}>
                                        {this.showTime()}
                                    </Text>
                                </TouchableOpacity>
                            </View>   
                        </View>
                        {this.showDatePicker()}
                        {this.showTimePicker()}
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                {"It's about "}
                            </Text>
                            <View style={inline_attribute_styles.input_text_view}>
                                <TextInput style={inline_attribute_styles.text_input} placeholder="biking, partying, gaming..." placeholderTextColor="gray" editable={true} maxLength={160} ref={(input) => {this.state.attributes_input_handler = input}} onEndEditing={(event) => {this.addFilter(event.nativeEvent.text)}}/>
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
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Is physical event
                            </Text>
                            <Switch
                                trackColor = {{false: GlobalValues.DISTINCT_GRAY, true: GlobalValues.ORANGE_COLOR}}
                                thumbColor = 'white'
                                ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                                onValueChange = {this.updateSetPhysicalEventToEnable}
                                value = {this.state.is_physical_event}
                            />
                        </View>
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
                    <View style={section_styles.gap} />
                    <View style={section_styles.gap} />
                    <View style={section_styles.gap} />
                </View>
            );
        };

        return (
            <View style={[main_styles.page, {flex: 1}]}>
                <FlatList data={[{id: 1}]} keyExtractor={() => "dummy"} listEmptyComponent={null} renderItem={renderComponent} style={{zIndex: 99, flex: 1}}/>
                <View style={post_button_styles.button_view}>
                    <TouchableHighlight style={post_button_styles.button} underlayColor={'#ff6e6e'} onPress={() => {this.makeRequest()}}>
                        <Text style={post_button_styles.button_text}>
                            Post
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    //update the screen
    lazyUpdate() {
        this.forceUpdate();
    }
    updateParticipantsCapEnable(value) {
        this.setState({participants_cap_enable: value});
    }

    updateAdvancedSettingsEnable(value) {
        this.setState({advanced_settings_enabled: value});
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
                <DateTimePicker mode="date" value={this.state.date} is24Hour={true} display="default" onChange={(event, newDate) => {this.state.date = newDate; this.lazyUpdate();}}/>            
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
                <DateTimePicker mode="time" value={this.state.date} is24Hour={false} display="default" onChange={(event, newDate) => {this.state.date = newDate; this.lazyUpdate();}}/>            
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

    updateTitle(value) {
        this.state.title = value;
    }

    updateDescription(value) {
        this.state.description = value;
    }

    updateVirtualLink(value) {
        this.state.virtual_link = value;
    }

    updateAddress(value) {
        this.state.target_address = value;
    }

    //update search range
    updateSearchRange(value) {
        this.setState({search_range: Math.floor(value[0] + Math.pow(value[0], 1.13535))});
    }

    //update the dropdown selector for activities
    updateGenderDropDownValue(value) {
        GlobalProperties.search_gender = value;

        this.state.gender_dropdown_value = value;
    }
    
    updateInvitationTypeValueOnRender(value) {
        this.state.invitation_type_dropdown_value = value;
    }

    updateInviteCapEnable(value) {
        this.setState({invite_cap_enable: value});
    }

    //update the enable value
    updateEnableValue(value) {
        this.setState({enable_value: value});
    }

    updateAgeRangeValues(value) {
        this.setState({age_range_values: value});
    }

    updateInviteCapValue(value) {
        this.state.invite_cap_value = value;
    }
    
    //update setSearchLocationToTargetLocation value
    updateSetSearchLocationToTargetLocation(value) {
        this.setState({setSearchLocationToTargetLocation: value});
    }

    //update set search radius value
    updateSetSearchRadiusToEnable(value) {
        this.setState({setSearchRadiusToEnable: value});
    }

    updateSetPhysicalEventToEnable(value) {
        this.setState({is_physical_event: value});
    }

    updateSliderValue(value) {
        this.setState({slider_value: value});
    }

    updateParticipantsCap(value) {
        this.setState({participants_cap: value})
    }

    //after the delete alert, and delete has been pressed
    afterDeleteAlert(id, DATA) {
        this.deleteDataComponent(id, DATA);
        this.lazyUpdate();
    }

    async makeRequest() {
        if (!(await this.validateFields())) {
            return;
        }

        //add elements

        //get date string
        var dateString = this.state.date.getDate() + "/" + this.state.date.getMonth() + "/" + this.state.date.getFullYear() + " " + this.state.date.getHours() + ":" + this.state.date.getMinutes();

        //make body with requried elements
        var body = {
            title: this.state.title,
            description: this.state.description,
            attributes: this.state.attributes,
            date_time: dateString,
            is_physical: this.state.is_physical_event,
            address: this.state.target_address,
            invitation_method: this.state.invitation_type_dropdown_value,
            minimum_age: this.state.age_range_values[0],
            maximum_age: this.state.age_range_values[1],
            target_location: {
                latitude: this.state.target_latitude,
                longitude: this.state.target_longitude,
            }
        };

        //add variable elements
        if (!this.state.setSearchLocationToTargetLocation) {
            body["search_location"] = {
                latitude: this.state.search_latitude,
                longitude: this.state.search_longitude,
            }
        }

        if (this.state.setSearchRadiusToEnable || !this.state.setSearchLocationToTargetLocation) {
            body["search_radius"] = this.state.searchRadius;
        }

        if (this.state.invite_cap_enable) {
            body["invite_cap"] = this.state.invite_cap_value;
        }

        if (this.state.participants_cap_enable) {
            body["participants_cap"] = this.state.participants_cap;
        }

        if (this.state.gender_dropdown_value != "all") {
            body["gender"] = this.state.gender_dropdown_value;
        }
        
        //if request was successful
        var successful = false;
        //make request        
        var result = await GlobalEndpoints.makePostRequest(true, "/api/User/Friends/CreateActivity", body)
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
                //set return screen values
                GlobalProperties.screen_props = null;
                GlobalProperties.return_screen = "Activity Creation Screen";

                //once done, go back
                this.props.navigation.pop(2);
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

function handleImageURI(uri) {
    if (uri == undefined) {
        return(require("../../../../images/default_image.png"));
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
                    style={{borderWidth: 0, borderRadius: 4, height: 50, backgroundColor: GlobalValues.DARKER_OUTLINE}}
                    dropDownContainerStyle={{borderWidth: 0, borderRadius: 4, backgroundColor: GlobalValues.DARKER_OUTLINE}}
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
                    selectedStyle={{backgroundColor: GlobalValues.ORANGE_COLOR, height: 4}}
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
                    selectedStyle={{backgroundColor: GlobalValues.ORANGE_COLOR, height: 4}}
                    markerStyle={{backgroundColor: 'white', borderColor: GlobalValues.DISTINCT_GRAY, borderWidth: 1, padding: 8}}
                    ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                />
            );
        }
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