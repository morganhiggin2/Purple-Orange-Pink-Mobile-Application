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

export class YourFeedFiltersScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    async log_in() {

    }

    render() {
        return (
            <View style={main_styles.page}>
                <View style={filter_styles.body}>
                    <Text style={filter_styles.title_text}>
                        Title
                    </Text>
                    <Text style={filter_styles.inner_text}>
                        The good stuff
                    </Text>
                </View>
                
                <View style={filter_styles.body}>
                    <Text style={filter_styles.title_text}>
                        Title
                    </Text>
                    <Text style={filter_styles.inner_text}>
                        The good stuff
                    </Text>
                </View>
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

