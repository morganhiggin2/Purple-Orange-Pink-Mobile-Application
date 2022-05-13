import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, SafeAreaView, ScrollView, Dimensions, ImageBackground, TouchableWithoutFeedbackBase} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {GlobalProperties, GlobalValues} from '../../../global/global_properties.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
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

const portal_styles = StyleSheet.create(
    {
        portals_container: {
            //marginTop: Math.trunc(((Dimensions.get('window').height - 120) / 2) - ((100 * 2 + 50) / 2))
        },
        portal: {
            width: 100,
            height: 100,
        },
        top_row: {
            alignItems: 'center',
        },
        bottom_row: {
            flexDirection: 'row', 
            //justifyContent: 'space-between',
            //width: '75%',
            alignSelf: 'center',
            marginTop: 50,
        }
    }
);

const map_styles = StyleSheet.create(
    {
        body: {
            width: '100%',
            height: '100%',
        },
    }
);

const EmptySpace = (props) => {
    const btbh = useBottomTabBarHeight();

    return(
        <View style={{height: 100, width: '100%'}}>
        </View>
    )
}

export class PortalScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            global_props: null,
        };

        this.lazyUpdate = this.lazyUpdate.bind(this);
    }

    componentDidMount() {
        /*for(i = 0; i < 17; i++) {
            this.addFrameComponent("", i);
        }*/
        
        this.props.navigation.addListener('focus', () => {
                /*for (const prop in props.filters) {
                    console.log(prop.type + " " + prop.value);
                }*/
            this.state.global_props = GlobalProperties.screen_props;
            GlobalProperties.screenActivated();
        });
    }


/*
                <TouchableOpacity onPress={() => {GlobalProperties.is_logged_in = false; GlobalProperties.app_lazy_update();}}>
                    <Text>
                        Press
                    </Text>
                </TouchableOpacity>*/

    render() {
        return (
            <View style={main_styles.page}>
                <View style={portal_styles.portals_container}>
                    <View style={portal_styles.top_row}>
                        <TouchableOpacity style={[portal_styles.portal, {backgroundColor: 'orange'}]} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress={() => {GlobalProperties.is_logged_in = false; GlobalProperties.app_lazy_update();}}>
                            <Text style={{color: 'white', fontSize: 24}}>
                                Firends
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={portal_styles.bottom_row}>
                        <TouchableOpacity style={[portal_styles.portal, {backgroundColor: 'pink', marginRight: 100}]} activeOpacity={GlobalValues.ACTIVE_OPACITY}>
                            <Text style={{color: 'white', fontSize: 24}}>
                                Dating
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[portal_styles.portal, {backgroundColor: 'purple'}]} activeOpacity={GlobalValues.ACTIVE_OPACITY}>
                            <Text style={{color: 'white', fontSize: 24}}>
                                Casual
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    lazyUpdate() {
        this.forceUpdate();
    }
}