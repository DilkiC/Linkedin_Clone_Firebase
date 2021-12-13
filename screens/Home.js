import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Network from './Network';
import Post from './Post';
import Notification from './Notification';
import Jobs from './Jobs';

const Tab = createBottomTabNavigator();

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Tab.Navigator>
      <Tab.Screen name="post" component={Post} options={{tabBarLabel:'home'}}/>
      <Tab.Screen name="network" component={Network} options={{tabBarLabel:'network'}}/>
      </Tab.Navigator>
    );
  }
}
