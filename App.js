import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Login from './components/Login';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Login/>
      </View>
    );
  }
}
