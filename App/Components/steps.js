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
  AsyncStorage
} from "react-native";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import HeaderBack from "./headerBack";
import DailySteps from "./dailySteps";
import WeeklySteps from "./weeklySteps";
import OneMonthSteps from "./monthlySteps";
import MonthlySteps from "./3monthsSteps";
import { connect } from "react-redux";

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepsData: "today"
    };
  }

  manageData = content => {
    this.setState({ stepsData: content });
  };

  render() {
    let stepsData = this.state.stepsData;
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.safeAreaViewContainer}>

          <View>
            <HeaderBack {...this.props} heading="Steps" />
          </View>
          <View
            style={{
              // backgroundColor: stepsData === "today" ? "white" : "#003037",
              marginTop: hp("0.5%"),
              alignItems: "center",
              height: "90%"
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.mainContainer}>
                <View
                  style={[
                    styles.innerContainer,
                    {
                      backgroundColor:
                        stepsData === "today" ? "#fff" : "#003037"
                    }
                  ]}
                >
                  <View style={styles.headingMainContainer}>
                    {/* <View>
                  <Text style={styles.mainHeadingText}>
                    Wellness department
                  </Text>
                </View> */}
                    <View style={styles.headingContentContainer}>
                      <Text
                        style={[
                          styles.headingContentText,
                          { color: stepsData === "today" ? "#446e68" : "white" }
                        ]}
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        type setting industry.
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    backgroundColor: stepsData === "today" ? "#fff" : "#003137"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: "90%",
                      backgroundColor:
                        stepsData === "today" ? "#fff" : "#003037",
                      justifyContent: "center"
                    }}
                  >
                    <View style={{ width: "20%", alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() => this.manageData("today")}
                        style={
                          stepsData === "today"
                            ? {
                              borderBottomWidth: 2,
                              borderBottomColor: "#446e68"
                            }
                            : null
                        }
                      >
                        <Text
                          style={[
                            styles.headingContentText,
                            {
                              color: stepsData === "today" ? "#446e68" : "white"
                            }
                          ]}
                        >
                          TODAY
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: "20%", alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() => this.manageData("week")}
                        style={
                          stepsData === "week"
                            ? {
                              borderBottomWidth: 2,
                              borderBottomColor: "#fff"
                            }
                            : null
                        }
                      >
                        <Text
                          style={[
                            styles.headingContentText,
                            {
                              color: stepsData === "today" ? "#446e68" : "white"
                            }
                          ]}
                        >
                          WEEK
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: "20%", alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() => this.manageData("month")}
                        style={
                          stepsData === "month"
                            ? {
                              borderBottomWidth: 2,
                              borderBottomColor: "#fff"
                            }
                            : null
                        }
                      >
                        <Text
                          style={[
                            styles.headingContentText,
                            {
                              color: stepsData === "today" ? "#446e68" : "white"
                            }
                          ]}
                        >
                          MONTH
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: "30%", alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() => this.manageData("3month")}
                        style={
                          stepsData === "3month"
                            ? {
                              borderBottomWidth: 2,
                              borderBottomColor: "#fff"
                            }
                            : null
                        }
                      >
                        <Text
                          style={[
                            styles.headingContentText,
                            {
                              color: stepsData === "today" ? "#446e68" : "white"
                            }
                          ]}
                        >
                          3 MONTHS
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    backgroundColor: stepsData === "today" ? "#fff" : null
                  }}
                >
                  {/* <View style={{ width: "90%" }}> */}
                  {stepsData === "today" ? (
                    <View style={{ height: "100%", width: "90%" }}>
                      <DailySteps {...this.props} />
                    </View>
                  ) : stepsData === "week" ? (
                    <WeeklySteps {...this.props} />
                  ) : stepsData === "month" ? (
                    <OneMonthSteps />
                  ) : (
                          <MonthlySteps {...this.props} />
                        )}
                  {/* </View> */}
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={styles.bottomMenuContainer}>
            <BottomMenu {...this.props} />
          </View>

        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({
    UserDetailReducer: state.UserDetailReducer.UserDetailReducer
  }),
  null
)(Steps);

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%"
  },
  safeAreaViewContainer: {
    flex: 1
  },
  mainContainer: {
    alignItems: "center",
    paddingBottom: hp("16%")
  },
  innerContainer: {
    width: wp("100%"),
    alignItems: "center"
  },
  headingMainContainer: {
    alignItems: "center",
    marginVertical: hp("6%"),
    width: "85%"
  },
  headingContentContainer: {
    paddingTop: hp("1%")
  },
  headingContentText: {
    fontSize: hp("2%"),
    textAlign: "center"
  },
  bottomMenuContainer: {
    position: "absolute",
    bottom: 3
  }
});
