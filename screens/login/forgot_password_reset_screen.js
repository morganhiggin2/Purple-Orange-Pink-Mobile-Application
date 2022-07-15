import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert, FlatList, Platform, TouchableHighlight} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons'; 
import DropDownPicker from 'react-native-dropdown-picker';
import { PickerIOS } from '@react-native-picker/picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { GlobalProperties, GlobalValues } from '../../global/global_properties.js';
import { GlobalEndpoints } from '../../global/global_endpoints.js';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: "white",
            height: '100%',
        },
        sub_section: {
            marginTop: '10%',
        },
        title_text: {
            alignSelf: 'center',
            fontSize: 24,
            color: 'gray',
            padding: 5,
            fontFamily: "Roboto",
        }, 
        horizontal_bar: {
            width: '94%',
            alignSelf: 'center',
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE,
        },
        error_message: {
            color: 'red',
            fontFamily: 'Roboto',
            fontSize: 12,
            alignSelf: 'center',
            marginTop: "5%",
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
        width: "80%",
        alignSelf: 'center',
        marginVertical: 8,
        paddingVertical: 10,
    },
    input_text_view: {
        flexDirection:  'row',
    },
    multiline_input_text: {
        fontSize: 18, 
        maxHeight: "96px", 
        textAlignVertical: "top",
        fontFamily: "Roboto",
    },
    title_text: {
        alignSelf: 'flex-start',
        fontSize: 16,
        color: 'black',
        marginBottom: 6,
        fontFamily: "Roboto",
    },
    text_input: {
        textAlignVertical: "top",
        flex: 1,
        maxHeight: 92,
        paddingVertical: 2,
        paddingHorizontal: 4,
        backgroundColor: 'white',
        borderColor: 'black',
        borderBottomWidth: 1,
        borderRadius: 4,
        fontFamily: "Roboto",
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

export class ResetForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for loading screen
            loading: true,
            reload: false,

            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",

            passwordResetToken: this.props.route.params.password_reset_token,

            error_message: "",

            updateMade: false,
        }

        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.updateOldPassword = this.updateOldPassword.bind(this);
        this.updateNewPassword = this.updateNewPassword.bind(this);
        this.updateNewPasswordConfirm = this.updateNewPasswordConfirm.bind(this);
        this.updateUpdateMade = this.updateUpdateMade.bind(this);
        this.validateFields =this.validateFields.bind(this);
        this.syncUpdates = this.syncUpdates.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {

    }

    render() {

        const renderComponent = ({item}) => {
            return (
                <View>
                    <View style={info_styles.body}>
                        <View style={attribute_styles.body}>
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={attribute_styles.text_input} autoComplete={"password"} placeholderTextColor="gray" placeholder={"Old Password"} secureTextEntry={true} textContentType={"password"} editable={true} maxLength={160} onChangeText={(value) => {this.updateOldPassword(value);}}/>
                            </View>
                        </View>
                        <View style={attribute_styles.body}>
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={attribute_styles.text_input} placeholder={"New Password"} placeholderTextColor="gray" secureTextEntry={true} textContentType={"password"} editable={true} maxLength={160} onChangeText={(value) => {this.updateNewPassword(value);}}/>
                            </View>
                        </View>
                        <View style={attribute_styles.body}>
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={attribute_styles.text_input} placeholder={"Confirm"} placeholderTextColor="gray" secureTextEntry={true} textContentType={"password"} editable={true} maxLength={160} onChangeText={(value) => {this.updateNewPasswordConfirm(value);}}/>
                            </View>
                        </View>
                        {this.renderErrorMessage()}
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
    
    updateOldPassword(value) {
        this.state.oldPassword = value;
        this.updateUpdateMade(false);
    }

    updateNewPassword(value) {
        this.state.newPassword = value;
        this.updateUpdateMade(false);
    }

    updateNewPasswordConfirm(value) {
        this.state.confirmNewPassword = value;
        this.updateUpdateMade(false);
    }

    validateFields(updatedPassword) {
        if (updatedPassword) {
            if (this.state.oldPassword == "") {
                this.state.error_message = "Old password is empty";
                return false;
            }
            else if (this.state.newPassword == "") {
                this.state.error_message = "New password is empty";
                return false;
            }
            else if (this.state.confirmNewPassword == "") {
                this.state.error_message = "Confirm password is empty";
                return false;
            }
            else if (this.state.newPassword != this.state.confirmNewPassword) {
                this.state.error_message = "Confirm password and new password do not match";
                return false;
            }
        }

        return true;
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

    //update the screen
    lazyUpdate() {
        this.forceUpdate();
    }

    async syncUpdates() {
        var updatedPassword = (this.state.oldPassword != "" || this.state.newPassword != "" || this.state.confirmNewPassword != "");

        //if no updates were made
        if (!updatedPassword) {
                //set return screen values
                GlobalProperties.screen_props = null;
                GlobalProperties.return_screen = "Reset Forgot Password Screen";

                //once done, go back
                this.props.navigation.pop(1);
        }

        if (!(await this.validateFields(updatedPassword))) {
            Alert.alert(this.state.error_message);
            return;
        }

        //add elements
        //make body with requried elements
        var body = {
            old_password: this.state.oldPassword,
            new_password: this.state.newPassword,
            password_reset_token: this.state.passwordResetToken,
            username: GlobalProperties.user_name,
        };    

        //if request was successful
        var successful = false;

        //make request        
        var result = await GlobalEndpoints.makePostRequest(true, "/api/AccountManager/ResetPasswordWithToken", body)
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
            this.state.error_message = "Internet connection is unstable\n or Server is down for matainance"; 
            return(error);
        });

        //if there is no error message, request was good
        if (successful) {

            //if result status is ok
            if (result.request.status ==  200) {
                //set return screen values
                GlobalProperties.screen_props = null;
                GlobalProperties.return_screen = "Account Info Screen";

                //once done, go back
                this.props.navigation.pop(3);
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
                this.state.error_message = result.response.data;
                this.lazyUpdate();
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

    //render the error message if there is one 
    renderErrorMessage() {
        if (this.state.error_message != "") {
            return (
                <Text style={main_styles.error_message}>
                    {this.state.error_message}
                </Text>
            );
        }
        else {
            return(
                <View style={{height: 0}} />
            );
        }
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
