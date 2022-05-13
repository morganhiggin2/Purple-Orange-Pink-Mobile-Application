import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert, FlatList, Switch, Platform, TouchableHighlight} from 'react-native';
import * as Location from 'expo-location';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { PickerIOS } from '@react-native-picker/picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Feather } from '@expo/vector-icons';

import { GlobalProperties, GlobalValues } from '../../../../global/global_properties.js';
import { pow } from 'react-native-reanimated';

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
    actions_button:  {
        borderRadius: 3,
        borderWidth: 4,
        backgroundColor: '#ff4576',
        borderColor: '#ff4576',
        padding: 3,
        marginVertical: 6,
        alignSelf: 'center',
        width: "100%",
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
});

const inline_attribute_styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: "3%",
        paddingHorizontal: "3%",
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
        textAlign: 'left',
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

var ACTIVITIES = [
    {
        id: 0,
        name: "mountain biking"
    },
    {
        id: 1,
        name: "fishing"
    },
    {
        id: 2,
        name: "travel"
    },
    {
        id: 3,
        name: "camping"
    }
];



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

export class GroupCreationScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //title
            title: "",

            //images
            group_images: [],

            //for locations
            search_latitude: null,
            search_longitude: null,
            target_latitude: null,
            target_longitude: null,

            //is physical or virtual event
            is_physical_group: true,

            //for virtual address
            virtual_link: "",

            //for physical address
            target_address: "",

            //for getting search map information
            searchMapRequest: "",

            //for the list of activities
            activities_input_handler: null,
            activities_max_index: Object.keys(ACTIVITIES).length,

            //for values
            invite_cap_value: 0,

            //for dropdowns
            gender_dropdown_value: 'all',
            invitation_type_dropdown_value: 'by_preferences',

            //for the enable
            setSearchRadiusToEnable: false,
            invite_cap_enable: false,
            vitrual_event_search_location_enable: false,

            //for sliders
            age_range_values: [18, 100],
            search_range: 5.0,
        }

        this.requestLocation = this.requestLocation.bind(this);

        this.updateTitle = this.updateTitle.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.updateVirtualLink = this.updateVirtualLink.bind(this);
        this.updateSearchRange = this.updateSearchRange.bind(this);
        this.updateGenderDropDownValue = this.updateGenderDropDownValue.bind(this);
        this.updateInvitationTypeValueonRender = this.updateInvitationTypeValueonRender.bind(this);
        this.updateAgeRangeValues = this.updateAgeRangeValues.bind(this);
        this.updateInviteCapValue = this.updateInviteCapValue.bind(this);
        this.updateInviteCapEnable = this.updateInviteCapEnable.bind(this);
        this.updateEnableValue = this.updateEnableValue.bind(this);
        this.updateSliderValue = this.updateSliderValue.bind(this);
        this.updateSetSearchRadiusToEnable = this.updateSetSearchRadiusToEnable.bind(this);
        this.updateSetPhysicalGroupToEnable = this.updateSetPhysicalGroupToEnable.bind(this);
        this.updateVirtualEventSearchLocationToEnable = this.updateVirtualEventSearchLocationToEnable.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {
        //for images
        /*//get all the promises
        var profile_images = [3];

        //get the profile images promises
        for (let i = 0; i < 3; i++) {
            profile_images[i] = GlobalProperties.get_key_value_pair("profile_image_" + i);
        }

        //make sure all promises finish before continuing, with a set timeout

        Promise.all(profile_images) //put all promises in this array [one, two, ...]
        .then(promises => {
            //set state

            this.setState({
                profile_images: promises, 
            });
        }); */

        for (let i = 0; i < 2; i++) {
            //this.state.group_images[i] = "https://cdn.theatlantic.com/thumbor/Zsv9f5L_2qK1Rwr7TVj_4E2K8xI=/0x281:5574x3416/1600x900/media/img/mt/2020/03/RTS37HPB-1/original.jpg";
            this.state.group_images[i] = null;
        }

        this.props.navigation.addListener('focus', () => {
            this.state.global_props = GlobalProperties.screen_props;

            //we returned from the search screen with getting new activity/target location
            if (GlobalProperties.return_screen == "Search Map Screen" && this.state.searchMapRequest == "Target" && GlobalProperties.screen_props != null) {
                //update search coordinates
                this.state.target_latitude = GlobalProperties.screen_props.latitude;
                this.state.target_longitude = GlobalProperties.screen_props.longitude;

                //console.log(GlobalProperties.screen_props.latitude);

                this.state.searchMapRequest = "";
            }
            //we returned from the search screen with getting new search location
            else if (GlobalProperties.return_screen == "Search Map Screen" && this.state.searchMapRequest == "Search" && GlobalProperties.screen_props != null) {
                //update search coordinates
                this.state.search_latitude = GlobalProperties.screen_props.latitude;
                this.state.search_longitude = GlobalProperties.screen_props.longitude;

                this.state.searchMapRequest = "";
            }
            else if (GlobalProperties.return_screen == "Edit Group Images Screen") {
                this.state.group_images = GlobalProperties.screen_props.group_images;
            }

            GlobalProperties.screenActivated();
        });

        this.requestLocation();
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


                            <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.navigation.navigate("Edit Images Screen", {profile_images: this.state.profile_images})}}>
                                <View style={actions_styles.action_button_inner}>
                                    <Feather name="edit" size={20} color="white" style={actions_styles.action_button_icon}/>
                                    <Text style={actions_styles.action_button_text}>
                                        Edit Images
                                    </Text>
                                </View>
                            </TouchableOpacity>

                <View style={inline_attribute_styles.body}>
                    <Text style={inline_attribute_styles.title_text}>
                        Search Location
                    </Text>
                    <View style={inline_attribute_styles.input_text_view}>
                        <Text>
                            Map select button goes here, set this.state.searchMapRequest = "Search"
                        </Text>
                    </View>
                </View>*/

    render() {
        let searchRadiusRender;
        let inviteCapRender;
        let physicalEventLocation;

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

        }

        //if they decide to set a cap on invites
        if (this.state.invite_cap_enable) {
            inviteCapRender = (
            <View>
                <View style={inline_attribute_styles.body}>
                    <Text style={inline_attribute_styles.title_text}>
                        Cap
                    </Text>
                    <View style={inline_attribute_styles.numeric_input_text_view}>
                        <TextInput style={inline_attribute_styles.numeric_text_input} placeholderTextColor="black" keyboardType={'numeric'} editable={true} maxLength={9} placeholder={this.state.title} onChangeText={(value) => {this.updateInviteCapValue(value);}}/>
                    </View>
                </View>
            </View>
            );
        }
        else {

        }

        if (this.state.is_physical_group) {
            physicalEventLocation = (
                <View>
                    <View style={attribute_styles.body}>
                        <Text style={attribute_styles.title_text}>
                            Set group location
                        </Text>
                        <TouchableOpacity style={attribute_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => 
                            {
                                this.state.searchMapRequest = "Target";
                                this.props.navigation.navigate("Map Search Screen");
                            }}>
                            <View style={attribute_styles.action_button_inner}>
                                <Feather name="map-pin" size={20} color="white" style={attribute_styles.action_button_icon}/>
                                <Text style={attribute_styles.action_button_text}>
                                    Set Pin
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={main_styles.horizontal_bar}/>
                    <View style={inline_attribute_styles.body}>
                        <Text style={inline_attribute_styles.title_text}>
                            Address
                        </Text>
                        <View style={inline_attribute_styles.input_text_view}>
                            <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" autoCorrect={false} editable={true} maxLength={160} placeholder={this.state.target_address} onChangeText={(value) => {this.updateAddress(value);}} onEndEditing={(event) => {this.getGeoLocationFromAddress(event.nativeEvent.text)}}/>
                        </View>
                    </View>
                    <View style={main_styles.horizontal_bar}/>
                    <View style={inline_attribute_styles.body}>
                        <Text style={inline_attribute_styles.title_text}>
                            Only show to people in search radius
                        </Text>
                        <Switch
                            trackColor = {{false: GlobalValues.DISTINCT_GRAY, true: GlobalValues.ORANGE_COLOR}}
                            thumbColor = {this.state.setSearchRadiusToEnable ? 'white': 'white'}
                            ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                            onValueChange = {this.updateSetSearchRadiusToEnable}
                            value = {this.state.setSearchRadiusToEnable}
                        />
                    </View>
                    {searchRadiusRender}
                </View>
            )
        }
        else {            
            physicalEventLocation = (
            <View>
                <View style={inline_attribute_styles.body}>
                    <Text style={inline_attribute_styles.title_text}>
                        Virtual Link
                    </Text>
                    <View style={inline_attribute_styles.input_text_view}>
                        <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" autoCorrect={false} editable={true} maxLength={160} placeholder={this.state.virtual_link} onChangeText={(value) => {this.updateVirtualLink;}}/>
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
                                <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" editable={true} maxLength={160} placeholder={this.state.title} onChangeText={(value) => {this.updateTitle(value);}}/>
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={attribute_styles.body}>
                            <Text style={attribute_styles.title_text}>
                                Description
                            </Text>     
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={[attribute_styles.text_input, {fontSize: 18, textAlignVertical: "top"}]} multiline={true} editable={true} maxLength={160} numberOfLines={4} scrollEnables={true}/>
                            </View>                   
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Attributes
                            </Text>
                            <View style={inline_attribute_styles.input_text_view}>
                                <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" editable={true} maxLength={160} ref={(input) => {this.state.activities_input_handler = input}} onEndEditing={(event) => {this.addFilter(event.nativeEvent.text)}}/>
                            </View>
                        </View>
                        <View style={filter_snaps_styles.container}> 
                            {ACTIVITIES.map((data, key) => {
                                return (
                                    <FilterSnap key={key} id={data.id} innerText={data.name} parent={this} data={ACTIVITIES}/>
                                );
                            })}
                        </View>                            
                    </View>
                    <View style={section_styles.gap} />
                    <View style={info_styles.body}>
                        <View style={attribute_styles.body}>
                            <Text style={attribute_styles.title_text}>
                                Images
                            </Text>
                            <TouchableOpacity style={attribute_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.navigation.navigate("Edit Group Images Screen", {group_images: this.state.group_images})}}>
                                <View style={attribute_styles.action_button_inner}>
                                    <Feather name="edit" size={20} color="white" style={attribute_styles.action_button_icon}/>
                                    <Text style={attribute_styles.action_button_text}>
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
                                Is physical group
                            </Text>
                            <Switch
                                trackColor = {{false: GlobalValues.DISTINCT_GRAY, true: GlobalValues.ORANGE_COLOR}}
                                thumbColor = {this.state.setSearchRadiusToEnable ? 'white': 'white'}
                                ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                                onValueChange = {this.updateSetPhysicalGroupToEnable}
                                value = {this.state.is_physical_group}
                            />
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        {physicalEventLocation}
                    </View>
                    <View style={section_styles.gap} />
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Invitation type
                            </Text>
                            <View style={[inline_attribute_styles.drop_down_selector, Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH} : {width: '50%', alignSelf: 'flex-end'}]}>
                                    <DropDown 
                                        style={Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH, flexDirection: 'row'} : {}}
                                        items={[{label: 'By Preferences', value: 'by_preferences', }, {label: 'Invite Only', value: 'invite_only'}, {label: "Anyone", value: "anyone"}]}
                                        onChangeValue = {this.updateInvitationTypeValueonRender}
                                        currentValue={this.state.invitation_type_dropdown_value}
                                        />
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Cap invitation count
                            </Text>
                            <Switch
                                trackColor = {{false: GlobalValues.DISTINCT_GRAY, true: GlobalValues.ORANGE_COLOR}}
                                thumbColor = {this.state.invite_cap_enable ? 'white': 'white'}
                                ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                                onValueChange = {this.updateInviteCapEnable}
                                value = {this.state.invite_cap_enable}
                            />
                        </View>
                        {inviteCapRender}
                    </View>
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
                                <Slider twoSlider={true} onChangeValue={this.updateAgeRangeValues} min={18} max={100} step={2} initialValue={this.state.age_range_values} backgroundColor={'#FF7485'}/> 
                            </View>
                        </View>
                    </View>
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
                    <TouchableHighlight style={post_button_styles.button} underlayColor={'#ff6e6e'} onPress={() => {}}>
                        <Text style={post_button_styles.button_text}>
                            Post
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
    /*
    
                    <View style={section_styles.gap} />
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Activities
                            </Text>
                            <View style={[inline_attribute_styles.drop_down_selector, Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH} : {width: '50%', alignSelf: 'flex-end'}]}>
                                    <DropDown 
                                        style={Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH, flexDirection: 'row'} : {}}
                                        items={[{label: 'Apple', value: 'apple'}, {label: 'Banana', value: 'banana', }, {label: "Orange", value: "orange"}, {label: "Pear", value: "pear"},   {label: "Pearr", value: "pearr"},  {label: "Pearrr", value: "pearrr"}]}
                                        onChangeValue = {this.updateActivityDropDownValue}
                                        currentValue={"apple"}
                                        />
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
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
                        </View>
                    </View>
    */

    //update the screen
    lazyUpdate() {
        this.forceUpdate();
    }

    //for the filters
    addFilter(input) {
        //add it
        ACTIVITIES.push({id: this.state.activities_max_index, name: input});
        //increment the max index
        this.state.activities_max_index++;
        //clear the text input
        this.state.activities_input_handler.clear();
        //update the screen
        this.lazyUpdate();
    }

    //delete a data component from a json data structure with id attributes, each different
    deleteDataComponent(id, DATA) {
        for (let [i, data] of DATA.entries()) {
            if (data.id == id) {
                DATA.splice(i, 1);
            }
        }
    }

    
    //TODO feed location to search map if clicked

    //request to get longitude and latitude of location
    //called when text field is done editing
    async getGeoLocationFromAddress() {
        if (this.state.target_address != "") {
            Location.geocodeAsync(this.state.target_address)
            .then((location) => {
                //set address
                this.target_latitude = location.latitude;
                this.target_longitude = location.longitude;
            })
            .catch((error) => {
                //address not found for network error
            }); 
        }
    }

    updateTitle(value) {
        this.state.title = value;
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
        GlobalProperties.map_filters_updated = true;

        GlobalProperties.search_gender = value;

        this.state.gender_dropdown_value = value;
    }
    
    updateInvitationTypeValueonRender(value) {
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
        this.invite_cap_value = value;
    }

    //update set search radius value
    updateSetSearchRadiusToEnable(value) {
        this.setState({setSearchRadiusToEnable: value});
    }

    updateSetPhysicalGroupToEnable(value) {
        this.setState({is_physical_group: value});
    }

    updateVirtualEventSearchLocationToEnable(value) {
        this.setState({vitrual_event_search_location_enable: value});
    }

    updateSliderValue(value) {
        this.setState({slider_value: value});
    }

    //after the delete alert, and delete has been pressed
    afterDeleteAlert(id, DATA) {
        this.deleteDataComponent(id, DATA);
        this.lazyUpdate();
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
                    trackStyle = {{backgroundColor: '#b8b8b8', height: 4}}
                    selectedStyle={{backgroundColor: this.props.backgroundColor, height: 4}}
                    markerStyle={{backgroundColor: 'white', borderColor: '#b8b8b8', borderWidth: 1, padding: 8}}
                    ios_backgroundColor = {'#b8b8b8'}
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
                    trackStyle = {{backgroundColor: '#b8b8b8', height: 4}}
                    selectedStyle={{backgroundColor: this.props.backgroundColor, height: 4}}
                    markerStyle={{backgroundColor: 'white', borderColor: '#b8b8b8', borderWidth: 1, padding: 8}}
                    ios_backgroundColor = {'#b8b8b8'}
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