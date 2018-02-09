import React, {Component} from 'react'
import {View, ScrollView, Text, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native'
import services from "./dataServices"
import GlobalVariables from "./GlobalVariables"

class Login extends Component{
  constructor (props){
    super(props)
    this.state={
      token:"",
      fullname:"",
      statusGeneral:"",
      statusLogin:""
    }
  }

  componentWillMount(){

    //nakon logina token se spremi u Storage
    //na refresh provjerava se jel user logiran
    //ako jest pozovi servis mobile/general
    AsyncStorage.getItem('TOKEN').then((res) => {
      if(res){
        // this.getGeneral();
        // this.getSchedule();
      }
    })
  }

  render(){
    return <ScrollView>
        <TouchableOpacity style={styles.btn} onPress={this.login.bind(this)}>
          <Text style={styles.btnTextColor}>
            Login
          </Text>
        </TouchableOpacity>
        <View style={{marginTop:24, marginLeft:32}}>
          <Text>REQ STATUS: {this.state.statusLogin}</Text>
          <Text>TOKEN: {this.state.token}</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={this.getGeneral.bind(this)}>
        <Text style={styles.btnTextColor}>
          General
        </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this.getSchedule.bind(this)}>
        <Text style={styles.btnTextColor}>
          Schedule
        </Text>
        </TouchableOpacity>
        <View style={{marginLeft:32, marginTop:24}}>
        <Text>
          {"REQ STATUS:" + this.state.statusGeneral}
        </Text>
        <Text>
          {"FullName:" + this.state.fullname}
        </Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={this.clearStorage.bind(this)}>
          <Text style={styles.btnTextColor}>
            Clear Storage
          </Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.btn} onPress={this.logout.bind(this)}>
          <Text style={styles.btnTextColor}>
            Logout
          </Text>
        </TouchableOpacity>
    </ScrollView>
  }

  clearStorage(){
    AsyncStorage.clear()
    this.setState({
      token:"",
      fullname:"",
      statusGeneral:"",
      statusLogin:""
    })
  }

  login(){
    let data = {
          username: "sophico_admin",
          password: "Admin1234",
      };
    services.loginApi("login", data).then((res) => {
      //prikazi token ako request prodje
      let tokenTemp = res.headers["set-cookie"][0];
      let token = tokenTemp.split(";")[0];
      console.log(tokenTemp);

      this.setState({
        token: token,
        statusLogin:res.status
      })

      // this.getGeneral()     //pozovi mobile/general sevis kao callback login servisa

    }).catch((err) => console.log(err))
  }

  getGeneral(){
    //on press button get general
    services.getData("mobile/general").then((response) => {
      console.log("mobile/general",response);
      this.setState({
        fullname:response.data.data.user.firstName + " " +response.data.data.user.lastName,
        statusGeneral: response.status
      })
    })
  }

  getSchedule(){
    //on press button get general
    services.getData("mobile/dashboard/schedule").then((response) => {
      console.log("mobile/schedule",response);
      // this.setState({
      //   fullname:response.data.data.user.firstName + " " +response.data.data.user.lastName,
      //   statusGeneral: response.status
      // })
    })
  }

  logout(){
    services.getData("logout").then((res) => {
      console.log(res);
    })
  }

}
export default Login;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection:"column",
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  btn:{
    marginTop:56,
    height:56,
    marginLeft:32,
    marginRight:32,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1,
    borderColor:"blue"
  },
  btnTextColor:{
    color:"blue"
  }
});
