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
  Platform,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import LogoHeader from "./logoHeader";
import Header from "./header";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import { PieChart } from "react-native-svg-charts";
import Weights from "../Images/weight.png";
import RNPickerSelect from "./react-native-picker-select";
import Calender from "../Images/calander.png";
import DropDown from "../Images/dropdown.png";
import * as weightAction from "../Actions/weightAction";
import { connect } from "react-redux";
import Info from "../Images/info.png";
import HeaderBack from "./headerBack";
import AppleHealthKit from "rn-apple-healthkit";
import GoogleFit, { Scopes } from "react-native-google-fit";
import ModalImage from "../Images/popup.png";
import Cross from "../Images/cross2.png";
import Edit from "../Images/edit.png";
import DatePicker from "./react-native-datepicker";
import RandomArticles from "./randomArticles";
class Weight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      weight: [
        {
          label: "BETWEEN 55 TO 60",
          value: "BETWEEN 55 TO 60"
        },
        {
          label: "BETWEEN 60 TO 65",
          value: "BETWEEN 60 TO 65"
        },
        {
          label: "BETWEEN 65 TO 70",
          value: "BETWEEN 65 TO 70"
        },
        {
          label: "BETWEEN 70 TO 75",
          value: "BETWEEN 70 TO 75"
        }
      ],
      weeks: [
        {
          label: "BETWEEN 1-2 WEEK",
          value: "BETWEEN 1-2 WEEK"
        },
        {
          label: "BETWEEN 2-3 WEEK",
          value: "BETWEEN 2-3 WEEK"
        }
      ],
      bmi: "",
      heightInFeet: "",
      heightInInch: "",
      weightUnit: "",
      weightValue: "",
      showModal: false,
      heightInCm: "",
      articlesData: []
    };
  }

  componentDidMount() {
    // console.warn("bmi response", this.props.bmiresponse);
    let bmiresponse = this.props.bmiresponse;
    let heightInFeet = "";
    let heightInInch = "";
    let weightValue = "";
    let weightUnit = "";
    let bmi = "";
    let weightInKg = "";
    let weightInLbs = "";
    let heightInCm = "";
    let articlesData = [...this.state.articlesData];
    bmi = bmiresponse.bmi;
    heightInFeet = bmiresponse.height.feet;
    heightInInch = bmiresponse.height.inch;
    heightInCm = bmiresponse.height.cm;
    articlesData = bmiresponse.articles;
    if (bmiresponse.weight.active_unit === "kg") {
      weightInKg = bmiresponse.weight.kg;
    } else {
      weightInLbs = bmiresponse.weight.lbs;
    }
    weightValue = bmiresponse.weight.value;
    weightUnit = bmiresponse.weight.unit;
    this.setState({
      bmi,
      heightInFeet,
      heightInInch,
      weightUnit,
      weightValue,
      weightInKg,
      weightInLbs,
      heightInCm,
      articlesData
    });
  }

  chooseDuration = (value, type) => {
    this.props.setDuration(value, type);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.bmiresponse !== this.props.bmiresponse) {
      this.setState({ bmi: this.props.bmiresponse.bmi });
    }
  }

  calculateBmi = () => {
    let heightData = {};
    let weightData = {};
    let bmiResponse = this.props.bmiresponse;
    if (bmiResponse.weight.active_unit === "kg") {
      weightData = {
        kg: this.state.weightInKg,
        active_unit: "kg"
      };
    } else {
      weightData = {
        lbs: this.state.weightInLbs,
        active_unit: "lbs"
      };
    }

    if (bmiResponse.height.active_unit === "cm") {
      heightData = {
        cm: this.state.heightInCm,
        active_unit: "cm"
      };
    } else {
      heightData = {
        feet: this.state.heightInFeet,
        inch: this.state.heightInInch,
        active_unit: "feet_inch"
      };
    }
    let data = {
      weight: weightData,
      height: heightData
    };
    AsyncStorage.getItem("userToken").then(token => {
      this.props.recalculateBmi(data, token);
    });
  };

  render() {
    const data = [0.3, 0.3, 0.3, 0.3];
    const colorFill = ["#df5368", "#3fe5ce", "#5785d2", "transparent"];
    const pieData = data
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: colorFill[index]
        },
        key: `pie-${index}`
      }));
    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <ImageBackground source={backgroundImage} style={styles.bgImage}>
          <View>
            <HeaderBack {...this.props} heading="Weight" />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.mainContainer}>
              <View style={styles.innerContainer}>
                <View style={styles.headingMainContainer}>
                  {/* <View style={styles.mainHeadingTextContainer}>
                    <Text style={styles.mainHeadingText}>Weight</Text>
                  </View> */}
                  <View style={styles.headingContentContainer}>
                    <Text style={styles.headingContentText}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: "center" }}>
                  <View style={{ marginBottom: hp("1%") }}>
                    <Text style={styles.underOverWeightText}>Normal</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.underOverWeightContainer}>
                      <Text style={styles.underOverWeightText}>
                        Underweight
                      </Text>
                    </View>
                    <View style={styles.pieChartMainContainer}>
                      <View style={styles.chartContainer}>
                        <PieChart style={styles.pieChartStyle} data={pieData} />
                        <View style={styles.bmiValueContainer}>
                          <Text
                            style={{ color: "#b3d4d4", textAlign: "center" }}
                          >
                            BMI
                          </Text>
                          <Text
                            style={{ color: "#b3d4d4", fontSize: hp("5%") }}
                          >
                            {this.state.bmi}
                          </Text>
                          <Text
                            style={{ color: "#b3d4d4", fontSize: hp("2%") }}
                          >
                            {this.props.bmiresponse.bmiHealthStatus}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.underOverWeightContainer}>
                      <Text style={styles.underOverWeightText}>Overweight</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.bmiMessageMainContainer}>
                  <View style={styles.bmiMessageContainer}>
                    <Text style={styles.bmiMessageText}>
                      Nomal BMI weight range for your height:
                    </Text>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#05564d",
                        fontSize: hp("2.2%^")
                      }}
                    >
                      {this.props.bmiresponse.idleWeightInKg} Kg
                    </Text>
                  </View>
                </View>

                <View style={styles.bmiDataMainContainer}>
                  <TouchableOpacity
                    style={styles.bmiDataContainer}
                    onPress={() =>
                      this.setState({ showModal: true, editData: "height" })
                    }
                  >
                    <View style={{ justifyContent: "center", width: "45%" }}>
                      <Text style={styles.heightWeightText}>your height</Text>
                    </View>

                    <View style={styles.inputContainer}>
                      {this.props.bmiresponse &&
                      this.props.bmiresponse.height.active_unit ===
                        "feet_inch" ? (
                        <Text style={{ color: "#fff", fontSize: hp("1.7%") }}>
                          {this.state.heightInFeet +
                            " " +
                            "Ft " +
                            this.state.heightInInch +
                            " " +
                            "In"}
                        </Text>
                      ) : (
                        <Text style={{ color: "#fff", fontSize: hp("1.7%") }}>
                          {this.state.heightInCm + " cm"}
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          showModal: true,
                          editData: "height"
                        })
                      }
                      style={{
                        paddingLeft: wp("1.5%"),
                        width: "15%",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        paddingRight: 4
                      }}
                    >
                      <View>
                        <Image
                          source={Edit}
                          style={{ width: 15, height: 15, tintColor: "white" }}
                          tintColor="#fff"
                        />
                      </View>
                    </TouchableOpacity>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.bmiDataContainer}
                    onPress={() =>
                      this.setState({ showModal: true, editData: "weight" })
                    }
                  >
                    <View style={{ justifyContent: "center", width: "45%" }}>
                      <Text style={styles.heightWeightText}>your weight</Text>
                    </View>
                    <View style={styles.inputContainer}>
                      {this.props.bmiresponse.weight.active_unit === "kg" ? (
                        <Text style={{ fontSize: hp("1.7%"), color: "#fff" }}>
                          {this.state.weightInKg + " Kg"}
                        </Text>
                      ) : (
                        <Text style={{ fontSize: hp("1.7%"), color: "#fff" }}>
                          {this.state.weightInLbs + " lbs"}
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          showModal: true,
                          editData: "weight"
                        })
                      }
                      style={{
                        alignItems: "flex-end",
                        justifyContent: "center",
                        paddingRight: 4,
                        alignItems: "flex-end",
                        width: "15%"
                      }}
                    >
                      <View>
                        <Image
                          source={Edit}
                          style={{ width: 15, height: 15, tintColor: "white" }}
                          tintColor="white"
                        />
                      </View>
                    </TouchableOpacity>
                  </TouchableOpacity>

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showModal}
                    presentationStyle="overFullScreen"
                    onRequestClose={() => {
                      this.setState({ showModal: false });
                    }}
                  >
                    <View style={styles.modalContainer}>
                      <View style={styles.modalImageContainer}>
                        <Image
                          source={ModalImage}
                          style={styles.modalImage}
                          resizeMode="cover"
                        />
                        <View
                          style={{ alignItems: "center", paddingTop: hp("2%") }}
                        >
                          <View style={{ paddingBottom: hp("2%") }}>
                            <Text
                              style={{ fontWeight: "bold", fontSize: hp("3%") }}
                            >
                              Edit your {this.state.editData}
                            </Text>
                          </View>
                          {this.state.editData === "weight" ? (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center"
                              }}
                            >
                              <View
                                style={{
                                  width: wp("20%"),
                                  paddingVertical: hp("1%"),
                                  backgroundColor: "#eee",
                                  borderRadius: 6
                                }}
                              >
                                {this.props.bmiresponse.weight.active_unit ===
                                "kg" ? (
                                  <TextInput
                                    // editable={this.state.isEditable}
                                    autoFocus={true}
                                    keyboardType="numeric"
                                    style={[
                                      styles.input,
                                      {
                                        fontSize: hp("2%"),
                                        width: "100%",
                                        backgroundColor: "#eee"
                                      }
                                    ]}
                                    value={this.state.weightInKg.toString()}
                                    onChangeText={e => {
                                      this.setState({ weightInKg: e });
                                    }}
                                  />
                                ) : (
                                  <TextInput
                                    // editable={this.state.isEditable}
                                    autoFocus={true}
                                    keyboardType="numeric"
                                    style={[
                                      styles.input,
                                      {
                                        fontSize: hp("2%"),
                                        width: "100%",
                                        backgroundColor: "#eee"
                                      }
                                    ]}
                                    value={this.state.weightInLbs.toString()}
                                    onChangeText={e => {
                                      this.setState({ weightInLbs: e });
                                    }}
                                  />
                                )}
                              </View>
                              <View style={{ marginLeft: hp("0.5%") }}>
                                <Text style={{ fontSize: hp("2%") }}>
                                  {this.props.bmiresponse.weight.active_unit}
                                </Text>
                              </View>
                            </View>
                          ) : this.props.bmiresponse &&
                            this.props.bmiresponse.height.active_unit ===
                              "feet_inch" ? (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center"
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginRight: wp("2%")
                                }}
                              >
                                <View
                                  style={{
                                    width: wp("20%"),
                                    paddingVertical: hp("1%"),
                                    backgroundColor: "#eee",
                                    borderRadius: 6
                                  }}
                                >
                                  <TextInput
                                    // editable={this.state.isEditable}
                                    keyboardType="numeric"
                                    autoFocus={true}
                                    style={[
                                      styles.input,
                                      {
                                        fontSize: hp("2%"),
                                        width: "100%",
                                        backgroundColor: "#eee"
                                      }
                                    ]}
                                    value={this.state.heightInFeet.toString()}
                                    onChangeText={e => {
                                      this.setState({ heightInFeet: e });
                                    }}
                                  />
                                </View>
                                <View
                                  style={{
                                    marginLeft: hp("0.5%"),
                                    justifyContent: "center"
                                  }}
                                >
                                  <Text style={{ fontSize: hp("2%") }}>Ft</Text>
                                </View>
                              </View>
                              <View style={{ flexDirection: "row" }}>
                                <View
                                  style={{
                                    width: wp("20%"),
                                    paddingVertical: hp("1%"),
                                    backgroundColor: "#eee",
                                    borderRadius: 6,
                                    marginTop: 5
                                  }}
                                >
                                  <TextInput
                                    // editable={this.state.isEditable}
                                    // autoFocus = {true}
                                    keyboardType="numeric"
                                    style={[
                                      styles.input,
                                      {
                                        fontSize: hp("2%"),
                                        width: "100%",
                                        backgroundColor: "#eee"
                                      }
                                    ]}
                                    value={this.state.heightInInch.toString()}
                                    onChangeText={e => {
                                      this.setState({ heightInInch: e });
                                    }}
                                  />
                                </View>
                                <View
                                  style={{
                                    marginLeft: hp("0.5%"),
                                    justifyContent: "center"
                                  }}
                                >
                                  <Text style={{ fontSize: hp("2%") }}>In</Text>
                                </View>
                              </View>
                            </View>
                          ) : (
                            <View
                              style={{
                                flexDirection: "row",
                                marginRight: wp("2%")
                              }}
                            >
                              <View
                                style={{
                                  width: wp("20%"),
                                  paddingVertical: hp("1%"),
                                  backgroundColor: "#eee",
                                  borderRadius: 6
                                }}
                              >
                                <TextInput
                                  // editable={this.state.isEditable}
                                  keyboardType="numeric"
                                  autoFocus={true}
                                  style={[
                                    styles.input,
                                    {
                                      fontSize: hp("2%"),
                                      width: "100%",
                                      backgroundColor: "#eee"
                                    }
                                  ]}
                                  value={this.state.heightInCm.toString()}
                                  onChangeText={e => {
                                    this.setState({ heightInCm: e });
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  marginLeft: hp("0.5%"),
                                  justifyContent: "center"
                                }}
                              >
                                <Text style={{ fontSize: hp("2%") }}>Cm</Text>
                              </View>
                            </View>
                          )}
                          <TouchableOpacity
                            onPress={() => this.setState({ showModal: false })}
                            style={{
                              paddingHorizontal: wp("2.5%"),
                              paddingVertical: hp("1%"),
                              borderRadius: 5,
                              backgroundColor: "#08b89f",
                              marginTop: 8
                            }}
                          >
                            <Text style={{ color: "white" }}>Done</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={this.calculateBmi}
                    style={styles.submit}
                  >
                    <View>
                      <Text style={styles.buttonText}>Recalculate BMI</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={[styles.dataContainer, styles.dataContainerMargin]}
                >
                  <View style={styles.pickerContainerWidth}>
                    <View style={styles.bottomMargin}>
                      <Text style={styles.smokeQuestionText}>Set a goal:</Text>
                      <Text style={styles.smokeQuestionText}>
                        target weight
                      </Text>
                    </View>
                    <View style={styles.smokePickerContainer}>
                      <View style={styles.smokeImageContainer}>
                        <Image
                          source={Weights}
                          style={styles.questionImage}
                          resizeMode="contain"
                          tintColor="#fff"
                        />
                      </View>
                      <View style={styles.mainPickerContainer}>
                        <View style={styles.pickerContainer}>
                          <RNPickerSelect
                            placeholder={{}}
                            hideIcon
                            items={this.state.weight}
                            useNativeAndroidPickerStyle={false}
                            style={genderPicker}
                            onValueChange={value =>
                              this.chooseDuration(value, "weight")
                            }
                            value={this.props.selectWeight}
                          />
                        </View>
                        {/* <View style={styles.dropDownImageContainer}>
                          <Image
                            source={DropDown}
                            style={styles.DropDownImage}
                            resizeMode="contain"
                            tintColor="#fff"
                          />
                        </View> */}
                      </View>
                    </View>
                  </View>
                  <View style={styles.pickerContainerWidth}>
                    <View
                      style={[styles.bottomMargin, styles.cardioVascularText]}
                    >
                      <Text style={styles.smokeQuestionText}>
                        Duration to achieve
                      </Text>
                      <Text style={styles.smokeQuestionText}>
                        target weight
                      </Text>
                    </View>
                    <View>
                      <View style={styles.dataInnerContainer}>
                        <View style={styles.imageContainer}>
                          <Image
                            source={Calender}
                            style={styles.dataImages}
                            resizeMode="contain"
                            tintColor="white"
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
                            customStyles={{
                              placeholderText: {
                                // fontSize: 18,
                                color: "white"
                              },
                              dateText: {
                                color: "#fff"
                              }
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={this.calculateBmi}
                    style={styles.submit}
                  >
                    <View>
                      <Text style={styles.buttonText}>Check</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.notifyMainContainer}>
                  <View style={styles.notifyContainer}>
                    <View style={{ width: "15%" }}>
                      <Image
                        source={Info}
                        style={{ width: wp("10%"), height: hp("10%") }}
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
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum is simply dummy text
                        of the printing and typesetting industry.
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{borderWidth:1, width:'90%', alignItems:'center'}}>
                  <RandomArticles  articlesData = {this.state.articlesData} />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottomMenuContainer}>
            <BottomMenu {...this.props} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    selectWeight: state.WeightReducer.selectWeight,
    selectWeeks: state.WeightReducer.selectWeeks,
    bmiresponse: state.WeightReducer.bmiresponse
  }),
  {
    ...weightAction
  }
)(Weight);

const genderPicker = StyleSheet.create({
  placeholder: {
    color: "#fff",
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
  mainContainer: {
    alignItems: "center",
    paddingBottom:hp('10%')
  },
  innerContainer: {
    width: wp("100%"),
    alignItems: "center"
  },
  mainHeadingText: {
    fontSize: hp("5%"),
    color: "#b3d4d4"
  },
  mainHeadingTextContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center"
  },
  headingContentContainer: {
    paddingTop: hp("1%")
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#b3d4d4",
    textAlign: "center"
  },
  headingMainContainer: {
    alignItems: "center",
    marginVertical: hp("6%"),
    width: "90%"
  },
  underOverWeightContainer: {
    justifyContent: "center",
    marginHorizontal: wp("3%")
  },
  underOverWeightText: {
    color: "#b3d4d4",
    fontSize: hp("2%")
  },
  pieChartMainContainer: {
    width: hp("21%"),
    height: hp("21%"),
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10545b"
  },
  chartContainer: {
    backgroundColor: "#145859",
    width: hp("18%"),
    height: hp("18%"),
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center"
  },
  pieChartStyle: {
    height: hp("20%"),
    width: hp("20%"),
    transform: [{ rotate: "76deg" }]
  },
  bottomMenuContainer: {
    position: "absolute",
    bottom: 0
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("90%")
  },
  dataContainerMargin: {
    marginTop: hp("4%")
  },
  pickerContainerWidth: {
    width: wp("42%")
  },
  bottomMargin: {
    marginBottom: hp("2%")
  },
  smokeQuestionText: {
    fontSize: hp("2%"),
    color: "#b3d4d4"
  },
  smokePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#40be99",
    borderRadius: 6,
    height: hp("6%")
  },
  smokeImageContainer: {
    paddingHorizontal: wp("2.5%"),
    borderRightWidth: 1,
    borderRightColor: "grey",
    paddingVertical: hp("1%")
  },
  questionImage: {
    width: 15,
    height: 15
  },
  mainPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("32%")
  },
  pickerContainer: {
    width: wp("32%"),
    justifyContent: "center",
    zIndex: 2
  },
  dropDownImageContainer: {
    position: "absolute",
    right: wp("1.5%")
  },
  DropDownImage: {
    width: 10,
    height: 12,
    tintColor: "white"
  },
  input: {
    width: wp("4.5%"),
    height: hp("2.5%"),
    fontSize: hp("2%"),
    // backgroundColor: "white",
    padding: 0,
    textAlign: "center"
  },
  inputContainer: {
    // height: "100%",
    justifyContent: "center",
    marginLeft: wp("1%"),
    width: "45%",
    alignItems: "center"
  },
  editTextContainer: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  bmiDataContainer: {
    flexDirection: "row",
    width: "48%",
    backgroundColor: "#40be99",
    paddingHorizontal: wp("3%"),
    height: hp("6%"),
    borderRadius: 6
    // justifyContent: "space-between"
  },
  heightWeightText: {
    textTransform: "uppercase",
    color: "#fff",
    fontSize: hp("1.7%")
  },
  editText: {
    fontSize: hp("1%"),
    color: "white",
    textAlign: "right"
  },
  bmiDataMainContainer: {
    flexDirection: "row",
    width: wp("90%"),
    justifyContent: "space-between"
  },
  bmiMessageMainContainer: {
    width: wp("100%"),
    alignItems: "center",
    backgroundColor: "#b3d4d4",
    paddingVertical: hp("1%"),
    marginVertical: hp("5%")
  },
  bmiMessageContainer: {
    width: wp("80%"),
    alignItems: "center"
  },
  bmiMessageText: {
    textAlign: "center",
    color: "#05564d",
    fontSize: hp("2%")
  },
  notifyMainContainer: {
    backgroundColor: "#ffde00",
    marginBottom: 100,
    alignItems: "center",
    paddingVertical: hp("2%"),
    width: "100%"
  },
  notifyContainer: {
    flexDirection: "row",
    width: "90%"
  },
  bmiValueContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
    // left: "35%",
    // top: "30%"
  },
  submit: {
    alignItems: "center",
    width: wp("35%"),
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: hp("5%"),
    backgroundColor: "#08b89f",
    paddingVertical: hp("1.5%")
  },
  buttonText: {
    color: "#d5efef",
    textTransform: "uppercase",
    fontSize: hp("1.5%")
  },
  modalContainer: {
    backgroundColor: "#00000099",
    justifyContent: "center",
    flex: 1,
    alignItems: "center"
  },
  modalImageContainer: {
    width: wp("90%"),
    height: hp("35%"),
    backgroundColor: "white",
    borderRadius: 5
  },
  modalImage: {
    width: wp("90%"),
    height: "37%",
    bottom: 0,
    position: "absolute",
    borderRadius: 5
  },
  crossImageContainer: {
    alignItems: "flex-end",
    right: 0,
    padding: hp("2%")
  },
  crossImage: {
    width: 10,
    height: 10
  },
  dataInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#40be99",
    width: wp("40%"),
    borderRadius: 6,
    height: hp("6%")
    // marginVertical: hp("2%")
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
  }
});
