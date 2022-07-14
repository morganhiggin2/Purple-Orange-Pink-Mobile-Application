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
            fontFamily: 'Roboto',
            fontSize: 24,
            color: 'gray',
            padding: 5,
            fontFamily: 'Roboto'
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
        fontFamily: "Roboto",
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
            fontFamily: 'Roboto',
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
        fontFamily: 'Roboto'
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
        
        textAlign: 'right',
        backgroundColor: GlobalValues.DARKER_OUTLINE,
        borderRadius: 4,
        fontSize: 16, 
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

export class MakeAnnouncementScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for loading screen
            loading: true,
            reload: false,

            //id for activity
            id: this.props.route.params.id,

            error_message: "",

            announcement: "",
            feedback_input_handler: null,

            updateMade: false,
        }

        this.updateAnnouncement= this.updateAnnouncement.bind(this);
        this.updateUpdateMade = this.updateUpdateMade.bind(this);
        this.validateFields =this.validateFields.bind(this);
        this.makeAnnouncement = this.makeAnnouncement.bind(this);
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
                            <Text style={attribute_styles.title_text}>
                                Announcement
                            </Text>     
                            <View style={attribute_styles.input_text_view}>
                                <TextInput style={attribute_styles.text_input} multiline={true} editable={true} maxLength={160} ref={(input) => {this.state.announcement_input_handler = input}}  numberOfLines={4} scrollEnables={true} defaultValue={this.state.announcement} onChangeText={(value) => {this.updateAnnouncement(value);}} onEndEditing={(value) => {this.updateUpdateMade(false)}}/>
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
                    {this.state.updateMade ? (
                        <TouchableHighlight style={post_button_styles.button} underlayColor={'#ff6e6e'} onPress={() => {this.makeAnnouncement()}}>
                            <Text style={post_button_styles.button_text}>
                                Make Announcement
                            </Text>
                        </TouchableHighlight>
                    ) : (
                        <View/>
                    )}
                </View>
            </View>
        );
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

    updateAnnouncement(value) {
        this.state.announcement = value;
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

    async makeAnnouncement() {

        //add elements
        //make body with requried elements
        var body = {
            activiy_id: this.state.id,
            announcement: this.state.announcement
        };    

        //if request was successful
        var successful = false;

        //make request        
        var result = await GlobalEndpoints.makePostRequest(true, "/api/User/Friends/Messages/FriendActivityMakeAccouncement", body)
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
                this.state.announcement_input_handler.clear();

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

    showError(error) {
        Alert.alert(
            error
        );
    }
}
