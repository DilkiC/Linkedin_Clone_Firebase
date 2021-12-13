import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';


export default class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    // Start counting when the page is loaded
    this.timeoutHandle = setTimeout(()=>{
        // Add your logic for the transition
        this.props.navigation.navigate('login') // what to push here?
    }, 7000);
}


  render() {
    return (
      <View style={styles.container}>

        {/* <Image style={styles.logo} source={require('../assets/LinkedIn_Logo.png')}/> */}
        <View style={{flexDirection: 'row',justifyContent:'center',marginTop:250}}>
            <Text style={styles.logo1} >Linked </Text>
            <Text style={styles.logo2}>in</Text>
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
container:{
    /* flex: 1,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center', */

},
logo:{
    alignSelf:'center',
    width:100, height:50,

},
logo1:{
    color:'#0652DD',fontWeight:'bold',marginTop:20,fontSize:30,

},
logo2:{
    backgroundColor:'#0652DD',fontWeight:'bold',color:'white',marginTop:20,marginBottom:20,fontSize:25,

},


})
