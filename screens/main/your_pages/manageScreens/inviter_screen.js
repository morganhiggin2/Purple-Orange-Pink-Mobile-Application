import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, ScrollView, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign, Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'; 
import { GlobalProperties, GlobalValues } from '../../../global/global_properties';
import { GlobalEndpoints } from '../../../global/global_endpoints';
import { LoadingScreen } from '../../misc/loading_screen';

const ImageStack = createMaterialTopTabNavigator();

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: GlobalValues.DARKER_WHITE, //#FFEDE7
            height: '100%',
            width: '100%',
        },
        sections: {
            flexDirection: "column",
            justifyContent: "space-between",
        },
        sub_section: {
            marginTop: '10%',
        },
        title_text: {
            alignSelf: 'center',
            fontSize: 24,
            color: 'black',
            padding: 5,
            marginBottom: 5,
        }, 
        name_text: {
            alignSelf: 'center',
            fontSize: 20,
            color: 'black',
            marginTop: 10,
        },
        name_view: {
            flexDirection: 'row',
            justifyContent: 'center',
        },
        scroll_view: {
            backgroundColor: GlobalValues.DARKER_WHITE,
        },
    }
);

const image_styles = StyleSheet.create(
    {
        container: {
            width: 254,
            height: 250,
            marginTop: '10%',
            marginBottom: 5,
            alignSelf: 'center',
        },
        box: {
            width: 254,
            height: 250,
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 2,
        },
        image: {
            width: 250,
            height: 250,
        },
    }
);

const info_styles = StyleSheet.create(
    {
        body: {
            backgroundColor: "white", //#FFCDCD
            borderRadius: 5,
            padding: 8,
            marginVertical: "2%",
            marginHorizontal: '2%'
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
        horizontal_bar: {
            width: '100%',
            alignSelf: 'center',
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE,
            marginTop: 8,
            marginBottom: 4,
        }
    }
);

const actions_styles = StyleSheet.create(
    {
        actions_view: {

        },
        actions_button:  {
            borderRadius: 3,
            borderWidth: 4,
            backgroundColor: GlobalValues.ORANGE_COLOR,//'#ff4576'
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

const filter_snaps_styles = StyleSheet.create(
    {
        profile_container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: 10,
            flexWrap: 'wrap',
            width: '80%',
        },
        inner_text: {
            borderRadius: 5,
            borderWidth: 1,
            paddingHorizontal: 3,
            paddingVertical: 1,
            fontSize: 16,
            color: 'white', 
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginHorizontal: 2,
            marginVertical: 2,
            textAlign: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center'
        },
        icon: {
            alignSelf: 'center',
            marginRight: 4
        },
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        }
    }
);

const point_styles = StyleSheet.create(
    {
        body: {
            borderColor: GlobalValues.ORANGE_COLOR,
            borderTopWidth: 3,
            borderBottomWidth: 3,
        },
        container: {

        },
        text: {
            fontSize: 16,
            alignSelf: 'center',
        },
        image: {
            marginTop: 10,
            width: Math.trunc(Dimensions.get('window').width * 0.90),
            height: Math.trunc(Dimensions.get('window').width * 0.90), 
        },
        trash_icon: {
            flexDirection: 'row-reverse',
        }
    }
);

const HeaderTitle = (title) => {
    return(
        <Text style={{fontSize: 24, color: 'black'}}>
            {title.title}
        </Text>
    );
}

class FilterSnap extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return( 
            <Text style={[filter_snaps_styles.inner_text, { backgroundColor: this.props.color, borderColor: this.props.color}]}>
                {this.props.innerText}
            </Text>
        );
    }
}

FilterSnap.defaultProps = {
    color: GlobalValues.ORANGE_COLOR,
}

export class InviterScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: this.props.route.params._id,
            sub_header_id: this.props.route.params.sub_header_id,
            invitation_id: this.props.route.params.invitation_id,
            body: this.props.route.params.body,

            //for loading screen
            loading: true,
            reload: false, 
        };

        
        this.state.other_id = this.props.route.params.other_id;

        this.fetchInvitationData = this.fetchInvitationData.bind(this);
        this.acceptInvitation = this.acceptInvitation.bind(this);
        this.removeInvitation = this.removeInvitation.bind(this);

        //once done, lazy update
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    async log_in() {
        
    }
    
    componentDidMount() {
        //init

        //fetch data
        this.fetchInvitationData();
    }

    async fetchInvitationData() {

        if (this.state.reload) {
            this.state.reload = false;
    
            //reload to now hide reload button
            this.lazyUpdate();
        }

        //fetch subheader data
        this.state.subHeader = await GlobalProperties.messagesHandler.getInvitationInformation(this.state.sub_header_id);

        this.state.invitation_id = this.state.subHeader.invitation_id;
        this.state.other_id = this.state.subHeader.other_id;
        this.state.other_type = this.state.subHeader.other_type;

        /*
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, ("/api/User/Generic/ViewInvitation?id=" + this.state.invitation_id))
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
                var invitation_information = JSON.parse(result.request.response).invitation_information;

                //add user information
                this.state.view_type = invitation_information.type;

                if (this.state.view_type == "person") {
                    this.state.name = invitation_information.first_name + " " + invitation_information.last_name;
                }
                else if (this.state.view_type == "activity") {
                    this.state.name = invitation_information.name;
                }

                this.state.invitation_message = invitation_information.invitation_type_message;
                this.state.view_id = invitation_information.id;
                this.state.view_type = invitation_information.type;
                this.state.is_invitee = invitation_information.is_invitee;

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
        }*/

        this.state.loading = false;

        //once done, lazy update
        this.lazyUpdate();

        //this.props.navigation.setOptions({headerTitle: () => <HeaderTitle title={this.state.name}/>});
    }

    render() {
        var renderActions = {};
        
        if (this.state.is_invitee) {
            renderActions = (
                <View>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {acceptInvitationAlert(this.acceptInvitation);}}>
                        <View style={actions_styles.action_button_inner}>
                            <AntDesign name="message1" size={20} color="white" style={actions_styles.action_button_icon}/>
                            <Text style={actions_styles.action_button_text}>
                                Accept
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {declineInvitationAlert(this.removeInvitation);}}>
                        <View style={actions_styles.action_button_inner}>
                            <AntDesign name="message1" size={20} color="white" style={actions_styles.action_button_icon}/>
                            <Text style={actions_styles.action_button_text}>
                                Decline
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            renderActions = (
                <View>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {recindInvitationAlert(this.removeInvitation);}}>
                        <View style={actions_styles.action_button_inner}>
                            <AntDesign name="message1" size={20} color="white" style={actions_styles.action_button_icon}/>
                            <Text style={actions_styles.action_button_text}>
                                Recind Invitation
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }

        var renderViewOther = {};

        if (this.state.other_type == "person")
        {
            renderViewOther = (
                <View>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.navigation.navigate("Other Explore Profile Screen", {id: this.state.other_id});}}>
                        <View style={actions_styles.action_button_inner}>
                            <Text style={actions_styles.action_button_text}>
                                View Profile
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        else if (this.state.other_type == "activity") {
            renderViewOther = (
                <View>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.navigation.navigate("Other Activity Screen", {id: this.state.other_id});}}>
                        <View style={actions_styles.action_button_inner}>
                            <Text style={actions_styles.action_button_text}>
                                View Activity
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            renderViewOther = (<View />);
        }
        
        if (this.state.loading == true || this.state.loading == null) {
            return (
                <LoadingScreen tryAgain={this.fetchInvitationData} reload={this.state.reload}/>
            );
        }
        else {
            return (
                <View style={main_styles.page}>
                    <ScrollView style={main_styles.scroll_view}>
                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                {this.state.body}
                            </Text>
                        </View>
                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Actions
                            </Text>
                            <View style={actions_styles.actions_view}> 
                                <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {recindInvitationAlert(this.removeInvitation);}}>
                                    <View style={actions_styles.action_button_inner}>
                                        <AntDesign name="message1" size={20} color="white" style={actions_styles.action_button_icon}/>
                                        <Text style={actions_styles.action_button_text}>
                                            Recind Invitation
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                {renderViewOther}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
    
    /*
                        <View style={main_styles.name_view}>
                            <Text style={main_styles.title_text}>
                                Invitation
                            </Text>
                        </View> */

    async acceptInvitation() {
        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Friends/Generic/AcceptInvitation?id=" + this.state.invitation_id)
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

                //update invitations on main page, get rid of
                //pass id or something

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

    async removeInvitation() {
        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, "/api/User/Generic/RejectInvitation?id=" + this.state.id)
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

                //update invitations on main page, get rid of
                //pass id or something

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

    lazyUpdate() {
        this.forceUpdate();
    }
}

const acceptInvitationAlert = (acceptInvitation) => {
    Alert.alert(
        "Accept Invitation",
        "Are you sure you want to accept this invitation?",
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "Accept",
                onPress: () => acceptInvitation(),
            }
        ],
        {
            cancelable: true,
        }
    );
};

const declineInvitationAlert = (declineInvitation) => {
    Alert.alert(
        "Decline Invitation",
        "Are you sure you want to decline this invitation?",
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "Decline",
                onPress: () => declineInvitation(),
            }
        ],
        {
            cancelable: true,
        }
    );
};

const recindInvitationAlert = (recindInvitation) => {
    Alert.alert(
        "Recind Invitation",
        "Are you sure you want to recind this invitation?",
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "Recind",
                onPress: () => recindInvitation(),
            }
        ],
        {
            cancelable: true,
        }
    );
};

//<View style={{ borderBottomColor: '#CCCCCC', borderBottomWidth: 2, width: '95%', alignSelf: 'center', marginBottom: 0,}}/>
//<FilterSnap innerText="light" color="#9A39E2"/>
/*

<View style={frame_styles.box} onPress={() => {this.props.navigation.navigate("Other Profile Screen")}}>
                <Text style={frame_styles.main_text}>
                    {this.props.id}
                </Text>
            </View>

*/

/*import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, SafeAreaView, ScrollView, Dimensions, FlatList, Alert} from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import {FontAwesome, Feather} from '@expo/vector-icons'; 
import {Route} from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { render } from 'react-dom';

import {GlobalProperties, GlobalValues} from '../../../global/global_properties.js';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: "white", //#FFEDE7
            height: '100%',
            width: '100%',
        },
        title_text: {
            alignSelf: 'center',
            fontSize: 24,
            color: 'black',
            padding: 5,
            marginBottom: 5,
        }, 
        name_view: {
            flexDirection: 'row',
            justifyContent: 'center',
        },
        top_gap: {
            marginTop: '10%',
        },
    }
);

const other_profile_image_styles = StyleSheet.create(
    {
        box: {
            width: 250,
            height: 255,
            marginBottom: 5,
            alignSelf: 'center',
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 2,
        },
        image: {
            width: 250,
            height: 250,
        },
    }
);

const info_styles = StyleSheet.create(
    {
        body: {
            backgroundColor: 'white', //#FFCDCD
            borderRadius: 5,
            padding: 8,
            marginVertical: "2%",
            marginHorizontal: '2%'
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
        activity_name_body: {
            alignItems: 'center',
            alignSelf: 'center',
            width: '90%',
            backgroundColor: '#ff4576',
            borderRadius: 4,
            marginTop: 6,
            paddingVertical: 4,
        },
        activity_name_text: {
            fontSize: 18,
            color: 'white',
            fontWeight: 'bold',
        }
    }
);

const formal_header_styles = StyleSheet.create(
    {
        body: {
            backgroundColor: '#ff4576', //#FFCDCD
            borderRadius: 5,
            padding: 4,
            marginVertical: "2%",
            marginHorizontal: '2%'
        },
        inner_body: {
            flexDirection: "row",
            alignItems: 'flex-start',
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: 30,
            color: 'white',
            fontWeight: 'bold',
            marginLeft: 8,
        },
    }
);

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

const invite_button_styles = StyleSheet.create(
    {
        body: {
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: 5,
            marginTop: "5%",
            //alignItems: 'flex-end'
            //flexWrap: 'wrap',
        },
        button_view: {
            //alignItems: 'flex-start',
            borderRadius: 3,
            borderWidth: 4,
            //paddingVertical: 0,
            //alignSelf: 'center',
            //alignContent: 'center',
            //justifyContent: 'center',
            //width: 160,
            paddingHorizontal: '15%',
            //marginTop: 0,
            //marginBottom: 0,

        },
        accept: {
            backgroundColor: '#00b862',
            borderColor: '#00b862',
        },
        deny: {
            backgroundColor: '#ed001f',
            borderColor: '#ed001f',
        },
        button_text: {
            color: 'white',
            fontSize: 18,
            alignSelf: 'center',
        }
    }
);

const HeaderTitle = (props) => {
    return(
        <Text style={{fontSize: 24, color: 'black'}}>
            {props.title}
        </Text>
    );
}

export class InviteScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            refreshFlatList: true,
        };

        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setOptions({headerTitle: () => <HeaderTitle title={"Manage Activity"}/>});
    }
    
//this.props.route.params.first_name

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
                        <View>
                            <View style={formal_header_styles.body}>
                                <View style={formal_header_styles.inner_body}>
                                    <FontAwesome name="envelope-o" size={30} color="white" />
                                    <Text style={formal_header_styles.text}>
                                        Invitation Request
                                    </Text>
                                </View>
                            </View>
                            <View style={info_styles.body}>
                                <View style={other_profile_image_styles.box}>
                                    <ProfileImage image_url={'https://upload.wikimedia.org/wikipedia/commons/e/e4/Morgan_Freeman_Deauville_2018.jpg'} />
                                </View>

                                <View style={main_styles.name_view}>
                                    <Text style={main_styles.title_text}>
                                        {"Donald Trump"}
                                    </Text>
                                    <Text style={[main_styles.title_text, {color: 'black'}]}>
                                        19
                                    </Text>
                                </View>
                            </View>

                            <View style={info_styles.body}>
                                <Text style={info_styles.title_text}>
                                    Request
                                </Text>
                                <TouchableOpacity style={info_styles.activity_name_body} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress = {() => {}} >
                                    <Text style={info_styles.activity_name_text}>
                                        Hike on South Mountain
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={info_styles.body}>
                                <Text style={info_styles.title_text}>
                                    Actions
                                </Text>
                                <View style={invite_button_styles.body}>
                                    <TouchableOpacity underlayColor="white" onPress={() => {}} onHideUnderlay={() => {}} activeOpacity={GlobalValues.ACTIVE_OPACITY} onShowUnderlay={() => {}}>
                                        <View style={[invite_button_styles.button_view, invite_button_styles.accept]}>
                                            <Text style={invite_button_styles.button_text}>
                                                Accept
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity underlayColor="white" onPress={() => {}} onHideUnderlay={() => {}} activeOpacity={GlobalValues.ACTIVE_OPACITY} onShowUnderlay={() => {}}>
                                        <View style={[invite_button_styles.button_view, invite_button_styles.deny]}>
                                            <Text style={invite_button_styles.button_text}>
                                                {" Deny "}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    ) 
                }
            </View>
        );
    }
    
    lazyUpdate() {
        this.forceUpdate();
    }
}

//return the image component of the other pofile
function ProfileImage (props) {
    return(
        <Image style={other_profile_image_styles.image} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Morgan_Freeman_Deauville_2018.jpg'}}/>
    );
}*/
