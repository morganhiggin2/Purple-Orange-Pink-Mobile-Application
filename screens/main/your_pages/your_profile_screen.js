import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, ScrollView} from 'react-native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {TouchableHighlight} from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: 'white', //#FFEDE7
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
            fontSize: 24,
            color: 'gray',
            padding: 5,
            marginBottom: 5,
        }, 
        name_text: {
            alignSelf: 'center',
            fontSize: 20,
            color: 'black',
            marginTop: 10,
        },
    }
);

export class YourProfileScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    async log_in() {
        
    }

    render() {
        return (
            <View style={main_styles.page}>
                <Text>
                    Poop
                </Text>
            </View>
        );
    }
}

/*

<View style={frame_styles.box} onPress={() => {this.props.navigation.navigate("Other Profile Screen")}}>
                <Text style={frame_styles.main_text}>
                    {this.props.id}
                </Text>
            </View>

*/

//<Octicons name="diff-added" size={24} color="black" /> add this to the end of the filters, a text should appear, you enter in a filter, and it adds it to the list
//to delete a filter, hold on it for a second (not too long)