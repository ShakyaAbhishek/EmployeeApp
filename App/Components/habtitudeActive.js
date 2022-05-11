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
  ActivityIndicator,
  TouchableWithoutFeedback
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Url from "../Actions/url";
import challengeImage from "../Images/activeChallengeImage.png";
import { ProgressCircle } from "react-native-svg-charts";
import { connect } from "react-redux";

class HabtitudeActiveChallenges extends Component {
  Habtitude;
  constructor(props) {
    super(props);
    this.state = {
      activeChallengesType: [
        {
          challengeTypeImage: challengeImage,
          challengeType: "Walking challenge"
        },
        {
          challengeTypeImage: challengeImage,
          challengeType: "Dubai desert run"
        },
        {
          challengeTypeImage: challengeImage,
          challengeType: "Boxing challenge"
        }
      ],
      isExpand: [],
      singleChallenge: ""
    };
  }

  render() {
    let data = this.state.singleChallenge;
    return (
      <View>
        {this.state.activeChallengesType.map((challenge, index) => {
          return (
            <View key={index}>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.props.navigation.navigate("ViewHabitudeChallenge")
                }
              >
                <View>
                  <ImageBackground
                    source={challenge.challengeTypeImage}
                    style={{
                      width: "100%",
                      height: hp("16%"),
                      marginVertical: 10
                    }}
                    imageStyle={{ borderRadius: 6 }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        height: hp("16%")
                      }}
                    >
                      <View style={{ alignItems: "center" }}>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: hp("2.4%"),
                            fontWeight: "bold",
                            textTransform: "capitalize"
                          }}
                        >
                          {challenge.challengeType}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: "20%",
                        position: "absolute",
                        right: 5,
                        bottom: 5,
                        backgroundColor: "#08b89f",
                        borderRadius: 5
                      }}
                      onPress={() => console.warn("Join challenge")}
                    >
                      <View>
                        <Text style={{ color: "white", textAlign: "center" }}>
                          Join
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              </TouchableWithoutFeedback>
            </View>
          );
        })}
      </View>
    );
  }
}

export default connect(
  state => ({}),
  null
)(HabtitudeActiveChallenges);
