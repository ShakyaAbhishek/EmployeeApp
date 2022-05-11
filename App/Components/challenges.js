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
  Platform
} from "react-native";
import LogoHeader from "./logoHeader";
import Header from "./header";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import ChallengesBanner from "../Images/challenges1.jpg";
import PhysicalImage from "../Images/physicalchlng.png";
import Habitude from "../Images/habitude.png";
import HeaderBack from "./headerBack";
import { connect } from "react-redux";

class Challenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeType: [
        {
          challengeTypeImage: PhysicalImage,
          content: "Physical Challenges"
        },
        {
          challengeTypeImage: Habitude,
          content: "Habitude Challenges"
        }
      ]
    };
  }
  handleImage = index => {
    if (index == 0) {
      this.props.navigation.navigate("PhysicalChallenge");
    } else {
      this.props.navigation.navigate('HabitudeChallenge')
    }
  };
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
      {/* <ImageBackground source={backgroundImage} style={styles.bgImage}> */}
          <View>
            <HeaderBack {...this.props} heading = "Challenges" />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Image
                source={ChallengesBanner}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: hp("35%")
                }}
              />
            </View>
            {/* <View style={{ paddingVertical: hp("2%") }}>
              <Text
                style={{
                  fontSize: hp("5%"),
                  color: "#d5efef",
                  textAlign: "center"
                }}
              >
                Challenges
              </Text>
            </View> */}
            <View style={{ alignItems: "center", marginTop:hp('10%') }}>
              <View style={styles.contentInnerContainer}>
                {this.state.challengeType.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.contentContainer}
                    onPress={() => this.handleImage(index)}
                  >
                    <ImageBackground
                      source={item.challengeTypeImage}
                      style={styles.contentBgimage}
                      imageStyle={{ borderRadius: 10 }}
                    >
                      <View style={styles.contentTextContainer}>
                        <Text style={styles.contentText}>{item.content}</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottomMenuContainer}>
            <BottomMenu {...this.props} />
          </View>
      
      </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({}),
  null
)(Challenges);

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%"
  },
  logoContainer: {
    marginTop: hp("2.5%")
  },
  safeAreaViewContainer: {
    flex: 1
  },
  bottomMenuContainer: {
    position: "absolute",
    bottom: 3
  },
  contentInnerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "70%"
  },
  contentContainer: {
    marginBottom: hp("2%"),
    width: wp("30%"),
    height: hp("14%")
  },
  contentBgimage: {
    width: wp("30%"),
    height: hp("14%"),
    alignItems: "center"
  },
  contentTextContainer: {
    position: "absolute",
    bottom: hp("1.5%")
  },
  contentText: {
    fontSize: hp("1.6%"),
    color: "white",
    textAlign: "center"
  }
});
