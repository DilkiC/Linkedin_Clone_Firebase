import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userName:'',
        email:'',
        password:''
    };
  }

  render() {
    return (
      /*         <ImageBackground source={require("assert/Rose.jpg")}style={styles.backImg}>
 */
        <View style={{backgroundColor:'white'}}>

            <View style={{flexDirection: 'row'}}>
            <Text style={styles.logo1} >Linked </Text>
            <Text style={styles.logo2}>in</Text>
            <Text style={styles.join}>Join now</Text>
            <Button mode='outlined' color='blue'   labelStyle={{fontSize:10}}  style={styles.signin}>Sign in</Button>
            </View>
            
           <Text style={styles.para}>Welcome to your professional community</Text>
        
           <TextInput 
        label="Email" 
        
        value={this.state.email}
        onChangeText={text => this.setState(
          {email:text}
          )} 
          style={styles.input}       
        />

        <TextInput 
        label="User Name"
        
        value={this.state.userName}
        onChangeText={text => this.setState(
          {userName : text}
          )} 
          style={styles.input}       
        />

        <TextInput
        label="Password"
        secureTextEntry
        value={this.state.password}
        onChangeText={text => this.setState(
          {password : text}
          )} 
          style={styles.input}       
        />

    <Button onPress={this.registerUser} mode='contained' color='#3742fa'  labelStyle={{fontSize:14}}  style={styles.joinBtn}>Join</Button>

     
    </View>
   /*  </ImageBackground> */
    );
  }
}
