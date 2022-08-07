import React from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { AntDesign} from '@expo/vector-icons'; 
import { GlobalProperties, GlobalValues } from '../../../global/global_properties';
import { LoadingScreen } from '../../misc/loading_screen';

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

const info_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        marginHorizontal: 8,
        borderRadius: 4,
        marginVertical: 16
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
});

const attribute_styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flexDirection: "column",
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    input_text_view: {
        flexDirection:  'row',
        marginBottom: 4,
    },
    multiline_input_text: {
        fontSize: 14, 
        maxHeight: "96px", 
        textAlignVertical: "top",
        fontFamily: 'Roboto'
    },
    title_text: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontFamily: 'Roboto',
        color: 'black',
        marginBottom: 2,
    },    
    text_input: {
        textAlignVertical: "top",
        flex: 1,
        maxHeight: 95,
        borderRadius: 8,
        fontFamily: 'Roboto'
    },
    inner_text: {
        color: 'gray',
        fontSize: 14,
        marginHorizontal: 4,
        fontFamily: 'Roboto'
    },
    slider: {
        alignSelf: 'center',
    },
    title_with_value: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title_value: {
        fontSize: 14,
        alignSelf: 'center',
        fontFamily: 'Roboto'
    }
});

const actions_styles = StyleSheet.create(
    {
        body: {

        },
        actions_button:  {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
            paddingHorizontal: 10,
        },
        action_button_inner: {
        },
        action_button_icon: {
        },
        action_button_text: {
            color: 'black',
            fontFamily: 'Roboto',
            fontSize: 16,
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
            borderWidth: 2,
            paddingHorizontal: 3,
            paddingVertical: 0,
            fontFamily: 'Roboto',
            fontSize: 16,
            textAlign: 'center',
            color: 'white', 
            fontWeight: 'bold',
            alignSelf: 'center',
            marginHorizontal: 2,
            marginVertical: 1,
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
        GlobalProperties.return_screen = "Announcement Screen";
        GlobalProperties.screen_props = {
            _id: this.state._id,
        };

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
                        <Text style={actions_styles.action_button_text}>
                            View Activity
                        </Text>
                        <AntDesign name="right" size={20} color="black" style={actions_styles.action_button_icon}/>
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
                            <View style={attribute_styles.body}>
                                <Text style={attribute_styles.title_text}>
                                    Announcement
                                </Text>     
                                <View style={attribute_styles.input_text_view}>
                                    <Text style={attribute_styles.text_input}>
                                        {this.state.body}
                                    </Text>
                                </View>                   
                            </View> 
                        </View>
                        <View style={info_styles.body}>
                            {renderViewOther}
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
