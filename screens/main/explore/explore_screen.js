import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, SafeAreaView, ScrollView, Dimensions, FlatList, ImageBackground, Alert, RefreshControl} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { AntDesign, Feather } from '@expo/vector-icons'; 
import {Route} from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { render } from 'react-dom';
import { GlobalProperties, GlobalValues } from '../../../global/global_properties.js';
import { GlobalEndpoints } from '../../../global/global_endpoints.js';
import * as Location from 'expo-location';
import { LoadingScreen } from '../../misc/loading_screen.js';

const frame_styles = StyleSheet.create(
    {
        box: {
            backgroundColor: 'white',
            /*height: Math.trunc(Dimensions.get('window').width * 0.45),
            width: Math.trunc(Dimensions.get('window').width * 0.45),
            marginLeft: Math.trunc(Dimensions.get('window').width * 0.029),
            marginBottom: Math.trunc(Dimensions.get('window').width * 0.029),*/
            width: Math.trunc(Dimensions.get('window').width * 0.98),
            marginTop: Math.trunc(Dimensions.get('window').width * 0.01),
            borderWidth: 2,
            borderRadius: 3,
            borderColor: GlobalValues.DISTINCT_GRAY,
            //alignItems: 'flex-end',
            //justifyContent: 'flex-start',
            //direction: 'inherit', 
        },
        inner_box: {
            flexDirection: 'row',
            alignContent: 'flex-start',
        },
        background_image: {
            height: Math.trunc(Dimensions.get('window').width * 0.33),
            width: Math.trunc(Dimensions.get('window').width * 0.33),
            marginLeft: 2,
            marginVertical: 2,
        },
        text_container: {
            justifyContent: 'flex-start',
            flexDirection: 'column',
            backgroundColor: 'white',
        },
        inner_text_container: {
            flexDirection: 'row',
            marginBottom: 2,
            marginLeft: 4,
        },
        main_text: {
            fontSize: 14,
            marginRight: 16,
            color: 'black',
        },
        name_text: {
            fontSize: 18,
            color: 'black',
        },
    }
)

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
            flexDirection: 'row-reverse',
            padding: 4,
            paddingHorizontal: 8,
            backgroundColor: 'white',
        },
        scroll_area: {
            
        }
    }
);

class FrameComponent extends React.Component{
    constructor(props) {
        super (props);

        this.state = {
            //hasImage: true,
        };

        //if they have an image
        /*if (this.props.profile_image == null || this.props.profile_image == "") {
            this.state.hasImage = false;
        }*/

        if (this.props.type == "person") {
            this.state.name = this.props.firstName + " " + this.props.lastInitial;
        }
        else if (this.props.type == "activity") {
            this.state.name = this.props.name;
        }
        
        //deal if name if too long to fit on screen
        if (this.state.name.length > 30) {
            this.state.name = this.state.name.substring(0, 8) + "...";
        }
    }

    render() {
        var renderAge = {};

        if (this.props.type == "person") {
            renderAge = (
                <Text style={[frame_styles.main_text, {marginRight: 100}]}>
                    {this.props.age + " years old"}
                </Text>
            );
        }
        else {
            renderAge = (
                <View />
            );
        }
        
        //character limit for descriptions

        /*return(
            <TouchableHighlight style={frame_styles.box} onPress={() => {
                    if (this.props.type == "person") {
                        this.props.navigation.navigate("Other Profile Screen", {id: this.props.id, type: "none", viewing:""});
                    }
                    else if (this.props.type == "activity") {
                        this.props.navigation.navigate("Other Activity Screen", {id: this.props.id, type: "none", viewing:""});
                    }
                }}>
                <ImageBackground style={frame_styles.background_image} source={handleImageURI(this.props.profile_image)}>
                    <View style={frame_styles.text_container}>   
                        <Text style={frame_styles.name_text}>
                            {this.state.name}
                        </Text> 
                        <Text style={frame_styles.main_text}>
                            {this.props.distance + " mi"}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={frame_styles.text_container}>
                    <View>
                        <Text style={frame_styles.name_text}>
                            {this.state.name}
                        </Text> 
                    </View>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Text style={frame_styles.main_text}>
                            {this.props.distance + " mi"}
                        </Text>
                        {renderAge}
                    </View>
                </View>
            </TouchableHighlight>
        );*/

        return (
            <View style={frame_styles.box} >
                <TouchableHighlight onPress={() => {
                    if (this.props.type == "person") {
                        this.props.navigation.navigate("Other Profile Screen", {id: this.props.id, type: "none", viewing:""});
                    }
                    else if (this.props.type == "activity") {
                        this.props.navigation.navigate("Other Activity Screen", {id: this.props.id, type: "none", viewing:""});
                    }
                }}>
                    <View style={frame_styles.inner_box}>
                        <Image style={frame_styles.background_image} source={{uri: "https://image.cnbcfm.com/api/v1/image/106926992-1628885077267-elon.jpg"}}/>
                        <View style={frame_styles.text_container}>
                            <View style={frame_styles.inner_text_container}>
                                <Text style={frame_styles.name_text}>
                                    {this.state.name}
                                </Text> 
                            </View>
                            <View style={[frame_styles.inner_text_container]}>
                                <Text style={frame_styles.main_text}>
                                    {this.props.distance + " miles away"}
                                </Text> 
                                {renderAge}
                            </View>
                            <View style={frame_styles.inner_text_container}>
                                <Text style={[frame_styles.main_text, {flexWrap: "wrap"}]}>
                                    {this.props.description}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

/*
class FrameComponent extends React.Component{
    constructor(props) {
        super (props);

        this.state = {};

        if (this.props.type == "person") {
            this.state.name = this.props.firstName + " " + this.props.lastInitial;
        }
        else if (this.props.type == "activity") {
            this.state.name = this.props.name;
        }
        
        //deal if name if too long to fit on screen
        if (this.state.name.length > 11) {
            this.state.name = this.state.name.substring(0, 8) + "...";
        }
    }

    render() {
        return(
            <TouchableHighlight style={frame_styles.box} onPress={() => {
                    if (this.props.type == "person") {
                        this.props.navigation.navigate("Other Profile Screen", {id: this.props.id, type: "none", viewing:""});
                    }
                    else if (this.props.type == "activity") {
                        this.props.navigation.navigate("Other Activity Screen", {id: this.props.id, type: "none", viewing:""});
                    }
                }}>
                <ImageBackground style={frame_styles.background_image} source={handleImageURI(this.props.profile_image)}>
                    <View style={frame_styles.text_container}>   
                        <Text style={frame_styles.name_text}>
                            {this.state.name}
                        </Text> 
                        <Text style={frame_styles.main_text}>
                            {this.props.distance + " mi"}
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableHighlight>
        )
    }
} */

//, {backgroundColor: borderColor(this.props.type), borderBottomWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, borderColor: borderColor(this.props.type)}]

function handleImageURI(uri) {
    if (uri == undefined) {
        return({uri: "https://image.cnbcfm.com/api/v1/image/106926992-1628885077267-elon.jpg"});
       //return(require("../../../images/default_image.png"));
    }
    else {
        return({uri: uri});
    }
}

//borderColor: borderColor(this.props.type)

function borderColor(type) {
    if (type == "person") {
        return (GlobalValues.PEOPLE_COLOR);
    }
    else if (type == "activity") {
        return (GlobalValues.ACTIVITY_COLOR);
    }
    else if (type == "group") {
        return (GlobalValues.GROUP_COLOR);
    }
}

const EmptySpace = (props) => {
    const btbh = useBottomTabBarHeight();

    return(
        <View style={{height: btbh, width: '100%'}}>
        </View>
    )
}

export class ExploreScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //for loading page
            loading: true,
            reload: false,

            //frames
            frames: [],

            frameComponents: [],
            global_props: null,
        };

        this.validateAttributes = this.validateAttributes.bind(this);
        this.ScrollViewIsCloseToBottom = this.ScrollViewIsCloseToBottom.bind(this);
        
        this.updateSearch = this.updateSearch.bind(this);
        this.updateUsers = this.updateUsers.bind(this);

        this.lazyUpdate = this.lazyUpdate.bind(this);

        //add navigation events
        
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if (GlobalProperties.search_filters_updated) {
                this.updateSearch();
                this.lazyUpdate();
                GlobalProperties.search_filters_updated = true;
            }

            if (GlobalProperties.return_screen == "Other Profile Screen" && GlobalProperties.screen_props != null) {
                if (GlobalProperties.screen_props.action = "remove") {
                    //remove person

                    for (let [i, data] of this.state.frames.entries()) {
                        if (data.id == GlobalProperties.screen_props.id && data.type == "person") {
                            this.state.frames.splice(i, 1);
                        }
                    }

                    this.updateUsers();
                    this.lazyUpdate();
                }
            }
            else if (GlobalProperties.return_screen == "Other Activity Screen" && GlobalProperties.screen_props != null) {
                if (GlobalProperties.screen_props.action = "remove") {
                    //remove person

                    for (let [i, data] of this.state.frames.entries()) {
                        if (data.id == GlobalProperties.screen_props.id && data.type == "activity") {
                            this.state.frames.splice(i, 1);
                        }
                    }

                    this.updateUsers();
                    this.lazyUpdate();
                }
            }

            GlobalProperties.screenActivated();
        });


        /*for(i = 0; i < 17; i++) {
            this.addFrameComponent("", i);
        }*/
        //fetch search
        this.updateSearch();
    }

    updateUsers() {
        //when page increase is implemented, TODO get rid of this
        this.state.frameComponents = [];

        for (var i = 0; i < this.state.frames.length; i++) { 
            var json = this.state.frames[i];

            if (json.type == "person") {
                this.state.frameComponents.push(<FrameComponent key={json.id} id={json.id} type={json.type} firstName={json.first_name} lastInitial={json.last_initial} description={json.description} age={json.age} distance={json.distance} navigation={this.props.navigation}/>);
            }
            else if (json.type == "activity") {
                this.state.frameComponents.push(<FrameComponent key={json.id} id={json.id} type={json.type} name={json.name} description={json.description}  distance={json.distance} navigation={this.props.navigation}/>);
            }
        }
    }

    //____>>>>>>>search bar creates attributes from even spaces, and adds them to the ones in the filter page
 

        /*var body = {
            "radius": 10.0,
            "pageSize": 20,
            "pageNumber": 1,
            "maximumAge": GlobalProperties.search_maxAge,
            "minimumAge": GlobalProperties.search_minAge,
            "attributes": ["kzli", "igyz"],
        };*/

    async updateSearch() {
        let search_radius = GlobalProperties.map_search_radius;

        //make sure the attriutes are good
        /*if (!this.validateAttributes()) {
            return;
        }*/

        var location = null;

        //fetch user's location if not using map settings
        if (!GlobalProperties.use_map_settings) {

            var locationResult = await GlobalEndpoints.getLocation();

            if (!locationResult.granted) {
                Alert.alert("Permission to access location was denied.\nUsing map settings.");

                //use map settings
                GlobalProperties.use_map_settings = true;
            }
            else if (locationResult.location == null) {
                Alert.alert("Location could not be determined.\nUsing map settings.");

                //use map settings
                GlobalProperties.use_map_settings = true;
            }
            else {
                location = locationResult.location;
            }
        }

        if (GlobalProperties.use_map_settings) {
            location = {
                latitude: GlobalProperties.map_latitude,
                longitude: GlobalProperties.map_longitude,
            };
        }
        else {
            location = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
        }

        //update search
        var body = {};
        var requestUrl = "";

        //get body
        if (GlobalProperties.search_type == "people") {
            body = {
                "radius": search_radius,
                "minimum_age": GlobalProperties.search_minAge,
                "maximum_age": GlobalProperties.search_maxAge,
                "location": {
                    "latitude": location.latitude,
                    "longitude": location.longitude,
                },
                "page_number": 1,
                "page_size": 20,
            };

            if (GlobalProperties.search_gender != "") {
                body["gender"] = GlobalProperties.search_gender;
            }    

            requestUrl = "/api/User/Friends/SearchUsers";
        }
        else if (GlobalProperties.search_type == "activities") {
            body = {
                "radius": search_radius,
                "location": {
                    "latitude": location.latitude,
                    "longitude": location.longitude,
                },
                "page_number": 1,
                "page_size": 20,
            };

            requestUrl = "/api/User/Friends/SearchActivities";
        }
        
        if (GlobalProperties.search_attributes != null) {
            body["attributes"] = GlobalProperties.search_attributes;
        }

        //if request was successful
        var successful = false;

        //make request
        var result = await GlobalEndpoints.makePostRequest(true, requestUrl, body)
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

                if (GlobalProperties.search_type == "people") {
                    //get request body
                    var users = JSON.parse(result.request.response).users;

                    //add groups
                    this.state.frames = users;
                }
                else if (GlobalProperties.search_type == "activities"){
                    //get request body
                    var activities = JSON.parse(result.request.response).activities;

                    //add groups
                    this.state.frames = activities;
                }

                //update users
                this.updateUsers();

                //set loading to false
                this.state.loading = false;
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
                Alert.alert(JSON.parse(result.response.data));
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

    /*
    async componentDidMount() {
        try{
            let response = await fetch("http://192.168.0.86:8000/stock/");
            let json = await response.json();
            this.createStockComponents(json);
        } catch(error) {
            console.error(error);
        }
    }
    */

    render() {
        return (
            <View style={main_styles.page}>
                    {this.state.loading == true ? 
                    (
                        <LoadingScreen reload={this.state.reload} tryAgain={this.updateSearch} />
                    ) : (
                    <View style={{flex: 1}}>
                        <View style={main_styles.top_bar}>
                            <TouchableHighlight style={{marginLeft: 5}} underlayColor="white" onPress={() => {this.props.navigation.navigate("Explore Filters Screen");}}>
                                <Feather name="list" size={36} color="gray" />
                            </TouchableHighlight>
                        </View>
                        <View>
                            <ScrollView 
                                contentContainerStyle={{alignItems: 'center'}}
                                refreshControl={<RefreshControl refreshing={false} 
                                onRefresh={() => {this.state.loading = true; this.updateSearch();}}/>}
                                onScroll={({nativeEvent}) => {
                                    if (this.ScrollViewIsCloseToBottom(nativeEvent)) {
                                        console.log("at bottom");
                                        //do something
                                    }
                                }}
                                scrollEventThrottle={400}
                            >  
                                {this.state.frameComponents.map((component) => (component))}
                                <EmptySpace key={0}/>
                            </ScrollView>
                        </View>                      
                    </View>) 
                    }
            </View>
        );
    }

    ScrollViewIsCloseToBottom(layoutMeasurement, contentOffset, contentSize) {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    }

    /**
     * 
                            <View style={main_styles.search_bar}>
                                <Feather name="search" size={30} color="gray" style={{alignSelf: 'center'}}/>
                                <TextInput style={main_styles.text_input} placeholderTextColor="black"/>
                            </View>
     */

    // contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", flexGrow: 1}} 

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