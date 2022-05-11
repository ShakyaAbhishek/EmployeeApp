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
import { ProgressCircle } from "react-native-svg-charts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Foot from "../Images/shoes.png";
import GoogleFit, { Scopes } from "react-native-google-fit";

export default class DailySteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyStepData: 2200
    };
  }
  componentDidMount() {
    if (Platform.OS === "android") {
      const options = {
        scopes: [
          Scopes.FITNESS_ACTIVITY_READ_WRITE,
          Scopes.FITNESS_BODY_READ_WRITE
        ]
      };

      GoogleFit.authorize(options).then(res => {
        if (res.success) {
          // alert("Successfully connected");
          let options = {
            startDate: new Date(2019, 11, 11).valueOf(), // simply outputs the number of milliseconds since the Unix Epoch
            endDate: new Date(2019, 11, 13).valueOf()
          };
          // GoogleFit.getSleepSamples(options, (err, res) => {
          //   console.warn(err, res);
          // });
          // GoogleFit.getDailyStepCountSamples(options)
          //   .then(res => {
          //     res.map((steps, i) => {
          //       console.warn('res', steps)
          //       if(steps.source == "com.google.android.gms:estimated_steps"){
          //         steps.steps.map((stepData, index) => {
          //           console.warn('fitData', stepData)
          //           this.setState({dailyStepData : stepData.value})
          //         })
          //       }
          //     })
          //   })
          // .catch(err => {
          //   console.warn(err);
          // });
        }
      });
      // .catch(err => {
      //   console.warn("err >>> ", err);
      // })
    } else {
      console.warn("ios");
    }
  }
  render() {
    let progressRate = 0;
    progressRate = this.state.dailyStepData / 5000;
    return (
      <View
        style={{ flex: 1, paddingVertical: hp("3%"), alignItems: "center" }}
      >
        <View style={{ alignItems: "center" }}>
          <ProgressCircle
            style={{ height: wp("50%"), width: wp("50%") }}
            progress={progressRate}
            progressColor={"#08b89f"}
            //   strokeWidth={10}
          />
          <View
            style={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              height: wp("50%"),
              width: "100%"
            }}
          >
            {this.state.dailyStepData !== "" || Platform.OS === "android" ? (
              <Text
                style={{
                  color: "#08b89f",
                  fontSize: hp("5%"),
                  fontWeight: "bold",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                {this.state.dailyStepData}
              </Text>
            ) : (
              <Text
                style={{
                  color: "#08b89f",
                  fontSize: hp("6%"),
                  fontWeight: "bold"
                }}
              >
                2500
              </Text>
            )}
            <Text style={{ color: "#08b89f" }}>/5000 steps </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", width: "90%" }}>
          <View style={{ width: "20%", justifyContent: "center" }}>
            <Image
              source={Foot}
              style={{ width: 40, height: 40, tintColor: "#446e68" }}
              resizeMode="contain"
              tintColor="#446e68"
            />
          </View>
          <View style={{ width: "50%", justifyContent: "center" }}>
            <Text style={{ fontSize: hp("2%") }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Ipsum been the industry’s specimen book.
            </Text>
          </View>
          <View style={{ width: "30%", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("MyPersonalGoals")}
            >
              <View
                style={{
                  backgroundColor: "#08b89f",
                  paddingVertical: 4,
                  borderRadius: 10
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Add Goal
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
