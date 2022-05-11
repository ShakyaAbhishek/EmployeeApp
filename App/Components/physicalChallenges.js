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
import MyChallenges from "./myChallenges";
import ActiveChallenge from "./activeChallenges";
import HeaderBack from "./headerBack";
import { connect } from "react-redux";
import * as challengesActions from '../Actions/challengesActions'

class PhysicalChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeBool: true
    };
  }

  componentDidMount(){
    AsyncStorage.getItem("userToken").then((token) => {
      let challengeType = "physical";
      this.props.getChallenges(challengeType, token)
      console.warn('hvv')
    })
  }

  handleActiveChallenge = () => {
    this.setState({ challengeBool: true });
  };

  handleMyChallenge = () => {
    this.setState({ challengeBool: false });
  };

  

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <View>
            <HeaderBack {...this.props} heading="Physical Challenges" />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          {/* <View style={{ height: hp("65%") }}> */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: "center" }}>
              <View style={styles.headingMainContainer}>
                {/* <View>
                  <Text style={styles.mainHeadingText}>Challenges</Text>
                </View> */}
                <View style={styles.headingContentContainer}>
                  <Text style={styles.headingContentText}>
                    Lorem Ipsum is simply dummy text of the printing and type
                    setting industry.
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "90%"
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "50%",
                    alignItems: "center"
                  }}
                  onPress={this.handleActiveChallenge}
                >
                  <View style={{
                    borderBottomWidth: this.state.challengeBool ? 2 : null,
                    borderBottomColor: this.state.challengeBool
                      ? "#d5efef"
                      : null
                  }}>
                    <Text
                      style={{
                        color: "#d5efef",
                        fontSize: hp("2%"),
                        textTransform: "uppercase",

                      }}
                    >
                      ACTIVE CHALLENGES
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: "50%", alignItems: "center" }}
                  onPress={this.handleMyChallenge}
                >
                  <View style={{
                    borderBottomWidth: this.state.challengeBool ? null : 2,
                    borderBottomColor: this.state.challengeBool
                      ? 2
                      : "#d5efef"
                  }}>
                    <Text
                      style={{
                        color: "#d5efef",
                        fontSize: hp("2%"),
                        textTransform: "uppercase",

                      }}
                    >
                      MY CHALLENGES
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "90%",
                  marginVertical: hp("3%")
                }}
              >
                <View
                  style={{
                    // height: hp("60%")
                    paddingBottom: hp('10%')
                  }}
                >
                  {/* <ScrollView contentContainerStyle={{ paddingBottom: hp('10%') }} showsVerticalScrollIndicator={false}> */}
                  {this.state.challengeBool ? (
                    <ActiveChallenge {...this.props} />
                  ) : (
                      <MyChallenges {...this.props} />
                    )}
                  {/* </ScrollView> */}
                </View>
              </View>
            </View>
          </ScrollView>
          {/* </View> */}
          <View style={{ position: "absolute", bottom: 3 }}>
            <BottomMenu {...this.props} />
          </View>

        </SafeAreaView>
      </ImageBackground>

    );
  }
}

export default connect(
  state => ({}),
  {
    ...challengesActions
  }
)(PhysicalChallenge);

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
    bottom: 0
  },
  bottomMenuContainer: {
    position: "absolute",
    bottom: 0
  },
  headingMainContainer: {
    alignItems: "center",
    marginVertical: hp("6%"),
    width: "85%"
  },
  mainHeadingText: {
    fontSize: hp("5%"),
    color: "#d5efef"
  },
  headingContentContainer: {
    paddingTop: hp("1%")
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#d5efef",
    textAlign: "center"
  }
});
