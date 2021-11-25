import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Button} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';

import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
        imagePath:'',
        imageName:''
    };
  }

  getImageFromGallery = () => {
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image.path);
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

    const fileName = this.state.imageName + ".jpg";
    const reference = storage().ref(`images/${fileName}`); //creating images folder and uploading images
    await reference.putFile(this.state.imagePath);


    const url = await storage().ref(`images/${fileName}`).getDownloadURL();
    console.log(url);


  }




  render() {
    return (
      <View>
        <Text> FileUpload </Text>

        <Button  mode="contained" onPress={this.getImageFromGallery}>
        Press me
        </Button>

      </View>
    );
  }
}
