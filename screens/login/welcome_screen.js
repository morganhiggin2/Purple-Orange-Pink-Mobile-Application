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
        image_section: {
            height: '60%',
            justifyContent: 'center'
        },
        quote_section: {
            paddingHorizontal: "10%",
            alignSelf: 'center',
            marginTop: '0%',
        },
        quote_text: {
            fontFamily: 'Roboto',
            fontSize: 28,
            textAlign: 'center',
            color: 'black',
            fontFamily: 'Roboto'
        },
        welcome_section: {
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
            fontFamily: 'Roboto',
            fontSize: 18,
            fontWeight: 'bold',
            color: "white", 
            fontFamily: 'Roboto'
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
    }

    render() {
        return (
                <View style={main_styles.page}>
                    <View style={main_styles.image_section}>
                        <Image style={main_styles.logo} source={require("../../assets/images/LogoWhiteHeader.jpg")} resizeMode='contain'/>
                        <View style={main_styles.quote_section}>
                            <Text style={main_styles.quote_text}>
                                Do something with someone new.
                            </Text>
                        </View>
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