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
import HeaderBack from "./headerBack";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Personalgoal from "../Images/mypersonalgoals.png";
import GoalImages from "../Images/customgoals.png";
import { connect } from "react-redux";
import * as goalAction from "../Actions/goalsAction";

class MyGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myGoalsData: [
        {
          goalImage: Personalgoal,
          goalName: "Step Challenge",
          startDate: "20-07-1996",
          endDtae: "20-07-2090",
          goalStatus: "Complete",
          goalTypeImage: GoalImages
        },
        {
          goalImage: Personalgoal,
          goalName: "Step Challenge",
          startDate: "20-07-1996",
          endDtae: "20-07-2090",
          goalStatus: "Complete",
          goalTypeImage: GoalImages
        },
        {
          goalImage: Personalgoal,
          goalName: "Step Challenge",
          startDate: "20-07-1996",
          endDtae: "20-07-2090",
          goalStatus: "Complete",
          goalTypeImage: GoalImages
        }
      ]
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userToken").then(token => {
      this.props.getMyGoal(token);
    });
  }
  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            marginBottom: hp("8%"),
            width: "90%"
          }}
        >
          {this.state.myGoalsData.map((goal, index) => {
            return (
              <ImageBackground
                source={goal.goalImage}
                style={{
                  width: "100%",
                  height: hp("18%"),
                  marginVertical: hp("2%")
                }}
                imageStyle={{ borderRadius: 10 }}
                key={index}
              >
                <View style={{ paddingLeft: hp("2%"), paddingTop: hp("2%") }}>
                  <View>
                    <Image
                      source={goal.goalTypeImage}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: hp("2%"),
                        fontWeight: "bold"
                      }}
                    >
                      {goal.goalName}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", paddingTop: hp("3%") }}>
                    <View style={{ width: "33%" }}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: hp("1.7%"),
                          fontWeight: "bold"
                        }}
                      >
                        Start Date
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: hp("1.7%"),
                          fontWeight: "bold"
                        }}
                      >
                        {goal.startDate}
                      </Text>
                    </View>
                    <View style={{ width: "33%" }}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: hp("1.7%"),
                          fontWeight: "bold"
                        }}
                      >
                        Start Date
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: hp("1.7%"),
                          fontWeight: "bold"
                        }}
                      >
                        {goal.startDate}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "33%",
                        alignItems: "flex-end",
                        paddingRight: wp("1")
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#08b89f",
                          width: "80%",
                          height: 30,
                          justifyContent: "center",
                          borderRadius: 6
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: hp("1.7%"),
                            fontWeight: "bold",
                            textAlign: "center"
                          }}
                        >
                          {goal.goalStatus}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            );
          })}
        </View>
      </View>
    );
  }
}

export default connect(state => ({}), {
  ...goalAction
})(MyGoals);
