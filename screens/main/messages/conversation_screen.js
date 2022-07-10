import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, SafeAreaView, ScrollView, Dimensions, FlatList, Alert, RefreshControl, TouchableOpacity, TouchableOpacityBase} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { AntDesign, Feather} from '@expo/vector-icons'; 
import {Route} from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { render } from 'react-dom';
import { GlobalProperties, GlobalValues } from '../../../global/global_properties';
import { GlobalEndpoints } from '../../../global/global_endpoints.js';

const frame_styles = StyleSheet.create(
    {
        box: {
            //backgroundColor: 'blue',
            //width: "90%",
            //marginHorizontal: 0,
            //flexDirection: 'row',
        },
        main_text: {
            fontSize: 14,
            marginLeft: 2,
            marginBottom: 2,
            color: 'white',
        },
    }
);

/*

            backgroundColor: '#DFDFDF', //#FECAB9
            color: 'darkgray',
            padding: 0,
            margin: 0,
            borderWidth: 0,
            fontSize: 20,
            color: 'black',
            width: "90%",
            //width: Math.trunc(Dimensions.get('window').width * 0.85) - 30 - 5 - 14,
            marginLeft: 5,
            maxHeight: 40,*/

/*
text_input: {
            backgroundColor: '#DFDFDF', //#FECAB9
            color: 'darkgray',
            padding: 0,
            margin: 0,
            borderWidth: 0,
            fontSize: 20,
            color: 'black',//Math.trunc(Dimensions.get('window').width * 0.85) - 30 - 5 - 14,
            maxHeight: 40,
        },
        search_bar: {
            paddingHorizontal: 7,
            backgroundColor: '#DFDFDF',
            borderRadius: 5,
            flexDirection: 'row',
            marginHorizontal: 4,
            width: '100%',
        },
        top_bar: {
            flexDirection: 'row',
            padding: "3%",
            backgroundColor: 'white',
        },
*/

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: GlobalValues.DARKER_WHITE,
            width: '100%',
            height: '100%',
        },
        search_bar: {
            paddingHorizontal: 7,
            backgroundColor: '#DFDFDF',
            borderRadius: 10,
            //width: '50%',
            //alignContent: 'center',
            flexDirection: 'row',
            //width: Math.trunc(Dimensions.get('window').width * 0.85),
        },
        text_input: {
            color: 'darkgray',
            fontSize: 16,
        },
        search_bar: {
            borderRadius: 4,
            borderColor: '#EAEAEA',
            backgroundColor: '#EAEAEA',
            borderWidth: 3,
            width: Math.trunc(Dimensions.get('window').width - 52)
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
            fontSize: 14,
            marginLeft: 5,
        }, 
        inner_text: {
            color: 'black',
            fontSize: 16,
        },
        top_bar: {
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            maxWidth: '100%',
            //flexWrap: 'wrap',
            //alignItems: 'flex-end'
        },
        top_text: {
            color: 'gray',
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
                            
const inner_blip_styles = StyleSheet.create(
    {
        text: {
            color: 'gray',
            fontSize: 14,
            marginLeft: 5,
        }
    }
)

const DATA = [
    {
        id: "1",
        first_name: "Melissa",
        last_name: "Warming",
        message: "Hew, what's up. I inow you have been busy but just wanted to say high.",
        show_name: true,
        me: false,
    },
    {
        id: "2",
        first_name: "Morgan",
        last_name: "Higginbotham",
        message: "Not much, how about you??????",
        show_name: true,
        me: true,
    },
    {
        id: "3",
        first_name: "Melissa",
        last_name: "Warming",
        message: "Just chillin.",
        show_name: true,
        me: false,
    },
    {
        id: "4",
        first_name: "Morgan",
        last_name: "Higginbotham",
        message: "Just gonna go see whats up",
        show_name: true,
        me: true,
    },
    {
        id: "5",
        first_name: "Morgan",
        last_name: "Higginbotham",
        message: "the place is called mario's pizza, by the way, it is really really good",
        show_name: false,
        me: true,
    },
    {
        id: "6",
        first_name: "Melissa",
        last_name: "Warming",
        message: "Oh really?",
        show_name: true,
        me: false,
    },
    {
        id: "7",
        first_name: "Melissa",
        last_name: "Warming",
        message: "sweet",
        show_name: false,
        me: false,
    },
    {
        id: "8",
        first_name: "Morgan",
        last_name: "Higginbotham",
        message: "oh yea, yea/nrealy cool",
        show_name: true,
        me: true,
    },
    {
        id: "9",
        first_name: "Melissa",
        last_name: "Warming",
        message: "well",
        show_name: true,
        me: false,
    },
    {
        id: "10",
        first_name: "Melissa",
        last_name: "Warming",
        message: "if you want",
        show_name: false,
        me: false,
    },
    {
        id: "11",
        first_name: "Melissa",
        last_name: "Warming",
        message: "we can, ya know, haha",
        show_name: false,
        me: false,
    },
  ];

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

            //name: "",
            //first_name: this.props.route.params.first_name,
            //last_name: this.props.route.params.last_name,
        };

        /*this.state.name = this.state.first_name + " " + this.state.last_name;

        if (this.state.name.length > 20) {
            this.state.name = this.state.name.substring(0, 17) + "...";
        }*/        
        
        this.props.navigation.setOptions({headerTitle: () => <HeaderTitle title={this.state.title}/>});

        this.fetchMessages = this.fetchMessages.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }
    
    componentDidMount() {
        GlobalProperties.return_screen = "Conversation Screen";
        GlobalProperties.screen_props = {
            sent_message: false,
            _id: this.state._id,
        };

        //fetch messages
        this.fetchMessages();
        
        //set header
        //this.props.navigation.setOptions({headerTitle: () => <HeaderTitle title={"Mellisa"}/>});
    }

    componentWillUnmount() {
        this.state.messages.removeAllListeners();
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

        var sendButton = null;

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
                        <SafeAreaView style={{width: "100%", height: "100%"}}>
                            <FlatList
                                data={this.state.messages.slice(0, this.state.messages_count)}
                                renderItem={renderItem}
                                keyExtractor={item => (item.id.toString() + this.state.last_timestamp.getSeconds().toString())}
                                style={{width: "100%", height: "100%"}}
                                inverted={true}
                                onEndReached={() => {this.state.messages_count += GlobalValues.MESSAGES_PAGE_AMOUNT; this.lazyUpdate();}}
                                refreshControl={<RefreshControl refreshing={false} 
                                onRefresh={() => {this.lazyUpdate();}}/>}
                                />
                            <View style={main_styles.top_bar}>
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

        //set global property to false first (so if multiple notifications, they dont create many overlapping requests)
        //GlobalProperties.reload_messages = false;

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

                //no need to laxy update as mongodb realm triggers that
                //return;
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
                return;
            }
            //handle not found case
            else if (result.response.status == 404) {
                GlobalEndpoints.handleNotFound(false);
            }
        }

        //once done, lazy update
        this.lazyUpdate();
    }
    
    lazyUpdate() {
        this.forceUpdate();
    }
}

/*
                                <View style={{flexWrap: "wrap", flexDirection: "row",}}>
                                    <TouchableHighlight style={{marginLeft: 5}} underlayColor="white" onPress={() => {this.props.navigation.navigate("Messages Filters Screen", {id: this.props.id})}}>
                                    <Feather name="image" size={36} color="black" />
                                    </TouchableHighlight>
                                    <TouchableHighlight style={{marginLeft: 5}} underlayColor="white" onPress={() => {this.props.navigation.navigate("Messages Filters Screen", {id: this.props.id})}}>
                                    <Feather name="image" size={36} color="black" />
                                    </TouchableHighlight>
                                </View> */

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

function colorCode(isMe) {
    if (isMe) {
        return("orange");
    }
    else {
        return("blue");
    }
}

const HeaderTitle = (props) => {
    return(
        <Text style={{fontSize: 24, color: 'black'}}>
            {props.title}
        </Text>
    );
}

//getHorizontalPositionStyle(this.props.item.me)

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

        //parsed name is name that is first with initial, do that conversion here (use space in name as substring etc...)

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

    deleteDataComponent(id) {
        for (let [i, data] of DATA.entries()) {
            if (data.id == id) {
                DATA.splice(i, 1);
            }
        }
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
//<Feather name="search" size={30} color="gray" style={{alignSelf: 'center'}}/>
//<View style={{ borderBottomColor: '#CCCCCC', borderBottomWidth: 2, width: '97%', alignSelf: 'center'}}/> 
//#FFC2B5 was border color for underline

//fix it not going into the slot

/*
<ScrollView contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", flexGrow: 1}}>  
                                {frames.map((component) => (component))}
                            </ScrollView>
*/

//use flatlist to not reder all components at once? or just keep adding to it when reaching bottom, though this can create performance issues. {frames.map((component) => (component))}



//find the real height of UseBottomTabBarHeight or set the height yourself

//store messages by continuously updating json in securestorage key pair which represents the messages