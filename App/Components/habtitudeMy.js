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
import { connect } from "react-redux";
import challengeImage from "../Images/activeChallengeImage.png";
import { ProgressCircle } from "react-native-svg-charts";

class HabitudeMyChallenges extends Component {
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

  expanded = (index, item) => {
    let isExpand = [...this.state.isExpand];
    isExpand[index] = !isExpand[index];
    this.setState({ isExpand, singleChallenge: item });
  };

  render() {
    let data = this.state.singleChallenge;
    return (
      <View>
        {this.state.activeChallengesType.map((challenge, index) => {
          return (
            <View>
              {this.state.isExpand[index] !== true ? (
                <TouchableWithoutFeedback
                  onPress={() => this.expanded(index, challenge)}
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
                    </ImageBackground>
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                <View>
                  <TouchableOpacity onPress={() => this.expanded(index, challenge)}>
                  <Image
                    source={data.challengeTypeImage}
                    style={{ width: "100%", height: 200 }}
                  />
                  </TouchableOpacity>
                  <View>
                    <Text style={{ color: "#fff", fontSize: hp("3%") }}>
                      {data.challengeType}
                    </Text>
                  </View>
                  <View>
                    <ProgressCircle
                      style={{ height: 150, marginVertical:hp('3%') }}
                      progress={0.3}
                      progressColor={"#08b89f"}
                    />
                    <View
                      style={{
                        position: "absolute",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 150,
                        width: "100%",
                        marginVertical:hp('3%')
                      }}
                    >
                      <Text style={{ color: "white", fontSize: hp("4%") }}>
                        25000
                      </Text>
                      <Text style={{ color: "white" }}>/10000 steps </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>
    )
  }
}

export default connect(
  state => ({}),
  null
)(HabitudeMyChallenges);
