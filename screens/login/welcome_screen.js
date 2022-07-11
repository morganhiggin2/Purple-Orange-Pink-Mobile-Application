import React from 'react';
import {StyleSheet, View, Text, Image, ImageBackground} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { GlobalProperties, GlobalValues } from '../../global/global_properties';

//'#F3604D'

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
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
            width: "100%",
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: GlobalValues.ORANGE_COLOR,
            marginTop: 20,
            borderColor: GlobalValues.ORANGE_COLOR, 
            justifyContent: 'center',
        },
        button_text: {
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: "white", //Helvetica Neue
        },
        logo: {
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginTop: '10%'
        },
        third_screen: {
            width: '33%',
            height: '100%',
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

    //<ImageBackground style={{width: '100%', height: '100%'}} source={require("../../images/background.png")}>

    render() {
        return (
                <View style={main_styles.page}>
                    <Image style={main_styles.logo} source={require("../../images/fakelogo.png")} resizeMode='contain'/>
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
                                Join
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
        );
    }
}