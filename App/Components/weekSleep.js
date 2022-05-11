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
import {
  BarChart,
  Grid,
  XAxis,
  YAxis,
  LineChart
} from "react-native-svg-charts";
// import { LineChart, BarChart } from "react-native-chart-kit";
import Foot from "../Images/shoes.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Steps from "./steps";
import Star from "../Images/star_1.png";
import StepBarGraph from "./stepBarGraph";

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientTo: "#08130D",
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2 // optional, default 3
};
export default class WeekSleep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weeklyStepData: [
        {
          weekDay: "Monday",
          numberOfsteps: 1000
        },
        {
          weekDay: "TuesDay",
          numberOfsteps: 1000
        },
        {
          weekDay: "Wednesday",
          numberOfsteps: 1000
        },
        {
          weekDay: "Thursday",
          numberOfsteps: 1000
        },
        {
          weekDay: "Friday",
          numberOfsteps: 1000
        },
        {
          weekDay: "Saturday",
          numberOfsteps: 1000
        },
        {
          weekDay: "Sunday",
          numberOfsteps: 1000
        }
      ]
    };
  }
  render() {
    const fill = "#4fb2a7";
    const data = [5, 7, 4, 9, 8, 3, 5];
    const axesSvg = { fontSize: 12, fill: "#446e68" };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 250;
    const contentInset = { top: 20, bottom: 20 };
    const CUT_OFF = 20;
    const gridOptions = {
      strokeColor: "#000"
    };
    return (
      <View style={{ width: wp("100%"), alignItems: "center" }}>
        <View
          style={{
            alignItems: "center",
            width: "100%",
            paddingBottom: 50
          }}
        >
          <View style={{ width: "80%" }}>
            <StepBarGraph
              data={data}
              gridOptions={gridOptions}
              fill={"#4fb2a7"}
              type="stepWeek"
              dataType="sleep"
            />
          </View>
        </View>
        <View style={{ alignItems: "center", width: "90%" }}>
          <View>
            <Text
              style={{
                fontSize: hp("3.5%"),
                textAlign: "center",
                color: "#4fb2a7"
              }}
            >
              6hrs 10mins
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: hp("2%"),
                textAlign: "center",
                color: "#446e68"
              }}
            >
              Average Sleep time
            </Text>
          </View>
          <View style={{ paddingVertical: hp("3%") }}>
            <Text
              style={{
                fontSize: hp("2%"),
                textAlign: "center",
                color: "#446e68"
              }}
            >
              You slept consistently for 0 out of 7 days
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
            paddingVertical:hp('1%'),
            borderBottomWidth:0.2,
            borderBottomColor:'#4fb2a7',
            borderTopWidth:0.2,
            borderTopColor:'#4fb2a7'
          }}
        >
          <View>
            <Text
              style={{
                fontSize: hp("2%"),
                textAlign: "center",
                color: "#446e68"
              }}
            >
              Average bedtime
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: hp("2%"),
                textAlign: "center",
                color: "#446e68"
              }}
            >
              1:20 am
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
            paddingVertical:hp('1%'),
            borderBottomWidth:0.2,
            borderBottomColor:'#4fb2a7'
          }}
        >
          <View>
            <Text
              style={{
                fontSize: hp("2%"),
                textAlign: "center",
                color: "#446e68"
              }}
            >
              Average wake-up time
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: hp("2%"),
                textAlign: "center",
                color: "#446e68"
              }}
            >
              1:20 am
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
