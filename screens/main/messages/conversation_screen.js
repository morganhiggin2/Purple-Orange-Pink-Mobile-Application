import React from 'react';
import {StyleSheet, View, Text, TextInput, SafeAreaView, Dimensions, FlatList, Alert, RefreshControl, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Feather} from '@expo/vector-icons'; 
import { GlobalProperties, GlobalValues } from '../../../global/global_properties';
import { GlobalEndpoints } from '../../../global/global_endpoints.js';

const frame_styles = StyleSheet.create(
    {
        box: {

        },
        main_text: {
            fontFamily: 'Roboto',
            fontSize: 14,
            marginLeft: 2,
            marginBottom: 2,
            color: 'white',
        },
    }
);

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: GlobalValues.DARKER_WHITE,
            height: '100%',
            display: 'flex'
        },
        search_bar: {
            backgroundColor: GlobalValues.SEARCH_TEXT_INPUT_COLOR,
            borderColor: GlobalValues.SEARCH_TEXT_INPUT_COLOR,
            borderRadius: 4,
            paddingHorizontal: 10,
            flexDirection: 'row',
            width: Math.trunc(Dimensions.get('window').width - 52)
        },
        text_input: {
            color: 'darkgray',
            fontFamily: 'Roboto',
            fontSize: 16,
            width: '100%'
        },
        top_bar: {
            flexDirection: 'row',
            padding: "3%",
            backgroundColor: 'white',
        },
        send_button: {
            marginLeft: 4,
            alignSelf: 'center'
        },
        scroll_area: {
            
        }
    }
);

const blip_styles = StyleSheet.create(
    {
        body: {
            backgroundColor: 'white', //#FFCDCD
            padding: 8,
            marginBottom: "2%",
            marginHorizontal: '2%',
            maxWidth: "70%",
            borderRadius: 5,
        },
        title_text: {
            color: 'gray',
            fontFamily: 'Roboto',
            fontSize: 14,
            marginLeft: 5,
        }, 
        inner_text: {
            color: 'black',
            fontFamily: 'Roboto',
            fontSize: 16,
        },
        top_bar: {
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            maxWidth: '100%',
        },
        top_text: {
            color: 'gray',
            fontFamily: 'Roboto',
            fontSize: 16,
        },
        inner_top_bar: {
            flexDirection: "row",
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            borderRadius: 3,
        },
    }
);

const HeaderTitle = (props) => {
    if (props.state.type == 0) {
        return(
            <TouchableOpacity activeOpacity={1.0} onPress={() => {this.viewOtherProfile(props.state.other_user_id);}} >
                <Text style={{fontSize: 24, color: 'black', textAlign: 'center'}} numberOfLines={1}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        );
    }
    else if (props.state.type == 1) {
        return (
            <Text style={{fontSize: 24, color: 'black'}} numberOfLines={1}>
                {props.title}
            </Text>
            );
    }
    else {
        return (
            <Text style={{fontSize: 24, color: 'black'}} numberOfLines={1}>
                {props.title}
            </Text>
        );
    }
}

export class ConversationScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            frameComponents: [],
            selectedDeleteButton: -1,
            refreshFlatList: true,

            title: this.props.route.params.title,
            _id: this.props.route.params._id,
            sub_header_id: this.props.route.params.sub_header_id,
            subHeader: null,
            type_id: this.props.route.params.type_id,
            type: this.props.route.params.type,
            last_timestamp: this.props.route.params.last_timestamp,

            messages: [],
            messages_count: GlobalValues.MESSAGES_PAGE_AMOUNT,

            messages_input_handler: null,
            message: "",
            showSendButton: false,
            is_sending: false,

            keyboardShowListener: null,
            keyboardHideListener: null,
            keyboardPadding: 0,
        };

        this.props.navigation.setOptions({headerTitle: () => <HeaderTitle state={this.state} title={this.limitTitle(this.state.title)}/>});

        this.viewOtherProfile = this.viewOtherProfile.bind(this);
        this.limitTitle = this.limitTitle.bind(this);
        this.fetchMessages = this.fetchMessages.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.keyboardShowed = this.keyboardShowed.bind(this);
        this.keyboardHide = this.keyboardHide.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    limitTitle(title) {
        if (title.length > 33) {
            return title.substring(0, 30) + "...";
        }
        else {
            return title;
        }
    }

    viewOtherProfile() {
        this.props.navigation.navigate("Other Explore Profile Screen", {id: this.state.type_id});
    }
    
    componentDidMount() {
        GlobalProperties.return_screen = "Conversation Screen";
        GlobalProperties.screen_props = {
            sent_message: false,
            _id: this.state._id,
        };

        this.state.keyboardShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardShowed);
        this.state.keyboardHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardHide);

        //fetch messages
        this.fetchMessages();
    }

    componentWillUnmount() {
        this.state.messages.removeAllListeners();
        this.state.keyboardShowListener.remove();
        this.state.keyboardHideListener.remove();
    }

    keyboardShowed(event) {
        if (Platform.OS == 'ios') {
            this.setState({keyboardPadding: event.endCoordinates.height - 33});
        }
    }

    keyboardHide() {
        this.setState({keyboardPadding: 0});
    }

    async fetchMessages() {
        //get message sub header

        if (this.state.type == 0) {
            this.state.subHeader = await GlobalProperties.messagesHandler.getDirectMessageInformation(this.state.sub_header_id);
        }
        else if (this.state.type == 1) {
            this.state.subHeader = await GlobalProperties.messagesHandler.getConversationInformation(this.state.sub_header_id);
        }

        this.state.messages = this.state.subHeader.message_records;

        this.state.messages.addListener(() => {
            GlobalProperties.reload_messages = true;
            
            this.lazyUpdate();
        })

        this.lazyUpdate();
    }

    render() {
        const renderItem = ({ item }) => (
            <FrameComponent item = {item} lazyUpdate = {this.lazyUpdate} type = {this.state.type}/>
        );

        var sendButton;

        if (this.state.showSendButton) {
            sendButton = (
                <Feather name="send" style={main_styles.send_button} size={24} color="black" />
            );
        }
        else {
            sendButton = (
                <View/>
            );
        }

        return (
            <View style={main_styles.page}>
                { this.state.isLoading ? (
                    <Text>
                        Loading...
                    </Text> ) : (
                        <SafeAreaView style={{flex: 1}}>
                            <FlatList
                                data={this.state.messages.slice(0, this.state.messages_count)}
                                renderItem={renderItem}
                                keyExtractor={item => (item.id.toString() + this.state.last_timestamp.getSeconds().toString())}
                                style={{}}
                                inverted={true}
                                onEndReached={() => {this.state.messages_count += GlobalValues.MESSAGES_PAGE_AMOUNT; this.lazyUpdate();}}
                                refreshControl={<RefreshControl refreshing={false} 
                                onRefresh={() => {this.lazyUpdate();}}/>}
                            /> 
                            <View style={[main_styles.top_bar, {marginBottom: this.state.keyboardPadding}]}>
                                <View style={main_styles.search_bar}>
                                    <TextInput style={main_styles.text_input} ref={(input) => {this.state.messages_input_handler = input}}  onChangeText={(text) => {this.onChangeMessage(text);}} placeholderTextColor="black" maxHeight={38} multiline={true}/>
                                </View>
                                <TouchableOpacity style={main_styles.send_button} onPress={() => {this.sendMessage();}}>
                                    <Feather name="send" size={28} color={this.state.showSendButton ? GlobalValues.ORANGE_COLOR : GlobalValues.DARKER_OUTLINE}/>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    ) 
                }
            </View>
        );
    }

    onChangeMessage(value) {
        this.state.message = value;

        if (!this.state.showSendButton & this.state.message.length > 0) {
            this.state.showSendButton = true;
            this.lazyUpdate();
        }
        else if (this.state.showSendButton & this.state.message.length == 0){
            this.state.showSendButton = false;
            this.lazyUpdate();
        }
    } 

    async sendMessage() {
        
        if (!this.state.is_sending) {
            //is sending message
            this.state.is_sending = true;

            GlobalProperties.screen_props.sent_message = true;

            var url = "";
            var body = "";

            if (this.state.type == 0) {
                //send direct message
                url = "/api/User/Friends/Messages/SendDirectMessage";
                body = {
                    other_id: this.state.subHeader.other_user_id,
                    body: this.state.message,
                    expo_token: GlobalProperties.expo_push_token
                };
            }
            else if (this.state.type == 1) {
                //send conversation message

                url = "/api/User/Friends/Messages/SendConversationMessage";
                body = {
                    conversation_id: this.state.subHeader.conversation_id,
                    body: this.state.message,
                    expo_token: GlobalProperties.expo_push_token
                };
            }

            //get pending messages

            //if request was successful
            var successful = false;

            //make request
            var result = await GlobalEndpoints.makePostRequest(true, url, body)
                .then((result) => {
                    if (result == undefined) {
                        successful = false;
                    }
                    else {
                        successful = true;
                    }

                    //is sending message
                    this.state.is_sending = false;

                    return(result);
                })
                .catch((error) => {
                    successful = false;

                    //is sending message
                    this.state.is_sending = false;

                    return(error);
                });

            //if there is no error message, request was good
            if (successful) {

                //if result status is ok
                if (result.request.status ==  200) {
                    
                    //clear messages field
                    this.state.messages_input_handler.clear();

                    this.state.showSendButton = false;

                    //get timestamp
                    var timestamp = JSON.parse(result.request.response).timestamp;

                    if (this.state.type == 0) {
                        //add message to local storage
                        GlobalProperties.messagesHandler.insertMessages([
                            {
                                type: "direct",
                                timestamp: timestamp,
                                body: this.state.message,
                                user_id: GlobalProperties.user_id,
                                other_user_id: this.state.subHeader.other_user_id,
                                user_name: "Me",
                                is_you: true,
                            }
                        ]);
                    }
                    else if (this.state.type == 1) {
                        //add message to local storage
                        GlobalProperties.messagesHandler.insertMessages([
                            {
                                type: "conversation",
                                timestamp: timestamp,
                                body: this.state.message,
                                user_id: GlobalProperties.user_id,
                                conversation_id: this.state.subHeader.conversation_id,
                                user_name: "Me",
                                is_you: true,
                            }
                        ]);
                    }

                    GlobalProperties.reload_messages = true;
                }
                else {
                    //returned bad response, fetch server generated error message
                    Alert.alert(result.data);
                }
            }
            else {

                //invalid request
                if (result == undefined) {

                }
                else if (result.response.status == 400 && result.response.data) {
                    Alert.alert(JSON.stringify(result.response.data));

                    //is sending message
                    this.state.is_sending = false;

                    return;
                }
                //handle not found case
                else if (result.response.status == 404) {
                    GlobalEndpoints.handleNotFound(false);
                }
            }

            //is sending message
            this.state.is_sending = false;

            //once done, lazy update
            this.lazyUpdate();
        }
    }
    
    lazyUpdate() {
        this.forceUpdate();
    }
}

function getMargin (isMe) {
    if (isMe) {
        return({marginRight: "2%"});
    }
    else {
        return({marginLeft: "2%"});
    }
}

function getHorizontalPositionStyle (isMe) {
    if (isMe) {
        return("flex-end");
    }
    else {
        return("flex-start");
    }
}

function getBorderDirection(isMe) {
    if (isMe) {
        return({borderRightWidth: 3});
    }
    else {
        return({borderLeftWidth: 3});
    }
}

class FrameComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parsed_name: this.props.item.user_name,
            message: this.props.item.message,
            show_name: this.props.item.show_name,
            is_you: this.props.item.from_id == GlobalProperties.user_id,
            type: this.props.type,
        };

        this.borderColor = this.borderColor.bind(this);
        this.onTrashButtonPress = this.onTrashButtonPress.bind(this);
        this.onTrashButtonRelease = this.onTrashButtonRelease.bind(this);
    }

    render() { 
        var renderName = {};

        if (this.state.show_name) {
            renderName = (
                <View style={[blip_styles.top_bar, {alignSelf: getHorizontalPositionStyle(this.state.is_you)}, getMargin(this.state.is_you)]}>
                    <Text style={[blip_styles.top_text]}>
                        {this.state.parsed_name}
                    </Text>
                </View>
            );
        }
        else {
            renderName = (
                <View>

                </View>
            );
        }

        return (
        <View style={[frame_styles.box, {alignSelf: getHorizontalPositionStyle(this.state.is_you)}]}>
            {renderName}
            <View style={[blip_styles.body, getBorderDirection(this.state.is_you), {borderColor: this.borderColor()}]}>
                <TouchableHighlight>
                    <Text style={blip_styles.inner_text}>
                        {this.state.message}
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
        );
    }

    borderColor() {
        if (this.state.is_you) {
            return GlobalValues.DISTINCT_GRAY;
        }
        else {
            if (this.state.type == 0) {
                return GlobalValues.DIRECT_MESSAGE_COLOR;
            }
            else if (this.state.type == 1) {
                return GlobalValues.CONVERSATION_COLOR;
            }
        }
    }

    onTrashButtonPress() {
        this.setState({trashColor: "red"});
    }

    onTrashButtonRelease() {
        this.setState({trashColor: "black"});
        deleteAlert(this);
    }

    afterDeleteAlert() {
        this.deleteDataComponent(this.props.item.id);
        this.props.lazyUpdate();
    }
}  

const deleteAlert = (frameComponent) => {
    Alert.alert(
        "Delete",
        "Are you sure you want to delete this conversation?",
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "Delete",
                onPress: () => frameComponent.afterDeleteAlert(),
            }
        ],
        {
            cancelable: true,
        }
    );
}