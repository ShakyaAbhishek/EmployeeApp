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
  Modal,
  TouchableHighlight
} from "react-native";
import LogoHeader from "./logoHeader";
import Header from "./header";
import backgroundImage from "../Images/bgImage.png";
import RNPickerSelect from "./react-native-picker-select";
import DropDown from "../Images/dropdown.png";
import GenderImage from "../Images/gender.png";
import Smoke from "../Images/cigarette.png";
import Diabetic from "../Images/diabetes.png";
import Cardio from "../Images/cardio.png";
import Sedentary from "../Images/sedentary.png";
import Man from "../Images/man.png";
import Man1 from "../Images/man1.png";
import Man2 from "../Images/man2.png";
import Man3 from "../Images/man2.png";
import Man4 from "../Images/man2.png";
import ModalImage from "../Images/popup.png";
import Cross from "../Images/cross2.png";
import * as healthDataAction from "../Actions/healthDataAction";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import Toast from "react-native-simple-toast";
import Loader from "./loader";
import * as userActions from "../Actions/userDetailActions";

class HealthData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyType: "",
      showLoader: false,
      bodyTypeData: [
        {
          bodyTypeImage: Man
        },
        {
          bodyTypeImage: Man1
        },
        {
          bodyTypeImage: Man2
        },
        {
          bodyTypeImage: Man3
        },
        {
          bodyTypeImage: Man4
        }
      ],
      date: "",
      items: [
        {
          label: "yes",
          value: "yes"
        },
        {
          label: "no",
          value: "no"
        }
      ],
      diabeticItems: [
        {
          label: "NO",
          value: "no"
        },
        {
          label: "TYPE 1",
          value: "type_1"
        },
        {
          label: "TYPE 2",
          value: "type_2"
        },
        {
          label: "GESTATIONAL",
          value: "gestational"
        },
        {
          label: "PRE_DIABETIC",
          value: "Pre-diabetic"
        },
        {
          label: "NOT TESTED",
          value: "not_tested"
        }
      ],
      cardiaticItems: [
        {
          label: "NO",
          value: "no"
        },
        {
          label: "CORONARY ARTNERY DISEASE",
          value: "coronary_artery_disease"
        },
        {
          label: "HEART ATTACK",
          value: "heart_attack"
        },
        {
          label: "ARRHYTHMIAS",
          value: "arrhythmias"
        },
        {
          label: "HEART FAILURE",
          value: "heart_failure"
        },
        {
          label: "HEART VALUE DISEASE",
          value: "heart_valve_disease"
        },
        {
          label: "CONGENITAL HEART DISEASE",
          value: "congenital_heart_disease"
        },

        {
          label: "OTHER",
          value: "other"
        }
      ],
      activityLevel: [
        {
          label: "SEDENTARY",
          value: "sedentary"
        },
        {
          label: "LIGHTLY ACTIVE",
          value: "lightly_active"
        },
        {
          label: "ACTIVE",
          value: "active"
        },
        {
          label: "VERY ACTIVE",
          value: "very_active"
        },
        {
          label: "EXTREMLY ACTIVE",
          value: "extremely_active"
        }
      ],
      smokingFrequency: [
        {
          label: "1-4",
          value: "1-4"
        },
        {
          label: "5-10",
          value: "5-10"
        },
        {
          label: "11-19",
          value: "11-19"
        },
        {
          label: "20+",
          value: "20+"
        }
      ],
      showModal: false,
      bodyBool: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userToken").then(token => {
      this.props.getUserData(token);
    });
  }

  setHealthQuestionsInStore = (value, type) => {
    this.props.setHeathDataQuestions(value, type);
  };

  submitHealthDataQuestions = () => {
    if (this.state.bodyType === "") {
      this.setState({ bodyBool: true, errorTextMessage: "* Required" });
      // alert("Please choose body type");
    } else {
      // this.setState({ showLoader: true });
      let minSmokeFrequency;
      let maxSmokeFrequency;
      let frequency;
      let diabetieData = {};
      let cardiadiceData = {};
      let smokeFrequency = this.props.selectNumberOfSmoke;
      if (smokeFrequency != "20+") {
        smokeFrequency = smokeFrequency.split("-");
        minSmokeFrequency = Number(smokeFrequency[0]);
        maxSmokeFrequency = Number(smokeFrequency[1]);
        frequency = {
          min: minSmokeFrequency,
          max: maxSmokeFrequency
        };
      } else {
        frequency = {
          min: smokeFrequency.split("+")[0]
        };
      }

      if (
        this.props.selectDiabetes.toString() !== "no" &&
        this.props.selectDiabetes.toString() !== "not_tested"
      ) {
        diabetieData = {
          isDiabetic: "yes",
          type: this.props.selectDiabetes.toString()
        };
      } else {
        diabetieData = {
          isDiabetic: "no",
          type: ""
        };
      }

      if (this.props.selectCardio.toString() !== "no") {
        cardiadiceData = {
          isCVD: "yes",
          type: this.props.selectCardio.toString()
        };
      } else {
        cardiadiceData = {
          isCVD: "no",
          type: ""
        };
      }

      let data = {
        smoking: {
          doSmoke: this.props.selectSmoke.toString(),
          frequency: frequency
        },
        diabeties: diabetieData,
        Cardiovascular_Diseases: cardiadiceData,
        activity_level: this.props.selectActivityLevel,
        body_type: this.state.bodyType
      };
      console.warn("data", data);
      this.setState({ bodyBool: false });
      AsyncStorage.getItem("userToken").then(token => {
        this.props.submitHealthData(data, token);
      });
    }
  };

  chooseBodyType = index => {
    this.setState({ type: index });
    if (index == 0) {
      this.setState({ bodyType: "M_TYPE!1" });
    } else if (index == 1) {
      this.setState({ bodyType: "M_TYPE1" });
    } else {
      this.setState({ bodyType: "M_TYPE1" });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.submitHealthResponse !== this.props.submitHealthResponse) {
      if (this.props.submitHealthResponse.status === 201) {
        console.warn("success");
        this.setState({ showLoader: false, showModal: true }, () => {
          // Toast.show(this.props.submitHealthResponse.message);
          // this.props.navigation.navigate("ConnectDevice");
        });
      } else {
        this.setState({ showLoader: false });
      }
    }
  }

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          {/* <View>
            <Header {...this.props} />
          </View>
          <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainContainer}>
              <View style={styles.innerContainer}>
                <View style={styles.headingMainContainer}>
                  <View style={styles.mainHeadingTextContainer}>
                    <Text style={styles.mainHeadingText}>Health Data</Text>
                  </View>
                  <View style={styles.headingContentContainer}>
                    <Text style={styles.headingContentText}>
                      Please fill in your information
                    </Text>
                  </View>
                </View>
                <View>
                  <View
                    style={[
                      styles.bottomMargin,
                      styles.smokeQuestionTextContainer
                    ]}
                  >
                    <Text style={styles.smokeQuestionText}>
                      Do you smoke cigarette / Shisha?
                    </Text>
                  </View>
                  <View style={styles.dataContainer}>
                    <View
                      style={[
                        styles.smokePickerContainer,
                        styles.pickerContainerWidth
                      ]}
                    >
                      <View style={styles.smokeImageContainer}>
                        <Image
                          source={Smoke}
                          style={styles.questionImage}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.mainPickerContainer}>
                        <View style={styles.pickerContainer}>
                          <RNPickerSelect
                            placeholder={{}}
                            hideIcon
                            items={this.state.items}
                            useNativeAndroidPickerStyle={false}
                            style={genderPicker}
                            onValueChange={value =>
                              this.setHealthQuestionsInStore(value, "smoke")
                            }
                            value={this.props.selectSmoke}
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
                    {this.props.selectSmoke === "yes" ? (
                      <View
                        style={[
                          styles.smokePickerContainer,
                          styles.pickerContainerWidth
                        ]}
                      >
                        <View style={styles.smokeImageContainer}>
                          <Image
                            source={Smoke}
                            style={styles.questionImage}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={styles.mainPickerContainer}>
                          <View style={styles.pickerContainer}>
                            <RNPickerSelect
                              placeholder={{}}
                              hideIcon
                              items={this.state.smokingFrequency}
                              useNativeAndroidPickerStyle={false}
                              style={genderPicker}
                              onValueChange={value => {
                                this.setHealthQuestionsInStore(
                                  value,
                                  "numberSmoke"
                                );
                              }}
                              value={this.props.selectNumberOfSmoke}
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
                    ) : null}
                  </View>
                </View>
                <View
                  style={[styles.dataContainer, styles.dataContainerMargin]}
                >
                  <View style={styles.pickerContainerWidth}>
                    <View style={styles.bottomMargin}>
                      <Text style={styles.smokeQuestionText}>Diabetes</Text>
                    </View>
                    <View style={styles.smokePickerContainer}>
                      <View style={styles.smokeImageContainer}>
                        <Image
                          source={Diabetic}
                          style={styles.questionImage}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.mainPickerContainer}>
                        <View style={styles.pickerContainer}>
                          <RNPickerSelect
                            placeholder={{}}
                            hideIcon
                            items={this.state.diabeticItems}
                            useNativeAndroidPickerStyle={false}
                            style={genderPicker}
                            onValueChange={value =>
                              this.setHealthQuestionsInStore(value, "diabetes")
                            }
                            value={this.props.selectDiabetes}
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
                  </View>
                  <View style={styles.pickerContainerWidth}>
                    <View
                      style={[styles.bottomMargin, styles.cardioVascularText]}
                    >
                      <Text style={styles.smokeQuestionText}>
                        Cardiovascular Diseases
                      </Text>
                    </View>
                    <View>
                      <View style={styles.smokePickerContainer}>
                        <View style={styles.smokeImageContainer}>
                          <Image
                            source={Cardio}
                            style={styles.questionImage}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={styles.mainPickerContainer}>
                          <View style={styles.pickerContainer}>
                            <RNPickerSelect
                              placeholder={{}}
                              hideIcon
                              items={this.state.cardiaticItems}
                              useNativeAndroidPickerStyle={false}
                              style={genderPicker}
                              onValueChange={value =>
                                this.setHealthQuestionsInStore(value, "cardio")
                              }
                              value={this.props.selectCardio}
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
                    </View>
                  </View>
                </View>
                <View style={styles.dataContainer}>
                  <View style={styles.pickerContainerWidth}>
                    <View style={styles.bottomMargin}>
                      <Text style={styles.smokeQuestionText}>
                        Activity Level
                      </Text>
                    </View>
                    <View style={styles.smokePickerContainer}>
                      <View style={styles.smokeImageContainer}>
                        <Image
                          source={Sedentary}
                          style={styles.questionImage}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.mainPickerContainer}>
                        <View style={styles.pickerContainer}>
                          <RNPickerSelect
                            placeholder={{}}
                            hideIcon
                            items={this.state.activityLevel}
                            useNativeAndroidPickerStyle={false}
                            style={genderPicker}
                            onValueChange={value =>
                              this.setHealthQuestionsInStore(
                                value,
                                "activityLevel"
                              )
                            }
                            value={this.props.selectActivityLevel}
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
                  </View>
                  <View style={styles.pickerContainerWidth}>
                    <View style={styles.bottomMargin}>
                      <Text style={styles.smokeQuestionText}>Body type</Text>
                    </View>
                    <View style={styles.mainBodyContainer}>
                      {this.state.bodyTypeData.map((item, index) => {
                        let bool = false;
                        if (this.state.type === index) {
                          bool = true;
                        }
                        return (
                          <TouchableOpacity
                            onPress={() => this.chooseBodyType(index)}
                            key={index}
                            style={{ marginVertical: 2 }}
                          >
                            <View
                              style={
                                bool === true
                                  ? styles.bodyImageContainer1
                                  : styles.bodyImageContainer
                              }
                            >
                              <Image
                                source={item.bodyTypeImage}
                                style={styles.bodyImage}
                                resizeMode="contain"
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    {this.state.bodyBool ? (
                      <Text style={styles.errorText}>
                        {this.state.errorTextMessage}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <View style={styles.submitButtonContainer}>
                  <TouchableOpacity
                    onPress={this.submitHealthDataQuestions}
                    style={styles.submit}
                  >
                    <View>
                      <Text style={styles.buttonText}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                  {this.state.showLoader === true ? <Loader /> : null}
                </View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.showModal}
                  presentationStyle="overFullScreen"
                  // onRequestClose={() => {
                  //   this.setState({ showModal: false });
                  // }}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalImageContainer}>
                      <Image
                        source={ModalImage}
                        style={styles.modalImage}
                        resizeMode="cover"
                      />
                      <TouchableHighlight
                        onPress={() =>
                          this.setState({ showModal: false }, () =>
                            this.props.navigation.navigate("ConnectDevice")
                          )
                        }
                        style={styles.crossImageContainer}
                      >
                        <Image
                          source={Cross}
                          style={styles.crossImage}
                          resizeMode="contain"
                        />
                      </TouchableHighlight>
                      <View style={styles.modalTextContainer}>
                        {/* <View>
                        <Text style={styles.modalHeaderText}>
                          Congratulations
                        </Text>
                      </View> */}
                        <View style={styles.modalContentContainer}>
                          <Text style={styles.modalContent}>
                            Data recorded successfully
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({ showModal: false }, () =>
                              this.props.navigation.navigate("ConnectDevice")
                            )
                          }
                          style={{
                            backgroundColor: "#08b89f",
                            paddingVertical: hp("1%"),
                            paddingHorizontal: wp("3%"),
                            borderRadius: 5,
                            marginTop: hp("2%")
                          }}
                        >
                          <View>
                            <Text style={{ color: "#fff" }}>Done</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
export default connect(
  state => ({
    healthDataResp: state.HealthDataReducer.healthDataResp,
    loginData: state.LoginReducer.loginData,
    selectSmoke: state.HealthDataReducer.selectSmoke,
    selectDiabetes: state.HealthDataReducer.selectDiabetes,
    selectCardio: state.HealthDataReducer.selectCardio,
    selectActivityLevel: state.HealthDataReducer.selectActivityLevel,
    selectNumberOfSmoke: state.HealthDataReducer.selectNumberOfSmoke,
    submitHealthResponse: state.HealthDataReducer.submitHealthResponse,
    userData: state.UserDetailReducer.userData
  }),
  {
    ...healthDataAction,
    ...userActions
  }
)(HealthData);

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
const heightPicker = StyleSheet.create({
  placeholder: {
    color: "#05564d",
    fontSize: hp("1.6%"),
    paddingVertical: hp("0.9%"),
    paddingLeft: wp("1.5%")
  },
  inputIOS: {
    color: "#05564d",
    fontSize: hp("1.6%"),
    paddingVertical: hp("0.9%"),
    paddingLeft: wp("1.5%")
  },
  inputAndroid: {
    color: "#05564d",
    fontSize: hp("1.6%"),
    paddingVertical: hp("0.9%"),
    paddingLeft: wp("1.5%")
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
  mainContainer: {
    alignItems: "center"
  },
  innerContainer: {
    width: wp("100%"),
    alignItems: "center"
  },
  safeAreaViewContainer: {
    flex: 1
  },
  headingMainContainer: {
    alignItems: "center",
    marginVertical: hp("6%"),
    width: "90%"
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
  dataContainerMargin: {
    marginVertical: hp("4%")
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#b3d4d4"
  },
  pickerContainer: {
    width: wp("32%"),
    justifyContent: "center",
    zIndex: 2
  },
  mainPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("32%")
  },
  smokeQuestionText: {
    fontSize: hp("2%"),
    color: "#b3d4d4"
  },
  smokeQuestionTextContainer: {
    // paddingLeft: wp("2.5%")
  },
  DropDownImage: {
    width: 10,
    height: 12
  },
  submit: {
    alignItems: "center",
    width: wp("35%"),
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: hp("8%"),
    backgroundColor: "#08b89f",
    paddingVertical: hp("1.5%")
  },
  buttonText: {
    color: "#d5efef",
    textTransform: "uppercase",
    fontSize: hp("2%")
  },
  submitButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("5%"),
    width: "80%"
  },
  bodyImageContainer: {
    width: wp("11%"),
    backgroundColor: "#b3d4d4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: hp("6%")
  },
  bodyImageContainer1: {
    width: wp("11%"),
    backgroundColor: "#b3d4d4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: hp("6%"),
    borderWidth: 4,
    borderColor: "#08b89f"
  },
  bodyImage: {
    width: 20,
    height: 27
  },
  mainBodyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  smokePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#b3d4d4",
    borderRadius: 6,
    height: hp("6%")
  },
  pickerContainerWidth: {
    width: wp("42%")
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
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("90%")
  },
  bottomMargin: {
    marginBottom: hp("2%")
  },
  pickerStyleProps: {
    color: "#05564d",
    fontSize: hp("1.6%"),
    paddingVertical: hp("0.9%"),
    paddingLeft: 8
  },
  dataContainerMargin: {
    marginVertical: hp("4%")
  },
  cardioVascularText: {
    width: wp("47%")
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
  modalTextContainer: {
    alignItems: "center",
    paddingVertical: hp("2.5%")
  },
  modalHeaderText: {
    textAlign: "center",
    fontSize: hp("5.5%"),
    fontWeight: "normal"
  },
  modalContentContainer: {
    width: wp("65%")
  },
  modalContent: {
    textAlign: "center",
    fontSize: hp("3%")
  },
  errorText: { color: "darkred", fontSize: hp("2%") }
});
