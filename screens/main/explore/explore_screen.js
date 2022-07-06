import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, SafeAreaView, ScrollView, Dimensions, FlatList, ImageBackground, Alert, RefreshControl, TouchableOpacity} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { AntDesign, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Route} from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { render } from 'react-dom';
import { GlobalProperties, GlobalValues } from '../../../global/global_properties.js';
import { GlobalEndpoints } from '../../../global/global_endpoints.js';
import * as Location from 'expo-location';
import { LoadingScreen } from '../../misc/loading_screen.js';
import { MapScreen } from '../map/map_screen.js';

const frame_styles = StyleSheet.create(
    {
        box: {
            backgroundColor: 'white',
            /*height: Math.trunc(Dimensions.get('window').width * 0.45),
            width: Math.trunc(Dimensions.get('window').width * 0.45),
            marginLeft: Math.trunc(Dimensions.get('window').width * 0.029),
            marginBottom: Math.trunc(Dimensions.get('window').width * 0.029),*/
            width: Math.trunc(Dimensions.get('window').width * 0.96),
            marginTop: Math.trunc(Dimensions.get('window').width * 0.02),
            borderRadius: 4,
            borderWidth: 5,
            borderColor: "white",
            //alignItems: 'flex-end',
            //justifyContent: 'flex-start',
            //direction: 'inherit', 
        },
        inner_box: {
            flexDirection: 'row',
            alignContent: 'flex-start',
        },
        background_image: {
            height: 115,
            width: 115,
            marginHorizontal: 2,
            marginVertical: 2,
        },
        text_container: {
            justifyContent: 'flex-start',
            flexDirection: 'column',
            backgroundColor: 'white',
            width: Math.trunc(Dimensions.get('window').width * 0.65),
        },
        inner_text_container: {
            flexDirection: 'row',
            marginBottom: 2,
            marginLeft: 4,
        },
        inner_text_apart_container: {
            marginBottom: 2,
            marginLeft: 4,
            justifyContent: 'flex-start',
            flexDirection: 'row'
        },
        main_text: {
            fontSize: 14,
            marginRight: 15,
            color: 'black',
        },
        description_text: {
            fontSize: 14,
            marginRight: 16,
            color: 'gray',
        },
        name_text: {
            fontSize: 18,
            color: 'black',
        },
    }
);

/*
const post_styles = StyleSheet.create(
    {
        post_button: {
            flexDirection: "row",
            position: 'absolute',
            borderRadius: 3,
            borderWidth: 4,
            backgroundColor: GlobalValues.ORANGE_COLOR,
            borderColor: GlobalValues.ORANGE_COLOR,
            padding: 3,
            paddingVertical: 0,
            alignSelf: 'center',
            alignContent: 'center',
            marginBottom: 50,
        },
        post_button_text: {
            color: 'white',
            fontSize: 18,
            alignSelf: 'center',
        }
    }
);*/

const post_styles = StyleSheet.create(
    {
        post_button: {
            flexDirection: "row",
            padding: 3,
            paddingVertical: 0,
            alignSelf: 'center',
            backgroundColor: GlobalValues.ORANGE_COLOR,
            borderColor: GlobalValues.ORANGE_COLOR,
            minWidth: 50,
            minHeight: 50,
            top: 10,
            left: 50,
            position: 'absolute'
        },
        post_button_text: {
            color: 'white',
            fontSize: 18,
            alignSelf: 'center',
        }
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
            width: Math.trunc(Dimensions.get('window').width * 0.86),
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
            flexDirection: 'column',
            backgroundColor: 'white', //#FFCDCD
            borderRadius: 5,
            padding: 8,
        },
        top_bar_area_top: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        top_bar_gap: {
            borderBottomWidth: 1,
            borderColor: GlobalValues.DARKER_OUTLINE,
            marginVertical: '2%'
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
        
            //deal if name if too long to fit on screen
            /*if (this.state.name.length > 25) {
                this.state.name = this.state.name.substring(0, 22) + "...";
            }*/
        }
        else if (this.props.type == "activity") {
            this.state.name = this.props.name;
            
            //deal if name if too long to fit on screen
            /*if (this.state.name.length > 40) {
                this.state.name = this.state.name.substring(0, 37) + "...";
            }*/
        }
    }

    render() {
        
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

        var windowWidth = Math.trunc(Dimensions.get('window').width);

        if (this.props.type == "person") {
            return (
                <View style={frame_styles.box} >
                    <TouchableHighlight underlayColor={"white"} onPress={() => {
                        this.props.navigation.navigate("Other Profile Screen", {id: this.props.id, type: "none", viewing:""});
                    }}>
                        <View style={frame_styles.inner_box}>
                            <Image style={frame_styles.background_image} source={{uri: "https://image.cnbcfm.com/api/v1/image/106926992-1628885077267-elon.jpg"}}/>
                            <View style={[frame_styles.text_container, {width: '65%'}]}>
                                <View style={frame_styles.inner_text_container}>
                                    <Text numberOfLines={1} style={frame_styles.name_text}>
                                        {this.state.name}
                                    </Text> 
                                </View>
                                <View style={frame_styles.inner_text_apart_container}>
                                    <Text style={frame_styles.main_text}>
                                        <FontAwesome style={{marginRight: 0}} name="road" size={12} color="gray"/>
                                        {" " + this.props.distance + " miles"}
                                    </Text> 
                                    <Text style={frame_styles.main_text}>
                                        <MaterialCommunityIcons name="baby" size={12} color="lightskyblue" />
                                        {" " + this.props.age + " y.o."}
                                    </Text>
                                </View>
                                <View style={[frame_styles.inner_text_container, {maxHight: 50}]}>
                                    <Text numberOfLines={4} style={[frame_styles.description_text, {flex: 1, flexWrap: 'wrap'}]}>
                                        {this.props.description}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        }
        else if (this.props.type == "activity") {
            return (
                <View style={frame_styles.box} >
                    <TouchableHighlight underlayColor={"white"} onPress={() => {
                        this.props.navigation.navigate("Other Activity Screen", {id: this.props.id, type: "none", viewing:""});
                    }}>
                        <View style={frame_styles.inner_box}>
                            <View style={[frame_styles.text_container, {width: '100%'}]}>
                                <View style={frame_styles.inner_text_container}>
                                    <Text style={frame_styles.name_text}>
                                        {this.state.name}
                                    </Text> 
                                </View>
                                <View style={[frame_styles.inner_text_apart_container]}>
                                    <Text style={frame_styles.main_text}>
                                        <FontAwesome style={{marginRight: 0}} name="road" size={12} color="gray"/>
                                        {" " + this.props.distance + " miles"}
                                    </Text> 
                                    <Text style={frame_styles.main_text}>
                                        <FontAwesome name="calendar" size={12} color="red" />
                                        {" " + this.props.date_time}
                                    </Text> 
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        }
        else {
            return (
                <View>

                </View>
            );
        }

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
                this.state.loading = true;
                this.state.reload = false;

                this.lazyUpdate();

                this.updateSearch();

                GlobalProperties.search_filters_updated = false;
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
                this.state.frameComponents.push(<FrameComponent key={json.id} id={json.id} type={json.type} name={json.name} description={json.description} date_time={json.date_time} distance={json.distance} navigation={this.props.navigation}/>);
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
        //make sure the attriutes are good
        /*if (!this.validateAttributes()) {
            return;
        }*/

        /*
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
        }*/

        //if map has not been set
        if (GlobalProperties.map_params == null) {
            //use user's location
            var location = await GlobalEndpoints.getLocation();

            if (!location.granted) {
                Alert.alert("Permission to access location was denied.\nEnable location access or use map.");

                //use map settings
                GlobalProperties.use_map_settings = true;
            }
            else if (location.location == null) {
                Alert.alert("Location could not be determined.\nUsing map settings.");

                //use map settings
                GlobalProperties.use_map_settings = true;
            }
            else {
                //if can get, set it to map_params
                GlobalProperties.map_params = {
                    latitude: location.location.coords.latitude,
                    longitude: location.location.coords.longitude,
                    latitudeDelta: GlobalProperties.default_map_params.latitudeDelta,
                    longitudeDelta: GlobalProperties.default_map_params.longitudeDelta
                }
            }
        }

        //update search
        var body = {};
        var requestUrl = "";

        //get body
        if (GlobalProperties.search_type == "people") {
            body = {
                "radius": GlobalProperties.search_radius,
                "minimum_age": GlobalProperties.search_minAge,
                "maximum_age": GlobalProperties.search_maxAge,
                "location": {
                    "latitude": GlobalProperties.map_params.latitude,
                    "longitude": GlobalProperties.map_params.longitude,
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
                "radius": GlobalProperties.search_radius,
                "location": {
                    "latitude": GlobalProperties.map_params.latitude,
                    "longitude": GlobalProperties.map_params.longitude,
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
                    <View style={{minHeight: '100%', flex: 1}}>
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

/**
                                 
                        <TouchableHighlight style={post_styles.post_button} underlayColor="white" onPress={() => {this.props.navigation.navigate("Activity Creation Screen")}} onHideUnderlay={() => {}} onShowUnderlay={() => {}}>         
                                <Text style={post_styles.post_button_text}>
                                    Create
                                </Text>
                        </TouchableHighlight>      */

//                                <TextInput style={inline_attribute_styles.text_input} placeholderTextColor="black" editable={true} maxLength={160} ref={(input) => {this.state.attributes_input_handler = input}} onEndEditing={(event) => {this.addFilter(event.nativeEvent.text)}}/>


    ScrollViewIsCloseToBottom(layoutMeasurement, contentOffset, contentSize) {
        //const paddingToBottom = 20;
        //return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    }

    /**
     * 
                            <View style={main_styles.search_bar}>
                                <Feather name="search" size={30} color="gray" style={{alignSelf: 'center'}}/>
                                <TextInput style={main_styles.text_input} placeholderTextColor="black"/>
                            </View>

                            
                            <TouchableHighlight underlayColor="white" onPress={() => {this.props.navigation.navigate("Activity Creation Screen")}} onHideUnderlay={() => {}} onShowUnderlay={() => {}}>
                                <View style={post_styles.post_button}>
                                    <Text style={post_styles.post_button_text}>
                                        Create
                                    </Text>
                                </View>
                            </TouchableHighlight>
     */

    // contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", flexGrow: 1}} 

    validateAttributes() {
        if (GlobalProperties.search_filters_updated && (typeof(GlobalProperties.search_attributes) == "undefined" || typeof(GlobalProperties.search_attributes) == "null" || GlobalProperties.search_attributes.length == 0)) {
            Alert.alert("You must specify attributes for searching\nattributes are set in the filters page");
            return false;
        }

        return true;
    }

    
    //for the filters
    addFilter(input) {
        GlobalProperties.search_filters_updated = true;
        GlobalProperties.map_filters_updated = true;

        this.addAttribute(input);
        //clear the text input
        this.state.attributes_input_handler.clear();
        //update the screen
        this.lazyUpdate();
    }

    addAttribute(attribute) {
        //check if it already exists
        if (!GlobalProperties.search_attributes.includes(attribute)) {
            //if not, add it
            GlobalProperties.search_attributes.push(attribute);
        }
    }

    removeAttribute(attribute) {
        var newAttributes = []

        for (const attr of GlobalProperties.search_attributes) {
            if (attr != attribute) {
                newAttributes.push(attr);
            }
        }

        GlobalProperties.search_attributes = newAttributes;
    }

    //after delete alert, delete attribute and update screen
    afterDeleteAlertAttributes(attr) {
        GlobalProperties.search_filters_updated = true;
        GlobalProperties.map_filters_updated = true;

        this.removeAttribute(attr);
        this.lazyUpdate();
    }

    lazyUpdate() {
        this.forceUpdate();
    }
}

class FilterSnap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return( 
            <TouchableOpacity activeOpacity={1} onPress={() => {deleteAlertAttributes(this.props.parent, this.props.innerText, this.props.id)}}>
                <Text style={[filter_snaps_styles.inner_text, { backgroundColor: this.props.color, borderColor: this.props.color}]}>
                    {this.props.innerText}
                </Text>
            </TouchableOpacity>
        );
    }
}

FilterSnap.defaultProps = {
    color: GlobalValues.ORANGE_COLOR,
}

const deleteAlertAttributes = (frameComponent, attr) => {
    Alert.alert(
        "Delete",
        "Are you sure you want to delete this attribute?",
        [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "Delete",
                onPress: () => frameComponent.afterDeleteAlertAttributes(attr),
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