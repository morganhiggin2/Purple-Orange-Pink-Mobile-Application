import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert} from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { GlobalEndpoints } from '../../global/global_endpoints';
import { GlobalValues, GlobalProperties } from '../../global/global_properties';
import { WebView } from 'react-native-webview';

const main_styles = StyleSheet.create({
    webview: {

    }
});

export class EULAPolicyScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <WebView 
                style={main_styles.webview}
                source={{ uri: GlobalValues.HOST + '/api/AccountManager/EULAPolicy' }}
            />
        );
    }

}