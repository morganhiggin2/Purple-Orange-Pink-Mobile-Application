import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import { GlobalValues } from '../../global/global_properties';
 
const main_styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100%'
    },
    container: {
        alignSelf: 'center',
    },
    button: {
        backgroundColor: 'orange',
    },
    title_text: {
        color: 'black',
        fontSize: 16,
    },
});

const post_styles = StyleSheet.create(
    {
        post_button: {
            flexDirection: "row",
            alignItems: 'flex-start',
            borderRadius: 3,
            borderWidth: 4,
            backgroundColor: GlobalValues.ORANGE_COLOR,
            borderColor: GlobalValues.ORANGE_COLOR,
            padding: 3,
            paddingVertical: 0,
            alignSelf: 'center',
            alignContent: 'center',
            marginTop: 10,
        },
        post_button_text: {
            color: 'white',
            fontFamily: 'Roboto',
            fontSize: 18,
            alignSelf: 'center',
        }
    }
);

export class LoadingScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.lazyUpdate = this.lazyUpdate.bind(this);
    } 
 
    render() {
        return (
            <View style={main_styles.page}>
                {!this.props.reload ? 
                (
                   <View style={main_styles.container}>
                    <Text style={main_styles.title_text}>
                            Loading...
                        </Text>
                   </View>
                ) 
                : 
                (
                    <View style={main_styles.container}>
                        <Text style={main_styles.title_text}>
                            Could not load
                        </Text>
                        <TouchableHighlight underlayColor="white" onHideUnderlay={() => {}} onShowUnderlay={() => {}} onPress = {() => {
                            //could be this?
                            if (this.props.tryAgain) {
                                this.props.tryAgain();
                            }
                         }}>
                             <View style={post_styles.post_button}>
                                 <Text style={post_styles.post_button_text}>
                                     Reload
                                 </Text>
                             </View>
                         </TouchableHighlight>
                    </View>
                    
                )
                }
            </View>
        );
    }
 
    lazyUpdate() {
        this.forceUpdate();
    }
}