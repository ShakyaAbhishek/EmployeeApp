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
  } from "react-native";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import HeaderBack from "./headerBack";
import Heartrate from "./Heartrate";
import StatusbasedData from "./StatusbasedData";
import Graph from './Graph'

export default class TimebasedData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepsData: "today"
      
    };
  }

  manageData = content => {
    this.setState({ stepsData: content });
  };

  

  renderData = () => {
    if (this.state.stepsData === "today") {
      return (
        <ScrollView style={{ flex:1 }}>
          <Heartrate />
          <StatusbasedData stepsProp={this.state.stepsData}/>
        </ScrollView>
      );
    } else if (this.state.stepsData === "week") {
      return (
        <ScrollView style={{ flex:1 }}>
          
          <Graph/>
          <StatusbasedData stepsProp={this.state.stepsData}/>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={{flex:1}}>
          <Graph/>
          <StatusbasedData stepsProp={this.state.stepsData}/>
        </ScrollView>
      );
    }
  };

  render() {
    let stepsData = this.state.stepsData;
    
    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <ImageBackground source={backgroundImage} style={styles.bgImage}>
          <View>
            <HeaderBack {...this.props} heading="Your heart" />
          </View>
          <View
            style={{
              backgroundColor: "white",
              marginTop: hp("0.5%"),
              alignItems: "center",
              height: "90%"
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.mainContainer}>
                <View style={styles.innerContainer}>
                  <View style={styles.headingMainContainer}></View>
                </View>
                <View style={{ alignItems: "center", marginBottom:10}}>      
                  <Text style={{ fontSize: 30, color: "#446e68" }}>
                    Heart Rate
                  </Text>
                  <Text>Sun, 8 Sep, 12pm</Text>
                </View>
                <View style={{ flexDirection: "row", width: "70%" }}>
                  <View style={{ width: "33%", alignItems: "center" }}>
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
                      <Text style={styles.headingContentText}>TODAY</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "33%", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => this.manageData("week")}
                      style={
                        stepsData === "week"
                          ? {
                              borderBottomWidth: 2,
                              borderBottomColor: "#446e68"
                            }
                          : null
                      }
                    >
                      <Text style={styles.headingContentText}>WEEK</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "33%", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => this.manageData("year")}
                      style={
                        stepsData === "year"
                          ? {
                              borderBottomWidth: 2,
                              borderBottomColor: "#446e68"
                            }
                          : null
                      }
                    >
                      <Text style={styles.headingContentText}>YEAR</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ marginTop: "5%" }}>{this.renderData()}</View>

                {/* <View style={{ flexDirection: "row", width: "70%" }}>
                  <View style={{ width: "33%", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => this.mobilityData("general")}
                      style={
                        statusData === "general"
                          ? {
                              borderBottomWidth: 2,
                              borderBottomColor: "#446e68"
                            }
                          : null
                      }
                    >
                      <Text style={styles.headingContentText}>GENERAL</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "33%", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => this.mobilityData("resting")}
                      style={
                        statusData === "resting"
                          ? {
                              borderBottomWidth: 2,
                              borderBottomColor: "#446e68"
                            }
                          : null
                      }
                    >
                      <Text style={styles.headingContentText}>RESTING</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "33%", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => this.mobilityData("exercise")}
                      style={
                        stepsData === "exercise"
                          ? {
                              borderBottomWidth: 2,
                              borderBottomColor: "#446e68"
                            }
                          : null
                      }
                    >
                      <Text style={styles.headingContentText}>EXERCISE</Text>
                    </TouchableOpacity>
                  </View>
                </View> */}
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
    fontSize: hp("2.5%"),
    color: "#446e68",
    textAlign: "center"
  },
  bottomMenuContainer: {
    position: "absolute",
    bottom: 0
  }
});
