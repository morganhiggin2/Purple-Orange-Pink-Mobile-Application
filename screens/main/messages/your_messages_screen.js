import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, Dimensions, FlatList, Alert, RefreshControl} from 'react-native';
import { TouchableHighlight, TouchableOpacity} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'; 
import { GlobalProperties, GlobalValues } from '../../../global/global_properties';
import { GlobalEndpoints } from '../../../global/global_endpoints';
import * as Notifications from 'expo-notifications';
const frame_styles = StyleSheet.create(
    {
        box: {
            marginHorizontal: '2%',
            backgroundColor: 'white',
            borderRadius: 5,
            paddingVertical: 8,
            paddingHorizontal: 4,
            marginTop: "2%",
            borderLeftWidth: 5,
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
            width: '100%',
            height: '100%',
        },
        search_bar: {
            paddingHorizontal: 7,
            backgroundColor: '#DFDFDF',
            borderRadius: 5,
            flexDirection: 'row',
            width: Math.trunc(Dimensions.get('window').width * 0.85),
        },
        text_input: {
            backgroundColor: '#DFDFDF',
            color: 'darkgray',
            padding: 0,
            margin: 0,
            borderWidth: 0,
            fontFamily: 'Roboto',
            fontSize: 20,
            color: 'black',
            width: Math.trunc(Dimensions.get('window').width * 0.85) - 30 - 5 - 14,
            marginLeft: 5,
        },
        top_bar: {
            flexDirection: 'row-reverse',
            backgroundColor: 'white',
            borderRadius: 5,
            padding: 8,
            marginTop: "2%",
            marginHorizontal: '2%',
            borderLeftWidth: 0,
        },
        scroll_area: {
            
        }
    }
);

const blip_styles = StyleSheet.create(
    {
        body: {
            backgroundColor: 'white', //#FFCDCD
            borderRadius: 5,
            paddingVertical: 8,
            paddingHorizontal: 4,
            marginTop: "2%",
            marginHorizontal: '1%',
            borderLeftWidth: 5,
            width: '98%',
        },
        title_text: {
            color: 'black',
            fontFamily: 'Roboto',
            fontSize: 16,
            marginLeft: 5,
        }, 
        inner_text: {
            color: 'gray',
            fontFamily: 'Roboto',
            fontSize: 14,
            marginLeft: 5,
        },
        top_bar: {
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
        },
        top_text: {
            color: 'black',
            fontFamily: 'Roboto',
            fontSize: 16,
        },
        inner_top_bar_left: {
            flexDirection: "row",
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            borderRadius: 5,
            paddingHorizontal: 4,
        },
        inner_top_bar_right: {
            flexDirection: "row",
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
        }
    }
);

export class YourMessagesScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

            frameComponents: [],
            selectedDeleteButton: -1,
            refreshFlatList: true,

            //for filtering
            filters: {
                //type of container 
                type: 'all',

                //type of invitation (if container is invite)
                invitation_type: 'all',

                //id to search for if searching for id (null if not searching for id)
                search_for_id: null,
            },

            //remove focus listener
            removeFocusListener: null,

            messageHeaders: [],
        };

        this.fetchMessages = this.fetchMessages.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);

        GlobalProperties.reloadMessages = this.fetchMessages;
    }

    componentDidMount() {
        //initiate realm database
        this.fetchMessages();

        this.state.removeFocusListener = this.props.navigation.addListener('focus', () => {
            this.state.global_props = GlobalProperties.screen_props;

            if (GlobalProperties.return_screen == "Conversation Screen" && GlobalProperties.screen_props != null) {
                GlobalProperties.messagesHandler.readMessage(GlobalProperties.screen_props._id);
            }
            else if (GlobalProperties.return_screen == "Other Explore Profile Screen" && GlobalProperties.screen_props != null) {
                if (GlobalProperties.screen_props.sendMessage) {
                    //get header and navigate to conversation screen
                    GlobalProperties.messagesHandler.getHeaderRow(GlobalProperties.screen_props._id).then((header) => {
                        this.props.navigation.navigate("Conversation Screen", {title: header.title, _id: header._id, last_timestamp: header.last_timestamp, sub_header_id: header.sub_header_id, type_id: header.type_id, type: header.type});
                    });             
                }
            }
            else if (GlobalProperties.return_screen == "Other Activity Profile Screen" && GlobalProperties.screen_props != null) {
                if (GlobalProperties.screen_props.sendMessage) {
                    //get header and navigate to conversation screen
                    GlobalProperties.messagesHandler.getHeaderRow(GlobalProperties.screen_props._id).then((header) => {
                        this.props.navigation.navigate("Conversation Screen", {title: header.title, _id: header._id, last_timestamp: header.last_timestamp, sub_header_id: header.sub_header_id, type_id: header.type_id, type: header.type});
                    });             
                }
            }
            else if (GlobalProperties.return_screen == "Manage Activity Screen" && GlobalProperties.screen_props != null) {
                if (GlobalProperties.screen_props.sendMessage) {
                    //get header and navigate to conversation screen
                    GlobalProperties.messagesHandler.getHeaderRow(GlobalProperties.screen_props._id).then((header) => {
                        this.props.navigation.navigate("Conversation Screen", {title: header.title, _id: header._id, last_timestamp: header.last_timestamp, sub_header_id: header.sub_header_id, type_id: header.type_id, type: header.type});
                    });             
                }
            }

            //reload messages if need be
            if (GlobalProperties.reload_messages) {
                GlobalProperties.reload_messages = false;//put messages in array

                GlobalProperties.messagesHandler.getMessageHeaders().then((ret) => {
                    this.state.messageHeaders = ret;
                    
                    this.lazyUpdate();
                });
            }

            GlobalProperties.screenActivated();
        });

        
        //this.fetchPendingMessages

        GlobalProperties.reload_messages = false;
    }

    componentWillUnmount() {
        this.state.removeFocusListener();
    }

    async fetchMessages() {
        //set global property to false first (so if multiple notifications, they dont create many overlapping requests)
        GlobalProperties.reload_messages = false;

        //set badge count to 0
        Notifications.setBadgeCountAsync(0);

        //get pending messages

        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Friends/Messages/GetPendingMessages?expo_token=" + GlobalProperties.expo_push_token)
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
                console.log(result.request.response);

                //get messages from json
                var messages = JSON.parse(result.request.response).messages;

                //add groups
                this.state.pending_messages = messages;
               
                //open realm
                await GlobalProperties.messagesHandler.openRealm();

                //update messages
                await GlobalProperties.messagesHandler.insertMessages(this.state.pending_messages);
                     
                //put messages in array
                this.state.messageHeaders = await GlobalProperties.messagesHandler.getMessageHeaders();

                //set loading to false
                this.state.loading = false;

                //no need to laxy update as mongodb realm triggers that
                //return;
            }
            else {
                //returned bad response, fetch server generated error message
                //and set 
                this.state.reload = true;

                Alert.alert(result.data);
            }
        }
        else {

            //invalid request
            if (result == undefined) {
                this.state.reload = true;
            }
            else if (result.response.status == 400 && result.response.data) {
                Alert.alert(JSON.stringify(result.response.data));
                return;
            }
            //handle not found case
            else if (result.response.status == 404) {
                GlobalEndpoints.handleNotFound(false);
                this.state.reload = true;
            }
            else {
                this.state.reload = true;
            }
        }

        //once done, lazy update
        this.lazyUpdate();
    }
    
    render() {
            const renderItem = ({ item }) => (
                <FrameComponent item = {item} lazyUpdate = {this.lazyUpdate} navigation = {this.props.navigation}/>
            );

            return (
                <View style={main_styles.page}>
                    { this.state.isLoading ? (
                        <Text>
                            Loading...
                        </Text> ) : (
                            <SafeAreaView style={{flex: 1}}>
                                <View style={main_styles.top_bar}>
                                    <TouchableHighlight style={{marginLeft: 5}} underlayColor="white" onPress={() => {this.props.navigation.navigate("Messages Filters Screen", {id: this.props.id})}}>
                                    <Feather name="list" size={36} color="gray" />
                                    </TouchableHighlight>
                                </View>
                                <FlatList
                                    data={this.state.messageHeaders}
                                    renderItem={renderItem}
                                    keyExtractor={item => (item._id.toString() + item.last_timestamp.getSeconds().toString() + item.read.toString())}
                                    extraData={this.lazyUpdate}
                                    refreshControl={<RefreshControl refreshing={false} 
                                    onRefresh={() => {this.state.loading = true; this.fetchMessages();}}/>}
                                    />
                            </SafeAreaView>
                        ) 
                    }
                </View>
            );
    }

    lazyUpdate() {
        this.forceUpdate();
    }
}

class FrameComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.item.title,
            body: this.props.item.body,
            _id: this.props.item._id,
            sub_header_id:this.props.item.sub_header_id,
            type_id: this.props.item.type_id,
            type: this.props.item.type,
            last_timestamp: this.props.item.last_timestamp,
            lazyUpdate: this.props.lazyUpdate,
            read: this.props.item.read,

            trashColor: "black",
        };
        
        this.colorCode = this.colorCode.bind(this);
        this.onTrashButtonPress = this.onTrashButtonPress.bind(this);
        this.onTrashButtonRelease = this.onTrashButtonRelease.bind(this);
    }

    createBody() {
        switch(this.state.type) {
            case 0: {
                return(
                    <Text numberOfLines={2} style={blip_styles.inner_text}>
                        {this.state.body}
                    </Text>
                );

                break;
            }
            case 1: {
                return(
                    <Text numberOfLines={2} style={blip_styles.inner_text}>
                    {this.state.body}
                    </Text>
                );

                break;
            }
            case 2: {
                return(
                    <Text numberOfLines={2} style={blip_styles.inner_text}>
                    {this.state.body}
                    </Text>
                );

                break;
            }
            case 3: {
                return(
                    <Text numberOfLines={2} style={blip_styles.inner_text}>
                        
                        {this.state.body}
                    </Text>
                );

                break;
            }
        }
    }

    navigate() {
        switch(this.state.type) {
            case 0: {
                this.props.navigation.navigate("Conversation Screen", {title: this.state.title, _id: this.state._id, last_timestamp: this.state.last_timestamp, sub_header_id: this.state.sub_header_id, type_id: this.state.type_id, type: this.state.type});

                break;
            }
            case 1: {
                this.props.navigation.navigate("Conversation Screen", {title: this.state.title, _id: this.state._id, last_timestamp: this.state.last_timestamp, sub_header_id: this.state.sub_header_id, type_id: this.state.type_id, type: this.state.type});

                break;
            }
            case 2: {
                this.props.navigation.navigate("Invitee Screen", {title: this.state.title, _id: this.state._id, sub_header_id: this.state.sub_header_id, type_id: this.state.type_id, type: this.state.type, body: this.state.body});

                break;
            }
            case 3: {
                GlobalProperties.messagesHandler.readMessage(this.state._id);
                GlobalProperties.reload_messages = true;

                this.props.navigation.navigate("Announcement Screen", {title: this.state.title, _id: this.state._id, sub_header_id: this.state.sub_header_id, type_id: this.state.type_id, type: this.state.type, body: this.state.body});

                break;
            }
        }
    }

    render() { 
        return (
        <TouchableOpacity activeOpacity={1} onPress={() => this.navigate()}style={[frame_styles.box, {borderColor: this.colorCode()}]}>
            <View style={blip_styles.top_bar}>
                <View style={[blip_styles.inner_top_bar_left]}>
                    <Text numberOfLines={1} style={blip_styles.top_text}>
                        {this.state.title}
                    </Text>
                </View>
                <View style={blip_styles.inner_top_bar_right}>                            
                    <TouchableHighlight style={{marginLeft: 10}} underlayColor="white" onPress={() => {}} onHideUnderlay={() => {this.onTrashButtonRelease()}} onShowUnderlay={() => {this.onTrashButtonPress()}}> 
                        <Feather name="trash-2" size={20} color={this.state.trashColor} />
                    </TouchableHighlight>
                </View>
            </View>
            <Text numberOfLines={2} style={blip_styles.inner_text}>
                {this.state.body}
            </Text>
        </TouchableOpacity>
        );
    }

    onTrashButtonPress() {
        this.setState({trashColor: "red"});
    }

    onTrashButtonRelease() {
        this.setState({trashColor: "black"});
        deleteAlert(this);
    }

    async deleteDataComponent() {
        await GlobalProperties.messagesHandler.delete(this.state._id);
    }

    afterDeleteAlert() {
        this.deleteDataComponent()
        .then(() => {
            this.state.lazyUpdate();
        });
    }
       
    //have the unread color be the theme color (purple, pink, orange)
    colorCode() {
        if (this.state.read) {
            return GlobalValues.DISTINCT_GRAY;
        }
        else {
            if (this.state.type == 0) {
                return GlobalValues.DIRECT_MESSAGE_COLOR;
            }
            else if (this.state.type == 1) {
                return GlobalValues.CONVERSATION_COLOR;
            }
            else if (this.state.type == 2) {
                return GlobalValues.INVITATION_COLOR;
            }
            else if (this.state.type == 3) {
                return GlobalValues.ANNOUNCEMENT_COLOR;
            }
        }
    }
}  

const deleteAlert = (frameComponent) => {
    Alert.alert(
        "Delete",
        "Are you sure you want to delete this?",
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