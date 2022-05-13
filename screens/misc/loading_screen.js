import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, ScrollView, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { GlobalValues, GlobalProperties } from '../../global/global_properties';
import { GlobalEndpoints } from '../../global/global_endpoints';
 
const main_styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
    },
    container: {
        alignSelf: 'center',
        marginTop: '40%',
    },
    button: {
        backgroundColor: 'orange',
    }
});

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
                        <Text>
                        Loading...
                        </Text>
                   </View>
               ) 
               : 
               (
                   <View style={main_styles.container}>
                       <Text>
                        Could not load
                        </Text>
                        <TouchableOpacity style={main_styles.button} activeOpacity={GlobalValues.ACTIVE_OPACITY} onPress = {() => {
                            //could be this?
                            if (this.props.tryAgain) {
                                this.props.tryAgain();
                            }
                        }}>
                            <Text>
                                Reload
                            </Text>
                        </TouchableOpacity>
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