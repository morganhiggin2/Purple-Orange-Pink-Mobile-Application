import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList, Alert} from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler';
import { GlobalValues } from '../../../global/global_properties';
import { GlobalEndpoints } from '../../../global/global_endpoints';
import { LoadingScreen } from '../../misc/loading_screen';

const main_styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        flexDirection: 'row-reverse',
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
            marginLeft: 4,
        },
        inner_top_bar: {
            flexDirection: "row",
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
        }
    }
);

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

export class InviteToScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //is loading
            loading: true,

            //id of person
            id: this.props.route.params.id,

            trashColor: "black",

            data: []
        }

        this.getParticipantId = this.getParticipantId.bind(this);
        this.fetchList = this.fetchList.bind(this);
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {
        //fetch data

        this.fetchList();
    }

    async fetchList() {
        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Friends/GetCreatedItems")
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
                //get request body
                this.state.data = JSON.parse(result.request.response).list;

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
            if (result.response.status == 400 && result.response.data) {
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

        //once done, lazy update
        this.lazyUpdate();
    }

    render() {
        if (this.state.loading == true || this.state.loading == null) {
            return (
                <LoadingScreen/>
            );
        }
        else {
            const renderItem = ({ item }) => (
                <FrameComponent item={item} lazyUpdate={this.lazyUpdate} getParticipantId={this.getParticipantId} navigation={this.props.navigation}/>
            );

            return(
            <SafeAreaView style={{flex: 1}}>
                <FlatList 
                data={this.state.data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
            </SafeAreaView>
            );
        }
    }

    getParticipantId() {
        return this.state.id;
    }

    lazyUpdate() {
        this.forceUpdate();
    }
}

class FrameComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
        
        this.makeRequest = this.makeRequest.bind(this);
    }

    createBody() {
        
    }

    render() { 
        return (
            <TouchableOpacity activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.makeRequest();}} >
                <View style={[blip_styles.body, {borderColor: colorCode(this.props.item)}]}>
                    <View style={blip_styles.top_bar}>
                        <View style={title_styles.inner_text}>
                            <Text style={{color: 'black', fontSize: 16}}>
                                {this.props.item.title}
                            </Text>
                        </View>
                    </View>
                        {dataType(this.props.item)}
                    </View>
                </TouchableOpacity>
        );
    }

    async makeRequest() {
        var requestUrl = "";

        if (this.props.item.type == "activity") {
            requestUrl = "/api/User/Friends/RequestToJoinParticipantAsActivity?activity_id=" + this.props.item.id + "&participant_id=" + this.props.getParticipantId();
        }
        else if (this.state.type == "group") {
            requestUrl = "";
        }

        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, requestUrl)
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
                //create alert
                invitationSentAlert();

                //then go back
                this.props.navigation.pop(1);
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
    else if (desc == "") {
        return ;
    }
    else {
        return desc;
    }
}

const invitationSentAlert = () => {
    Alert.alert(
        "Invitation Sent",
        "Invitation was successfully sent"
    )
}