import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,Image,TouchableOpacity } from 'react-native';
import {Button,TextInput} from 'react-native-paper';
import AddPost from './AddPost';
import firestore from '@react-native-firebase/firestore';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:'',
      data:[],
    };
  }

  componentDidMount(){
    const subscriber = firestore()
    .collection('posts')
    .onSnapshot(querySnapshot => {
      const Users = [];

      querySnapshot.forEach(documentSnapshot => {
         
        Users.push({ 
                post:documentSnapshot.data().post,
                url:documentSnapshot.data().url,
                key: documentSnapshot.id,
            })
        });
        this.setState({
            data:Users
        })
        console.log(this.url)
      });
}

   



  render() {
    return (
      <View>
        
        {/* <Text>{this.props.userName}</Text> */}




        <Button mode='outlined' color='blue'   labelStyle={{fontSize:10}}  style={styles.signin}
            onPress={()=>{
              this.props.navigation.navigate('post')
            }}
            >Add Post</Button>

              <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <View style={{ height: 150, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                        style={styles.postImage}
                        source={{uri: item.url}}/>
                            
                            {/* <Text >User ID: {item.key}</Text> */}
                            <Text >{item.post}</Text>
                            
                            
                        </View>
                    )}
                    keyExtractor={(item) => {
                        item.key
                    }}
                />


        {/* get all posts */}
        


        

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
      fontWeight:'bold',marginTop:15,borderRadius:20,borderColor:'gray',marginBottom:10,
  },
  para:{
      fontSize:28,marginTop:20,color:'#d59667',marginLeft:15,marginBottom:30,

  },
  joinBtn:{
      fontWeight:'bold',marginTop:40,borderRadius:20,borderColor:'blue',width:300,alignSelf:'center',
  },
  postImage: {
    height: 300,
    width: 300,
    //marginBottom:200,
  }


  

});
