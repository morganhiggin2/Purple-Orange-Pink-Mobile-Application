import React from 'react';
import {StyleSheet, View, Text, ScrollView, Dimensions, ImageBackground, Alert} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { render } from 'react-dom';
import { GlobalProperties, GlobalValues } from '../../../../global/global_properties.js';
import { GlobalEndpoints } from '../../../../global/global_endpoints.js';
import { LoadingScreen } from '../../../misc/loading_screen.js';

const frame_styles = StyleSheet.create(
    {
        box: {
            backgroundColor: 'gray',
            height: Math.trunc(Dimensions.get('window').width * 0.3),
            width: Math.trunc(Dimensions.get('window').width * 0.3),
            marginLeft: Math.trunc(Dimensions.get('window').width * 0.029),
            marginTop: Math.trunc(Dimensions.get('window').width * 0.029),
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            direction: 'inherit',
            borderRadius: 4,
        },
        background_image: {
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end'
        },
        text_container: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignContent: 'flex-end',
            backgroundColor: GlobalValues.HEADER_BACKGROUND_COLOR,
            paddingHorizontal: 2,
        },
        main_text: {
            fontFamily: 'Roboto',
            fontSize: 14,
            marginLeft: 2,
            marginBottom: 2,
            color: 'black',
        },
        name_text: {
            fontFamily: 'Roboto',
            fontSize: 14,
            marginLeft: 2,
            marginBottom: 2,
            color: 'black',
        },
    }
)

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: 'white',
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
            fontFamily: 'Roboto',
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

var USERS = [{
    username: "FraserMqdycDGweDx",
    first_name: "Frasermcdas",
    last_initial: "M",
    distance: 8.0
},{
    username: "FraserMqdycDGweDx",
    first_name: "Fraser",
    last_initial: "M",
    distance: 8.0
},{
    username: "FraserMqdycDGweDx",
    first_name: "Fraser",
    last_initial: "M",
    distance: 8.0
}];

const EmptySpace = (props) => {
    const btbh = useBottomTabBarHeight();

    return(
        <View style={{height: btbh, width: '100%'}}>
        </View>
    )
}

export class ViewParticipantsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //from id
            id: this.props.route.params.id,

            //from type
            type: this.props.route.params.type,

            is_admin: this.props.route.params.is_admin,

            //for loading screen
            loading: true,
            reload: false,

            userComponents: [],
            global_props: null,

            //is group participants or activity participants?
            type: '',

            //list of participants
            participants: [],
            participantComponents: [],
        };

        this.validateAttributes = this.validateAttributes.bind(this);
        this.viewOtherProfile = this.viewOtherProfile.bind(this);
        
        this.updateSearch = this.updateSearch.bind(this);
        this.updateParticipants = this.updateParticipants.bind(this);

        this.lazyUpdate = this.lazyUpdate.bind(this);

        //add navigation events
        
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.state.global_props = GlobalProperties.screen_props;

            if (GlobalProperties.return_screen == "Other Activity Profile Screen" && GlobalProperties.screen_props != null) {
                if (GlobalProperties.screen_props.action = "remove") {
                    //remove person

                    for (let [i, data] of this.state.participants.entries()) {
                        if (data.id == GlobalProperties.screen_props.id && data.type == "person") {
                            this.state.participants.splice(i, 1);
                        }
                    }

                    this.updateParticipants();
                    this.lazyUpdate();
                }
            }
            
            GlobalProperties.screenActivated();
        });

        //get props passed in
        this.state.type = this.props.route.params.type;

        /*for(i = 0; i < 17; i++) {
            this.addFrameComponent("", i);
        }*/
        //fetch search
        this.updateSearch();
    }

    updateParticipants() {
        //when page increase is implemented, TODO get rid of this

        for (var i = 0; i < this.state.participants.length; i++) { 
            var json = this.state.participants[i];
            this.state.participantComponents.push(<FrameComponent key={i} id={json.id} name={json.name} distance={json.distance} viewOtherProfile={this.viewOtherProfile}/>);
        }
    }

    viewOtherProfile(id) {
        this.props.navigation.navigate("Other Activity Profile Screen", {id: id, activity_id: this.state.id, is_admin: this.state.is_admin, viewing_admins: false})
    }

    //____>>>>>>>search bar creates attributes from even spaces, and adds them to the ones in the filter page
 
    async updateSearch() {
        if (this.state.reload) {
            this.state.reload = false;
    
            //reload to now hide reload button
            this.lazyUpdate();
        }
        
        var requestURL = "";

        //get participants for activity or group
        if (this.state.type == 'activity') {
            requestURL = "/api/User/Friends/ActivityGetParticipants?id=" + this.state.id;
        }
        else if (this.state.type == 'group') {

        }

        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makeGetRequest(true, requestURL)
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
                var users = JSON.parse(result.request.response).participants;

                //add groups
                this.state.participants = users;

                //update users
                this.updateParticipants();

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
        }

        //once done, lazy update
        this.lazyUpdate();
    }

    render() {
        return (
            <View style={main_styles.page}>
                    {this.state.loading == true || this.state.loading == null ? 
                    (
                        <LoadingScreen tryAgain={this.updateSearch} reload={this.state.reload}/>
                    ) : (
                    <View style={{flex: 1}}>
                        <View>
                            <ScrollView contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", flexGrow: 1}}>  
                                {this.state.participantComponents.map((component) => (component))}
                                <EmptySpace key={0}/>
                            </ScrollView>
                        </View>                      
                    </View>) 
                    }
            </View>
        );
    }

    validateAttributes() {
        if (GlobalProperties.search_filters_updated && (typeof(GlobalProperties.search_attributes) == "undefined" || typeof(GlobalProperties.search_attributes) == "null" || GlobalProperties.search_attributes.length == 0)) {
            Alert.alert("You must specify attributes for searching\nattributes are set in the filters page");
            return false;
        }

        return true;
    }

    lazyUpdate() {
        this.forceUpdate();
    }
}


class FrameComponent extends React.Component{
    constructor(props) {
        super (props);

        this.state = {
            name: this.props.name,
            id: this.props.id,
        }

        if (this.state.name.length > 13) {
            this.state.name = this.state.name.substring(0, 10) + "...";
        }
    }

    render() {
        return(
            <TouchableHighlight style={frame_styles.box} onPress={() => {this.props.viewOtherProfile(this.state.id);}}>
                <ImageBackground style={frame_styles.background_image} source={require("../../../../images/default_image.png")}>
                    <View style={frame_styles.text_container}>   
                        <Text style={frame_styles.name_text}>
                            {this.state.name}
                        </Text> 
                    </View>
                </ImageBackground>
            </TouchableHighlight>
        );
    }
}