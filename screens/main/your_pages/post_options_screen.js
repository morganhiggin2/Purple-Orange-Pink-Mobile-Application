import React from 'react';
import {StyleSheet, View, Text, TextInput, Image} from 'react-native';
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
            marginTop: "5%",
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

const post_styles = StyleSheet.create(
    {
        body: {
            backgroundColor: 'white', //#FFCDCD
            borderRadius: 10,
            padding: 8,
            marginVertical: "4%",
            width: '80%',            
        },
        title_text: {
            color: 'black',
            fontSize: 16,
            marginLeft: 5,
        }, 
        inner_text: {
            color: 'gray',
            fontSize: 14,
            marginLeft: 5,
        },
        top_bar: {
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            //alignItems: 'flex-end'
        },
        top_text: {
            color: 'black',
            fontSize: 16,
            marginLeft: 4,
        },
        inner_top_bar: {
            flexDirection: "row",
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
        },
        post_button: {
            borderRadius: 5,
            borderWidth: 4,
            padding: 3,
            paddingVertical: 2,
            alignSelf: 'center',
            alignContent: 'center',
            marginTop: "5%",
            width: '90%',
        },
        post_button_text: {
            color: 'white',
            fontSize: 20,
            alignSelf: 'center',
        }
    }
);

const filter_styles = StyleSheet.create(
    {
        body: {
            //backgroundColor: '#FFCDCD',
            //borderRadius: 10,
            paddingHorizontal: 8,
            marginTop: '5%',
            marginHorizontal: '3%'
        },
        title_text: {
            color: 'black',
            fontSize: 22,
            marginTop: 0,
            fontWeight: 'bold',
        },
        inner_text: {
            color: 'gray',
            fontSize: 18,
            marginTop: 3,
        }
    }
);

export class PostOptionsScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    async log_in() {

    }

    render() {
        return (
            <View style={main_styles.page}>
                <View>
                    <Text style={main_styles.title_text}>
                        What should you post?
                    </Text>
                </View>
                <TouchableHighlight underlayColor="white" onPress={() => {this.props.navigation.dangerouslyGetParent().navigate("Activity Creation Screen")}} onHideUnderlay={() => {}} onShowUnderlay={() => {}}>
                    <View style={[post_styles.post_button, { backgroundColor: '#FE3C3C', borderColor: '#FE3C3C',}]}>
                        <Text style={post_styles.post_button_text}>
                            Activity
                        </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="white" onPress={() => {this.props.navigation.dangerouslyGetParent().navigate("Blurb Creation Screen")}}>
                    <View style={[post_styles.post_button, { backgroundColor: '#4194f2', borderColor: '#4194f2',}]}>
                        <Text style={post_styles.post_button_text}>
                            Blurb
                        </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="white" onPress={() => {this.props.navigation.dangerouslyGetParent().navigate("Image Creation Screen")}}>
                    <View style={[post_styles.post_button, { backgroundColor: '#f24159', borderColor: '#f24159',}]}>
                        <Text style={post_styles.post_button_text}>
                            Image
                        </Text>
                    </View>
                </TouchableHighlight>
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


//create json object in explore class, pass into props to filters screen, then
//have function loop though json to create objects, which there being a array of filter objects (a slider class, radio selector class, checkbox selector class),
// while passing the nessesary values from the json part into the object (a prop)

//convert json to javascript object with 
// var obj = JSON.parse(old_json)
//then can edit values, then to convert back, use
// ver new_json = JSON.stringify(obj)

/*
once each filter object is created, the specific parts of the json object are are used to create the options of the filter object in the constructor.
these object can be edited when values are changed in the object, and because objects are bassed by copy-reference, the changes here will be the changes in the class json object in the explore class.
*/