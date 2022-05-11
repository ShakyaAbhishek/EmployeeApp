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
import { BarChart, Grid, XAxis, YAxis } from "./react-native-svg-charts";
import moment from "moment";

export default class StepBarGraph extends Component {
  render() {
    const fill = this.props.fill;
    return (
      <View style={{ width: "100%" }}>
        <YAxis
          data={this.props.data}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{
            fill: this.props.dataType === "step" ? "#fff" : "#446e68",
            fontSize: 12
          }}
          style={{ position: "absolute", left: "-10%", height: 250 }}
          numberOfTicks={3}
          formatLabel={(value, index) => {
            return value;
          }}
        />

        <BarChart
          style={{
            height: 250,
            borderBottomWidth: 0.2,
            borderBottomColor:
              this.props.dataType === "step" ? "#fff" : "#446e68"
          }}
          data={this.props.data}
          svg={{ fill }}
          contentInset={{ top: 10, bottom: 10 }}
        >
          <Grid svg={this.props.gridOptions} />
        </BarChart>
        <XAxis
          style={{
            marginHorizontal:
              this.props.type === "stepMonth"
                ? "-9%"
                : this.props.type === "step3Months"
                ? "5%"
                : "-4%",
            height: 30,
            paddingVertical: 5
          }}
          data={this.props.data}
          formatLabel={
            this.props.type === "stepMonth"
              ? (value, index) => {
                  return index + 1;
                }
              : this.props.type === "step3Months"
              ? (value, index) => {
                  if(index === 0) {
                    return "Aug"
                  } else if( index === 1) {
                    return "Sept"
                  } else {
                    return "Oct"
                  }
                }
              : (value, index) => {
                  let dates = new Date();
                  let currentMonth = dates.getMonth();
                  let currentDay = dates.getDate();
                  currentMonth =
                    currentMonth + 1 < 10
                      ? "0" + (currentMonth + 1)
                      : currentMonth + 1;
                  currentDay = currentDay < 10 ? "0" + currentDay : currentDay;

                  // let d1 = moment(today)
                  //   .subtract(2, "day")
                  //   .toISOString();
                  // console.warn('d1', d1);

                  // for (index = index; index < 7; index++) {
                  //   console.warn('curr', currentDay)
                  //   // const today = currentMonth + "/" + (currentDay - index);
                  //   // return today;
                  // }

                  // if (index == 0) {
                  //   return currentMonth + "/" + (currentDay - 6);
                  // } else if (index == 1) {
                  //   return currentMonth + "/" + (currentDay - 5);
                  // } else if (index == 2) {
                  //   return currentMonth + "/" + (currentDay - 4);
                  // } else if (index == 3) {
                  //   return currentMonth + "/" + (currentDay - 3);
                  // } else if (index == 4) {
                  //   return currentMonth + "/" + (currentDay - 2);
                  // } else if (index == 5) {
                  //   return currentMonth + "/" + (currentDay - 1);
                  // } else if (index == 6) {
                  //   return currentMonth + "/" + (currentDay - 0);
                  // }
                  if (index == 0) {
                    return "Sun";
                  } else if (index == 1) {
                    return "Mon";
                  } else if (index == 2) {
                    return "Tue";
                  } else if (index == 3) {
                    return "Wed";
                  } else if (index == 4) {
                    return "THU";
                  } else if (index == 5) {
                    return "FRI";
                  } else if (index == 6) {
                    return "Sat";
                  }
                }
          }
          svg={{
            fontSize: this.props.type === "stepMonth" ? 7 : 10,
            fill: this.props.dataType === "step" ? "#fff" : "#446e68"
          }}
          contentInset={{ left: 30, right: 30 }}
        />
      </View>
    );
  }
}
