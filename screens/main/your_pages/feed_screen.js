import React, { useEffect, useState } from 'react';
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

const post_styles = StyleSheet.create(
    {
        body: {
            backgroundColor: 'white', //#FFCDCD
            borderRadius: 5,
            padding: 8,
            marginVertical: "2%",
            marginHorizontal: '2%',
            alignItems: "flex-start",
            flexDirection: "row",            
            flexWrap: 'wrap',
            justifyContent: 'space-between',
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
            flexDirection: "row",
            alignItems: 'flex-start',
            borderRadius: 3,
            borderWidth: 4,
            backgroundColor: '#FE3C3C',
            borderColor: '#FE3C3C',
            padding: 3,
            paddingVertical: 0,
            alignSelf: 'center',
            alignContent: 'center',
            marginTop: "5%",
        },
        post_button_text: {
            color: 'white',
            fontSize: 18,
            alignSelf: 'center',
        }
    }
);

const blip_styles = StyleSheet.create(
    {
        body: {
            backgroundColor: 'white', //#FFCDCD
            borderRadius: 5,
            padding: 8,
            marginVertical: "2%",
            marginHorizontal: '2%',
            borderLeftWidth: 5,
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
        inner_top_bar_left: {
            flexDirection: "row",
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            borderRadius: 5,
            paddingHorizontal: 4,
        },
        inner_top_bar_right: {
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

const DATA = [
    {
        id: "001",
        name: "Morgan Higginbotham",
        type: 'blurb',
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

//<Feather style={{marginLeft: 5}} name="plus-square" size={30} color={"gray"} />
//, {id: this.props.id}
//this.props.navigation.navigate("Post Options Screen")

function dataType(item) {
    switch(item.type) {
        case "blurb":
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

function colorCode(item) {
    switch(item.type) {
        case "blurb":
            return("#4194f2");
        case "image":
            return("#f24159");
        case "activity":
            return("#FE3C3C");
    }
}

/*{switch(item.type) {
                case "text":
                    <Text style={blip_styles.inner_text}>
                        {item.data}
                    </Text>
            }}*/

export class FeedScreen extends React.Component{
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
            {this.postBar()}
            <FlatList 
            data = {DATA}
            renderItem = {this.renderItem}
            keyExtractor={item => item.id}
            extraData={this.state.selectedItem}
            />
        </SafeAreaView>
        );
    }

    //backgroundColor: color, 

    renderItem({item}) {
        var color = colorCode(item);

        return (
            <View style={[blip_styles.body, {borderColor: color}]}>
                <View style={blip_styles.top_bar}>
                    <View style={blip_styles.inner_top_bar_left}>
                        <Image style={{width: 16, height: 16, alignSelf: 'center'}} source={require("../../../images/fakelogo.png")}/>
                        <Text style={blip_styles.top_text}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={blip_styles.inner_top_bar_right}>
                        <AntDesign name="eyeo" size={20} color="black" />
                        <Text style={{marginLeft: 2}}>
                            {item.views}
                        </Text>
                        
                        <TouchableHighlight style={{marginLeft: 10}} underlayColor="white" onPress={() => {}} onHideUnderlay={() => {this.setState({selectedItem: null})}} onShowUnderlay={() => {this.setState({selectedItem: item.id})}}> 
                            <Feather name="trash-2" size={20} color={this.state.selectedItem == item.id ? "red" : "black"} />
                        </TouchableHighlight>
                    </View>
                </View>
                
                {dataType(item)}
            </View>
        );
    }

    postBar() {
        return (
            <View style={post_styles.body}>
                <TouchableHighlight underlayColor="white" onPress={() => {this.props.navigation.navigate("Post Options Screen")}} onHideUnderlay={() => {}} onShowUnderlay={() => {}}>
                    <View style={post_styles.post_button}>
                        <Text style={post_styles.post_button_text}>
                            Post
                        </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={{marginLeft: 10}} underlayColor="white" onPress={() => {this.props.navigation.navigate("Your Feed Filters Screen")}} onHideUnderlay={() => {}} onShowUnderlay={() => {}}>
                    <Feather name="list" size={30} color="gray" />
                </TouchableHighlight>
            </View>
        );
    }
}

//this.state.selectedItem == item.id ? "red" : "black"

/*
<SafeAreaView>
                 <FlatList 
                    data = {DATA}
                    renderItem = {renderItem}
                    keyExtractor={item => item.id}
                 />
             </SafeAreaView>
*/



/*
const [listData, setListData] = useState(
        Array(20)
            .fill('')
            .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
    );
*/
/*import { SwipeListView } from 'react-native-swipe-list-view';


export default function YourFeedScreen() {
    const listData = [{
      key: 1,
      text: "hello",
    },
    {
      key: 2,
      text: "hello 2"
    }];

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => (
            <View style={styles.rowFront}>
                <Text>I am {data.item.text} in a SwipeListView</Text>
            </View>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});
*/

//make sure there is a cap on how long the name can be or it will push everything off the edge