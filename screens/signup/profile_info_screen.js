import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert, FlatList, Switch} from 'react-native';
import {TouchableOpacity, TouchableHighlight} from 'react-native-gesture-handler';
import {} from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { GlobalValues, GlobalProperties } from '../../global/global_properties';
import { GlobalEndpoints } from '../../global/global_endpoints';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: 'white',
            height: '50%',
            width: '100%',
            flexDirection: "column",
            flex: 1,
        },
        sub_section: {
            marginTop: '10%',
        },
        main_section: {
            marginTop: '10%',
        },
        main_sub_section: {
            alignItems: 'center',
        },
        text_field: {
            width: "80%",
            backgroundColor: 'white',
            padding: 10,
            paddingVertical: 10,
            marginVertical: 8,
            color: 'darkgray',
            borderBottomWidth: 1,
            borderColor: 'gray'
        },
        title_text: {
            fontSize: 24,
            color: 'black',
            marginBottom: '0 %',
            marginLeft: '10%',
            padding: 5,
            width: '100%'
        },
        title_text: {
            alignSelf: 'center',
            fontSize: 24,
            color: 'gray',
            padding: 5,
        }, 
        button: {
            borderRadius: 5,
            backgroundColor: GlobalValues.ORANGE_COLOR,
            borderColor: GlobalValues.ORANGE_COLOR,
            padding: 2,
            paddingVertical: 6,
            alignSelf: 'center',
            alignContent: 'center',
            width: '80%',
            marginBottom: "5%",
        },
        button_text: {
            color: 'white',
            fontSize: 18,
            alignSelf: 'center',
        },
        error_message: {
            color: 'red',
            fontSize: 12,
            alignSelf: 'center',
            marginTop: "5%",
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
        backgroundColor: 'white',
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
        marginVertical: "2%",
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
        backgroundColor: 'white',
        borderColor: 'black',
        borderBottomWidth: 1,
        borderRadius: 4,
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
        width: "80%",
        alignSelf: 'center',
        marginVertical: 8,
        paddingVertical: 10,
        borderColor: 'black',
        borderBottomWidth: 1,
        borderRadius: 4,
    },
    title_text: {
        alignSelf: 'flex-start',
        alignSelf: 'flex-end',
        fontSize: 14,
        color: 'gray',
        marginLeft: 3,
    },
    input_text_view: {
        flexDirection:  'row',
        width: "70%",
    },
    text_input: {
      textAlignVertical: "center",
      padding: 10,
      paddingVertical: 10,
      marginVertical: 8,
      width: '100%',
      textAlign: 'left',
      backgroundColor: 'white',
      color: 'darkgray',
      borderBottomWidth: 1,
      borderColor: 'black'
    },
    drop_down_selector: {
        paddingHorizontal: 4,
        marginTop: 13,
        alignSelf: 'flex-end',
    },
    drop_down_selector_gap: {
        height: 100,
    },
    date_picker: {
        width: 200,
    }
});

export class ProfileInfoScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for the date selector
            date: new Date(Date.now()),
            showDatePicker: false,

            //for the activity dropdown
            gender_dropdown_value: "",

            name: "",
        }

        this.updateName = this.updateName.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.validateBirthDate = this.validateBirthDate.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateGender = this.validateGender.bind(this);
        this.updateGenderDropDownValue = this.updateGenderDropDownValue.bind(this);
        this.showDate = this.showDate.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);
        this.register = this.register.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    
    //attempt to login with the information in the text fields
    async register() {
        //validate username and password before
        if (!this.validateName() || !this.validateBirthDate() || !this.validateGender()) {
            this.lazyUpdate();
            return;
        }

        //set error message
        this.state.error_message = "";

        var body = {
            "birthdate": this.state.date.getDate() + "/" + (this.state.date.getMonth() + 1) + "/" + this.state.date.getFullYear(),
            "gender": this.state.gender_dropdown_value,
            "name": this.state.name,
        };

        //if request was successful
        var successful = false;
        //make request        
        var result = await GlobalEndpoints.makePostRequest(true, "/api/User/Generic/UpdateUserInformation", body)
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
                //send validate email request
                if ((await this.validateEmail())) {
                    //go to next page

                    this.props.navigation.navigate("Validate Email Screen");
                }
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

    //attempt to login with the information in the text fields
    async validateEmail() {

        var successful = false;

        var result = await GlobalEndpoints.makePostRequest(true, "/api/AccountManager/RequestToVerifyEmail", {})
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
                return true;
            }
            else {
                //returned bad response, fetch server generated error message
                //and set 
                Alert.alert(result.data);
            }
        }
        else {
            //invalid request
            if (result == undefined) {
                Alert.alert("There seems to be a network connection issue.\nCheck your internet.");
                return;
            }
            //invalid request
            if (result.response.status == 400 && result.response.data) {
                this.state.error_message = result.response.data;
                this.lazyUpdate();
            }
            //handle not found case
            else if (result.response.status == 404) {
                GlobalEndpoints.handleNotFound(false);
            }
            else {
                this.state.error_message = "There seems to be a network connection issue.\nCheck your internet.";
            }
        }
        return false;
    }

    render() {
        const renderComponent = ({item}) => {
            return (
                <View>
                    <View style={info_styles.body}>
                        <View style={attribute_styles.body}>
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={attribute_styles.text_input} onChangeText={(input)  => {this.updateName(input);}} placeholderTextColor="gray" placeholder="Name" editable={true} maxLength={160}/>
                            </View>
                        </View>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Birth Date
                            </Text>       
                            <View style={attribute_styles.input_text_view}>
                                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                                    <Text style={{color: GlobalValues.ORANGE_COLOR}}>
                                            {this.showDate()} 
                                            {" "}
                                    </Text>
                                </TouchableOpacity>
                            </View>   
                        </View>
                        {this.showDatePicker()}   
                        <View style={[inline_attribute_styles.body, {paddingBottom: 6}]}>
                            <Text style={inline_attribute_styles.title_text}>
                                Gender
                            </Text>
                            <View style={[inline_attribute_styles.drop_down_selector, Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH} : {width: 120, alignSelf: 'flex-end'}]}>
                                <DropDown 
                                        style={Platform.OS == 'ios' ? {minWidth: GlobalValues.IOS_DROPDOWN_WIDTH, flexDirection: 'row'} : {}}
                                        items={[{label: 'Male', value: 'male'}, {label: 'Female', value: 'female', }, {label: "Other", value: "other"}]}
                                        onChangeValue = {this.updateGenderDropDownValue}
                                        />
                            </View>
                        </View>
                        {this.renderErrorMessage()}
                    </View>
                    <View style={section_styles.gap} />
                    <View style={info_styles.body}>
                        
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
                  <TouchableHighlight style={main_styles.button} underlayColor="#FFE1D6" onPress={() => this.register()}>
                      <Text style={main_styles.button_text} underlayColor="#ffb59c">
                          Next
                      </Text>
                  </TouchableHighlight>
            </View>
        );
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
    
    validateName() {
        if (this.state.name == "") {
            this.state.error_message = "First Name field is empty";
            return false;
        }

        return true;
    }

    validateBirthDate() {
        var validDate = new Date(Date.now());
        validDate.setFullYear(validDate.getFullYear() - 18);

        //validate birthdate
        if (this.state.date.getTime() >= validDate.getTime()) {
            this.state.error_message = "You must be at least 18 years old to use this app";
            return false;
        }

        return true;
    }

    validateGender() {
        if (this.state.gender_dropdown_value == "") {
            this.state.error_message = "Gender has not been selected";
            return false;
        }

        return true;
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
            this.state.date = Date.now();
        }

        return (this.state.date.toDateString());
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

    //update the dropdown selector for activities
    updateGenderDropDownValue(value) {
        this.state.gender_dropdown_value = value;
    }

    //update name
    updateName(value) {
        this.state.name = value;
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

      if (this.props["currentValue"] != null) {
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
                            <AntDesign style={{marginRight: 5}} name="down" size={14} color="black"/>
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
                    style={{borderWidth: 0, height: 20}}
                    dropDownContainerStyle={{borderWidth: 0}}
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