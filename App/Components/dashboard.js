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
import SplashScreen from "react-native-splash-screen";
import LogoHeader from "./logoHeader";
import Header from "./header";
import backgroundImage from "../Images/bgImage.png";
import DatePicker from "./react-native-datepicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import HR from "../Images/hrdepartment.png";
import Activity from "../Images/activity.png";
import Personalgoal from "../Images/mypersonalgoals.png";
import Wellness from "../Images/wellnessdept.png";
import Health from "../Images/health.png";
import BottomMenu from "./bottomMenu";
import RNSamsungHealth from 'rn-samsung-health';
import AppleHealthKit from 'rn-apple-healthkit';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import moment from 'moment'
import Url from "../Actions/url";
// import DeviceInfo from 'react-native-device-info';

// // or ES6+ destructured imports

// import { getUniqueId, getManufacturer } from 'react-native-device-info';


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [
        {
          contentImage: Health,
          contentText: "My Health"
        },
        {
          contentImage: Activity,
          contentText: "My Activity"
        },
        {
          contentImage: Wellness,
          contentText: "My Wellness Department"
        },
        {
          contentImage: Personalgoal,
          contentText: "My Personal Goals"
        }
      ],
      startDate: '',
      endDate: '',
      Data: [],
      step: [],
      sleep: [],
      heart: []
    };
  }

  async componentDidMount() {
    let stepData = [...this.state.step];
    let sleepData = [...this.state.sleep];
    let heartData = [...this.state.heart];

    // DeviceInfo.getDeviceName().then(deviceName => {
    //   // iOS: "Becca's iPhone 6"
    //   // Android: ?
    //   // Windows: ?
    //   console.warn("device name-->",deviceName)
    // });
    var value = await AsyncStorage.getItem("userToken");
    const tokenBearer = "Bearer " + value;
    // console.warn(" token   ", JSON.stringify(tokenBearer))
    fetch(Url + "/get/third-party/dates", {
      method: "GET",
      headers: {
        // Accept: "application/json",
        Authorization: tokenBearer,
        //"Content-Type": "multipart/form-data"
      },
      // body: form
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("get date from back", responseData);
        this.setState({
          startDate: responseData.startDate,
          endDate: responseData.endDate
        }, () => {
          if (Platform.OS == 'android') {
            RNSamsungHealth.authorize((err, res) => {
              console.warn('res', res, err)
              if (res) {
                this.setState({ type: "samsung" })
                // let startDate = new Date().setDate(new Date(this.state.startDate).getDate() ); // 30 days back date
                // let endDate = new Date(this.state.endDate).getTime(); //today's date
                let startDate = this.state.startDate;
                let endDate = this.state.endDate;
                let opt = { startDate, endDate };
                console.warn('sam date', opt)
                RNSamsungHealth.getDailyStepCount(opt, (err, res) => {
                  if (err) console.warn(err);
                  if (res) {
                    stepData = res
                    console.warn('step', res)
                    this.setState({ step: stepData })
                    // console.warn('steps', res);

                    // var data = res[0].data;
                    // var stepData = [];

                    // data.map(item => {
                    //   var obj = {
                    //     steps: item.steps,
                    //     date: item.date

                    //   }
                    //   stepData.push(obj);
                    // });
                    // this.setState({ Data: stepData }, () => console.warn('stepsData', this.state.Data))
                  }//done
                });
                RNSamsungHealth.getSleep(opt, (err, res) => {
                  if (err) console.warn("getSleep", err);
                  if (res) {
                    sleepData = res;
                    this.setState({ sleep: sleepData })
                    // let sleepData = res[0].data;
                    // let data = [...this.state.Data];
                    // console.warn('sleep', res[0].data)
                    // sleepData.map((sleep, index) => {
                    //   console.warn(sleep)
                    //   data[index].sleep = sleep;
                    //   this.setState({ Data :data }, () => console.warn('data', data))
                    // })


                    // let abc = []
                    // for (let i = 0; i < data.length; i++) {
                    //   let object = data[i];
                    //   return sleepData.find((sleep) => {
                    //    console.warn(sleep)
                    //     let startTime = moment(sleep.data[0].start_time).format("YYYY-MM-DD");
                    //     let endTime;
                    //     console.warn('hyhyg', data[i].date ,  startTime)
                    //     if (data[i].date == startTime) {

                    //     }

                    //   })
                    // }

                  }
                });
                RNSamsungHealth.getHeartRate(opt, (err, res) => {
                  if (err) console.warn("getHeartRate", err);
                  if (res) {
                    heartData = res;
                    console.warn('heart', res)
                    this.setState({ heart: heartData })
                  }
                });

              } else console.log(err);
            });

          }
          if (Platform.OS == 'ios') {
            console.warn('inside apple')
            this.setState({ type: "apple" })
            let d = new Date(2019, 1, 1);
            let options = {
              permissions: {
                read: [
                  "Height",
                  "Weight",
                  "StepCount",
                  "DateOfBirth",
                  "BodyMassIndex",
                  "ActiveEnergyBurned",
                  "HeartRate",
                  "SleepAnalysis"
                ],
                write: [
                  "Height",
                  "Weight",
                  "StepCount",
                  "BodyMassIndex",
                  "Biotin",
                  "Caffeine",
                  "Calcium",
                  "Carbohydrates",
                  "Chloride",
                  "Cholesterol",
                  "Copper",
                  "EnergyConsumed",
                  "FatMonounsaturated",
                  "FatPolyunsaturated",
                  "FatSaturated",
                  "FatTotal",
                  "Fiber",
                  "Folate",
                  "Iodine",
                  "Iron",
                  "Magnesium",
                  "Manganese",
                  "Molybdenum",
                  "Niacin",
                  "PantothenicAcid",
                  "Phosphorus",
                  "Potassium",
                  "Protein",
                  "Riboflavin",
                  "Selenium",
                  "Sodium",
                  "Sugar",
                  "Thiamin",
                  "VitaminA",
                  "VitaminB12",
                  "VitaminB6",
                  "VitaminC",
                  "VitaminD",
                  "VitaminE",
                  "VitaminK",
                  "Zinc",
                  "Water",
                  "HeartRate",
                  "SleepAnalysis"
                ]
              }
            };
      
            let options1 = {
              unit: 'bpm', // optional; default 'bpm'
              startDate: (new Date(2019, 10, 1)).toISOString(), // required
              endDate: (new Date()).toISOString(), // optional; default now
              ascending: false, // optional; default false
              limit: 10, // optional; default no limit
            };

            let options2 = {
              startDate: (new Date(2019,4,27)).toISOString(),
              endDate: (new Date()).toISOString(),
              type: 'Walking', // one of: ['Walking', 'StairClimbing', 'Running', 'Cycling', 'Workout']
            };
            let startDateApple = new Date(this.state.startDate);
            console.warn('apple date', startDateApple);
      
            AppleHealthKit.initHealthKit(options, (err, results) => {
              if (err) {
                console.warn("error initializing Healthkit: ", err);
                return;
              }
              let options = {
                startDate: (new Date(this.state.startDate)).toISOString(), // required
                endDate: (new Date()).toISOString() // optional; default now
              };
              AppleHealthKit.getSamples(options2, (err, results) => {
                if (err) {
                  console.warn('err', err)
                  return;
                }
                console.warn('results', results)
              });
              console.warn('dates', options)
              AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
                if (err) {
                  console.warn('err', err)
                  return;
                } else {
                  console.warn("step", results)
                  this.setState({ step: results })
                }
      
              });
              AppleHealthKit.getHeartRateSamples(options, (err, results) => {
                if (err) {
                  console.warn('err', err)
                  return;
                } else {
                  console.warn("heart", results)
                  this.setState({ heart: results })
                }
      
              });
              AppleHealthKit.getSleepSamples(options, (err, results) => {
                if (err) {
                  console.warn('err', err)
                  return;
                } else {
                  console.warn("sleep", results)
                  // this.setState({ sleep: results })
                }
      
              });
      
            });
          }
        })

        //   dispatch({ type: "UPLOAD_POST", responseData });
      })
      .catch(err => alert(err.message));

    SplashScreen.hide();

    

  }

  handleNavigation = index => {
    if (index == 0) {
      this.props.navigation.navigate("MyHealth");
    } else if (index == 2) {
      this.props.navigation.navigate("WellnessDepartment");
    } else if (index == 3) {
      this.props.navigation.navigate("MyPersonalGoals");
    } else if (index == 1) {
      this.props.navigation.navigate("MyActivity");
    }
  };
  send = () => {
    let { step, sleep, heart, type, startDate, endDate } = this.state;
    let start = moment(startDate).format("YYYY-MM-DD");
    let end = moment(endDate).format("YYYY-MM-DD")
    let data = {
      type: type,
      steps: step,
      sleep: sleep,
      heart_rate: heart,
      startDate: start,
      endDate: end
    }
    console.warn('data', data)
    AsyncStorage.getItem('userToken').then((token) => {
      let tokenBearer = "Bearer " + token;
      console.warn('token', tokenBearer)
      fetch(Url + "/update/third-party/data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenBearer
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseData => {
          console.warn("responseData", responseData);
        })
        .catch(err => alert(err));
    }
    )
  }


  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          {/* <ImageBackground source={backgroundImage} style={styles.bgImage}> */}

          <View>
            <Header {...this.props} heading="Dashboard" />
          </View>
          <View style={styles.logoContainer}>
            <LogoHeader />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainContainer}>
              <View style={styles.innerContainer}>
                <View style={styles.headingMainContainer}>
                  {/* <View>
                    <Text style={styles.mainHeadingText}>Dashboard</Text>
                  </View> */}
                  <View style={styles.headingContentContainer}>
                    <Text style={styles.headingContentText}>
                      Lorem Ipsum is simply dummy text of the printing and type
                      setting industry.
                    </Text>
                  </View>
                  {/* <View style={{ borderWidth: 1 }}><TouchableOpacity onPress={this.send}><Text>Send data</Text></TouchableOpacity></View> */}
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("MyHRDepartment")
                  }
                >
                  <View style={styles.hrContainer}>
                    <ImageBackground
                      style={styles.hrImage}
                      imageStyle={{ borderRadius: 6 }}
                      source={HR}
                    >
                      <View style={styles.bgImageTextContainer}>
                        <Text style={styles.bgImageText}>My HR Department</Text>
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    width: "85%"
                  }}
                >
                  {this.state.content.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        width: "48%",
                        marginVertical: hp("1%"),
                        justifyContent: "space-around",
                        borderRadius: 6
                      }}
                      onPress={() => this.handleNavigation(index)}
                    >
                      <ImageBackground
                        source={item.contentImage}
                        style={{
                          width: "100%",
                          height: 100,
                          justifyContent: "center",
                          borderRadius: 6
                        }}
                        imageStyle={{ borderRadius: 6 }}
                      >
                        <View style={styles.bgImageTextContainer}>
                          <Text style={styles.bgImageText}>
                            {item.contentText}
                          </Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{ position: "absolute", bottom: 3 }}>
            <BottomMenu {...this.props} />
          </View>
          {/* </ImageBackground> */}
        </SafeAreaView>
      </ImageBackground>
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
  logoContainer: {
    marginTop: hp("2.5%"),
    backgroundColor: "white",
    paddingVertical: 5
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
  mainHeadingText: {
    fontSize: hp("5%"),
    color: "#d5efef"
  },
  headingContentContainer: {
    paddingTop: hp("1%")
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#d5efef",
    textAlign: "center"
  },
  hrContainer: {
    width: wp("85%"),
    borderRadius: 6,
    marginBottom: hp("1%")
  },
  hrImage: {
    width: "100%",
    height: hp("15%"),
    justifyContent: "center"
  },
  bgImageTextContainer: {
    alignItems: "center",
    paddingHorizontal: wp("2%")
  },
  bgImageText: {
    color: "white",
    fontSize: hp("2.2%"),
    textAlign: "center"
  }
});
