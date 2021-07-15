import React from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: 'white',
            height: '50%',
            width: '100%',
            flexDirection: "column",
            //justifyContent: "space-between",
            flex: 1,
        },
        sub_section: {
            marginTop: '10%',
        },
        title_text: {
            alignSelf: 'center',
            fontSize: 24,
            color: 'gray',
            padding: 5,
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
            backgroundColor: '#FE3C3C',
            borderColor: '#FE3C3C',
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
            fontSize: 18,
            marginLeft: '5%',
        },
    }
);

//minHeight: "96px",

const attribute_styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        marginTop: 20,
        marginHorizontal: 6,
    },
    input_text_view: {
        flexDirection:  'row',
    },
    multiline_input_text: {
        fontSize: 18, 
        maxHeight: "96px", 
        textAlignVertical: "top",
    },
    title_text: {
        alignSelf: 'flex-start',
        fontSize: 16,
        color: '#707070',
        marginBottom: 2,
    },
    text_input: {
        backgroundColor: '#ffd4cc',
        textAlignVertical: "top",
        flex: 1,
        maxHeight: 92,
        paddingVertical: 2,
    }
});

const post_button_styles = StyleSheet.create({
    button_view: {
        marginVertical: 10,
        flexDirection: 'row-reverse',
        marginHorizontal: 10,
    },
    button: {
        flexDirection: "row",
        alignItems: 'flex-start',
        borderRadius: 5,
        borderWidth: 4,
        backgroundColor: '#FE3C3C',
        borderColor: '#FE3C3C',
        paddingHorizontal: 20,
        paddingVertical: 0,
        alignSelf: 'center',
        alignContent: 'center',
        marginTop: "5%",
    },
    button_text: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center',
    }
})
                    //react-native-date-picker
                    //react-native-slider
                    //react-native-image-picker

export class ImageCreationScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    async log_in() {

    }

    render() {
        //const maxFontHeight = PixelRatio.getFontScale() * 18 * 4;

        return (
            <View style={main_styles.page}>
                <ScrollView>  
                    <View style={attribute_styles.body}>
                        <Text style={attribute_styles.title_text}>
                            Title
                        </Text>
                        <View style={attribute_styles.input_text_view}>
                            <TextInput style={attribute_styles.text_input} placeholderTextColor="black" editable={true} maxLength={160}/>
                        </View>
                    </View>
                    <View style={attribute_styles.body}>
                        <Text style={attribute_styles.title_text}>
                            Description
                        </Text>     
                        <View style={attribute_styles.input_text_view}>
                            <TextInput style={[attribute_styles.text_input, {fontSize: 18, textAlignVertical: "top"}]} multiline={true} editable={true} maxLength={160} numberOfLines={4} scrollEnables={true} />
                        </View>                   
                    </View>
                    <View style={attribute_styles.body}>
                        <Text style={attribute_styles.title_text}>
                            Date
                        </Text>                     
                    </View>
                </ScrollView>
                <View style={post_button_styles.button_view}>
                    <TouchableHighlight style={post_button_styles.button}>
                        <Text style={post_button_styles.button_text}>
                            Post
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}