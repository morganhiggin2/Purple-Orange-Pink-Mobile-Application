import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    SafeAreaView,
    FlatList,
    StatusBar,
    Image,
} from 'react-native';
import { color } from 'react-native-reanimated';
import {AntDesign, Feather} from '@expo/vector-icons';

const main_styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        flexDirection: 'row-reverse',
    }
});


const blip_styles = StyleSheet.create(
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
        }
    }
);

const inner_blip_styles = StyleSheet.create(
    {
        text: {
            color: 'gray',
            fontSize: 14,
            marginLeft: 5,
        }
    }
)

const title_styles = StyleSheet.create(
    {
        inner_text: {
            borderRadius: 4,
            borderWidth: 0,
            paddingHorizontal: 3,
            paddingVertical: 1,
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

/*const main_styles = StyleSheet.create(
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
            color: 'gray',
            padding: 5,
            marginBottom: 5,
        }, 
        name_text: {
            alignSelf: 'center',
            fontSize: 20,
            color: 'black',
            marginTop: 10,
        },
    }
);*/

const DATA = [
    {
        id: "001",
        name: "Morgan Higginbotham",
        type: 'activity',
        views: '534',
        data: 'Sorry losers and haters, but my I.Q. is one of the highest -and you all know it! Please don’t feel so stupid or insecure,it’s not your fault'
    },

]

/*
const renderItem = ({item}) => (
    <View style={blip_styles.body}>
        <View style={blip_styles.top_bar}>
            <Text style={blip_styles.top_text}>
                {item.name}
            </Text>
            <View style={blip_styles.stats}>
                <AntDesign name="eyeo" size={20} color="black" />
                <Text style={{marginLeft: 2}}>
                    {item.views}
                </Text>
                
                <TouchableHighlight style={{marginLeft: 10}} underlayColor="white" onPress={() => {}}>
                    <Feather name="trash-2" size={20} color="black" />
                </TouchableHighlight>
            </View>
        </View>
            {dataType(item)}
        </View>
);*/

function titleType(item) {
    switch(item.type) {
        case "activity":
        return(
            <TouchableHighlight underlayColor="#ed6ba8">
                <View style={[title_styles.inner_text, { backgroundColor: "#EC2783", borderColor: "#EC2783", flexDirection: 'row', justifyContent: 'center', alignSelf: 'center'}]}>
                    <Text style={{color: 'white', fontSize: 16}}>
                        The Activity
                    </Text>
                </View>
            </TouchableHighlight>
        );
        default:
            return(
                <Text>
                    You're gay
                </Text>
            );
    }
}

function dataType(item) {
    switch(item.type) {
        case "activity":
            //number of people wanting to go, number of slots open, number of slots total, time and day, etc
            return(
                <Text style={blip_styles.inner_text}>
                    {item.data} 
                </Text>
            );
        default:
            return(
                <Text>
                    You're gay
                </Text>
            );
    }
}

/*{switch(item.type) {
                case "text":
                    <Text style={blip_styles.inner_text}>
                        {item.data}
                    </Text>
            }}*/

export class ManageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: -1,
        }

        this.renderItem = this.renderItem.bind(this);
    }

    render() {
        return(
        <SafeAreaView>
            <FlatList 
            data = {DATA}
            renderItem = {this.renderItem}
            keyExtractor={item => item.id}
            extraData={this.state.selectedItem}
            />
        </SafeAreaView>
        );
    }

    renderItem({item}) {
        return (
            <View style={blip_styles.body}>
                <View style={blip_styles.top_bar}>
                    <View style={blip_styles.inner_top_bar}>
                        {titleType(item)}
                    </View>
                    <View style={blip_styles.inner_top_bar}>
                        <TouchableHighlight style={{marginLeft: 10}} underlayColor="white" onPress={() => {}} onHideUnderlay={() => {this.setState({selectedItem: null})}} onShowUnderlay={() => {this.setState({selectedItem: item.id})}}> 
                            <Feather name="trash-2" size={20} color={this.state.selectedItem == item.id ? "red" : "black"} />
                        </TouchableHighlight>
                    </View>
                </View>
                    {dataType(item)}
                </View>
        );
    }
}

//make sure there is a cap on how long the name can be or it will push everything off the edge

/*

<View style={frame_styles.box} onPress={() => {this.props.navigation.navigate("Other Profile Screen")}}>
                <Text style={frame_styles.main_text}>
                    {this.props.id}
                </Text>
            </View>

*/