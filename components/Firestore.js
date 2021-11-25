import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

export default class Firestore extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name:"",
        address:"",
        salary:""
    };
    const subscriber = firestore()
      .collection('customers')
      .doc('k4t8dtJvHl6OnCBc1229')
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data().name);
        this.setState({
            name:documentSnapshot.data().name //when we change name in database and update it will update automatically in our frontend
        })
      });
  }

  saveCustomer=()=>{
    firestore()
    .collection('customers')
    .add({
      name: this.state.name,
      address: this.state.address,
      salary:this.state.salary
    })
    .then(() => {
      console.log('User added!');
      this.setState({
          name:"",
          address:"",
          salary:""
      })
    });
  }

updateCustomer = () =>{
    firestore()
    .collection('customers')
    .doc('ABC')//give id
    .update({
        name:this.state.name,
        address: this.state.address,
        salary:this.state.salary
    })
    .then(() => {
      console.log('User updated!');
    });

  }

deleteCustomer=()=>{
    firestore()
  .collection('customers')
  .doc('wPfZND4mWgk7pNtK')
  .delete()
  .then(() => {
    console.log('User deleted!');
  });

}

  render() {
    return (
      <KeyboardAvoidingView behavior='position'  style={{backgroundColor:'white'}}>
        <Text style={styles.logo1}> Firestore </Text>

        <TextInput
        label="Enter Your Name"
        
        value={this.state.name}
        onChangeText={text => this.setState(
          {name : text}
          )} 
          style={styles.input}       
        />

    <TextInput
        label="Enter Your Address"
        
        value={this.state.address}
        onChangeText={text => this.setState(
          {address : text}
          )} 
          style={styles.input}       
        />

    <TextInput
        label="Enter Your Salary"
        
        value={this.state.salary}
        onChangeText={text => this.setState(
          {salary : text}
          )} 
          style={styles.input}       
        />


        <Button style={styles.joinBtn} mode="contained" onPress={this.saveCustomer} >
          Save Customer 
        </Button>
        <Button style={styles.joinBtn} mode="contained" onPress={this.updateCustomer} >
          Update Customer 
        </Button>
        <Button style={styles.joinBtn} mode="contained" onPress={this.deleteCustomer} >
          Delete Customer 
        </Button>


      </KeyboardAvoidingView>
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
      color:'#0652DD',fontWeight:'bold',marginTop:15,marginLeft:10,fontSize:16,alignSelf:'center',

  },
  joinBtn:{
      fontWeight:'bold',marginTop:40,borderRadius:20,borderColor:'blue',width:300,alignSelf:'center',
  }
});
