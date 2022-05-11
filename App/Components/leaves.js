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
  PermissionsAndroid,
  Modal,
  ActivityIndicator
} from "react-native";
import LogoHeader from "./logoHeader";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import DatePicker from "./react-native-datepicker";
import Calender from "../Images/calander.png";
import RNPickerSelect from "./react-native-picker-select";
import Info from "../Images/info.png";
import HeaderBack from "./headerBack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import DropDown from "../Images/dropdown.png";
import { connect } from "react-redux";
import * as hrActions from "../Actions/hrActions";
import moment from "moment";

class Leaves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      reason: "",
      contactNumber: "",
      setFromDate: "",
      setToDate: "",
      setToDay: [
        {
          label: "FULL DAY",
          value: "full"
        },
        {
          label: "FIRST HALF",
          value: "first_half"
        },
        {
          label: "SECOND HALF",
          value: "second_half"
        }
      ],
      leavesType1: [
        {
          label: "FULL DAY",
          value: "full"
        },
        {
          label: "SECOND HALF",
          value: "second_half"
        }
      ],
      leaveType2: [
        {
          label: "FULL DAY",
          value: "full"
        },
        {
          label: "FIRST HALF",
          value: "first_half"
        }
      ],
      leaveType: [
        {
          label : "Select type of leave",
          value : "Select type of leave"
        }
      ],
      leaveUsed: "",
      disablePicker: false,
      remainingLeaves : 0,
      leaveId :''
    };
  }

  setLeaveDataInStore = (value, type) => {
    this.props.setLeavesDataInStore(value, type);
  };

  componentDidMount() {
    let leaveType = [...this.state.leaveType];
    let remainingLeaves = this.state.remainingLeaves;
    this.props.totalLeave.leaveBalance.leaveBalance.map((leave, index) => {
      remainingLeaves += leave.balance
      leaveType.push({
        label: leave.leaveId.leaveType,
        value: leave.leaveId.leaveType,
        id : leave.leaveId._id
      });
      this.setState({ leaveType, remainingLeaves });
    });
  }

  handleLeaves = (value, label) => {
    let leaveId = '';
    let leaveType = [...this.state.leaveType]
    leaveId = leaveType[label].id
    this.setState({ leaveUsed: value, leaveId })
  }

  submit = () => {
    if (
      !this.state.setFromDate ||
      !this.state.setToDate ||
      !this.state.reason ||
      !this.state.leaveUsed
    ) {
      alert("Please fill all the details to apply leave");
    } else {
      let data = {
        from: {
          date: this.state.setFromDate,
          day_type: this.props.setFromDay
        },

        to: {
          date: this.state.setToDate,
          day_type: this.props.setToDay
        },

        reasonByEmployee: this.state.reason,
        leaveType: this.state.leaveUsed,
        leaveId: this.state.leaveId
      };
      console.warn("data", data);
      AsyncStorage.getItem("userToken").then(token => {
        this.props.applyLeaves(data, token);
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.leaves !== this.props.leaves) {
      if (this.props.leaves.status === 200) {
        alert(this.props.leaves.message);
      }
    }
    if(prevProps.leaveStatus !== this.props.leaveStatus){
      if(this.props.leaveStatus.status === 200) {
        alert(this.props.leaveStatus.message)
      } else {
        alert(this.props.leaveStatus.message)
      }
    }
  }

  render() {
    console.log('this.state.leaveUsed', this.props.totalLeave)
    let differnceOfDate = 0;
    if (this.state.setFromDate && this.state.setToDate) {
      differnceOfDate =
        new Date(this.state.setToDate) - new Date(this.state.setFromDate);
    }
    

    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
      <SafeAreaView style={styles.safeAreaViewContainer}>

          <View>
            <HeaderBack {...this.props} heading="Leaves" />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.headingMainContainer}>
              {/* <View style={styles.mainHeadingTextContainer}>
                <Text style={styles.mainHeadingText}>Leaves</Text>
              </View> */}
              <View style={styles.headingContentContainer}>
                <Text style={styles.headingContentText}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Text>
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
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: hp("2.5%") }}>
                    {"Your Current leave balance is " + this.state.remainingLeaves}
                  </Text>
                </View>
              </View>
            </View>
            {this.state.leaveType.length > 0 ? (
              <View style={{ alignItems: "center" }}>
                <View style={styles.dataContainer}>
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
                        date={this.state.setFromDate}
                        mode="date"
                        placeholder="FROM DATE"
                        format="YYYY-MM-DD"
                        minDate="1980-05-01"
                        maxDate={"2019-12-31"}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        onDateChange={date =>
                          this.setState({ setFromDate: date, setToDate: date })
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.dataInnerContainer}>
                    <View style={styles.mainPickerContainer}>
                      <View style={styles.pickerContainer}>
                        <RNPickerSelect
                          placeholder={{}}
                          hideIcon={true}
                          items={
                            differnceOfDate === 0
                              ? this.state.setToDay
                              : this.state.leavesType1
                          }
                          useNativeAndroidPickerStyle={false}
                          style={genderPicker}
                          disabled={
                            this.state.setFromDate === "" ? true : false
                          }
                          onValueChange={value =>
                            this.setLeaveDataInStore(value, "fromDay")
                          }
                          value={this.props.setFromDay}
                          // ref={el => {
                          //   this.inputRefs.picker = el;
                          // }}
                        />
                      </View>
                      <View style={styles.dropDownImageContainer}>
                        <Image
                          source={DropDown}
                          style={styles.dropDownImage}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.dataContainer}>
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
                        date={this.state.setToDate}
                        mode="date"
                        placeholder="TO DATE"
                        format="YYYY-MM-DD"
                        minDate={this.state.setFromDate}
                        maxDate={"2019-12-31"}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        onDateChange={date =>
                          this.setState({ setToDate: date })
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.dataInnerContainer}>
                    <View style={styles.mainPickerContainer}>
                      <View style={styles.pickerContainer}>
                        <RNPickerSelect
                          placeholder={{}}
                          hideIcon={true}
                          items={
                            differnceOfDate === 0
                              ? this.state.setToDay
                              : this.state.leaveType2
                          }
                          useNativeAndroidPickerStyle={false}
                          style={genderPicker}
                          disabled={
                            this.state.setFromDate === "" ? true : false
                          }
                          onValueChange={value =>
                            this.setLeaveDataInStore(value, "toDay")
                          }
                          value={this.props.setToDay}
                          // ref={el => {
                          //   this.inputRefs.picker = el;
                          // }}
                        />
                      </View>
                      <View style={styles.dropDownImageContainer}>
                        <Image
                          source={DropDown}
                          style={styles.dropDownImage}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "90%"
                    }}
                  >
                    <View
                      style={{
                        width: wp("90%"),
                        justifyContent: "center",
                        zIndex: 2,
                        backgroundColor: "#b3d4d4",
                        borderRadius: 6,
                        marginVertical: hp("2%")
                        // paddingVertical:hp('0.5%')
                      }}
                    >
                      <RNPickerSelect
                        placeholder={{}}
                        hideIcon={true}
                        items={this.state.leaveType}
                        useNativeAndroidPickerStyle={false}
                        style={genderPicker}
                        onValueChange={(value, label) =>
                          this.handleLeaves(value, label)
                        }
                        value={this.state.leaveUsed}
                        // ref={el => {
                        //   this.inputRefs.picker = el;
                        // }}
                      />
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        zIndex: 999,
                        right: wp("2%")
                      }}
                    >
                      <Image
                        source={DropDown}
                        style={styles.dropDownImage}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: wp("90%"),
                      borderRadius: 6,
                      backgroundColor: "#b3d4d4",
                      marginTop: hp("2%"),
                      marginBottom: hp("4%")
                    }}
                  >
                    <TextInput
                      style={{
                        width: "90%",
                        paddingLeft: wp("2%"),
                        fontSize: hp("1.6%"),
                        height: hp("6%")
                      }}
                      placeholder="REASON"
                      placeholderTextColor="#05564d"
                      onChangeText={e => this.setState({ reason: e })}
                      value={this.state.reason}
                    />
                  </View>
                  <View
                    style={{
                      width: wp("88%"),
                      borderRadius: 6,
                      backgroundColor: "#b3d4d4"
                    }}
                  >
                    <TextInput
                      style={{
                        width: "90%",
                        paddingLeft: wp("2%"),
                        fontSize: hp("1.6%"),
                        height: hp("6%")
                      }}
                      placeholder="CONTACT NUMBER"
                      placeholderTextColor="#05564d"
                      keyboardType="numeric"
                      onChangeText={e => this.setState({ contactNumber: e })}
                      value={this.state.contactNumber}
                    />
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  {/* <View style={styles.buttonWidth}>
                  <TouchableOpacity style={styles.submit}>
                    <View>
                      <Text style={styles.buttonText}>Skip</Text>
                    </View>
                  </TouchableOpacity>
                </View> */}
                  <View style={styles.buttonWidth}>
                    <TouchableOpacity
                      style={styles.submit}
                      onPress={this.submit}
                    >
                      <View>
                        <Text style={styles.buttonText}>Submit</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <ActivityIndicator />
            )}
          </KeyboardAwareScrollView>
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
    setFromDate: state.HrReducer.setFromDate,
    setFromDay: state.HrReducer.setFromDay,
    setToDate: state.HrReducer.setToDate,
    totalLeave: state.HrReducer.totalLeave,
    setToDay: state.HrReducer.setToDay,
    leaveStatus : state.HrReducer.leaveStatus
  }),
  {
    ...hrActions
  }
)(Leaves);

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
  mainHeadingText: {
    fontSize: hp("5%"),
    color: "#d5efef"
  },
  mainHeadingTextContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center"
  },
  headingContentContainer: {
    paddingTop: hp("1%"),
    width: wp("85%")
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#d5efef",
    textAlign: "center"
  },
  headingMainContainer: {
    alignItems: "center",
    marginVertical: hp("6%")
  },
  notifyMainContainer: {
    backgroundColor: "#ffde00",
    marginBottom: hp("4%"),
    alignItems: "center",
    paddingVertical: hp("2%"),
    width: "100%"
  },
  notifyContainer: {
    flexDirection: "row",
    width: "90%"
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%"
  },
  dataInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#b3d4d4",
    width: wp("40%"),
    borderRadius: 6,
    height: hp("6%"),
    marginVertical: hp("2%")
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
  mainPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("40%")
  },
  pickerContainer: {
    width: wp("40%"),
    justifyContent: "center",
    zIndex: 2
  },
  dropDownImageContainer: {
    right: wp("2%"),
    position: "absolute"
  },
  dropDownImage: {
    width: 10,
    height: 12
  },
  buttonWidth: {
    width: "47%"
  },
  submit: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#08b89f",
    paddingVertical: hp("1.5%")
  },
  buttonText: {
    color: "#d5efef",
    textTransform: "uppercase",
    fontSize: hp("2%")
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: hp("9%"),
    width: "85%"
  }
});
