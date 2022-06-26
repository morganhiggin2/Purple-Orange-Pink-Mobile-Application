import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, ScrollView, Dimensions, TouchableHighlight, Alert} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { GlobalValues, GlobalProperties } from '../../global/global_properties';
import { GlobalEndpoints } from '../../global/global_endpoints';
 
const main_styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100%'
    },
    container: {
        alignSelf: 'center',
    },
    button: {
        backgroundColor: 'orange',
    },
    title_text: {
        color: 'black',
        fontSize: 16,
    },
});

const post_styles = StyleSheet.create(
    {
        post_button: {
            flexDirection: "row",
            alignItems: 'flex-start',
            borderRadius: 3,
            borderWidth: 4,
            backgroundColor: '#FE3C3C',
            borderColor: '#FE3C3C',
            padding: 3,
            paddingVertical: 0,
            alignSelf: 'center',
            alignContent: 'center',
            marginTop: 10,
        },
        post_button_text: {
            color: 'white',
            fontSize: 18,
            alignSelf: 'center',
        }
    }
);

export class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.lazyUpdate = this.lazyUpdate.bind(this);
    }
 
   componentDidMount() {
     
   }
 
 
   render() {
       return (
           <View style={main_styles.page}>
               {!this.props.reload ? 
               (
                   <View style={main_styles.container}>
                    <Text style={main_styles.title_text}>
                            Loading...
                        </Text>
                   </View>
               ) 
               : 
               (
                   <View style={main_styles.container}>
                       <Text style={main_styles.title_text}>
                            Could not load
                        </Text>
                        <TouchableHighlight underlayColor="white" onHideUnderlay={() => {}} onShowUnderlay={() => {}} onPress = {() => {
                            //could be this?
                            if (this.props.tryAgain) {
                                this.props.tryAgain();
                            }
                        }}>
                            <View style={post_styles.post_button}>
                                <Text style={post_styles.post_button_text}>
                                    Reload
                                </Text>
                            </View>
                        </TouchableHighlight>
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