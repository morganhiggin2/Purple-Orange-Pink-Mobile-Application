import React from 'react';
import {StyleSheet, View, Text, TextInput, RefreshControl, Alert, FlatList, Switch, Platform, TouchableHighlight} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { PickerIOS } from '@react-native-picker/picker';
import { SliderBox } from "react-native-image-slider-box";

import {GlobalProperties, GlobalValues} from '../../../global/global_properties.js'
import { GlobalEndpoints } from '../../../global/global_endpoints.js';
import { LoadingScreen } from '../../misc/loading_screen.js';

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
        backgroundColor: 'white',
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
        paddingVertical: 8,
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
        flex: 1,
    },
    input_body: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 8,
        flex: 1,
    },
    title_view: {
        flexDirection: 'row',
    },
    text_view: {
        paddingVertical: 4
    },
    title_text: {
        alignSelf: 'center',
        fontSize: 16,
        color: 'black',
        fontFamily: 'Roboto'
    },
    input_text_view: {
        flexDirection:  'row',
        flexShrink: 1
    },
    static_view: {
        right: 0,
        flexDirection: 'row'
    },
    numeric_text_input: {
        fontFamily: 'Roboto',
        fontSize: 16
    },
    numeric_input_text_view: {

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
        fontFamily: 'Roboto'
    },
    text_input_continuation: {
        textAlignVertical: "center",
        paddingRight: 4,
        width: '100%',
        textAlign: 'left',
        borderRadius: 4,
        fontSize: 16, 
        fontFamily: 'Roboto'
    },
    drop_down_selector: {
        marginRight: Platform.OS == "ios" ? 0 : -10
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
            fontFamily: 'Roboto',
            fontSize: 16,
        }
    }
);

const post_button_styles = StyleSheet.create({
    button_view: {
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row-reverse',
        zIndex: 99
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
            fontFamily: 'Roboto',
            fontSize: 16,
            textAlign: 'center',
            color: 'white', 
            fontWeight: 'bold',
        },
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundColor: 'white',
        },
        box: {
            backgroundColor: GlobalValues.ORANGE_COLOR,
            borderColor: GlobalValues.ORANGE_COLOR,
            borderWidth: 2,
            borderRadius: 5,
            marginBottom: 8,
            marginRight: 6,
            padding: 3
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

export class YourProfileScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //user values
            name: "",
            description: "",
            attributes: [],
            gender: "",
            shown: false,

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
            profile_images: ["","",""],

            //if update made
            updateMade: false,

            //update json body
            updateBody: {},
        }

        this.fetchProfileInformation = this.fetchProfileInformation.bind(this);
        this.updateUpdateMade = this.updateUpdateMade.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.updateActivityDropDownValue = this.updateActivityDropDownValue.bind(this);
        this.updateGenderDropDownValue = this.updateGenderDropDownValue.bind(this);
        this.syncUpdates = this.syncUpdates.bind(this);
        this.updateShown = this.updateShown.bind(this);
        this.showError = this.showError.bind(this);
        this.reloadResults = this.reloadResults.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {
        //get information from server for profile
        this.fetchProfileInformation();

        this.props.navigation.addListener('focus', () => {
            this.state.global_props = GlobalProperties.screen_props;

            if (GlobalProperties.return_screen == "Edit Images Screen" && GlobalProperties.screen_props != null) {
                if (GlobalProperties.screen_props.edit_images) {
                    this.fetchProfileInformation();
                }
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
                this.state.name = user_information.name;
                this.state.description = user_information.description;
                this.state.shown = user_information.shown;
                this.state.attributes = user_information.attributes;
                this.state.date = new Date(Date.parse(user_information.birthdate));
                this.state.gender_dropdown_value = user_information.gender;
                var profile_images = user_information.profile_image_uris;
                this.state.loading = false;

                //add default image if nessesary
                if (profile_images.length < 3) {

                    for (let i = 0; i < profile_images.length; i++) {
                        this.state.profile_images[i] = profile_images[i];
                    }
                    for (let i = profile_images.length; i < 3; i++) {
                        this.state.profile_images[i] = "";
                    }
                }

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
            }
            else {
                this.state.reload = true;
                this.lazyUpdate();
                return;
            }
        }
    }

    render() { 
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
                        <View style={inline_attribute_styles.input_body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Name
                            </Text>
                            <View style={inline_attribute_styles.input_text_view}>
                                <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="gray" placeholder={"Name"} autoCorrect={false} editable={true} maxLength={160} defaultValue={this.state.name} onChangeText={(value) => {this.updateName(value);}} onEndEditing={(value) => {this.updateUpdateMade(false)}}/>
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Gender
                            </Text>
                            <View style={inline_attribute_styles.drop_down_selector}>
                                <DropDown 
                                        style={Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH, flexDirection: 'row'} : {}}
                                        items={[{label: 'Male', value: 'male'}, {label: 'Female', value: 'female', }, {label: "Other", value: "other"}]}
                                        onChangeValue = {this.updateGenderDropDownValue}
                                        currentValue = {this.state.gender_dropdown_value}
                                        width = {110}
                                        />
                            </View>
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Birthdate
                            </Text>       
                            <View style={inline_attribute_styles.static_view}>
                                <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                                    <Text style={{color: GlobalValues.ORANGE_COLOR}}>
                                            {this.showDate()} 
                                            {" "}
                                    </Text>
                                </TouchableOpacity>
                            </View>   
                        </View>
                        {this.showDatePicker()}
                    </View>
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.input_body}>
                            <View style={inline_attribute_styles.title_view}>
                                <Text style={inline_attribute_styles.title_text}>
                                    I am into
                                </Text>
                            </View>
                            <View style={inline_attribute_styles.input_text_view}>
                                <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="gray" placeholder={"hiking, swimming, poker..."} autoCapitalize={"none"} editable={true} maxLength={160} ref={(input) => {this.state.attributes_input_handler = input}} onEndEditing={(event) => {this.addFilter(event.nativeEvent.text);}}/>
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
                                <TextInput style={attribute_styles.text_input} placeholder="Anything else we should know?" placeholderTextColor="gray" multiline={true} editable={true} maxLength={160} numberOfLines={4} scrollEnables={true} defaultValue={this.state.description} onChangeText={(value) => {this.updateDescription(value);}} onEndEditing={(value) => {this.updateUpdateMade(false)}}/>
                            </View>                   
                        </View>                    
                    </View>
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
                    <View style={info_styles.body}>
                        <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.navigation.navigate("Edit Images Screen", {profile_images: this.state.profile_images})}}>
                                <Text style={actions_styles.action_button_text}>
                                    Edit Images
                                </Text>
                            <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
                        </TouchableOpacity>
                    </View>
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
                <View style={[main_styles.page, {}]}>
                    <FlatList 
                        data={[{}]} 
                        keyExtractor={() => "dummy"} 
                        listEmptyComponent={null} 
                        renderItem={renderComponent} 
                        style={{height: '50%'}}
                        refreshControl={<RefreshControl refreshing={false} 
                        onRefresh={() => {this.reloadResults();}}/>}
                        />
                        <View style={post_button_styles.button_view}>
                            {this.state.updateMade ? (
                                <TouchableHighlight style={post_button_styles.button} underlayColor={'#ff6e6e'} onPress={() => {this.syncUpdates()}}>
                                    <Text style={post_button_styles.button_text}>
                                        Save Updates
                                    </Text>
                                </TouchableHighlight>
                            ) : (
                                <View />
                            )}
                        </View>
                </View>
            );
        }
    }

    //reload results
    reloadResults() {
        this.state.loading = true;
        this.fetchProfileInformation();
    }

    //update the screen
    lazyUpdate() {
        this.forceUpdate();
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
        this.state.date = value;

        this.state.updateBody["birthdate"] = this.state.date.getDate() + "/" + (this.state.date.getMonth() + 1) + "/" + this.state.date.getFullYear();
        
        this.updateUpdateMade(true);
    }
    
    addFilter(input) {
        var lowerInput = input.toLowerCase();

        //add it
        this.state.attributes.push(lowerInput);
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

    updateName(value) {
        this.state.name = value;

        //update updatebody
        this.state.updateBody["name"] = this.state.name;
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

                //once done, clear updatebody and variables
                this.state.updateBody = {};
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
        if (this.state.name.length == 0) {
            this.showError("name field must not be empty");
            return false;
        }

        if (this.state.name.length > 256) {
            this.showError("name field is too long");
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
    if (uri == undefined || uri == "") {
        return(require("../../../assets/images/default_image.png"));
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
        items: props.items,
        width: props.width,
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
      return (
        this.state.items ? (
            Platform.OS == 'ios' ? (
                this.state.open ? (
                    <PickerIOS
                        //open={open}
                        selectedValue={this.state.value}
                        //onValueChange={(value) => {this.setState({value: value, open: false});}}
                        onValueChange={(value) => {this.changeValue(value); this.setOpen(false)}}
                        style={{width: GlobalValues.IOS_DROPDOWN_WIDTH}}
                        >
                            {this.state.items.map((data) => {
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
                    <View style={{}}>
                        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.setState({open: true})}}>
                            <Text style={{marginRight: 5, fontSize: 16, fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal', fontSize: 16, fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: 'normal'}}>
                                {this.state.value == null ? "Select" : this.state.items.find(e => e.value == this.state.value).label} 
                            </Text>
                            <AntDesign style={{alignSelf: 'center'}} name="down" size={14} color="black"/>
                        </TouchableOpacity>
                    </View>
                )
            ) : (
                <View style={{width: this.state.width}}>
                    <DropDownPicker
                    open={this.state.open}
                    value={this.state.value}
                    items={this.state.items}
                    setOpen={this.setOpen}
                    setValue={this.setValue}
                    setItems={this.setItems}
                    listMode={"SCROLLVIEW"}
                    textStyle={{fontSize: 14, fontFamily: 'Roboto'}}
                    style={{borderWidth: 0, width: this.state.width}}
                    dropDownContainerStyle={{borderWidth: 0, width: this.state.width}}
                    maxHeight={80}
                    placeholder={"Select"}
                    />

                    {this.state.open ? (
                        <View style={{height: 90}}/>
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

class FilterSnap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( 
            <TouchableOpacity style={filter_snaps_styles.box} activeOpacity={1} onPress={() => {deleteAlert(this.props.parent, this.props.data, this.props.id)}}>
                <Text style={filter_snaps_styles.inner_text}>
                    {this.props.innerText}
                </Text>
            </TouchableOpacity>
        );
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