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
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
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
import { connect } from "react-redux";
import * as userActions from "../Actions/userDetailActions";

class MonthlySleep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthsOfYear :[

        ''
      ],
      weeklyStepData: [
        {
          weekDay: "Current Month",
          numberOfsteps: 150
        },
        {
          weekDay: "Month 1",
          numberOfsteps: 180
        },
        {
          weekDay: "Month 2",
          numberOfsteps: 170
        },
        
      ]
    };
  }

//   componentDidMount() {
//     // let stepDataArray = [...this.state.stepDataArray];
//     let startDate = new Date("2019-05-01T00:00:17.971Z");
//     let currentDate = new Date();
//     let startMonth = startDate.getMonth();
//     let currentMonth = currentDate.getMonth();
//     currentMonth =
//     currentMonth + 1 < 10 ?    (currentMonth + 1) : currentMonth + 1;
//     startMonth =
//     startMonth + 1 < 10 ?    (startMonth + 1) : startMonth + 1;
//       for(let i = startMonth; i <= currentMonth;i++){
//         var endDate = moment(startDate).endOf('august');
// 3
//       }
//     let d1 = moment(startDate)
//       .subtract(80, "day")
//       .toISOString();
//     const options = {
//       scopes: [
//         Scopes.FITNESS_ACTIVITY_READ_WRITE,
//         Scopes.FITNESS_BODY_READ_WRITE
//       ]
//     };

//     GoogleFit.authorize(options)
//       .then(res => {
//         if (res.success) {
//           // alert("Successfully connected");
//           const options = {
//             startDate: this.props.userData.result.createdAt, // required ISO8601Timestamp
//             endDate: new Date().toISOString() // required ISO8601Timestamp
//           };

//           GoogleFit.getDailyStepCountSamples(options)
//             .then(res => {
//               // res.map((steps, i) => {
//               //   if (steps.source == "com.google.android.gms:estimated_steps") {
//               //     steps.steps.map((stepData, index) => {
//               //       stepDataArray.push(stepData.value);
//               //       this.setState({ stepDataArray });
//               //     });
//               //   }
//               // });
//             })
//             .catch(err => {
//               console.warn(err);
//             });
//         }
//       })
//       .catch(err => {
//         console.warn("err >>> ", err);
//       });
//   }

  render() {
    const fill = "#4fb2a7";
    const contentInset = { top: 20, bottom: 20 };
    const data = [500, 700, 400];
    const axesSvg = { fontSize: 10, fill: "#fff" };
    const gridOptions = {
      strokeColor: "#fff"
    };
    return (
      <View style={{ width: "100%", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#003037",
            alignItems: "center",
            width: "100%"
          }}
        >
          <View style={{ width: "80%" }}>
            <StepBarGraph
              data={data}
              gridOptions={gridOptions}
              fill={"#4fb2a7"}
              type="step3Months"
              dataType="step"
            />
          </View>
        </View>
        <View style={{ width: "90%", marginTop: hp("7%") }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#003037",
              paddingVertical: hp("1%"),
              paddingHorizontal: wp("2%"),
              borderBottomWidth: 1,
              borderBottomColor: "#fff"
            }}
          >
            <View>
              <Text style={{ color: "#fff" }}>May</Text>
            </View>
            <View>
              <Text style={{ color: "#fff" }}>200 hrs</Text>
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
                  <Text style={{ color: "#fff" }}>200 hrs</Text>
                </View>
                <View style={{ width: "33%", alignItems: "flex-end" }}>
                  <Image
                    source={Star}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    userData: state.UserDetailReducer.userData
  }),
  null
)(MonthlySleep);
