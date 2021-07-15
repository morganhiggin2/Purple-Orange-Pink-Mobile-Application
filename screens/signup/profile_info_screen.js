import React from 'react';
import {StyleSheet, View, Text, TextInput, Image} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: '#FFEDE7', //FFEDE7 FFE7DF
            height: '100%',
            width: '100%',
        },
        sub_section: {
            alignItems: 'center',
        },
        text_field: {
            width: "80%",
            backgroundColor: 'white',
            padding: 10,
            paddingVertical: 10,
            borderRadius: 10,
            marginVertical: 8,
            color: 'darkgray',
        },
        title_text: {
            fontSize: 24,
            color: 'gray',
            marginTop: '10%',
            marginLeft: '10%',
            padding: 5,
            width: '100%'
        }, 
        button: {
            borderRadius: 5,
            borderWidth: 4,
            backgroundColor: '#FE3C3C',
            borderColor: '#FE3C3C',
            padding: 2,
            paddingVertical: 6,
            alignSelf: 'center',
            alignContent: 'center',
            width: '80%',
            marginTop: "5%",
        },
        button_text: {
            color: 'white',
            fontSize: 18,
            alignSelf: 'center',
        },
    }
);

export class ProfileInfoScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: 'heyy',
        };
    }

    async log_in() {

    }

    render() {
        return (
            <View style={main_styles.page}>
                <Text style={main_styles.title_text}>
                    Bare Minimum
                </Text>
                <View style={main_styles.sub_section} >
                    <TextInput style={main_styles.text_field} textContentType="givenName" placeholder='First Name' placeholderTextColor='gray' options={{}}/>
                    <TextInput style={main_styles.text_field} textContentType="givenName" placeholder='Last Name' placeholderTextColor='gray'/>
                    <TextInput style={main_styles.text_field} keyboardType='numeric' placeholder='Date of Birth' placeholderTextColor='gray'/>
                </View>
                
                <TouchableHighlight style={main_styles.button}>
                    <Text style={main_styles.button_text} onPress={() => {this.props.navigation.navigate("Setup Selector")}} underlayColor="#ffb59c">
                        Next
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

/*
date of birth, etc
//add special field type for age for date, and rename birthdate
*/