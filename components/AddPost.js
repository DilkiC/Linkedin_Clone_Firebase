import React, { Component } from 'react';
import { View, Text,StyleSheet, Alert,Image,TouchableOpacity } from 'react-native';
import {Button,TextInput} from 'react-native-paper';
import Home from './Home';
import ImagePicker from 'react-native-image-crop-picker';

import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
        imagePath:'',
        imageName:'',
        url:'',
        post:'',
        
        
    };
  }

  getImageFromGallery = () => {
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image); //image.path
        this.setState({
            imagePath:image.path
        })
        this.setState({
            imageName:image.modificationDate //modDate is unique.it is useful for when uploading same image twice
        })
        this.uploadImage();
      });

  }


  uploadImage = async () =>{

    //const fileName = this.state.imageName + ".jpg";
    const fileName = this.state.imageName;
    const reference = storage().ref(`images/${fileName}.jpg`); //creating images folder and uploading images
    await reference.putFile(this.state.imagePath);

    this.setState({
      url:await storage().ref(`images/${fileName}.jpg`).getDownloadURL()
  })
  console.log(this.state.url);

    /* const url = await storage().ref(`images/${fileName}`).getDownloadURL();
    console.log(url);
    this.state.url=url; */


  }

  savePost=()=>{
    firestore()
    .collection('posts')
    .add({
      //userId:this.state.userId,
      url:this.state.url,
      post:this.state.post,
      
      postTime:firestore.Timestamp.fromDate(new Date()),
      likes:null,
      comments:null,
      //name: this.state.name,
      
    })
    .then(() => {
      console.log('post added!');
      Alert.alert("Post Published");
      this.setState({
          url:"",
          imageName:"",
          imagePath:"",
          post:'',
      })
      
    })
    .catch((error)=>{
      console.log("something went wrong",error);

    });
  }

  render() {
    return (
      <View>
        <Text> AddPost </Text>

        <Button  mode="contained" onPress={this.getImageFromGallery}>
        Select Image
        </Button>

       


        <TextInput
        label="What's your mind"
        
        value={this.state.post}
        onChangeText={text => this.setState(
          {post : text}
          )} 
          style={styles.input}       
        />

        <TouchableOpacity  
            onPress = {
                this.savePost
            }
            >
              <Text style={{color: 'blue',fontSize:16}} >Post </Text>
        </TouchableOpacity>




        <Button mode='outlined' color='blue'   labelStyle={{fontSize:10}}  style={styles.signin}
            onPress={()=>{
              this.props.navigation.navigate('home')
            }}
            >Home</Button>
      </View>
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
