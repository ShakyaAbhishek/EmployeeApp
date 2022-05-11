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
  TextInput
} from "react-native";
import LogoHeader from "./logoHeader";
import HeaderBack from "./headerBack";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Url from "../Actions/url";

import { connect } from "react-redux";
import * as weeklyMoodAction from "../Actions/weeklyMoodAction";
import BottomMenu from "./bottomMenu";
import Frustated from "../Images/frustated.png";
import Angry from "../Images/angry.png";
import Annoyed from "../Images/annoyed.png";
import Chillout from "../Images/chilledout.png";
import Excited from "../Images/excited.png";
import Grateful from "../Images/grateful.png";
import Healthy from "../Images/healthy.png";
import Meh from "../Images/meh.png";
import Motivated from "../Images/motivated.png";
import Quite from "../Images/quiet.png";
import Sleepy from "../Images/sleepy.png";
import Stress from "../Images/stress1.png";
import Frustatedgreen from "../Images/frustatedgreen.png";
import Angrygreen from "../Images/angrygreen.png";
import Annoyedgreen from "../Images/annoyedgreen.png";
import Chilloutgreen from "../Images/chilledoutgreen.png";
import Excitedgreen from "../Images/excitedgreen.png";
import Gratefulgreen from "../Images/gratefulgreen.png";
import Healthygreen from "../Images/healthygreen.png";
import Mehgreen from "../Images/mehgreen.png";
import Motivatedgreen from "../Images/motivatedgreen.png";
import Quitegreen from "../Images/quietgreen.png";
import Sleepygreen from "../Images/sleepygreen.png";
import Stressgreen from "../Images/stressgreen1.png";

class WeeklyMood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/"),
      todaysMood: "",
      arr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      yourMoodData: [
        {
          moodImage1: Angry,
          moodImage2: Angrygreen,
          chooseImage: false,
          textContent: "Angry"
        },
        {
          moodImage1: Healthy,
          moodImage2: Healthygreen,
          chooseImage: false,
          textContent: "Healthy"
        },
        {
          moodImage1: Sleepy,
          moodImage2: Sleepygreen,
          chooseImage: false,
          textContent: "Sleepy"
        },
        {
          moodImage1: Quite,
          moodImage2: Quitegreen,
          chooseImage: false,
          textContent: "Quite"
        },
        {
          moodImage1: Annoyed,
          moodImage2: Annoyedgreen,
          chooseImage: false,
          textContent: "Annoyed"
        },
        {
          moodImage1: Meh,
          moodImage2: Mehgreen,
          chooseImage: false,
          textContent: "Meh"
        },
        {
          moodImage1: Grateful,
          moodImage2: Gratefulgreen,
          chooseImage: false,
          textContent: "Grateful"
        },
        {
          moodImage1: Stress,
          moodImage2: Stressgreen,
          chooseImage: false,
          textContent: "Stress"
        },
        {
          moodImage1: Motivated,
          moodImage2: Motivatedgreen,
          chooseImage: false,
          textContent: "Motivated"
        },
        {
          moodImage1: Chillout,
          moodImage2: Chilloutgreen,
          chooseImage: false,
          textContent: "Chillout"
        },
        {
          moodImage1: Excited,
          moodImage2: Excitedgreen,
          chooseImage: false,
          textContent: "Excited"
        },
        {
          moodImage1: Frustated,
          moodImage2: Frustatedgreen,
          chooseImage: false,
          textContent: "Frustrated"
        }
      ]
    };
  }

  componentDidMount() {
    let day = "";
    this.state.yourMoodData.map((mood, i) => {
      return this.props.WeeklyMood.weeklyMoodData &&
        this.props.WeeklyMood.weeklyMoodData.length > 0
        ? this.props.WeeklyMood.weeklyMoodData.map((item, index) => {
          // console.warn('cdm', item)
            let dates = new Date(item.date);
            let currentMonth = dates.getMonth();
            let currentDay = dates.getDate();
            currentMonth =
              currentMonth + 1 < 10
                ? "0" + (currentMonth + 1)
                : currentMonth + 1;
            currentDay = currentDay < 10 ? "0" + currentDay : currentDay;
            const today =
              dates.getFullYear() + "/" + currentMonth + "/" + currentDay;
            if (today === this.state.currentDay) {
              if (
                mood.textContent ==
                item.moodType.charAt(0).toUpperCase() + item.moodType.slice(1)
              ) {
                this.setState({ todaysMood: mood });
              }
            }
          })
        : null;
    });
  }
  render() {
    const currentDate = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "/");
    let moodType = this.state.todaysMood.textContent;
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
       
          <View>
            <HeaderBack {...this.props} />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: wp("80%"),
                  alignItems: "center",
                  marginVertical: hp("1%")
                }}
              >
                <Text style={{ fontSize: hp("5%"), color: "#b3d4d4" }}>
                  My mood today
                </Text>
              </View>
              <View style={{ marginVertical: hp("2%") }}>
                <ImageBackground
                  source={this.state.todaysMood.moodImage2}
                  style={styles.moodBgImage}
                  imageStyle={{
                    borderRadius: 6
                  }}
                >
                  <View style={styles.moodTextContainer}>
                    <Text style={styles.moodText}>{moodType}</Text>
                  </View>
                </ImageBackground>
              </View>
            </View>
            <View>
              <View style={{ alignItems: "center", marginBottom: hp("10%") }}>
                <View
                  style={{
                    width: wp("80%"),
                    alignItems: "center",
                    marginVertical: hp("5%")
                  }}
                >
                  <Text style={{ fontSize: hp("4%"), color: "#b3d4d4" }}>
                    My mood this week
                  </Text>
                </View>
                {/* <ScrollView horizontal > */}
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >
                  {this.state.yourMoodData.map((mood, i) => {
                    return this.props.WeeklyMood &&
                      this.props.WeeklyMood.weeklyMoodData &&
                      this.props.WeeklyMood.weeklyMoodData.length > 0
                      ? this.props.WeeklyMood.weeklyMoodData.map(
                          (item, index) => {
                            let dates = new Date(item.date);
                            let currentMonth = dates.getMonth();
                            let currentDay = dates.getDate();
                            // console.warn('dates===', dates)
                            // console.warn('currentMonth===', currentMonth)
                            // console.warn( 'currentDay===', currentDay)
                            currentMonth =
                              currentMonth + 1 < 10
                                ? "0" + (currentMonth + 1)
                                : currentMonth + 1;
                            currentDay =
                              currentDay < 10 ? "0" + currentDay : currentDay;
                            const today =
                              dates.getFullYear() +
                              "/" +
                              currentMonth +
                              "/" +
                              currentDay;
                              // console.warn('today-==-----', today)
                            if (
                              mood.textContent ==
                              item.moodType.charAt(0).toUpperCase() +
                                item.moodType.slice(1)
                            ) {
                              // console.warn('preops=======', currentDate )
                              // console.warn('preops====new===', today )
                              if(currentDate !== today) {
                                return (
                                  <View
                                    key={index}
                                    style={
                                      {
                                        borderRightColor: "#fff",
                                        paddingHorizontal: hp("3%"),
                                        alignItems: "center",
                                        marginVertical: 5
                                      }
                                    }
                                  >
                                    <Text
                                      style={{
                                        color: "white",
                                        paddingVertical: 5
                                      }}
                                    >
                                      {this.state.arr[dates.getDay()]}
                                    </Text>
                                    <ImageBackground
                                      source={mood.moodImage1}
                                      style={{ width: 50, height: 50 }}
                                      imageStyle={{
                                        borderRadius: 6
                                      }}
                                    >
                                      <View style={styles.moodTextContainer}>
                                        <Text
                                          style={{
                                            color: "white",
                                            fontSize: hp("1%"),
                                            textAlign: "center"
                                          }}
                                        >
                                          {mood.textContent}
                                        </Text>
                                      </View>
                                    </ImageBackground>
                                  </View>
                                );
                              }
                            }
                          }
                        )
                      : null;
                  })}
                </View>
                {/* </ScrollView> */}
              </View>
            </View>
          </ScrollView>
          <View style={{ position: "absolute", bottom: 3 }}>
            <BottomMenu {...this.props} />
          </View>
    
      </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({
    WeeklyMood: state.WeeklyMoodReducer.WeeklyMood
  }),
  {
    ...weeklyMoodAction
  }
)(WeeklyMood);

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
  moodBgImage: {
    width: wp("40%"),
    height: hp("20%")
  },
  moodTextContainer: {
    bottom: 3,
    position: "absolute",
    width: "100%"
  },
  moodText: {
    color: "white",
    fontSize: hp("3%"),
    textAlign: "center"
  }
});
