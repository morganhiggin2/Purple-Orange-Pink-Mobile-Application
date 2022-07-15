import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView, Dimensions, Alert, RefreshControl, TouchableOpacity} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { GlobalProperties, GlobalValues } from '../../../global/global_properties.js';
import { GlobalEndpoints } from '../../../global/global_endpoints.js';
import { LoadingScreen } from '../../misc/loading_screen.js';

const frame_styles = StyleSheet.create(
    {
        box: {
            backgroundColor: 'white',
            width: Math.trunc(Dimensions.get('window').width * 0.96),
            marginTop: 10,
            borderRadius: 4,
            borderWidth: 5,
            borderColor: "white",
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
            fontFamily: "Roboto",
        },
        description_text: {
            fontSize: 14,
            marginRight: 16,
            color: 'gray',
            fontFamily: "Roboto",
        },
        name_text: {
            fontSize: 18,
            color: 'black',
            fontFamily: 'Roboto',
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
            width: Math.trunc(Dimensions.get('window').width * 0.86),
        },
        text_input: {
            backgroundColor: '#DFDFDF',
            color: 'darkgray',
            fontFamily: 'Roboto',
            fontSize: 14,
            color: 'black',
            width: Math.trunc(Dimensions.get('window').width * 0.85) - 30 - 5 - 14,
            marginLeft: 5,
        },
        top_bar: {
            flexDirection: 'column',
            backgroundColor: 'white',
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

const filter_snaps_styles = StyleSheet.create(
    {
        inner_text: {
            borderRadius: 5,
            borderWidth: 1,
            paddingHorizontal: 3,
            paddingVertical: 1,
            fontFamily: 'Roboto',
            fontSize: 14,
            color: 'white', 
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginHorizontal: 2,
            marginVertical: 1,
            flexDirection: 'row',
        },
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
        }
    }
);

class FrameComponent extends React.Component{
    constructor(props) {
        super (props);

        this.state = {
            //hasImage: true,
        };

        if (this.props.type == "person") {
            this.state.name = this.props.name;
        }
        else if (this.props.type == "activity") {
            this.state.name = this.props.name;
        }
    }

    render() {
        var renderDescription = {};
        
        if (this.props.description != null && this.props.description != "") {
            if (this.props.type == "person") {
                renderDescription = (
                    <View style={[frame_styles.inner_text_container, {maxHight: 50}]}>
                        <Text numberOfLines={4} style={[frame_styles.description_text, {flex: 1, flexWrap: 'wrap'}]}>
                            {this.props.description}
                        </Text>
                    </View>
                );
            }
            else if (this.props.type == "activity") {
                renderDescription = (
                    <View style={[frame_styles.inner_text_container, {maxHight: 50}]}>
                        <Text numberOfLines={3} style={[frame_styles.description_text, {flex: 1, flexWrap: 'wrap'}]}>
                            {this.props.description}
                        </Text>
                    </View>
                );
            }
            else {
                renderDescription = (<View />);
            }
        }
        else {
            renderDescription = (<View />);
        }

        if (this.props.type == "person") {
            return (
                <View style={frame_styles.box} >
                    <TouchableHighlight underlayColor={"white"} onPress={() => {
                        this.props.navigation.navigate("Other Explore Profile Screen", {id: this.props.id});
                    }}>
                        <View style={frame_styles.inner_box}>
                            <Image style={frame_styles.background_image} source={handleImageURI(this.props.image_uri)}/>
                            <View style={[frame_styles.text_container, {width: '65%'}]}>
                                <View style={frame_styles.inner_text_container}>
                                    <Text numberOfLines={1} style={frame_styles.name_text}>
                                        {this.state.name}
                                    </Text> 
                                </View>
                                <View style={frame_styles.inner_text_apart_container}>
                                    <Text style={frame_styles.main_text}>
                                        <FontAwesome name="road" size={12} color="gray" style={filter_snaps_styles.icon}/>
                                        {" " + this.props.distance + " miles"}
                                    </Text> 
                                    <Text style={frame_styles.main_text}>
                                        <MaterialCommunityIcons name="baby" size={12} color="lightskyblue" />
                                        {" " + this.props.age + " y.o."}
                                    </Text>
                                </View>
                                {renderDescription}
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
                                        <FontAwesome name="road" size={12} color="gray" style={filter_snaps_styles.icon}/>
                                        {" " + this.props.distance + " miles"}
                                    </Text> 
                                    <Text style={frame_styles.main_text}>
                                        <FontAwesome name="calendar" size={12} color="red" />
                                        {" " + this.props.date_time}
                                    </Text> 
                                </View>
                                {renderDescription}
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

function handleImageURI(uri) {
    console.log(uri);
    if (uri == undefined || uri == "") {
        return({uri: "../../../assets/images/default_image.png"});
    }
    else {
        return({uri: uri});
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

            //page num
            page_number: 1,

            frameComponents: [],
            global_props: null,
        };

        this.validateAttributes = this.validateAttributes.bind(this);
        this.ScrollViewIsCloseToBottom = this.ScrollViewIsCloseToBottom.bind(this);
        this.reloadResults = this.reloadResults.bind(this);
        
        this.updateSearch = this.updateSearch.bind(this);
        this.updateUsers = this.updateUsers.bind(this);

        this.lazyUpdate = this.lazyUpdate.bind(this);        
    }

    componentDidMount() {
        GlobalProperties.currentExploreScreenSearchUpdate = this.updateSearch;
        
        this.props.navigation.addListener('focus', () => {
            //update lazy update method for current explore screen
            GlobalProperties.currentExploreScreenSearchUpdate = this.updateSearch;

            if (GlobalProperties.return_screen == "Other Explore Profile Screen" && GlobalProperties.screen_props != null) {
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

            if (GlobalProperties.search_filters_updated) {
                this.state.loading = true;
                this.state.reload = false;

                this.state.region = GlobalProperties.map_params;

                this.lazyUpdate();

                this.state.page_number = 1;

                this.updateSearch();

                GlobalProperties.search_filters_updated = false;
            }

            GlobalProperties.screenActivated();
        });

        this.updateSearch();
    }

    updateUsers() {
        //when page increase is implemented, TODO get rid of this
        this.state.frameComponents = [];

        for (var i = 0; i < this.state.frames.length; i++) { 
            var json = this.state.frames[i];

            if (json.type == "person") {
                this.state.frameComponents.push(<FrameComponent key={json.id} id={json.id} image_uri={json.profile_image_uri} type={json.type} name={json.name} description={json.description} age={json.age} distance={json.distance} navigation={this.props.navigation}/>);
            }
            else if (json.type == "activity") {
                this.state.frameComponents.push(<FrameComponent key={json.id} id={json.id} type={json.type} name={json.name} description={json.description} date_time={json.date_time} distance={json.distance} navigation={this.props.navigation}/>);
            }
        }
    }

    async updateSearch() {
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

                //set to deafult region
                GlobalProperties.default_map_params = GlobalProperties.map_params;
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
                "medium": GlobalProperties.medium,
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
                                onRefresh={() => {this.reloadResults();}}/>}
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

    //reload results
    reloadResults() {
        this.state.page_number = 1;
        this.state.loading = true;
        this.updateSearch();
    }

    ScrollViewIsCloseToBottom(layoutMeasurement, contentOffset, contentSize) {
        //if we are at max
        if (this.state.frames.length == GlobalValues.SEARCH_PAGE_SIZE * this.state.page_number) {
            //then load more
            this.state.page_number++;
            this.updateSearch();
        }
    }

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