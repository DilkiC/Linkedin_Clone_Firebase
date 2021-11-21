import React, { Component } from 'react';
import {  View, Text,StyleSheet,ImageBackground, KeyboardAvoidingView, Alert } from 'react-native';
import {Button,TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userName:'',
        email:'',
        password:''
    };
  }

//.........register user.................
  registerUser = () =>{
    auth()
  .createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then((createdUser) => {
    createdUser.user.updateProfile({
      displayName:this.state.userName
    })

    this.createTwoButtonAlert();
    //console.log('User account created & signed in!');
    console.log(createdUser.user)
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
      //Alert.alert('')
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
  }



//..................... alerts.............................
  createTwoButtonAlert = () =>
    Alert.alert(
      "Registration",
      "User account created & signed in!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );





  render() {
    return (
      /*         <ImageBackground source={require("assert/Rose.jpg")}style={styles.backImg}>
 */
        <KeyboardAvoidingView behavior='position'  style={{backgroundColor:'white'}}>

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

     
    </KeyboardAvoidingView>
   /*  </ImageBackground> */
    );
  }
}

const styles=StyleSheet.create({
  input:{
      alignSelf:'center',
      width:300,
      height:50,
      marginBottom:10,
      backgroundColor:'white', borderColor:'gray',
      fontSize:12,
      
  },
  logo1:{
      color:'#0652DD',fontWeight:'bold',marginTop:15,marginLeft:10,fontSize:16,

  },
  logo2:{
      backgroundColor:'#0652DD',fontWeight:'bold',color:'white',marginTop:15,marginBottom:20,fontSize:16,

  },
  join:{
      fontWeight:'bold',color:'gray',marginTop:20,fontSize:12,marginLeft:110,marginRight:10,

  },
  signin:{
      fontWeight:'bold',marginTop:15,borderRadius:20,borderColor:'blue',marginBottom:10,
  },
  para:{
      fontSize:28,marginTop:20,color:'#d59667',marginLeft:15,marginBottom:30,

  },
  joinBtn:{
      fontWeight:'bold',marginTop:40,borderRadius:20,borderColor:'blue',width:300,alignSelf:'center',
  }


  

});

