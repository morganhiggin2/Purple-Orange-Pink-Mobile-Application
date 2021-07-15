import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, ScrollView} from 'react-native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {TouchableHighlight} from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 

const ImageStack = createMaterialTopTabNavigator();

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
            color: 'black',
            padding: 5,
            marginBottom: 5,
        }, 
        name_text: {
            alignSelf: 'center',
            fontSize: 20,
            color: 'black',
            marginTop: 10,
        },
        name_view: {
            flexDirection: 'row',
            justifyContent: 'center',
        },
        scroll_view: {
            backgroundColor: '#FFEBE7',
        },
    }
);

const image_styles = StyleSheet.create(
    {
        page: {
            width: 250,
            height: 255,
            marginTop: '10%',
            marginBottom: 5,
            alignSelf: 'center',
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 2,
        },
        image: {
            width: 250,
            height: 250,
        },
    }
);

const info_styles = StyleSheet.create(
    {
        body: {
            backgroundColor: 'white', //#FFCDCD
            borderRadius: 10,
            padding: 8,
            marginVertical: "2%",
            marginHorizontal: '2%'
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
        }
    }
);

const filter_snaps_styles = StyleSheet.create(
    {
        inner_text: {
            borderRadius: 8,
            borderWidth: 2,
            paddingHorizontal: 3,
            paddingVertical: 1,
            fontSize: 16,
            color: 'white', 
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginHorizontal: 2,
            marginVertical: 2,
            textAlign: 'center',
        },
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        }
    }
);

class FilterSnap extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return( 
            <Text style={[filter_snaps_styles.inner_text, { backgroundColor: this.props.color, borderColor: this.props.color}]}>
                {this.props.innerText}
            </Text>
        );
    }
}

FilterSnap.defaultProps = {
    color: '#FF7485',
}

export class OtherProfileScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    async log_in() {
        
    }

    render() {
        return (
            <View style={main_styles.page}>

                <ScrollView style={main_styles.scroll_view}>
                    <View style={image_styles.page}>
                        <ImageStack.Navigator initialRouteName="Testing" swipeEnabled={true} tabBarOptions={{showLabel: false, style: {height: 3, backgroundColor: 'gray'}, tabStyle: {height: 0}, indicatorStyle: {height: 3, backgroundColor: 'white'}}}>
                            <ImageStack.Screen name="Testing" component={Testing}/>
                            <ImageStack.Screen name="Testing2" component={Testing}/>
                            <ImageStack.Screen name="Testing3" component={Testing}/>
                        </ImageStack.Navigator>
                    </View>

                    <View style={main_styles.name_view}>
                        <Text style={main_styles.title_text}>
                            Joe Smith
                        </Text>
                        <Text style={[main_styles.title_text, {color: 'orange'}]}>
                            19
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginBottom: 10}}>
                        <View style={[filter_snaps_styles.inner_text, { backgroundColor: "#EC2783", borderColor: "#EC2783", flexDirection: 'row', justifyContent: 'center', alignSelf: 'center'}]}>
                            <AntDesign name="lock" size={18} color="white" style={{alignSelf: 'center', marginRight: 4}}/>
                            <Text style={{color: 'white', fontSize: 18}}>
                                Single
                            </Text>
                        </View>

                        <View style={[filter_snaps_styles.inner_text, { backgroundColor: "green", borderColor: "green"}]}>
                            <Text style={{color: 'white', fontSize: 18}}>
                                Active: 4m ago
                            </Text>
                        </View>
                    </View>

                    <View style={info_styles.body}>
                        <Text style={info_styles.title_text}>
                            Some Styles
                        </Text>
                        <Text style={info_styles.inner_text}>
                            This is the section about the info and i dont know if this is going to wrap but it should around the edge dammit this should fit
                        </Text>
                    </View>
                    
                    <View style={info_styles.body}>
                        <Text style={info_styles.title_text}>
                            Activities
                        </Text>
                        <View style={filter_snaps_styles.container}> 
                            <FilterSnap innerText="mountain biking" />
                            <FilterSnap innerText="fishing" />
                            <FilterSnap innerText="travel" />
                            <FilterSnap innerText="camping" />
                        </View>
                    </View>

                    <View style={info_styles.body}>
                        <Text style={info_styles.title_text}>
                            Traits
                        </Text>
                        <View style={filter_snaps_styles.container}> 
                            <FilterSnap innerText="humerous" />
                            <FilterSnap innerText="dark" />
                            <FilterSnap innerText="giggley" />
                            <FilterSnap innerText="adventorus" />
                            
                        </View>
                    </View>

                    <View style={info_styles.body}>
                        <Text style={info_styles.title_text}>
                            Distance away, personal calender, etc
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const Testing = () => {
    return(
        <Image style={image_styles.image} source={require("../../../images/fakelogo.jpg")}/>
    );
}

//<View style={{ borderBottomColor: '#CCCCCC', borderBottomWidth: 2, width: '95%', alignSelf: 'center', marginBottom: 0,}}/>
//<FilterSnap innerText="light" color="#9A39E2"/>
/*

<View style={frame_styles.box} onPress={() => {this.props.navigation.navigate("Other Profile Screen")}}>
                <Text style={frame_styles.main_text}>
                    {this.props.id}
                </Text>
            </View>

*/