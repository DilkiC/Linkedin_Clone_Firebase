import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {} from '@react-native-community/masked-view';


import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import Login from './components/Login';
import Register from './components/Register';
import Firestore from './components/Firestore';
import LoadAll from './components/LoadAll';
import FileUpload from './components/FileUpload';
import Home from './components/Home';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="register" component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name="home" component={Home} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}
