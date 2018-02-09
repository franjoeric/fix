import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { google, facebook, twitter, tumblr } from 'react-native-simple-auth';


class Facebook extends Component{

  constructor(props){
    super(props)
    this.state={
      text:"Facebook"
    }
  }

  getFacebookAccount(){
    facebook({
      appId: '154133378585936',
      callback: 'fb154133378585936://authorize',
      // scope: 'user_friends', // you can override the default scope here
      fields: ['email', 'first_name', 'last_name'], // you can override the default fields here
    }).then((info) => {
      console.log("Facebook info", info);
      // info.user - user details from the provider
      // info.credentials - tokens from the provider
    }).catch((error) => {
      // error.code
      // error.description
    });
  }

  render(){
    return <View>
      <TouchableOpacity onPress={this.getFacebookAccount.bind(this)}>
        <Text>Facebook</Text>
      </TouchableOpacity>
    </View>
  }

}

export default Facebook;


const styles = StyleSheet.create({
  container:{
    flex:1
  }
})
