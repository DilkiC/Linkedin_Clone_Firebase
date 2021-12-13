import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {} from '@react-native-community/masked-view';


import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'



import Firestore from './components/Firestore';
import LoadAll from './components/LoadAll';

import AddPost from './components/AddPost';

import FirstScreen from './screens/FirstScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './components/Home';

import Network from './screens/Network';
import Post from './screens/Post'; 
import Notification from './screens/Notification';
import Jobs from './screens/Jobs'; 

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
      <Stack.Screen name="first" component={FirstScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="register" component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name="home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="post" component={AddPost} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>

    
    );
  }
}
