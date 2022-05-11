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
import { ProgressCircle } from "./react-native-svg-charts";
import { connect } from "react-redux";
import * as challengesActions from "../Actions/challengesActions";

class ActiveChallenges extends Component {
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
      singleChallenge: "",
      challengesData : []
    };
  }

  expanded = (index, item) => {
    let isExpand = [...this.state.isExpand];
    isExpand[index] = !isExpand[index];
    this.setState({ isExpand, singleChallenge: item });
  };

  componentDidUpdate(prevProps) {
    let challengesData = [...this.state.challengesData];
    if (prevProps.allChallenges !== this.props.allChallenges) {
      if (this.props.allChallenges.status === 200) {
        this.setState({ challengesData: this.props.allChallenges.challenges });
      }
    }
  }
  render() {
    console.warn("props", this.state.challengesData);
    let data = this.state.singleChallenge;
    return (
      <View>
        {this.state.challengesData && this.state.challengesData.length > 0
          ? this.state.challengesData.map((challenge, index) => {
              return (
                <View key={index}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.props.navigation.navigate("ViewHabitudeChallenge",challenge )
                    }
                  >
                    <View>
                      <ImageBackground
                        source={{
                          uri: Url + `/${challenge.image}`
                        }}
                        style={{
                          width: "100%",
                          height: hp("16%"),
                          marginVertical: 10
                        }}
                        imageStyle={{ borderRadius: 6, opacity:0.5 }}
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
                              {challenge.activityType}
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
                            <Text
                              style={{ color: "white", textAlign: "center" }}
                            >
                              Join
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </ImageBackground>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              );
            })
          : null}
      </View>
    );
  }
}

export default connect(
  state => ({
    allChallenges: state.ChallengesReducer.allChallenges
  }),
  {
    ...challengesActions
  }
)(ActiveChallenges);
