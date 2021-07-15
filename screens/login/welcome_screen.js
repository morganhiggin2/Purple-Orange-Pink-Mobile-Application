import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Image} from 'react-native';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: '#F3604D',
            height: '100%',
        },
        quote_section: {
            paddingHorizontal: "10%",
            alignSelf: 'center',
            marginTop: '0%',
        },
        quote_text: {
            fontSize: 28,
            textAlign: 'center',
            color: 'white'
        },
        welcome_section: {
            marginTop: '25%',
            paddingHorizontal: '10%',
        },
        button: {
            height: 40,
            width: "90%",
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: 'white',
            marginTop: 20,
            borderColor: 'white', 
            justifyContent: 'center',
        },
        button_text: {
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: "#F3604D",
            fontFamily: "Arial", //Helvetica Neue
        },
        logo: {
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginTop: '10%'
        }
    }
);

export class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    log_in() {

    }

    sign_up() {

    }

    render() {
        return (
            <View style={main_styles.page}>
                <Image style={main_styles.logo} source={require("../../images/fakelogo.jpg")} resizeMode='contain'/>
                <View style={main_styles.quote_section}>
                    <Text style={main_styles.quote_text}>
                        This is an app, the best app, clearly ever made.
                    </Text>
                </View>
                <View style={main_styles.welcome_section}>
                    <TouchableHighlight style={main_styles.button} onPress={() => {this.props.navigation.navigate("Login Screen")}} underlayColor="#FFE1D6">
                        <Text style={main_styles.button_text}>
                            Login
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={main_styles.button} onPress={() => {this.props.navigation.navigate("Basic Info")}} underlayColor="#FFE1D6">
                        <Text style={main_styles.button_text}>
                            Sign Up
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}