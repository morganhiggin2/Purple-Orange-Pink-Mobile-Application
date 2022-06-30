import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, SafeAreaView, ScrollView, Dimensions, FlatList, Alert} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { AntDesign, Feather} from '@expo/vector-icons'; 
import {Route} from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { render } from 'react-dom';
import { GlobalProperties, GlobalValues } from '../../../global/global_properties';

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
            width: "90%",
            //width: Math.trunc(Dimensions.get('window').width * 0.85),
        },
        text_input: {
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
            sub_header_id: this.props.route.params.sub_header_id,
            type_id: this.props.route.params.type_id,
            type: this.props.route.params.type,

            messages: [],
            messages_count: 20,

            //name: "",
            //first_name: this.props.route.params.first_name,
            //last_name: this.props.route.params.last_name,
        };

        /*this.state.name = this.state.first_name + " " + this.state.last_name;

        if (this.state.name.length > 20) {
            this.state.name = this.state.name.substring(0, 17) + "...";
        }*/

        this.fetchMessages = this.fetchMessages.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);

        this.props.navigation.setOptions({headerTitle: () => <HeaderTitle title={this.state.name}/>});
    }
    
    componentDidMount() {
        //fetch messages
        this.fetchMessages();
        
        //set header
        //this.props.navigation.setOptions({headerTitle: () => <HeaderTitle title={"Mellisa"}/>});
    }

    async fetchMessages() {
        //get message sub header
        var subHeader = null;

        if (this.state.type == 0) {
            subHeader = await GlobalProperties.messagesHandler.getDirectMessageInformation(this.state.sub_header_id);
        }
        else if (this.state.type == 1) {
            subHeader = await GlobalProperties.messagesHandler.getConversationInformation(this.state.sub_header_id);
        }

        this.state.messages = subHeader.message_records;

        this.lazyUpdate();
    }

    render() {
        const renderItem = ({ item }) => (
            <FrameComponent item = {item} lazyUpdate = {this.lazyUpdate}/>
        );

        return (
            <View style={main_styles.page}>
                { this.state.isLoading ? (
                    <Text>
                        Loading...
                    </Text> ) : (
                        <SafeAreaView style={{width: "100%", height: "100%"}}>
                            <FlatList
                                data={this.state.messages.splice(0, this.state.messages_count)}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                style={{width: "100%", height: "100%"}}
                                inverted={true}
                                onEndReached={() => {}}
                                />
                            <View style={main_styles.top_bar}>
                                <View style={main_styles.search_bar}>
                                    <TextInput style={main_styles.text_input} placeholderTextColor="black"/>
                                </View>
                                <View style={{flexWrap: "wrap", flexDirection: "row",}}>
                                    <TouchableHighlight style={{marginLeft: 5}} underlayColor="white" onPress={() => {this.props.navigation.navigate("Messages Filters Screen", {id: this.props.id})}}>
                                    <Feather name="image" size={36} color="black" />
                                    </TouchableHighlight>
                                    <TouchableHighlight style={{marginLeft: 5}} underlayColor="white" onPress={() => {this.props.navigation.navigate("Messages Filters Screen", {id: this.props.id})}}>
                                    <Feather name="image" size={36} color="black" />
                                    </TouchableHighlight>
                                </View>
                            </View>
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
        };

        //parsed name is name that is first with initial, do that conversion here (use space in name as substring etc...)

        this.onTrashButtonPress = this.onTrashButtonPress.bind(this);
        this.onTrashButtonRelease = this.onTrashButtonRelease.bind(this);
    }

    render() { 
        console.log(this.props.item);
        var renderName = {};

        if (this.props.item.show_name) {
            renderName = (
                <View style={[blip_styles.top_bar, {alignSelf: getHorizontalPositionStyle(this.props.item.me)}, getMargin(this.props.item.me)]}>
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
        <View style={[frame_styles.box, {alignSelf: getHorizontalPositionStyle(this.props.item.me)}]}>
            {renderName}
            <View style={[blip_styles.body, getBorderDirection(this.props.item.me), {borderColor: colorCode(this.props.item.me)}]}>
                <TouchableHighlight>
                    <Text style={blip_styles.inner_text}>
                        {this.state.message}
                    </Text>
                </TouchableHighlight>
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

//store messages by continuously updating json in securestorage key pair which represents the messages