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

export default class SelfRatingChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averageRating: 0,
      habits: [
        {
          habitType: "Avoiding the Issue",
          rating: 0
        },
        {
          habitType: "Negative self-talk",
          rating: 0
        },
        {
          habitType: "Negative outlook",
          rating: 0
        },
        {
          habitType: "Unhealthy coping",
          rating: 0
        },
        {
          habitType: "Avoiding the Issue",
          rating: 0
        }
      ]
    };
  }

  decreaseRating = index => {
    let habits = [...this.state.habits];
    if (habits[index].rating > 0) {
      habits[index].rating = habits[index].rating - 1;
    }
    this.setState({ habits });
  };

  increaseRating = index => {
    let habits = [...this.state.habits];
    if (habits[index].rating < 5) {
      habits[index].rating = habits[index].rating + 1;
    }
    this.setState({ habits });
  };

  render() {
    let habits = this.state.habits;
    let average = 0;
    for (let i = 0; i < habits.length; i++) {
      average += habits[i].rating;
    }
    average = average / 5;
    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <ImageBackground source={backgroundImage} style={styles.bgImage}>
          <View>
            <HeaderBack {...this.props} />
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
              <View style={{ alignItems: "center" }}>
                <View style={styles.headingMainContainer}>
                  <View>
                    <Text style={styles.mainHeadingText}>
                      What healthy coping trade did you make today?
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#6bcdba",
                    width: 150,
                    height: 150,
                    borderRadius: 90
                  }}
                >
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 90,
                      backgroundColor: "#a8e2d9",
                      position: "absolute",
                      left: hp("2%"),
                      top: hp("2%")
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        left: wp("9%"),
                        top: hp("4%"),
                        alignItems: "center"
                      }}
                    >
                      <Text style={{ fontSize: hp("3%"), color: "white" }}>
                        {average}
                      </Text>
                      <Text style={{ fontSize: hp("3%"), color: "white" }}>
                        Trade
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ width: "95%", paddingVertical: hp("5%") }}>
                  {this.state.habits.map((habit, index) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: "#ededea",
                          paddingVertical: hp("1.5%"),
                          borderRadius: 6,
                          marginVertical: 6
                        }}
                        key={index}
                      >
                        <View style={{ width: "80%", paddingLeft: wp("2%") }}>
                          <Text style={{ color: "#446e68" }}>
                            {habit.habitType}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "20%",
                            alignItems: "center",
                            flexDirection: "row",
                            borderWidth: 1,
                            paddingRight: wp("2"),
                            borderRadius: 3,
                            borderColor: "#446e68"
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => this.decreaseRating(index)}
                            style={{ width: "33%", alignItems: "center" }}
                          >
                            <Text style={{ color: "#446e68" }}>-</Text>
                          </TouchableOpacity>
                          <View style={{ width: "33%", alignItems: "center" }}>
                            <Text style={{ color: "#446e68" }}>
                              {habit.rating}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => this.increaseRating(index)}
                            style={{ width: "33%", alignItems: "center" }}
                          >
                            <Text style={{ color: "#446e68" }}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
              <View style={{ alignItems: "center",paddingBottom:hp('5%') }}>
              <TouchableOpacity style={styles.submit}>
                <View>
                  <Text style={styles.buttonText}>Submit</Text>
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
  headingMainContainer: {
    alignItems: "center",
    marginVertical: hp("6%"),
    width: "90%"
  },
  mainHeadingText: {
    fontSize: hp("5%"),
    color: "#446e68",
    textAlign: "center"
  },
  submit: {
    alignItems: "center",
    width: wp("35%"),
    justifyContent: "center",
    borderRadius: 5,
    marginTop: hp("2%"),
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
  }
});
