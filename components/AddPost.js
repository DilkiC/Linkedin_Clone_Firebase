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
        post:'',
        imageUrl:'',
        
        
        
    }
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
    const fileName = this.state.imageName + ".jpg";
    const reference = storage().ref(`images/${fileName}`); //creating images folder and uploading images
    await reference.putFile(this.state.imagePath);

    this.setState({
      imageUrl:await storage().ref(`images/${fileName}.jpg`).getDownloadURL()
  })
  console.log(this.state.imageUrl);
 

   /*  const url = await storage().ref(`images/${fileName}`).getDownloadURL();
    console.log("image url: "+url); */
    


  }

  savePost=()=>{
    firestore()
    .collection('posts')
    .add({
      //userId:this.state.userId,
      url:this.state.imageUrl,
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
          imageUrl:"",
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
        <Text style={styles.logo1}> Share </Text>

        <TextInput
        label="What's on your mind"
        
        value={this.state.post}
        onChangeText={text => this.setState(
          {post : text}
          )} 
          style={styles.input}       
        />

        <Button style={styles.signin} mode="outlined" onPress={this.getImageFromGallery}>
        Select Image
        </Button>

        <Image 
        style={styles.postImage}
        source={{ uri: this.state.imageUrl }}/>

     {/*  <Image 
        style={styles.postImage}
        source={this.props.url ? {uri:this.props.url} : null}/> */}


       


       

        <TouchableOpacity  
            onPress = {
                this.savePost
            }
            >
              <Text style={{color: 'blue',fontSize:16,alignSelf:'center',backgroundColor:'white',}} >Post </Text>
        </TouchableOpacity>




        <Button mode='outlined' color='blue'   labelStyle={{fontSize:10}}  style={styles.join}
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
        width:350,
        height:50,
        marginBottom:10,marginTop:15,
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
        fontWeight:'bold',color:'gray',marginTop:180,fontSize:12,
  
    },
    signin:{
        fontWeight:'bold',marginTop:15,borderRadius:20,borderColor:'blue',marginBottom:10,
    },
    para:{
        fontSize:28,marginTop:20,color:'#d59667',marginLeft:15,marginBottom:30,
  
    },
    joinBtn:{
        fontWeight:'bold',marginTop:40,borderRadius:20,borderColor:'blue',width:300,alignSelf:'center',
    },
    postImage: {
      height: 100,
      width: 360
    }
  
  
    
  
  });
