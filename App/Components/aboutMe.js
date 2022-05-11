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
import DatePicker from "./react-native-datepicker";
import Calender from "../Images/calander.png";
import Toast from "react-native-simple-toast";
import RNPickerSelect from "./react-native-picker-select";
import GenderImage from "../Images/gender.png";
import SplashScreen from "react-native-splash-screen";
import DropDown from "../Images/dropdown.png";
import BloodGroup from "../Images/bloodgroup.png";
import Height from "../Images/height.png";
import Nationality from "../Images/nationality.png";
import Weight from "../Images/weight.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import ModalImage from "../Images/popup.png";
import Cross from "../Images/cross2.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import * as aboutMe from "../Actions/aboutMeAction";
import Navigator from "./auth";
import Loader from "./loader";
import * as userActions from "../Actions/userDetailActions";

class AboutMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      heightUnit: "FT",
      genderArray: [
        {
          label: "MALE",
          value: "MALE"
        },
        {
          label: "FEMALE",
          value: "FEMALE"
        }
      ],
      heightArray: [
        {
          label: "FT",
          value: "FT"
        },
        {
          label: "CM",
          value: "CM"
        }
      ],
      weightArray: [
        {
          label: "KG",
          value: "kg"
        },
        {
          label: "LBS",
          value: "lbs"
        }
      ],
      bloodGroupArray: [
        {
          label: "A+",
          value: "A+"
        },
        {
          label: "A-",
          value: "A-"
        },
        {
          label: "B+",
          value: "B+"
        },
        {
          label: "B-",
          value: "B-"
        },
        {
          label: "O+",
          value: "O+"
        },
        {
          label: "O-",
          value: "O-"
        },
        {
          label: "AB+",
          value: "AB+"
        },
        {
          label: "AB-",
          value: "AB-"
        }
      ],
      nationalityArray: [
        {
          label: "INDIAN",
          value: "INDIAN",
          score: 10
        },
        {
          label: "FRENCH",
          value: "FRENCH",
          score: 0
        }
      ],
      showModal: false,
      dateErrorBool: false,
      dateErrorText: "",
      genderErrorBool: false,
      genderErrorText: "",
      heightErrorBool: false,
      heightErrorText: "",
      bloodErrorBool: false,
      nationalityErrorBool: false,
      weightErrorBool: false,
      errArr: []
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    AsyncStorage.getItem("userToken").then(token => {
      this.props.getUserData(token);
    });
  }

  setAboutMeDataInStore = (value, type) => {
    this.props.setAboutMeDataInStore(value, type);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.aboutMeResp !== this.props.aboutMeResp) {
      if (this.props.aboutMeResp.message === "success") {
        this.setState({ showLoader: false, showModal: true }, () => {
          // Toast.show("Data recorded successfully");
          // this.props.navigation.navigate("userHealthNavigator");
        });
      }
    }
  }

  submitAboutMeData = () => {
    let {
      dateOfBirth,
      selectedGender,
      inputWeight,
      selectedWeightUnit,
      selectedBloodGroup,
      selectedNationality
    } = this.props;
    let { heightInFeet, heightInInch, heightInCm } = this.state;
    let realFeet = "";
    let feet = heightInFeet;
    let inches = heightInInch;
    let heightData = {};
    // let weightUnit = selectedWeightUnit.toLowerCase();
    let weightData = {};
    if (
      dateOfBirth &&
      selectedGender &&
      inputWeight &&
      selectedWeightUnit &&
      selectedBloodGroup &&
      selectedNationality &&
      ((heightInFeet && heightInInch) || heightInCm)
    ) {
      // if (selectedWeightUnit === "LBS" || this.state.heightUnit === "CM") {
      //   inputWeight = Math.round(inputWeight / 2.2);
      //   realFeet = (heightInCm * 0.3937) / 12;
      //   feet = Math.floor(realFeet);
      //   inches = Math.round((realFeet - feet) * 12);
      // }
      if (this.state.heightUnit === "CM") {
        heightData = {
          cm: Number(heightInCm),
          active_unit: "cm"
        };
      } else {
        heightData = {
          active_unit: "feet_inch",
          feet: Number(heightInFeet),
          inch: Number(heightInInch)
        };
      }

      if (selectedWeightUnit === "lbs") {
        weightData = {
          lbs: Number(inputWeight),
          active_unit: selectedWeightUnit.toLowerCase()
        };
      } else {
        weightData = {
          kg: Number(inputWeight),
          active_unit: selectedWeightUnit.toLowerCase()
        };
      }
      let aboutMeData = {
        dob: dateOfBirth,
        gender: selectedGender.toLowerCase(),
        blood_group: selectedBloodGroup,
        nationality: selectedNationality.toLowerCase(),
        weight: weightData,
        height: heightData
      };
      console.warn(aboutMeData);
      // this.setState({ showLoader: true });
      AsyncStorage.getItem("userToken").then(token => {
        this.props.postAboutMeData(aboutMeData, token);
      });
    }
    if (!dateOfBirth) {
      console.warn("inside date of birth");
      this.setState({
        dateErrorBool: true,
        dateErrorText: "* Required"
      });
    }
    if (!selectedGender) {
      console.warn("inside gender");
      this.setState({
        genderErrorBool: true,
        genderErrorText: "* Required"
      });
    }
    if (!selectedBloodGroup) {
      console.warn("inside bloodgroup");
      this.setState({
        bloodErrorBool: true,
        bloodErrorText: "* Required"
      });
    }
    if (!selectedNationality) {
      console.warn("inside nationality");
      this.setState({
        nationalityErrorBool: true,
        nationalityErrorText: "* Required"
        // heightErrorBool: false,
        // heightErrorText: "* Required",
        // weightErrorBool: false,
        // weightErrorText: "* Required"
      });
    }
    if (!inputWeight) {
      this.setState({
        // dateErrorBool: false,
        // dateErrorText: "* Required",
        // genderErrorBool: false,
        // genderErrorText: "* Required",
        // bloodErrorBool: false,
        // bloodErrorText: "* Required",
        // nationalityErrorBool: false,
        // nationalityErrorText: "* Required",
        // heightErrorBool: false,
        // heightErrorText: "* Required",
        weightErrorBool: true,
        weightErrorText: "* Required"
      });
    }
    if (
      (!dateOfBirth &&
        !selectedGender &&
        !selectedBloodGroup &&
        !selectedNationality &&
        !inputWeight &&
        !(heightInFeet && heightInInch)) ||
      heightInCm
    ) {
      // alert("Please fill all the fields.");
      this.setState({
        dateErrorBool: true,
        dateErrorText: "* Required",
        genderErrorBool: true,
        genderErrorText: "* Required",
        bloodErrorBool: true,
        bloodErrorText: "* Required",
        nationalityErrorBool: true,
        nationalityErrorText: "* Required",
        heightErrorBool: true,
        heightErrorText: "* Required",
        weightErrorBool: true,
        weightErrorText: "* Required"
      });
    }
  };

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          {/* <View>
            <Header {...this.props} />
          </View> */}
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainContainer}>
              <View style={styles.innerContainer}>
                <View style={styles.headingMainContainer}>
                  <View>
                    <Text style={styles.mainHeadingText}>About Me</Text>
                  </View>
                  <View style={styles.headingContentContainer}>
                    <Text style={styles.headingContentText}>
                      Please fill in your information
                    </Text>
                  </View>
                </View>
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
                      <View>
                        <DatePicker
                          date={this.props.dateOfBirth}
                          mode="date"
                          placeholder="DATE OF BIRTH"
                          format="YYYY-MM-DD"
                          minDate="1980-05-01"
                          maxDate={new Date()}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          showIcon={false}
                          onDateChange={date => {
                            this.setAboutMeDataInStore(date, "dob");
                            this.setState({
                              dateErrorText: "",
                              dateErrorBool: false
                            });
                          }}
                        />
                      </View>
                    </View>
                    {this.state.dateErrorBool ? (
                      <Text style={styles.errorText}>
                        {this.state.dateErrorText}
                      </Text>
                    ) : null}
                  </View>
                  <View>
                    <View style={styles.dataInnerContainer}>
                      <View style={styles.imageContainer}>
                        <Image source={GenderImage} style={styles.dataImages} />
                      </View>
                      <View style={styles.mainPickerContainer}>
                        <View style={styles.pickerContainer}>
                          <RNPickerSelect
                            placeholder={{
                              label: "GENDER"
                            }}
                            hideIcon={true}
                            items={this.state.genderArray}
                            useNativeAndroidPickerStyle={false}
                            style={genderPicker}
                            onValueChange={value => {
                              this.setAboutMeDataInStore(value, "gender");
                              this.setState({
                                genderErrorText: "",
                                genderErrorBool: false
                              });
                            }}
                            value={this.props.selectedGender}
                            // ref={el => {
                            // this.inputRefs.picker = el;
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
                    {this.state.genderErrorBool ? (
                      <Text style={styles.errorText}>
                        {this.state.genderErrorText}
                      </Text>
                    ) : null}
                  </View>
                </View>
                <View
                  style={[
                    {
                      width: "90%",
                      flexDirection: "row",
                      justifyContent: "space-between"
                    },
                    styles.dataContainerMargin
                  ]}
                >
                  <View style={{ width: "46%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: "#b3d4d4",
                        borderRadius: 6,
                        width: "100%",
                        justifyContent: "space-between",
                        height: hp("6%")
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          marginLeft: wp("1.5%")
                        }}
                      >
                        <Text
                          style={{ fontSize: hp("1.6%"), color: "#05564d" }}
                        >
                          HEIGHT :
                        </Text>
                      </View>
                      {this.state.heightUnit === "FT" ? (
                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={{
                              marginHorizontal: wp("2%"),
                              justifyContent: "center"
                            }}
                          >
                            <TextInput
                              placeholder="FT"
                              keyboardType="numeric"
                              placeholderTextColor="#05564d"
                              style={{
                                width: wp("8%"),
                                height: hp("4%"),
                                fontSize: 9,
                                backgroundColor: "#fff",
                                padding: 0,
                                textAlign: "center",
                                borderRadius: 5
                              }}
                              onChangeText={e => {
                                this.setState({ heightInFeet: e });
                                this.setState({
                                  heightErrorText: "",
                                  heightErrorBool: false
                                });
                              }}
                            />
                          </View>
                          {/* <View>
                      <Text style={{ fontSize: hp("1.5%"), color: "white" }}>
                        FT
                      </Text>
                    </View> */}
                          <View
                            style={{
                              justifyContent: "center",
                              marginRight: wp("1.5%")
                            }}
                          >
                            <TextInput
                              placeholder="IN"
                              keyboardType="numeric"
                              placeholderTextColor="#05564d"
                              style={{
                                width: wp("8%"),
                                height: hp("4%"),
                                fontSize: 9,
                                backgroundColor: "#fff",
                                padding: 0,
                                textAlign: "center",
                                borderRadius: 5
                              }}
                              onChangeText={e => {
                                this.setState({ heightInInch: e });
                                this.setState({
                                  heightErrorText: "",
                                  heightErrorBool: false
                                });
                              }}
                            />
                          </View>
                        </View>
                      ) : (
                        <View
                          style={{
                            justifyContent: "center",
                            marginRight: wp("1.5%"),
                            width: "50%",
                            alignItems: "center"
                          }}
                        >
                          <TextInput
                            placeholder="CM"
                            keyboardType="numeric"
                            placeholderTextColor="#05564d"
                            style={{
                              width: wp("12%"),
                              height: hp("4%"),
                              fontSize: 9,
                              backgroundColor: "#fff",
                              padding: 0,
                              textAlign: "center",
                              borderRadius: 5
                            }}
                            onChangeText={e => {
                              this.setState({ heightInCm: e });
                              this.setState({
                                heightErrorText: "",
                                heightErrorBool: false
                              });
                            }}
                          />
                        </View>
                      )}
                      {/* <View>
                      <Text style={{ fontSize: hp("1.5%"), color: "white" }}>
                        IN
                      </Text>
                    </View> */}
                    </View>
                    {this.state.heightErrorBool ? (
                      <Text style={styles.errorText}>
                        {this.state.heightErrorText}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.unitPickerMainContainer}>
                    <View style={styles.heightPickerContainer}>
                      <RNPickerSelect
                        placeholder={{}}
                        hideIcon
                        items={this.state.heightArray}
                        useNativeAndroidPickerStyle={false}
                        style={heightPicker}
                        value={this.state.heightUnit}
                        onValueChange={value =>
                          this.setState({ heightUnit: value })
                        }
                        // ref={el => {
                        // this.inputRefs.picker = el;
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
                <View
                  style={[
                    styles.inputPickerContainer,
                    { width: "90%", marginBottom: hp("4%") }
                  ]}
                >
                  <View style={{ width: "45%" }}>
                    <View style={styles.inputMainContainer}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={Weight}
                          style={styles.dataImages}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          placeholder="WEIGHT"
                          placeholderTextColor="#05564d"
                          style={styles.input}
                          onChangeText={value => {
                            this.setAboutMeDataInStore(value, "weight");
                            this.setState({
                              weightErrorText: "",
                              weightErrorBool: false
                            });
                          }}
                          keyboardType="numeric"
                          value={this.props.inputWeight}
                        />
                      </View>
                    </View>
                    {this.state.weightErrorBool ? (
                      <Text style={styles.errorText}>
                        {this.state.weightErrorText}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.unitPickerMainContainer}>
                    <View style={styles.heightPickerContainer}>
                      <RNPickerSelect
                        placeholder={{}}
                        hideIcon
                        items={this.state.weightArray}
                        useNativeAndroidPickerStyle={false}
                        style={heightPicker}
                        value={this.props.selectedWeightUnit}
                        onValueChange={value => {
                          this.setAboutMeDataInStore(value, "weightunit");
                          this.setState({
                            weightErrorText: "",
                            weightErrorBool: false
                          });
                        }}
                        // ref={el => {
                        // this.inputRefs.picker = el;
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

                <View style={styles.dataContainer}>
                  <View>
                    <View style={styles.dataInnerContainer}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={BloodGroup}
                          style={styles.dataImages}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.mainPickerContainer}>
                        <View style={styles.pickerContainer}>
                          <RNPickerSelect
                            placeholder={{
                              label: "BLOOD GROUP"
                            }}
                            hideIcon
                            items={this.state.bloodGroupArray}
                            useNativeAndroidPickerStyle={false}
                            style={genderPicker}
                            value={this.props.selectedBloodGroup}
                            onValueChange={value => {
                              this.setAboutMeDataInStore(value, "bloodgroup");
                              this.setState({
                                bloodErrorText: "",
                                bloodErrorBool: false
                              });
                            }}

                            // ref={el => {
                            // this.inputRefs.picker = el;
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
                    {this.state.bloodErrorBool ? (
                      <Text style={styles.errorText}>
                        {this.state.bloodErrorText}
                      </Text>
                    ) : null}
                  </View>
                  <View>
                    <View style={styles.dataInnerContainer}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={Nationality}
                          style={styles.dataImages}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.mainPickerContainer}>
                        <View style={styles.pickerContainer}>
                          <RNPickerSelect
                            placeholder={{
                              label: "NATIONALITY"
                            }}
                            hideIcon
                            items={this.state.nationalityArray}
                            useNativeAndroidPickerStyle={false}
                            style={genderPicker}
                            value={this.props.selectedNationality}
                            onValueChange={value => {
                              this.setAboutMeDataInStore(value, "nationality");
                              this.setState({
                                nationalityErrorText: "",
                                nationalityErrorBool: false
                              });
                            }}

                            // ref={el => {
                            // this.inputRefs.picker = el;
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
                    {this.state.nationalityErrorBool ? (
                      <Text style={styles.errorText}>
                        {this.state.nationalityErrorText}
                      </Text>
                    ) : null}
                  </View>
                </View>
                <View style={styles.submitButtonContainer}>
                  <TouchableOpacity
                    onPress={this.login}
                    style={styles.submit}
                    onPress={this.submitAboutMeData}
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
                          this.props.navigation.navigate("userHealthNavigator")
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
                            this.props.navigation.navigate(
                              "userHealthNavigator"
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
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({
    dateOfBirth: state.AboutMeReducer.dateOfBirth,
    selectedGender: state.AboutMeReducer.selectedGender,
    inputHeight: state.AboutMeReducer.inputHeight,
    selectedHeightUnit: state.AboutMeReducer.selectedHeightUnit,
    inputWeight: state.AboutMeReducer.inputWeight,
    selectedWeightUnit: state.AboutMeReducer.selectedWeightUnit,
    selectedBloodGroup: state.AboutMeReducer.selectedBloodGroup,
    selectedNationality: state.AboutMeReducer.selectedNationality,
    loginData: state.LoginReducer.loginData,
    aboutMeResp: state.AboutMeReducer.aboutMeResp,
    userData: state.UserDetailReducer.userData
  }),
  {
    ...aboutMe,
    ...userActions
  }
)(AboutMe);

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
  imageContainer: {
    paddingHorizontal: wp("2.5%"),
    borderRightWidth: 1,
    borderRightColor: "#68c7bc",
    paddingVertical: hp("1%")
  },
  logoContainer: {
    marginTop: hp("10%")
  },
  fullWidth: {
    width: "100%"
  },
  safeAreaViewContainer: {
    flex: 1
  },
  mainContainer: {
    alignItems: "center"
  },
  innerContainer: {
    width: wp("100%"),
    alignItems: "center"
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
  headingContentContainer: {
    paddingTop: hp("1%")
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#b3d4d4"
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
    height: hp("6%")
  },
  dataImages: {
    width: 15,
    height: 15
  },
  dropDownImage: {
    width: 10,
    height: 12
  },
  pickerContainer: {
    width: "100%",
    justifyContent: "center",
    zIndex: 2
  },
  input: {
    paddingLeft: 8,
    fontSize: hp("1.6%"),
    color: "#05564d"
  },
  mainPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("30%")
  },
  inputMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#b3d4d4",
    width: "100%",
    borderRadius: 6
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
  unitPickerMainContainer: {
    width: "46%",
    backgroundColor: "#b3d4d4",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    height: hp("6%")
  },
  inputContainer: {
    height: hp("6.5%"),
    width: wp("17%"),
    justifyContent: "center",
    paddingRight: wp("0.8%")
  },
  inputPickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("40%"),
    height: hp("6%")
  },
  dropDownImageContainer: {
    right: wp("1.5%"),
    position: "absolute"
  },
  dataContainerMargin: {
    marginVertical: hp("4%")
  },
  heightPickerContainer: {
    width: "100%"
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
