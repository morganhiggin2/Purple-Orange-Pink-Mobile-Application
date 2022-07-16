import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 
import { GlobalValues } from '../../global/global_properties';

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: '#FFEDE7',
            height: '100%',
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
            fontFamily: 'Roboto'
        }, 
        sub_button: {
            alignSelf: 'center',
            backgroundColor: '#FF6969',
            padding: 3,
            marginTop: 20,
            borderRadius: 10,
            padding: 5,
            width: "80%"
        },
        button: {
            borderRadius: 5,
            borderWidth: 4,
            backgroundColor: GlobalValues.ORANGE_COLOR,
            borderColor: GlobalValues.ORANGE_COLOR,
            padding: 2,
            paddingVertical: 6,
            alignSelf: 'center',
            alignContent: 'center',
            width: '80%',
            marginBottom: "20%",
        },
        button_inner_section: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        button_text: {
            color: 'white',
            fontFamily: 'Roboto',
            fontSize: 18,
            marginLeft: '5%',
        },
    }
);

export class SetupSelectorScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={main_styles.page}>
                <View style={main_styles.sub_section} >
                    <Text style={main_styles.title_text}>
                        Expand your profile
                    </Text>
                    <TouchableHighlight style={main_styles.sub_button}>
                        <View style={main_styles.button_inner_section}>
                            <Text style={main_styles.button_text}>
                                An Option
                            </Text>
                            <AntDesign name="right" size={24} color="white" />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={main_styles.sub_button}>
                        <View style={main_styles.button_inner_section}>
                            <Text style={main_styles.button_text}>
                                Another Option
                            </Text>
                            <AntDesign name="right" size={24} color="white" />
                        </View>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight style={[main_styles.button, {marginTop: '10%'}]}>
                    <Text style={[main_styles.button_text, {marginLeft: 0, alignSelf: 'center'}]} onPress={() => {this.props.navigation.navigate("Setup Selector")}} underlayColor="#ffb59c">
                        Continue
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}