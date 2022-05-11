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
import LogoHeader from "./logoHeader";
import Header from "./header";
import backgroundImage from "../Images/bgImage.png";
import DatePicker from "./react-native-datepicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import HealthBanner from "../Images/healthBanner.png";
import Mood from "../Images/mood.png";
import Sleeping from "../Images/sleeping.png";
import Stress from "../Images/stress.png";
import Weigh from "../Images/weigh.png";
import BottomMenu from "./bottomMenu";
import * as stressAction from "../Actions/stressAction";
import { connect } from "react-redux";
import * as weeklyMoodAction from "../Actions/weeklyMoodAction";
import * as weightAction from "../Actions/weightAction";
import HeaderBack from "./headerBack";

class MyHealth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myHealthData: [
        {
          healthTypeImagee: Weigh,
          content: "Weight"
        },
        {
          healthTypeImagee: Sleeping,
          content: "Sleep"
        },
        {
          healthTypeImagee: Stress,
          content: "Stress Levels"
        },
        {
          healthTypeImagee: Mood,
          content: "Mood"
        }
      ]
    };
  }

  handleImage = async index => {
    if (index == 0) {
      // this.props.navigation.navigate("Weight");
      let token = await AsyncStorage.getItem("userToken");
      this.props.getBmi(token);
    }else if(index == 1){
      this.props.navigation.navigate("Sleep")
    } else if (index == 2) {
      let token = await AsyncStorage.getItem("userToken");
      await this.props.getStressQuestions(token);
      await this.props.navigation.navigate("Stress");
    } else if (index == 3) {
      let token = await AsyncStorage.getItem("userToken");
      await this.props.getWeeklyMood(token);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.WeeklyMood !== this.props.WeeklyMood) {
      console.warn(this.props.WeeklyMood)
      this.props.navigation.navigate("WeeklyMood");
    }
    if (prevProps.bmiresponse !== this.props.bmiresponse) {
      console.warn(this.props.bmiresponse);
      if (this.props.bmiresponse.status === 200) {
        this.props.navigation.navigate("Weight");
      }
    }
  }
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
      <SafeAreaView style={styles.safeAreaViewContainer}>

        
          <View>
            <HeaderBack {...this.props} heading="MyHealth" />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Image
                source={HealthBanner}
                resizeMode="cover"
                style={styles.healthBannerImage}
              />
            </View>
            
            <View style={styles.myHealthContainer}>
              <View style={styles.contentInnerContainer}>
                {this.state.myHealthData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.contentContainer}
                    onPress={() => this.handleImage(index)}
                  >
                    <ImageBackground
                      source={item.healthTypeImagee}
                      style={styles.contentBgimage}
                      imageStyle={{ borderRadius: 8 }}
                    >
                      <View style={styles.contentTextContainer}>
                        <Text style={styles.contentText}>{item.content}</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
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
    loginData: state.LoginReducer.loginData,
    WeeklyMood: state.WeeklyMoodReducer.WeeklyMood,
    bmiresponse: state.WeightReducer.bmiresponse
  }),
  {
    ...stressAction,
    ...weeklyMoodAction,
    ...weightAction
  }
)(MyHealth);

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
  healthBannerImage: {
    width: "100%",
    height: hp("35%")
  },
  headingContainer: {
    marginVertical: hp("2.5%"),
    alignItems: "center"
  },
  headingText: {
    fontSize: hp("5%"),
    color: "#d5efef"
  },
  contentInnerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "55%"
  },
  contentContainer: {
    marginBottom: hp("2%"),
    width: wp("24%"),
    height: wp("24%")
  },
  contentBgimage: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  contentTextContainer: {
    position: "absolute",
    bottom: hp("2.5%")
  },
  contentText: {
    fontSize: hp("1.7%"),
    color: "white",
    textAlign: "center"
  },
  myHealthContainer: {
    alignItems: "center",
    marginVertical: hp("10%")
  },
  bottomMenuContainer: {
    position: "absolute",
    bottom: 3
  }
});
