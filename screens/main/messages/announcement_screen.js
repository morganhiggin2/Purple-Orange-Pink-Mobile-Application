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
            fontFamily: 'Roboto',
            fontSize: 24,
            color: 'black',
            padding: 5,
            marginBottom: 5,
        }, 
        name_text: {
            alignSelf: 'center',
            fontFamily: 'Roboto',
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
            fontFamily: 'Roboto',
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
            fontFamily: 'Roboto',
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
            fontFamily: 'Roboto',
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
        <Text style={{fontSize: 24, fontFamily: 'Roboto', color: 'black'}}>
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

export class AnnouncementScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.route.params.title,
            _id: this.props.route.params._id,
            sub_header_id: this.props.route.params.sub_header_id,
            subHeader: null,
            body: this.props.route.params.body,
            type_id: this.props.route.params.type_id,
            type: this.props.route.params.type,

            other_id: null,
            other_type: "",

            //for loading screen
            loading: false,
            reload: false,
        };

        this.fetchAnnouncement = this.fetchAnnouncement.bind(this);

        //once done, lazy update
        this.lazyUpdate = this.lazyUpdate.bind(this);
    }
    
    componentDidMount() {
        //init

        //fetch data
        this.fetchAnnouncement();
    }

    async fetchAnnouncement() {
        this.state.subHeader = await GlobalProperties.messagesHandler.getAnnouncementInformation(this.state.sub_header_id);

        this.state.other_id = this.state.subHeader.other_id;
        this.state.other_type = this.state.subHeader.other_type;

        this.lazyUpdate();
    }

    render() {
        var renderViewOther = {};

        if (this.state.other_type == "activity"){
            renderViewOther = (
                <View>
                    <TouchableOpacity style={actions_styles.actions_button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {this.props.navigation.navigate("Other Activity Screen", {id: this.state.other_id, type: "none", viewing:""});}}>
                        <View style={actions_styles.action_button_inner}>
                            <AntDesign name="message1" size={20} color="white" style={actions_styles.action_button_icon}/>
                            <Text style={actions_styles.action_button_text}>
                                View Activity
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            renderViewOther = (
                <View/>
            );
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
                        <View style={main_styles.name_view}>
                            <Text style={main_styles.title_text}>
                                {this.state.title}
                            </Text>
                        </View>
                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Announcement
                            </Text>
                            <Text style={info_styles.inner_text}>
                                {this.state.body}
                            </Text>
                        </View>
                        <View style={info_styles.body}>
                            <Text style={info_styles.title_text}>
                                Actions
                            </Text>
                            <View style={actions_styles.actions_view}> 
                                {renderViewOther}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }

    lazyUpdate() {
        this.forceUpdate();
    }
}
