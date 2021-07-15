import React from 'react';
import {StyleSheet, View, Text, TextInput, Image} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: '#FFEDE7',
            height: '100%',
            width: '100%',
        },
        login_section: {
            marginTop: '10%',
        },
        login_sub_section: {
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
        login_text: {
            fontSize: 24,
            color: 'gray',
            marginBottom: '0 %',
            marginLeft: '10%',
            padding: 5,
            width: '100%'
        },
        button: {
            borderRadius: 5,
            borderWidth: 4,
            backgroundColor: '#F3604D',
            borderColor: '#F3604D',
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
        }
    }
);

export class LoginScreen extends React.Component {
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
                    <View style={main_styles.login_section}>  
                        <Text style={main_styles.login_text}>
                            Log in
                        </Text>
                        <View style={main_styles.login_sub_section} >
                            <TextInput style={main_styles.text_field} textContentType="username" placeholder='Username' placeholderTextColor='gray' options={{}}/>
                            <TextInput style={main_styles.text_field} textContentType="password" placeholder='Password' placeholderTextColor='gray' secureTextEntry={true}/>
                        </View>
                    
                    <TouchableHighlight style={main_styles.button}>
                        <Text style={main_styles.button_text}>
                            Next
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}