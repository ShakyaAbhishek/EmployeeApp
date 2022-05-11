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
import Add from "../Images/add.png";
import DropDown from "../Images/dropdown.png";

export default class JoinHabitudeChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [
        {
          habitType: "Avoiding the Issue",
          isExpand: false,
          habitContent:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown  printer took a galley of type and scrambled it to make a type specimen book. It has survived  not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing PageMaker including versions of Lorem Ipsum."
        },
        {
          habitType: "Negative self-talk",
          isExpand: false,
          habitContent:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown  printer took a galley of type and scrambled it to make a type specimen book. It has survived  not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing PageMaker including versions of Lorem Ipsum."
        },
        {
          habitType: "Negative outlook",
          isExpand: false,
          habitContent:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown  printer took a galley of type and scrambled it to make a type specimen book. It has survived  not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing PageMaker including versions of Lorem Ipsum."
        },
        {
          habitType: "Unhealthy coping",
          isExpand: false,
          habitContent:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown  printer took a galley of type and scrambled it to make a type specimen book. It has survived  not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing PageMaker including versions of Lorem Ipsum."
        },
        {
          habitType: "Avoiding the Issue",
          isExpand: false,
          habitContent:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown  printer took a galley of type and scrambled it to make a type specimen book. It has survived  not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing PageMaker including versions of Lorem Ipsum."
        }
      ]
    };
  }

  expand = index => {
    let habits = [...this.state.habits];
    habits[index].isExpand = !habits[index].isExpand;
    this.setState({ habits });
  };

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
                      What coping habit do you want to change?
                    </Text>
                  </View>
                  <View style={styles.headingContentContainer}>
                    <Text style={styles.headingContentText}>
                      Below are 5 common coping habits that you can choose from
                      to address over the course of the challenge. Indentify 1
                      or 2 that are the most relevant to you. Making small
                      change over time can have lasting effects to your coping
                      habits!
                    </Text>
                  </View>
                </View>
                <View style={{ width: "90%", paddingBottom: hp("25%") }}>
                  {this.state.habits.map((habit, index) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#ededea",
                          paddingVertical: hp("1.5%"),
                          borderRadius: 6,
                          marginVertical: 6
                        }}
                        key={index}
                      >
                        <View style={{ width: "10%", alignItems: "center" }}>
                          <TouchableOpacity
                            style={{
                              width: 20,
                              height: 20,
                              borderWidth: 1.5,
                              borderRadius: 10,
                              alignItems: "center",
                              justifyContent: "center",
                              borderColor: "#446e68"
                            }}
                          >
                            <Image
                              source={Add}
                              style={{ width: 15, height: 15 }}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                        {habit.isExpand === false ? (
                          <TouchableOpacity
                            style={{ width: "90%", paddingLeft: wp("2%") }}
                            onPress={() => this.expand(index)}
                          >
                            <View>
                              <Text style={{ color: "#446e68" }}>
                                {habit.habitType}
                              </Text>
                            </View>
                            <View
                              style={{ position: "absolute", right: wp("2%") }}
                            >
                              <Image
                                source={DropDown}
                                style={{ width: 15, height: 15 }}
                                resizeMode="contain"
                              />
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{ width: "90%" }}
                            onPress={() => this.expand(index)}
                          >
                            <View>
                              <Text style={{ color: "#446e68" }}>
                                {habit.habitType}
                              </Text>
                            </View>
                            <View>
                              <Text style={{ color: "#446e68", paddingTop: 5 }}>
                                {habit.habitContent}
                              </Text>
                            </View>
                            <View
                              style={{ position: "absolute", right: wp("2%") }}
                            >
                              <Image
                                source={DropDown}
                                style={{
                                  width: 15,
                                  height: 15,
                                  transform: [{ rotate: "180deg" }]
                                }}
                                resizeMode="contain"
                              />
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
            <View style={{ alignItems: "center", marginBottom:hp('2%') }}>
              <TouchableOpacity
                style={styles.submit}
                onPress={() =>
                  this.props.navigation.navigate("SelfRatingChallenge")
                }
              >
                <View>
                  <Text style={styles.buttonText}>NEXT</Text>
                </View>
              </TouchableOpacity>
            </View>
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
  headingContentContainer: {
    paddingTop: hp("1%")
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#446e68",
    textAlign: "center"
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
