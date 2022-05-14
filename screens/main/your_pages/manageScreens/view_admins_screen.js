import React from 'react';
import {StyleSheet, View, Text, ScrollView, Dimensions, ImageBackground, Alert} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { render } from 'react-dom';
import { GlobalProperties } from '../../../../global/global_properties.js';
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
            backgroundColor: 'black',
            paddingHorizontal: 2,
        },
        main_text: {
            fontSize: 12,
            marginLeft: 2,
            marginBottom: 2,
            color: 'white',
        },
        name_text: {
            fontSize: 12,
            marginLeft: 2,
            marginBottom: 2,
            color: 'white',
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

export class ViewAdminsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //from id
            id: this.props.route.params.id,

            //from type
            type: this.props.route.params.type,

            //for loading screen
            loading: true,
            reload: false,

            userComponents: [],
            global_props: null,

            //is group admins or activity admins?
            type: '',

            //list of admins
            admins: [{
                username: "FraserMqdycDGweDx",
                first_name: "Frasermcdas",
                last_initial: "M",
                distance: 8.0
            },
            {
                username: "FraserMqdycDGweDx",
                first_name: "Fra",
                last_initial: "M",
                distance: 8.0
            },
            {
                username: "FraserMqdycDGweDx",
                first_name: "Frasermcdas",
                last_initial: "M",
                distance: 8.0
            },
            {
                username: "FraserMqdycDGweDx",
                first_name: "Frasermcdas",
                last_initial: "M",
                distance: 8.0
            }],
            adminComponents: [],
        };

        this.validateAttributes = this.validateAttributes.bind(this);
        this.getType = this.getType.bind(this);
        this.getId = this.getId.bind(this);
        
        this.updateSearch = this.updateSearch.bind(this);
        this.updateAdmins = this.updateAdmins.bind(this);

        this.lazyUpdate = this.lazyUpdate.bind(this);

        //add navigation events
        
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.state.global_props = GlobalProperties.screen_props;
            GlobalProperties.screenActivated();

            if (GlobalProperties.return_screen == "Other Profile Screen" && GlobalProperties.screen_props != null) {
                if (GlobalProperties.screen_props.action = "remove") {
                    //remove person

                    for (let [i, data] of this.state.admins.entries()) {
                        if (data.id == GlobalProperties.screen_props.id && data.type == "person") {
                            this.state.admins.splice(i, 1);
                        }
                    }

                    this.updateAdmins();
                    this.lazyUpdate();
                }
            }
        });

        //get props passed in
        this.state.type = this.props.route.params.type;

        /*for(i = 0; i < 17; i++) {
            this.addFrameComponent("", i);
        }*/
        //fetch search
        this.updateSearch();
    }

    updateAdmins() {
        //when page increase is implemented, TODO get rid of this

        for (var i = 0; i < this.state.admins.length; i++) { 
            var json = this.state.admins[i];
            this.state.adminComponents.push(<FrameComponent key={i} id={json.id} firstName={json.first_name} lastInitial={json.last_initial} distance={json.distance} getType={this.getType} getId={this.getId} navigation={this.props.navigation}/>);
        }
    }

    getType() {
        return (this.state.type);
    }

    getId() {
        return (this.state.id);
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
            requestURL = "/api/User/Friends/ActivityGetAdmins?id=" + this.state.id;
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
                var users = JSON.parse(result.request.response).admins;

                //add groups
                this.state.admins = users;

                //update users
                this.updateAdmins();

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
                                {this.state.adminComponents.map((component) => (component))}
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
            name: this.props.firstName + " " + this.props.lastInitial
        }

        //deal if name if too long to fit on screen
        if (this.state.name.length > 11) {
            this.state.name = this.state.name.substring(0, 13) + "...";
        }
    }

    render() {
        var passing_params = {id: this.props.id};
        var parentType = this.props.getType();

        //if type is activity, pass activity_id and set type to "participants of activity"
        if (parentType == "activity") {
            passing_params.type = "activity";
            passing_params.viewing = "admins";
            passing_params.activity_id = this.props.getId();
        }
        else if (parentType == "group") {
            passing_params.type = "group";
            passing_params.viewing = "admins";
            passing_params.group_id = this.props.getId();
        }
        else if (parentType == "none") {
            passing_params.type = "none";
            passing_params.viewing = "admins";
        }

        return(
            <TouchableHighlight style={frame_styles.box} onPress={() => {this.props.navigation.navigate("Other Profile Screen", passing_params)}}>
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