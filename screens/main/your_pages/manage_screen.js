import React, { useState } from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, Image, Alert} from 'react-native';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import {AntDesign, Feather, Ionicons} from '@expo/vector-icons';
import { GlobalProperties, GlobalValues } from '../../../global/global_properties';
import { GlobalEndpoints } from '../../../global/global_endpoints';
import { LoadingScreen } from '../../misc/loading_screen';

const main_styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        flexDirection: 'row-reverse',
    },
    scroll_view: {
        backgroundColor: GlobalValues.DARKER_WHITE,
    }
});


const blip_styles = StyleSheet.create(
    {
        body: {
            backgroundColor: 'white', //#FFCDCD
            borderRadius: 5,
            padding: 8,
            marginTop: "2%",
            marginHorizontal: '2%',
            borderLeftWidth: 5,
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
            //alignItems: 'flex-end'
        },
        top_text: {
            color: 'black',
            fontSize: 16,
            marginLeft: 4,
        },
        inner_top_bar: {
            flexDirection: "row",
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
        }
    }
);


const post_styles = StyleSheet.create(
    {
        body: {
            backgroundColor: 'white', //#FFCDCD
            borderRadius: 5,
            padding: 8,
            marginTop: "2%",
            marginHorizontal: '2%',
            alignItems: "flex-start",
            flexDirection: "row",            
            flexWrap: 'wrap',
            justifyContent: 'space-between',
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
            //alignItems: 'flex-end'
        },
        top_text: {
            color: 'black',
            fontSize: 16,
            marginLeft: 4,
        },
        inner_top_bar: {
            flexDirection: "row",
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
        },
        post_button: {
            flexDirection: "row",
            alignItems: 'flex-start',
            borderRadius: 3,
            borderWidth: 4,
            backgroundColor: '#FE3C3C',
            borderColor: '#FE3C3C',
            padding: 3,
            paddingVertical: 0,
            alignSelf: 'center',
            alignContent: 'center',
            marginTop: "5%",
        },
        post_button_text: {
            color: 'white',
            fontSize: 18,
            alignSelf: 'center',
        }
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

const title_styles = StyleSheet.create(
    {
        inner_text: 
        {
            paddingHorizontal: 3,
            color: 'black', 
            fontWeight: 'bold',
            marginHorizontal: 2,
            alignSelf: 'center',
            flexDirection: 'row',
        },
        icon: {
            marginLeft: 4,
            alignSelf: 'center'
        },
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        }
    }
);

var DATA = [
];

export class ManageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //is loading
            reload: false,
            loading: true,

            trashColor: "black",
        }

        this.createBar = this.createBar.bind(this);
        this.fetchList = this.fetchList.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            //if coming back from activity creation screen, refresh
            if (GlobalProperties.return_screen == "Activity Creation Screen") {
                this.fetchList();
            }
        });

        this.fetchList();
    }

    async fetchList() {
        if (this.state.reload) {
            this.state.reload = false;
        
            //reload to now hide reload button
            this.lazyUpdate();
        }

        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Friends/GetListActivitiesAndGroups")
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
                DATA = JSON.parse(result.request.response).list;

                this.state.loading = false;
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
                Alert.alert(JSON.parse(result.response.data));
                return;
            }
            //handle not found case
            else if (result.response.status == 404) {
                this.state.reload = true;
                GlobalEndpoints.handleNotFound(false);
            }
            else {
                this.state.reload = true;
                return;
            }
        }

        //once done, lazy update
        this.lazyUpdate();
    }

    render() {
        if (this.state.loading == true) {
            return (
                <LoadingScreen tryAgain={this.fetchList} reload={this.state.reload}/>
            );
        }
        else {
            const renderItem = ({ item }) => (
                <FrameComponent item = {item} lazyUpdate = {this.lazyUpdate} navigation = {this.props.navigation}/>
            );

            return(
                <SafeAreaView style={[main_styles.scroll_view, {flex: 1}]}>
                    {this.createBar()}
                    <FlatList 
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            );
        }
    }

    createBar() {
        return (
            <View style={post_styles.body}>
                <TouchableHighlight underlayColor="white" onPress={() => {this.props.navigation.navigate("Activity Creation Screen")}} onHideUnderlay={() => {}} onShowUnderlay={() => {}}>
                    <View style={post_styles.post_button}>
                        <Text style={post_styles.post_button_text}>
                            Create
                        </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={{marginLeft: 10}} underlayColor="white" onPress={() => {this.props.navigation.navigate("Your Feed Filters Screen")}} onHideUnderlay={() => {}} onShowUnderlay={() => {}}>
                    <Feather name="list" size={38} color="gray" />
                </TouchableHighlight>
            </View>
        );
    }

    lazyUpdate() {
        this.forceUpdate();
    }
}

//<Ionicons name="person" size={16} style={title_styles.icon} color={filledIconColor(this.props.item)}/>

class FrameComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trashColor: "black",
        };
        
        this.onTrashButtonPress = this.onTrashButtonPress.bind(this);
        this.onTrashButtonRelease = this.onTrashButtonRelease.bind(this);
        this.afterDeleteAlert = this.afterDeleteAlert.bind(this);
    }

    createBody() {
        
    }

    render() { 
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => {this.props.navigation.navigate(navigationLink(this.props.item), {id: this.props.item.id, name: this.props.item.title})}} >
                <View style={[blip_styles.body, {borderColor: colorCode(this.props.item)}]}>
                    <View style={blip_styles.top_bar}>
                        <View style={title_styles.inner_text}>
                            <Text style={{color: 'black', fontSize: 16}}>
                                {this.props.item.title}
                            </Text>
                        </View>
                        <View style={blip_styles.inner_top_bar}>
                            <TouchableHighlight style={{marginLeft: 10}} underlayColor="white" onPress={() => {}} onHideUnderlay={() => {this.onTrashButtonRelease()}} onShowUnderlay={() => {this.onTrashButtonPress()}}> 
                                <Feather name="trash-2" size={20} color={this.state.trashColor} />
                            </TouchableHighlight>
                        </View>
                    </View>
                        {dataType(this.props.item)}
                    </View>
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

    deleteDataComponent(id) {
        for (let [i, data] of DATA.entries()) {
            if (data.id == id) {
                DATA.splice(i, 1);
            }
        }
    }

    async afterDeleteAlert() {
        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Friends/RemoveFromCreatedActivity?id=" + this.props.item.id)
            .then((result) => {
                successful = true;
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

                //delete data component from list
                this.deleteDataComponent(this.props.item.id);

                this.props.lazyUpdate();
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
            if (result.response.status == 400 && result.response.data) {
                Alert.alert(JSON.parse(result.response.data));
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
}  

//get the correct navigation link
function navigationLink(item) {
    switch(item.type) {
        case "activity": 
            return("Manage Activity Screen");
        case "group":
            return("Manage Group Screen");
    }
}

//get the color code
function colorCode(item) {
    switch(item.type) {
        case "activity":
            return(GlobalValues.ACTIVITY_COLOR);
        case "group":
            return(GlobalValues.GROUP_COLOR);
    }
}

//get the body
function dataType(item) {
    switch(item.type) {
        case "activity":
            //number of people wanting to go, number of slots open, number of slots total, time and day, etc
            return(
                <Text style={blip_styles.inner_text}>
                    {item.date_time + "\n"}
                    {limitDescription(item.description)}
                </Text>
            );
        case "group":
            return(
                <Text style={blip_styles.inner_text}>
                    {limitDescription(item.description)}
                </Text>
            );
    }
}

function limitDescription(desc) {
    if (desc.length > 120) {
        return (desc.substring(0, 117) + "...");
    }
    else {
        return desc;
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

//make sure there is a cap on how long the name can be or it will push everything off the edge