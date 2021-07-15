/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import { NavigationContainer, StackActions, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';

import {WelcomeNavigator} from './screens/login/welcome_navigator.js';
import {MainNavigator} from './screens/main/main_navigator.js';

/*
render() {
    let isLoggedIn = true;

    return (
      isLoggedIn ? (
        <MainNavigator />
      ) : (
        <WelcomeNavigator />
      )
    );
  }
*/

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let isLoggedIn = true;

    return (
      isLoggedIn ? (
        <MainNavigator />
      ) : (
        <WelcomeNavigator />
      )
    );
  }
}

export default App;

/*
cd App
- npm start # you can open iOS, Android, or web from here, or run them directly with the commands below.
- npm run android
- npm run ios # requires an iOS device or macOS for access to an iOS simulator
- npm run web
*/