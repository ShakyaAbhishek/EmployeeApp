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
import HeaderBack from "./headerBack";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import RNPickerSelect from "./react-native-picker-select";
import DropDown from "../Images/dropdown.png";
import GoalImages from "../Images/customgoals.png";
import DatePicker from "./react-native-datepicker";
import Calender from "../Images/calander.png";
import Info from "../Images/info.png";
import * as goalAction from "../Actions/goalsAction";
import TimePicker from "react-native-24h-timepicker";
import DateTimePicker from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import Add from "../Images/add.png";
import Minus from "../Images/minus.png";
import RNCalendarEvents from "react-native-calendar-events";
import Delete from "../Images/delete.png";
import moment from "moment";

class AddGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      totalAlarms: [
        {
          alarmTime: "Select Time",
          alarmType: "DAILY"
        }
      ],
      challenges: [
        {
          label: "STEP CHALLENGE",
          value: "step"
        },
        {
          label: "SLEEP CHALLENGE",
          value: "sleep"
        },
        {
          label: "CUSTOME GOAL",
          value: "custom"
        }
      ],
      reminderType: [
        {
          label: "DAILY",
          value: "DAILY"
        },
        {
          label: "WEEKLY",
          value: "WEEKLY"
        },
        {
          label: "MONTHLY",
          value: "MONTHLY"
        }
      ],
      index: "",
      challengeType: "",
      getStartDate: "",
      getEndDate: "",
      endBool: false,
      startBool: false,
      timeBool: false,
      remaindersArr: [],
      customDescription: "",
      challengeBool: false
    };
  }

  // async componentDidMount() {
  //   let status = await RNCalendarEvents.authorizationStatus();
  //   console.info("permission", `previous status${status}`);

  //   if (status !== "authorized") {
  //     status = await RNCalendarEvents.authorizeEventStore();
  //   }
  //   console.info("permission", `current status${status}`);

  //   return status;
  // }

  setGoalData = (value, type) => {
    this.props.setGoalDataInStore(value, type);
  };

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm = (hour, minute) => {
    let totalAlarms = [...this.state.totalAlarms];
    totalAlarms[this.state.index].alarmTime = `${hour}:${minute}`;
    this.setState({ totalAlarms });
    this.TimePicker.close();
  };

  addMultipleAlarms = () => {
    let totalAlarms = [...this.state.totalAlarms];
    totalAlarms.push({
      alarmTime: "Select Time",
      alarmType: "DAILY"
    });
    this.setState({ totalAlarms });
  };

  deleteAlarms = index => {
    let totalAlarms = [...this.state.totalAlarms];
    totalAlarms.splice(index, 1);
    if (this.state.totalAlarms.length > 1) {
      this.setState({ totalAlarms });
    } else {
      alert("We recommend to set a reminder");
    }
  };

  addAlarm = () => {
    // RNCalendarEvents.saveEvent("Title of event", {
    //   startDate: "2019-09-104T18:05:00.000Z",
    //   endDate: "2019-09-04T18:06:00.000Z"
    // });
    let {
      getStartDate,
      getEndDate,
      remainders,
      totalAlarms,
      customDescription,
      challengeType
    } = this.state;

    if (!getEndDate && !getStartDate && challengeType == "") {
      this.setState({ startBool: true, endBool: true, challengeBool: true });
    }
    if (challengeType == "") {
      this.setState({ challengeBool: true });
    }
    if (!getStartDate) {
      this.setState({ startBool: true });
    }
    if (!getEndDate) {
      this.setState({ endBool: true });
    }
    // if (!remainders) {
    //   this.setState({ timeBool: true });
    // }
    else {
      let data = {};
      if (challengeType === "custom") {
        data = {
          goalActivity: challengeType,
          startDate: getStartDate,
          endDate: getEndDate,
          remainders: totalAlarms,
          description: customDescription
        };
      } else {
        data = {
          goalActivity: challengeType,
          startDate: getStartDate,
          endDate: getEndDate,
          remainders: totalAlarms
        };
      }

      console.warn("data", data);
      AsyncStorage.getItem("userToken").then(token => {
        this.props.createGoal(data, token);
      });
    }
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.hideDateTimePicker();
  };

  handleTime = value => {
    let totalAlarms = [...this.state.totalAlarms];
    let { index } = this.state;
    totalAlarms[index].alarmTime = moment(value).format("HH:mm");
    this.setState({
      isDateTimePickerVisible: false,
      totalAlarms,
      timeBool: false
    });
  };

  hanldeReminderFrequency = (value, index) => {
    let totalAlarms = [...this.state.totalAlarms];
    totalAlarms[index].alarmType = value;
    this.setState({ totalAlarms });
  };

  render() {
    console.warn("this.state.challengeType", this.state.challengeType);
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View>
          <View style={{ paddingBottom: hp("2%") }}>
            <Text style={{ color: "white", fontSize: hp("2.5%") }}>
              Activity
            </Text>
          </View>
          <View
            style={[styles.smokePickerContainer, styles.pickerContainerWidth]}
          >
            <View style={styles.smokeImageContainer}>
              <Image
                source={GoalImages}
                style={styles.questionImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.mainPickerContainer}>
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  placeholder={{
                    label: "CHOOSE GOAL",
                    value: null
                  }}
                  hideIcon
                  items={this.state.challenges}
                  useNativeAndroidPickerStyle={false}
                  style={genderPicker}
                  onValueChange={value =>
                    this.setState({
                      challengeType: value,
                      challengeBool: false
                    })
                  }
                  value={this.state.challengeType}
                />
              </View>
              <View style={styles.dropDownImageContainer}>
                <Image
                  source={DropDown}
                  style={styles.DropDownImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          {this.state.challengeBool ? (
            <View>
              <Text style={{ color: "darkred" }}>* Required</Text>
            </View>
          ) : null}
        </View>

        {this.state.challengeType === "custom" ? (
          <View style={{ marginTop: hp("3%"), width: "90%" }}>
            <View style={{ paddingBottom: hp("2%") }}>
              <Text style={{ color: "white", fontSize: hp("2.5%") }}>
                Define your custom goal
              </Text>
            </View>
            <View
              style={{
                borderRadius: 6,
                backgroundColor: "#b3d4d4",
                height: 80,
                justifyContent: "flex-start"
              }}
            >
              <TextInput
                multiline={true}
                placeholder="Defiine custom goal description ..."
                placeholderTextColor="#05564d"
                style={{ paddingLeft: 10 }}
                onChangeText={e => this.setState({ customDescription: e })}
              />
            </View>
          </View>
        ) : null}

        <View style={styles.dataContainer}>
          <View>
            <View style={{ paddingBottom: hp("2%") }}>
              <Text style={{ color: "white", fontSize: hp("2.5%") }}>
                Start date
              </Text>
            </View>
            <View style={styles.dataInnerContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={Calender}
                  style={styles.dataImages}
                  resizeMode="contain"
                />
              </View>
              <View>
                <DatePicker
                  date={this.state.getStartDate}
                  mode="date"
                  placeholder="START DATE"
                  format="YYYY-MM-DD"
                  minDate="1980-05-01"
                  maxDate="2019-07-15"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  // onConfirm={() => this.setState({ startBool: false })}
                  showIcon={false}
                  onDateChange={date =>
                    this.setState({ getStartDate: date, startBool: false })
                  }
                />
              </View>
            </View>
            {this.state.startBool ? (
              <View>
                <Text style={{ color: "darkred" }}>* Required</Text>
              </View>
            ) : null}
          </View>
          <View>
            <View style={{ paddingBottom: hp("2%") }}>
              <Text style={{ color: "white", fontSize: hp("2.5%") }}>
                End date
              </Text>
            </View>
            <View style={styles.dataInnerContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={Calender}
                  style={styles.dataImages}
                  resizeMode="contain"
                />
              </View>
              <View>
                <DatePicker
                  date={this.state.getEndDate}
                  mode="date"
                  placeholder="END DATE"
                  format="YYYY-MM-DD"
                  minDate="1980-05-01"
                  maxDate="2019-07-15"
                  confirmBtnText="Confirm"
                  // onConfirm={() => this.setState({ endBool: false })}
                  cancelBtnText="Cancel"
                  showIcon={false}
                  onDateChange={date =>
                    this.setState({ getEndDate: date, endBool: false })
                  }
                />
              </View>
            </View>
            {this.state.endBool ? (
              <View>
                <Text style={{ color: "darkred" }}>* Required</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.notifyMainContainer}>
          <View style={styles.notifyContainer}>
            <View style={{ width: "15%" }}>
              <Image
                source={Info}
                style={{ width: wp("10%"), height: hp("5%") }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                width: "85%",
                paddingLeft: wp("2%"),
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: hp("2%") }}>
                We recommend to set a reminder blah blah ....
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: "row", paddingTop: hp("2%") }}>
            <View style={{ width: "45%", alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: hp("2.5%") }}>
                Set reminder
              </Text>
            </View>
            <View style={{ width: "45%", alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: hp("2.5%") }}>
                Notification Alarm
              </Text>
            </View>
          </View>
          {this.state.totalAlarms.map((item, index) => {
            return (
              <View style={{ alignItems: "center" }} key={index}>
                <View style={styles.dataContainer}>
                  <View>
                    <View style={styles.dataInnerContainer}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={Calender}
                          style={styles.dataImages}
                          resizeMode="contain"
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          width: wp("25%")
                        }}
                      >
                        <View style={styles.pickerContainer}>
                          <RNPickerSelect
                            placeholder={{}}
                            hideIcon
                            items={this.state.reminderType}
                            useNativeAndroidPickerStyle={false}
                            style={genderPicker}
                            onValueChange={value =>
                              this.hanldeReminderFrequency(value, index)
                            }
                            value={this.state.remaindersArr[index]}
                          />
                        </View>
                        <View style={{ position: "absolute", right: wp("1%") }}>
                          <Image
                            source={DropDown}
                            style={styles.DropDownImage}
                            resizeMode="contain"
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View style={styles.dataInnerContainer}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={Calender}
                          style={styles.dataImages}
                          resizeMode="contain"
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ index });
                          this.showDateTimePicker();
                        }}
                        style={{ padding: 10 }}
                      >
                        <Text style={{ color: "#05564d" }}>
                          {item.alarmTime}
                        </Text>
                        <DateTimePicker
                          isVisible={this.state.isDateTimePickerVisible}
                          onCancel={this.hideDateTimePicker}
                          mode="time"
                          onConfirm={value => this.handleTime(value)}
                        />
                      </TouchableOpacity>
                    </View>
                    {this.state.timeBool ? (
                      <View>
                        <Text style={{ color: "darkred" }}>* Required</Text>
                      </View>
                    ) : null}
                  </View>
                  <TouchableOpacity
                    style={{ justifyContent: "center" }}
                    onPress={() => this.deleteAlarms(index)}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        padding: hp("1%")
                      }}
                    >
                      <Image
                        source={Delete}
                        tintColor="#b3d4d4"
                        style={{ width: 15, height: 15 }}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                {/* <View
                  style={{
                    width: "90%",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.deleteAlarms(index)}
                    style={{ width: wp("40%") }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 5,
                        alignItems: "center",
                        backgroundColor: "#b3d4d4",
                        marginVertical: hp("2%"),
                        borderRadius: 6
                      }}
                    >
                      <Image
                        source={Minus}
                        style={{ width: 15, height: 15 }}
                        tintColor="black"
                      />
                      <View style={{ paddingLeft: 5 }}>
                        <Text style={{ color: "#05564d" }}>delete alarm</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View> */}
              </View>
            );
          })}
        </View>
        <View
          style={{
            width: "85%",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            onPress={() => this.addMultipleAlarms()}
            style={{ width: wp("35%") }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 5,
                alignItems: "center",
                backgroundColor: "#b3d4d4",
                marginVertical: hp("2%"),
                borderRadius: 6,
                width: "100%"
              }}
            >
              <View style={{ width: "15%" }}>
                <Image
                  source={Add}
                  style={{ width: 15, height: 15 }}
                  tintColor="black"
                />
              </View>
              <View style={{ paddingLeft: 5, width: "85%" }}>
                <Text style={{ color: "#05564d" }}>set another alarm</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ width: wp("40%") }} />
        </View>
        <TouchableOpacity style={styles.submit} onPress={this.addAlarm}>
          <View>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  state => ({
    getStartDate: state.GoalReducer.getStartDate,
    getEndDate: state.GoalReducer.getEndDate,
    getChallengeType: state.GoalReducer.getChallengeType
  }),
  {
    ...goalAction
  }
)(AddGoals);

const styles = StyleSheet.create({
  smokePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#b3d4d4",
    borderRadius: 6,
    height: hp("6%")
  },
  pickerContainerWidth: {
    width: wp("90%")
  },
  smokeImageContainer: {
    paddingHorizontal: wp("2.5%"),
    borderRightWidth: 1,
    borderRightColor: "#68c7bc",
    paddingVertical: hp("1%")
  },
  questionImage: {
    width: 15,
    height: 15
  },
  dropDownImageContainer: {
    position: "absolute",
    right: wp("1.5%")
  },
  pickerContainer: {
    width: wp("80%"),
    justifyContent: "center",
    zIndex: 2
  },
  mainPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: wp("80%")
  },
  DropDownImage: {
    width: 10,
    height: 12
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    paddingTop: hp("3%")
  },
  dataInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#b3d4d4",
    width: wp("35%"),
    borderRadius: 6,
    height: hp("6%")
  },
  imageContainer: {
    paddingHorizontal: wp("2.5%"),
    borderRightWidth: 1,
    borderRightColor: "#68c7bc",
    paddingVertical: hp("1%")
  },
  dataImages: {
    width: 15,
    height: 15
  },
  notifyMainContainer: {
    backgroundColor: "#ffde00",
    alignItems: "center",
    paddingVertical: hp("2%"),
    width: "100%",
    marginVertical: hp("3%")
  },
  notifyContainer: {
    flexDirection: "row",
    width: "90%"
  },
  submit: {
    alignItems: "center",
    width: wp("35%"),
    justifyContent: "center",
    borderRadius: 5,
    marginTop: hp("5%"),
    marginBottom: hp("8%"),
    backgroundColor: "#08b89f",
    paddingVertical: hp("1.5%")
  },
  buttonText: {
    color: "#d5efef",
    textTransform: "uppercase",
    fontSize: hp("2%")
  }
});

const genderPicker = StyleSheet.create({
  placeholder: {
    color: "#05564d",
    fontSize: hp("1.6%"),
    paddingVertical: hp("0.9%"),
    paddingLeft: 8
  },
  inputIOS: {
    color: "#05564d",
    fontSize: hp("1.6%"),
    paddingVertical: hp("0.9%"),
    paddingLeft: 8
  },
  inputAndroid: {
    color: "#05564d",
    fontSize: hp("1.6%"),
    paddingVertical: hp("0.9%"),
    paddingLeft: 8
  }
});
