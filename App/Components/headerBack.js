import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";
import Back from "../Images/back2.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default class HeaderBack extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      
        <View
          style={{
            paddingVertical: hp("3%"),
            paddingHorizontal: hp("2%"),
            flexDirection:'row'
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{width:'10%', paddingTop:hp('1%')}}>
         <View>
         <Image
            source={Back}
            style={{ width: 30, height: 20 }}
            resizeMode="contain"
          />
         </View>
         </TouchableOpacity>
         <View style={{ alignItems:'center',  width:'80%'}}>
             <Text style={{color:'white', fontSize: hp("3.5%"),}}>{this.props.heading}</Text> 
         </View>
        </View>
      
    );
  }
}
