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
import GoogleFit, { Scopes } from "react-native-google-fit";
import moment from "moment";

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
      stepDataArray: [],
      weeklyStepData: [
        {
          weekDay: "Sunday",
          sleephrs: "5 Hrs"
        },
        {
          weekDay: "Monday",
          sleephrs: "6 Hrs"
        },
        {
          weekDay: "Tuesday",
          sleephrs: "4 Hrs"
        },
        {
          weekDay: "Wednesday",
          sleephrs: "7 Hrs"
        },
        {
          weekDay: "Thursday",
          sleephrs: "8 Hrs"
        },
        {
          weekDay: "Friday",
          sleephrs: "9 Hrs"
        },
        {
          weekDay: "Saturday",
          sleephrs: "5 Hrs"
        }
      ]
    };
  }

  render() {
    console.warn("this.state.stepDataArray", this.state.stepDataArray);
    let totalSteps = 0;
    this.state.stepDataArray.map((data, index) => {
      totalSteps += data;
    });
    const fill = "#4fb2a7";
    const data = [5, 6, 4, 7, 8, 9, 5];
    const axesSvg = { fontSize: 12, fill: "#fff" };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 250;
    const contentInset = { top: 20, bottom: 20 };
    const CUT_OFF = 20;
    const gridOptions = {
      strokeColor: "#eee"
    };
    const Labels = ({ x, y, bandwidth, data }) =>
      data.map((value, index) => {
        return (
          <Text
            key={index}
            x={x(index) + bandwidth / 2}
            y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
            fontSize={12}
            fill={value >= CUT_OFF ? "blue" : "red"}
            alignmentBaseline={"middle"}
            textAnchor={"middle"}
          >
            {value}
          </Text>
        );
      });
    return (
      <View style={{ width: "100%", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#003037",
            alignItems: "center",
            width: "100%",
            paddingBottom: 50
          }}
        >
          <View style={{ width: "80%" }}>
            {this.state.stepDataArray &&
            this.state.stepDataArray.length == 7 ? (
              <StepBarGraph
                data={this.state.stepDataArray}
                gridOptions={gridOptions}
                fill={"#4fb2a7"}
                type="stepWeek"
                dataType="step"
              />
            ) : this.state.stepDataArray.length === 0 ? (
              <StepBarGraph
                data={data}
                gridOptions={gridOptions}
                fill={"#4fb2a7"}
                type="stepWeek"
                dataType="step"
              />
            ) : (
              <View
                style={{ width: "100%", height: 250, justifyContent: "center" }}
              >
                <ActivityIndicator />
              </View>
            )}
          </View>
        </View>
        <View style={{ flexDirection: "row", width: "90%" }}>
          <View style={{ width: "20%", justifyContent: "center" }}>
            <Image
              source={Foot}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              paddingVertical: hp("4%")
            }}
          >
            <Text style={{ color: "white" }}>
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
                  backgroundColor: "#b9c9ce",
                  paddingVertical: hp("1%"),
                  borderRadius: 4
                }}
              >
                <Text style={{ color: "#0b5b53", textAlign: "center" }}>
                  Add Goal
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: "90%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#003037",
              paddingVertical: hp("1%"),
              paddingHorizontal: wp("1%"),
              borderBottomWidth: 1,
              borderBottomColor: "#fff"
            }}
          >
            <View>
              <Text style={{ color: "#fff" }}>This Week</Text>
            </View>
            <View>
              <Text style={{ color: "#fff" }}>{totalSteps}</Text>
            </View>
          </View>
          {this.state.weeklyStepData.map((steps, index) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  paddingVertical: hp("1%"),
                  paddingHorizontal: wp("1%"),
                  borderBottomWidth: 1,
                  borderBottomColor: "#fff"
                }}
              >
                <View style={{ width: "33%" }}>
                  <Text style={{ color: "#fff" }}>{steps.weekDay}</Text>
                </View>
                <View style={{ width: "33%", alignItems: "center" }}>
                  <Text style={{ color: "#fff" }}>{steps.sleephrs}</Text>
                </View>
                {steps.sleephrs > "6 Hrs" ? (
                  <View style={{ width: "33%", alignItems: "flex-end" }}>
                    <Image
                      source={Star}
                      style={{ width: 20, height: 20 }}
                      resizeMode="contain"
                    />
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
