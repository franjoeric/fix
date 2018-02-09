import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import Login from "./Login"
import Facebook from "./Facebook"
import Reactotron from 'reactotron-react-native'

Reactotron
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

//   global.XMLHttpRequest = global.originalXMLHttpRequest ?
//                           global.originalXMLHttpRequest :
//                           global.XMLHttpRequest;
// global.FormData = global.originalFormData ?
//                   global.originalFormData :
//                   global.FormData;
class App extends Component {
  render() {
    return (
      <View style={styles.container}>
         {/*<Login /> */}
        <Facebook />
      </View>
    );
  }
}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  }
});
