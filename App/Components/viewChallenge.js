import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import HeaderBack from "./headerBack";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import Url from "../Actions/url";
import { connect } from "react-redux";
import ChallengesBanner from "../Images/challenges1.jpg";

export default class ViewHabitudeChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    console.warn('params', this.props.navigation.state)
  }
  render() {
    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <ImageBackground source={backgroundImage} style={styles.bgImage}>
          <View>
            <HeaderBack {...this.props} />
          </View>
          <View
            style={{
              backgroundColor: "white",
              flex: 1,
              marginBottom: hp('3%')
            }}
          >
            <ScrollView>
              <View style={{ height: hp("30%") }}>
                <Image
                  source={ChallengesBanner}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <View style={{ width: "90%" }}>
                  <View style={{ paddingVertical: 10 }}>
                    <Text
                      style={{
                        color: "#40be99",
                        fontSize: hp("4.5%"),
                        textTransform: "capitalize"
                      }}
                    >
                      HabitudeActiveChallenge
                    </Text>
                  </View>
                  <View>
                    <Text>
                      Lorem Ipsum is simply dummy text of the printing and type
                      setting industry.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.submit} onPress={() => this.props.navigation.navigate("JoinHabitudeChallenge")}>
                <View>
                  <Text style={styles.buttonText}>JOIN</Text>
                </View>
              </TouchableOpacity>
            </View>
            </ScrollView>
            
          </View>
          <View style={styles.bottomMenuContainer}>
            <BottomMenu {...this.props} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%"
  },
  safeAreaViewContainer: {
    flex: 1
  },
  logoContainer: {
    marginTop: hp("2.5%")
  },
  submit: {
    alignItems: "center",
    width: wp("35%"),
    justifyContent: "center",
    borderRadius: 5,
    marginTop: hp("5%"),
    marginBottom: hp("8%"),
    backgroundColor: "#08b89f",
    paddingVertical: hp("1.5%")
  },
  buttonText: {
    color: "#d5efef",
    textTransform: "uppercase",
    fontSize: hp("2%")
  },
  bottomMenuContainer: {
    position: "absolute",
    bottom: 0
  },
});
