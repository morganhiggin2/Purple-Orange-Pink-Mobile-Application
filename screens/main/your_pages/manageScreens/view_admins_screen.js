import React from 'react';
import {StyleSheet, View, Text, ScrollView, Dimensions, ImageBackground, Alert} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
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
            flexDirection: 'row',
            padding: "3%",
            backgroundColor: 'white',
        },
        scroll_area: {
            
        }
    }
);

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

            //from admin if there
            is_admin: this.props.route.params.is_admin,

            //for loading screen
            loading: true,
            reload: false,

            userComponents: [],
            global_props: null,

            //is group admins or activity admins?
            type: '',

            //remove focus listener
            removeFocusListener: null,

            admins: [],
            adminComponents: [],
        };

        this.validateAttributes = this.validateAttributes.bind(this);
        this.viewOtherProfile = this.viewOtherProfile.bind(this);
        
        this.updateSearch = this.updateSearch.bind(this);
        this.updateAdmins = this.updateAdmins.bind(this);

        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {
        this.state.removeFocusListener = this.props.navigation.addListener('focus', () => {
            this.state.global_props = GlobalProperties.screen_props;
            GlobalProperties.screenActivated();

            if (GlobalProperties.return_screen == "Other Activity Profile Screen" && GlobalProperties.screen_props != null) {
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

        //fetch search
        this.updateSearch();
    }

    componentWillUnmount() {
        this.state.removeFocusListener();
    }

    updateAdmins() {
        //when page increase is implemented, TODO get rid of this

        for (var i = 0; i < this.state.admins.length; i++) { 
            var json = this.state.admins[i];
            this.state.adminComponents.push(<FrameComponent key={i} id={json.id} name={json.name} distance={json.distance} viewOtherProfile={this.viewOtherProfile}/>);
        }
    }

    viewOtherProfile(id) {
        this.props.navigation.navigate("Other Activity Profile Screen", {id: id, activity_id: this.state.id, is_admin: this.state.is_admin, viewing_admins: true})
    }
 
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
                <ImageBackground style={frame_styles.background_image} source={require("../../../../assets/images/default_image.png")}>
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