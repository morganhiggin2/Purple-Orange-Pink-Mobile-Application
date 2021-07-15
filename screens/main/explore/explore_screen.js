import React from 'react';
import {StyleSheet, View, Text, TextInput, Image, SafeAreaView, ScrollView, Dimensions, FlatList} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { AntDesign, Feather } from '@expo/vector-icons'; 
import {Route} from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { render } from 'react-dom';

const frame_styles = StyleSheet.create(
    {
        box: {
            backgroundColor: 'orange',
            height: Math.trunc(Dimensions.get('window').width * 0.3),
            width: Math.trunc(Dimensions.get('window').width * 0.3),
            marginLeft: Math.trunc(Dimensions.get('window').width * 0.029),
            marginBottom: Math.trunc(Dimensions.get('window').width * 0.029),
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            direction: 'inherit',
            borderRadius: 4,
        },
        main_text: {
            fontSize: 14,
            marginLeft: 2,
            marginBottom: 2,
            color: 'white',
        },
    }
);

const main_styles = StyleSheet.create(
    {
        page: {
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
        },
        search_bar: {
            paddingHorizontal: 7,
            backgroundColor: '#DFDFDF',
            borderRadius: 10,
            //width: '50%',
            //alignContent: 'center',
            flexDirection: 'row',
            width: Math.trunc(Dimensions.get('window').width * 0.85),
        },
        text_input: {
            backgroundColor: '#DFDFDF', //#FECAB9
            color: 'darkgray',
            padding: 0,
            margin: 0,
            borderWidth: 0,
            fontSize: 20,
            color: 'black',
            width: Math.trunc(Dimensions.get('window').width * 0.85) - 30 - 5 - 14,
            marginLeft: 5,
        },
        top_bar: {
            flexDirection: 'row',
            padding: "3%",
            backgroundColor: 'white',
        },
        scroll_area: {
            
        }
    }
);
class FrameComponent extends React.Component{
    constructor(props) {
        super (props);

        this.state = {
            //properties
        }
    }



    render() {
        return(
            <TouchableHighlight style={frame_styles.box} onPress={() => {this.props.navigation.navigate("Other Profile Screen", {id: this.props.id})}}>
                <Text style={frame_styles.main_text}>
                    {this.props.id}
                </Text>
            </TouchableHighlight>
        )
    }
}

const EmptySpace = (props) => {
    const btbh = useBottomTabBarHeight();

    return(
        <View style={{height: btbh, width: '100%'}}>
        </View>
    )
}

export class ExploreScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            frameComponents: [],
        };
    }

    componentDidMount() {
        for(i = 0; i < 17; i++) {
            this.addFrameComponent("", i);
        }
    }

    addFrameComponent(json = " ", id = 0) {
        this.setState(prevState => ({frameComponents: [...prevState.frameComponents, 
            <FrameComponent key={id} id={id} navigation={this.props.navigation}
                
            />]}))
    }
 
    /*
    async componentDidMount() {
        try{
            let response = await fetch("http://192.168.0.86:8000/stock/");
            let json = await response.json();
            this.createStockComponents(json);
        } catch(error) {
            console.error(error);
        }
    }
    */

    createFrameComponents(json) {
        for (var i = 0; i < json.length; i++) { 
            var frame = json[i];

            this.setState(prevState => ({frames: [...prevState.stockComponents, 
            <StockComponent 
                //company_name = {stock.company_name} ticker_symbol = {stock.ticker_symbol} current_price = {stock.current_stock_price} open_price = {stock.open_price}/>]}))
            />]}))
        }
    }

    async log_in() {

    }

    render() {
        const frames = this.state.frameComponents

        return (
            <View style={main_styles.page}>
                    {this.state.isLoading ? 
                    (<Text>
                        Loading...
                    </Text>) : (
                    <View style={{flex: 1}}>
                        <View style={main_styles.top_bar}>
                            <View style={main_styles.search_bar}>
                                <Feather name="search" size={30} color="gray" style={{alignSelf: 'center'}}/>
                                <TextInput style={main_styles.text_input} placeholderTextColor="black"/>
                            </View>
                            <TouchableHighlight style={{marginLeft: 5}} underlayColor="white" onPress={() => {this.props.navigation.navigate("Explore Filters Screen", {id: this.props.id})}}>
                                <Feather name="list" size={36} color="gray" />
                            </TouchableHighlight>
                        </View>
                        <View>
                            <ScrollView contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", flexGrow: 1}}>  
                                {frames.map((component) => (component))}
                                <EmptySpace key={0}/>
                            </ScrollView>
                        </View>

                    </View>) 
                    }
            </View>
        );
    }
}

//<Feather name="search" size={30} color="gray" style={{alignSelf: 'center'}}/>
//<View style={{ borderBottomColor: '#CCCCCC', borderBottomWidth: 2, width: '97%', alignSelf: 'center'}}/> 
//#FFC2B5 was border color for underline

//fix it not going into the slot

/*
<ScrollView contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", flexGrow: 1}}>  
                                {frames.map((component) => (component))}
                            </ScrollView>
*/

//use flatlist to not reder all components at once? or just keep adding to it when reaching bottom, though this can create performance issues. {frames.map((component) => (component))}



//find the real height of UseBottomTabBarHeight or set the height yourself