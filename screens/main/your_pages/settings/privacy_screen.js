//set shown variable

import React, { useEffect } from 'react';
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

export class PrivacyScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for loading screen
            loading: true,
            reload: false,

            updateMade: false,
        }

        this.fetchPrivacyInformation = this.fetchPrivacyInformation.bind(this);
        this.updateUpdateMade = this.updateUpdateMade.bind(this);
        this.validateFields =this.validateFields.bind(this);
        this.syncUpdates = this.syncUpdates.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {
        //TODO DELTETE 2
        this.state.loading = false;
        this.lazyUpdate();
        //this.fetchPrivacyInformation();
    }

    async fetchPrivacyInformation() {
        if (this.state.reload) {
            this.state.reload = false;

            //reload to now hide reload button
            this.lazyUpdate();
        }

        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "")
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
                var privacy_info = JSON.parse(result.request.response).privacy_information;

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

        //once done, lazy update
        this.lazyUpdate();
    }

    render() {

        const renderComponent = ({item}) => {
            return (
                <View>
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
    }

    /**
                    <View style={info_styles.body}>
                        <View style={attribute_styles.body}>
                            <Text style={attribute_styles.title_text}>
                                Hiding
                            </Text>                       
                        </View>
                        <View style={main_styles.horizontal_bar}/>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                Shown
                            </Text>
                            <Switch
                                trackColor = {{false: GlobalValues.DISTINCT_GRAY, true: GlobalValues.ORANGE_COLOR}}
                                thumbColor = {'white'}
                                ios_backgroundColor = {GlobalValues.DISTINCT_GRAY}
                                onValueChange = {this.updateShown}
                                value = {this.state.shown}
                            />
                        </View>
                    </View> */

    validateFields() {
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
        
        if (!(await this.validateFields(updatedPassword))) {
            Alert.alert(this.state.error_message);
            return;
        }

        //add elements
        //make body with requried elements
        var body = {
            shown: this.state.shown,
        };

        console.log(body);

        //if request was successful
        var successful = false;
        //make request        
        var result = await GlobalEndpoints.makePostRequest(true, "", body)
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
                GlobalProperties.return_screen = "Account Info Screen";

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
