import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, SafeAreaView, ScrollView, Dimensions, FlatList, Alert} from 'react-native';
import { TouchableHighlight, TouchableOpacity} from 'react-native-gesture-handler';
import { AntDesign, Feather } from '@expo/vector-icons'; 
import {Route} from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { render } from 'react-dom';
import { assertThisExpression } from '@babel/types';
import { GlobalProperties, GlobalValues } from '../../../global/global_properties';
import * as Notifications from 'expo-notifications';
//import { MessageHandler } from '../../../global/messages_handler.js';

const frame_styles = StyleSheet.create(
    {
        box: {
            width: "100%",
            marginHorizontal: 0,
            flexDirection: 'row',
        },
        main_text: {
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
            backgroundColor: '#DFDFDF', //#FECAB9
            color: 'darkgray',
            padding: 0,
            margin: 0,
            borderWidth: 0,
            fontSize: 20,
            color: 'black',
            width: Math.trunc(Dimensions.get('window').width * 0.85) - 30 - 5 - 14,
            marginLeft: 5,
        },
        top_bar: {
            flexDirection: 'row',
            padding: "3%",
            backgroundColor: 'white',
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
            fontSize: 16,
            marginLeft: 5,
        }, 
        inner_text: {
            color: 'gray',
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
            fontSize: 16,
            marginLeft: 4,
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
       
//have the unread color be the theme color (purple, pink, orange)
function colorCode(item) {
    /*switch(item.type) {
        case "message": {
            if (item.read){
                return '#b8b8b8';
            }
            else {
                return 'orange';
            }

            break;
        }
        case "invitation": {
            if (item.read){
                return '#b8b8b8';
            }
            else {
                return '#ff5050';
            }

            break;
        }
    }*/

    if (item.read) {
        return GlobalValues.ORANGE_COLOR;
    }
    else {
        return GlobalValues.DISTINCT_GRAY;
    }
}

const inner_blip_styles = StyleSheet.create(
    {
        text: {
            color: 'gray',
            fontSize: 14,
            marginLeft: 5,
        }
    }
)

//once the sorting algorithm has ran
var SORTED_DATA = [

];

const DATA = [
    {
        id: "1",
        first_name: "Morgan",
        last_name: "Higginbotham",
        username: "3490834",
        type: "invitation",
        invite_type: "activity",
        invite_to: "Hike at South Mountain",
        read: false,
    },
    {
        id: "2",
        first_name: "Morgan",
        last_name: "Higginbotham",
        username: "3490834",
        type: "message",
        message: "This is the message that will be displayed and this should go over into the next line and what not enjoy.",
        read: false,
    },
    {
        id: "3",
        first_name: "Mellisa",
        last_name: "Warming",
        username: "3490833",
        type: "message",
        message: "This is the message that will be displayed and this should go over into the next line and what not enjoy.",
        read: true,
    },
  ];

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
            }
        };

        this.fetchMessages = this.fetchMessages.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);

        GlobalProperties.reloadMessages = this.fetchMessages;
    }

    componentDidMount() {
        //initiate realm database
        //MessageHandler.start();

        this.props.navigation.addListener('focus', () => {
            this.state.global_props = GlobalProperties.screen_props;
            //we returned from the search screen with getting new activity/target location
            if (GlobalProperties.return_screen == "Manage Activity Screen" && GlobalProperties.screen_props != null) {

                this.state.filters.type = GlobalProperties.screen_props.filters.type;
                this.state.filters.invitation_type = GlobalProperties.screen_props.filters.invitation_type;
                this.state.filters.search_for_id = GlobalProperties.screen_props.filters.id;

                //clear other fields of filter
            }
            else if (GlobalProperties.return_screen == "Manage Group Screen" && GlobalProperties.screen_props != null) {

                this.state.filters.type = GlobalProperties.screen_props.filters.type;
                this.state.filters.invitation_type = GlobalProperties.screen_props.filters.invitation_type;
                this.state.filters.search_for_id = GlobalProperties.screen_props.filters.id;

                //clear other fields of filter
            }
            else if (GlobalProperties.return_screen == "Other Profile Screen" && GlobalProperties.screen_props != null) {

                var found = false;

                //check to see if conversation with that person doesn't already exist
                for (var i in DATA) {
                    //if they exist

                    if (DATA[i].type == "message" && DATA[i].username == this.state.global_props.username) {
                        this.props.navigation.setOptions({headerTitle: () => <HeaderTitle title={"Manage Car Group"}/>});
                        this.props.navigation.navigate("Conversation Screen", {id: i, name: DATA[i].username})
                        //pull up conversation

                        found = true;
                    }
                }

                //if we didn't find a current conversation, create a new one
                if (!found) {
                    DATA.push(
                        {
                            id: (DATA.length + 1),
                            first_name: "Melinda",
                            last_name: "Harp",
                            username: "MelindaHard434",
                            type: "message",
                            message: "Can you explain the rent to me? This does not seem to make any sense in regards to final payment made last month. Also, should I be putting more money into the account in order to make the difference? Thanks..",
                            read: false,
                        });

                        this.props.navigation.navigate("Conversation Screen", {id: i, first_name: DATA[i].first_name, last_name: DATA[i].last_name, username: DATA[i].username});

                        this.lazyUpdate();
                }

                //if it does, pull it up

                //else, create it
                //this.state.filters.type = GlobalProperties.screen_props.filters.type;
                //this.state.filters.invitation_type = GlobalProperties.screen_props.filters.invitation_type;
                //this.state.filters.search_for_id = GlobalProperties.screen_props.filters.id;

                //clear other fields of filter
            }
            else {
                //set local filters to global property ones (these are the ones from the filters screen)
            }

            //reload messages if need be
            if (GlobalProperties.reload_messages) {
                //this.fetchPendingMessages

                GlobalProperties.reload_messages = false;
            }

            GlobalProperties.screenActivated();
        });

        
        //this.fetchPendingMessages

        GlobalProperties.reload_messages = false;
    }

    fetchMessages() {
        console.log("fetching messages");
        //set global property to false first (so if multiple notifications, they dont create many overlapping requests)
        GlobalProperties.reload_messages = false;

        //set badge count to 0
        Notifications.setBadgeCountAsync(0);

        //THEN
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
                                <View style={main_styles.search_bar}>
                                    <Feather name="search" size={30} color="gray" style={{alignSelf: 'center'}}/>
                                    <TextInput style={main_styles.text_input} placeholderTextColor="black"/>
                                </View>
                                <TouchableHighlight style={{marginLeft: 5}} underlayColor="white" onPress={() => {this.props.navigation.navigate("Messages Filters Screen", {id: this.props.id})}}>
                                   <Feather name="list" size={36} color="gray" />
                                </TouchableHighlight>
                            </View>
                            <FlatList
                                data={DATA}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
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
            name: "",
            trashColor: "black",
        };

        this.state.name = this.props.item.first_name + " " + this.props.item.last_name;

        if (this.state.name.length > 20) {
            this.state.name = this.state.name.substring(0, 17) + "...";
        }
        
        this.onTrashButtonPress = this.onTrashButtonPress.bind(this);
        this.onTrashButtonRelease = this.onTrashButtonRelease.bind(this);
    }

    createBody() {
        switch(this.props.item.type) {
            case "message": {
                return(
                    <Text style={blip_styles.inner_text}>
                        {this.props.item.message}
                    </Text>
                );

                break;
            }
            case "invitation": {
                return(
                    <Text style={blip_styles.inner_text}>
                        {"Request invite for "} 
                        <Text style={{color: '#ff5050', fontWeight: 'bold'}}>
                            {this.props.item.invite_to}
                        </Text>
                    </Text>
                );

                break;
            }
        }
    }

    navigate() {
        switch(this.props.item.type) {
            case "message": {
                this.props.navigation.navigate("Conversation Screen", {id: this.props.item.id, first_name: this.props.item.first_name, last_name: this.props.item.last_name, user_name: this.props.item.user_name});

                break;
            }
            case "invitation": {
                this.props.navigation.navigate("Invite Screen", {id: this.props.item.id, first_name: this.props.item.first_name, last_name: this.props.item.last_name, user_name: this.props.item.user_name});

                break;
            }
        }
    }

    render() { 
        return (
        <View style={frame_styles.box}>
            <View style={[blip_styles.body, {borderColor: colorCode(this.props.item)}]}>
                <View style={blip_styles.top_bar}>
                    <View style={[blip_styles.inner_top_bar_left]}>
                        <Image style={{width: 16, height: 16, alignSelf: 'center'}} source={require("../../../images/fakelogo.png")}/>
                        <Text style={blip_styles.top_text}>
                            {this.state.name}
                        </Text>
                    </View>
                    <View style={blip_styles.inner_top_bar_right}>                            
                        <TouchableHighlight style={{marginLeft: 10}} underlayColor="white" onPress={() => {}} onHideUnderlay={() => {this.onTrashButtonRelease()}} onShowUnderlay={() => {this.onTrashButtonPress()}}> 
                            <Feather name="trash-2" size={20} color={this.state.trashColor} />
                        </TouchableHighlight>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => this.navigate()}>
                    {this.createBody()}
                </TouchableOpacity>
            </View>
            
        </View>
        );
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