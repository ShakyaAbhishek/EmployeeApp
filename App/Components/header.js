import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  AsyncStorage
} from "react-native";
import Breadcrum from "../Images/breadcrum.png";
import Back from "../Images/back.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
let hiddenDrawer = wp("70%");
export default class LogoHeader extends Component {
  constructor(props) {
    super(props);
    this.drawerPosition = new Animated.ValueXY({ x: -hiddenDrawer, y: 0 });
    this.state = {
      showOpacityView: false
    };
  }


  logout = async () => {
    await AsyncStorage.removeItem("userToken");
    // await AsyncStorage.removeItem("userMood");
    this.props.navigation.navigate("SignIn");
  };


  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={{ width:'20%'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}
          >
              <Image
                source={Breadcrum}
                style={styles.breadcrumImage}
                resizeMode="contain"
                tintColor="#b3d4d4"
              />
          </TouchableOpacity>
          </View>
          <View style={{width:'60%', alignItems:"center"}}>
           
           <Text style={{color:'white', fontSize: hp("4%"),}}>{this.props.heading}</Text> 
         
         
       </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    width: "100%"
  },
  container: {
    flexDirection: "row",
    width: "90%",
    paddingVertical: hp("2.5%"),
    alignItems: "center"
  },
  breadcrumImage: {
    width: 34,
    height: 19
  },
});
