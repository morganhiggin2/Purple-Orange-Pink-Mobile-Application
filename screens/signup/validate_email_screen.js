import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert, FlatList, Switch} from 'react-native';
import {TouchableOpacity, TouchableHighlight} from 'react-native-gesture-handler';
import {} from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { GlobalProperties, GlobalValues } from '../../global/global_properties';
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
            backgroundColor: '#F3604D',
            borderColor: '#F3604D',
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
        paddingVertical: "2%",
        paddingHorizontal: "3%",
        marginVertical: 8,
        padding: 10,
        paddingVertical: 10,
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
    },
    drop_down_selector_gap: {
        height: 100,
    },
    date_picker: {
        width: 200,
    }
});

export class ValidateEmailScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keycode: "",
        }

        this.renderErrorMessage = this.renderErrorMessage.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateKeyCode = this.validateKeyCode.bind(this);
        this.updateKeyCode = this.updateKeyCode.bind(this);
    }

    
    //attempt to login with the information in the text fields
    async validateEmail() {
        //validate username and password before
        if (!this.validateKeyCode()) {
            this.lazyUpdate();
            return;
        }

        //set error message
        this.state.error_message = "";

        var successful = false;

        var result = await GlobalEndpoints.makeGetRequest(true, "/api/AccountManager/VerifyEmail?keycode=" + this.state.keycode)
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
                //send validate email request
                //go to next page
                GlobalProperties.app_connect();

                //go to main page.
                
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

        this.state.preventDoubleValidateKeyCode = 0;

        this.lazyUpdate();
    }

    render() {
        const renderComponent = ({item}) => {
            return (
                <View>
                    <View style={info_styles.body}>
                        <View style={inline_attribute_styles.body}>
                            <Text style={inline_attribute_styles.title_text}>
                                To validate your email address, enter the key code from the validation email we just sent.
                            </Text>     
                        </View>
                        <View style={[attribute_styles.body, {marginTop: "40%"}]}>
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={[attribute_styles.text_input, {fontSize: 32}]} textAlign={"center"} maxLength={6} keyboardType={"number-pad"} onChangeText={(input)  => {this.updateKeyCode(input);}} placeholderTextColor="gray" placeholder="Key Code" editable={true}/>
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
                  <TouchableHighlight style={main_styles.button} underlayColor="#FFE1D6" onPress={() => {this.validateEmail();}}>
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

    validateKeyCode() {
        if (this.state.keycode.length != 6) {
            this.state.error_message = "Key code is not 6 digits";
            return false;
        }

        return true;
    }

    //update the screen
    lazyUpdate() {
        this.forceUpdate();
    }
    //update the dropdown selector for activities
    updateKeyCode(value) {
        this.state.keycode = value;
    }
}