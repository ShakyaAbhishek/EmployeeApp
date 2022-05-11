import React, { Component } from "react";
import { View, Text, Image, StyleSheet, AsyncStorage } from "react-native";
import Logo from "../Images/logo.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Url from "../Actions/url";

export default class LogoHeader extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  componentDidMount(){
    AsyncStorage.getItem("logo").then(logo => {
      this.setState({ logo: logo });
    });
  }
  render() {
    return (
      <View style={styles.logoContainer}>
        <Image source={{ uri: Url + `/${this.state.logo}` }} style={styles.logoImage} resizeMode="contain" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: "transparent",
    width: "100%",
    height: hp("11%"),
    alignItems: "center",
    justifyContent: "center"
  },
  logoImage: {
    width:"100%",
    height: 60
  }
});
