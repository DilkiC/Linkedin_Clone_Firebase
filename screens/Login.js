import React, { Component } from 'react';
import {  View, Text,StyleSheet,ImageBackground } from 'react-native';
import {Button,TextInput} from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin,GoogleSigninButton } from '@react-native-google-signin/google-signin';

import Register from '../screens/Register';
import Home from '../screens/Home';

GoogleSignin.configure({
  webClientId: '1022932489646-sgimo7isbqrp73b8cimk5hdc6m9g60hs.apps.googleusercontent.com',
});


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password:'',
        username:'',
        isChecked:false,
    };
    const user=auth().currentUser;

    if(user){
      console.log("user email:",user.email);
    }



  }


  //user login....................password--->dilki1997
  userLogin =()=>{
    auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((user) => {
        console.log(user);
        console.log('User logged in!');
    })
    .then(()=>{
      this.props.navigation.navigate('home',{username:this.state.username})

    })
    .catch(error => {
      console.log('login failed');
    });
  }


  //..............google sign in.........................
  onGoogleButtonPress = async () => {

    // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
  console.log((await user).user);
  await GoogleSignin.signOut();

  }



  //..................... alerts.............................
  loggedAlert = () =>
    Alert.alert(
      "Login",
      "Logged in",
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
      <View>
        <View style={{flexDirection: 'row',justifyContent:'center'}}>
            <Text style={styles.logo1} >Linked </Text>
            <Text style={styles.logo2}>in</Text>
        </View>

        <Text style={styles.sign}>Sign in</Text>
        <Text style={styles.desc}>Stay updated on your proessional world</Text>

        <TextInput 
        label="Email" 
        
        value={this.state.email}
        onChangeText={text => this.setState(
          {email:text}
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

        <Button  mode='' color='#3742fa'  labelStyle={{fontSize:10,fontWeight:'bold',}}  style={styles.forgot}>Forgot password?</Button>
        <Button onPress={this.userLogin}  mode='contained' color='#3742fa'  labelStyle={{fontSize:14}}  style={styles.signBtn}>Sign in</Button>

        <Text style={{color:"gray",alignSelf:'center',margin:10}}>or</Text>

        {<GoogleSigninButton
        style={styles.signBtn}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this.onGoogleButtonPress}
        />
        }

        <View style={{flexDirection: 'row',alignSelf:'center',marginTop:20,}}>
        <Text style={{color:"gray",margin:10,fontWeight:'bold',}}>New to Linkedin?</Text>
        <Button  mode='' color='#3742fa'  labelStyle={{fontSize:10,fontWeight:'bold',}}  style={{color:'blue',marginTop:5,}}
        onPress={() => {
          this.props.navigation.navigate('register');
        }}
        >Join now</Button>

        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
    input:{
        alignSelf:'center',
        width:300,
        height:50,
        marginBottom:15,
        backgroundColor:'white', borderColor:'gray',
        fontSize:12,
        
    },
    logo1:{
        color:'#0652DD',fontWeight:'bold',marginTop:20,fontSize:18,

    },
    logo2:{
        backgroundColor:'#0652DD',fontWeight:'bold',color:'white',marginTop:20,marginBottom:20,fontSize:18,

    },
    sign:{
        fontWeight:'bold',color:'black',fontSize:25,alignSelf:'center'

    },
    desc:{
        alignSelf:'center',fontSize:12,color:'gray',fontWeight:'bold',marginBottom:20,    
    },
    forgot:{
        
    },
    signBtn:{
        fontWeight:'bold',marginTop:20,borderRadius:20,borderColor:'blue',width:300,alignSelf:'center',
    },

    

});
