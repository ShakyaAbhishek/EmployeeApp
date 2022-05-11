import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableHighlight,
  Dimensions,
  SafeAreaView,
  Alert,
  AsyncStorage
} from "react-native";
import backgroundImage from "../Images/bgImage.png";
import Estilate from "../Images/etisalat.png";
import Email from "../Images/email.png";
import Password from "../Images/password2.png";
import NewPassword from "../Images/newPassword2.png";
import ModalImage from "../Images/popup.png";
import Cross from "../Images/cross2.png";
import SplashScreen from "react-native-splash-screen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import * as ChangePassword from "../Actions/changePasswordAction";
import { connect } from "react-redux";
import * as changePassword from "../Actions/changePasswordAction";
import Loader from "./loader";
import Navigator from "./auth";
import Url from "../Actions/url";

class Changepassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      passwordValid: true,
      confirmValidate: true,
      modalVisible: false,
      showLoader: false,
      errorText: "",
      currentErrorText: ""
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    AsyncStorage.getItem("logo").then(logo => {
      this.setState({ logo: logo });
    });
  }

  validatePassword = type => {
    if (type === "current") {
      if (this.state.currentPassword === "") {
        this.setState({
          currentPasswordError: true,
          currentErrorText: "* Requied"
        });
      } else {
        this.setState({ currentPasswordError: false });
      }
    }
    if (type === "new") {
      console.warn("new");
      if (this.state.newPassword === "") {
        this.setState({ newPasswordError: true, newErrorText: "* Requied" });
      } else {
        this.setState({ newPasswordError: false });
      }
    }
  };

  validateConfirmPassword = () => {
    if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({ confirmPassword: "", confirmValidate: false });
    } else {
      this.setState({ confirmValidate: true });
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.changePasswordResponse !== this.props.changePasswordResponse
    ) {
      if (this.props.changePasswordResponse.status === 422) {
        this.setState(
          {
            showLoader: false,
            confirmPasswordError: true,
            confirmErrortext: "* " + this.props.changePasswordResponse.message
          },
          () => {
            // alert(this.props.changePasswordResponse.message);
          }
        );
      }
      if (this.props.changePasswordResponse.status === 200) {
        this.setState({ showLoader: false }, () => {
          this.setModalVisible(true);
        });
      }
    }
  }

  login = () => {
    this.setState({ showLoader: true });
    if (
      this.state.currentPassword === "" &&
      this.state.newPassword === "" &&
      this.state.confirmPassword === ""
    ) {
      this.setState({
        currentPasswordError: true,
        currentErrorText: "* Required",
        newPasswordError: true,
        newErrorText: "* Required",
        confirmPasswordError: true,
        confirmErrortext: "* Required",
        showLoader: false
      });
    } else if (this.state.currentPassword === "") {
      this.setState({
        currentPasswordError: true,
        currentErrorText: "* Required",
        showLoader: false
      });
    } else if (this.state.newPassword === "") {
      this.setState({
        newPasswordError: true,
        newErrorText: "* Required",
        showLoader: false
      });
    } else if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: true,
        confirmErrortext: "* confirm password does not match with new password",
        showLoader: false
      });
    } else {
      let data = {
        currentPassword: this.state.currentPassword,
        newPassword: this.state.newPassword,
        confirmPassword: this.state.confirmPassword
      };
      this.setState({
        currentPasswordError: false,
        newPasswordError: false,
        confirmPasswordError: false
      });
      AsyncStorage.getItem("userToken").then(token => {
        this.props.changePassword(data, token);
      });
    }
  };

  cross = () => {
    this.props.navigation.navigate("userImageStackNavigator");
    this.setModalVisible(!this.state.modalVisible);
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    // console.warn(this.state.logo);
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.mainContainer}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.signIn}>
              <View style={styles.signInHeader}>
                <Text style={styles.signInHeaderText}>Change Password</Text>
              </View>
              <View style={styles.signInContent}>
                <Text style={styles.signInContentText}>
                  Sign in with your username or email.
                </Text>
              </View>
              <View style={styles.loginImageContainer}>
                {this.state.logo ? (
                  <Image
                    source={{ uri: Url + `/${this.state.logo}` }}
                    style={{
                      width: wp("50%"),
                      height: wp("50%"),
                      borderRadius: 100
                    }}
                  />
                ) : (
                  <Image
                    source={Estilate}
                    style={{
                      width: wp("50%"),
                      height: wp("50%"),
                      borderRadius: 70
                    }}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.emailContainer}>
                  <View style={styles.emailImageContainer}>
                    <Image
                      source={Password}
                      resizeMode="contain"
                      style={styles.passwordImage}
                    />
                  </View>
                </View>
                <View style={[styles.fullWidth, styles.inputTextContainer]}>
                  <TextInput
                    style={styles.input}
                    placeholder="CURRENT PASSWORD"
                    placeholderTextColor="#05564d"
                    onChangeText={e => this.setState({ currentPassword: e })}
                    secureTextEntry
                    value={this.state.currentPassword}
                    onEndEditing={() => this.validatePassword("current")}
                  />
                </View>
              </View>
              {this.state.currentPasswordError ? (
                <View style={{ width: "80%" }}>
                  <Text
                    style={{
                      color: "darkred",
                      fontSize: hp("2%")
                    }}
                  >
                    {this.state.currentErrorText}
                  </Text>
                </View>
              ) : null}
              <View style={[styles.inputContainer, styles.topMargin]}>
                <View style={styles.emailContainer}>
                  <View style={styles.emailImageContainer}>
                    <Image
                      source={NewPassword}
                      resizeMode="contain"
                      style={styles.passwordImage}
                    />
                  </View>
                </View>
                <View style={[styles.fullWidth, styles.inputTextContainer]}>
                  <TextInput
                    style={styles.input}
                    placeholder="NEW PASSWORD"
                    placeholderTextColor="#05564d"
                    onChangeText={e => this.setState({ newPassword: e })}
                    value={this.state.newPassword}
                    secureTextEntry
                    onEndEditing={() => this.validatePassword("new")}
                  />
                </View>
              </View>
              {this.state.newPasswordError ? (
                <View style={{ width: "80%" }}>
                  <Text
                    style={{
                      color: "darkred",
                      fontSize: hp("2%")
                    }}
                  >
                    {this.state.newErrorText}
                  </Text>
                </View>
              ) : null}
              <View style={[styles.inputContainer, styles.topMargin]}>
                <View style={styles.emailContainer}>
                  <View style={styles.emailImageContainer}>
                    <Image
                      source={NewPassword}
                      resizeMode="contain"
                      style={styles.passwordImage}
                    />
                  </View>
                </View>
                <View style={[styles.fullWidth, styles.inputTextContainer]}>
                  <TextInput
                    style={styles.input}
                    placeholder="CONFIRM PASSWORD"
                    placeholderTextColor="#05564d"
                    onChangeText={e => this.setState({ confirmPassword: e })}
                    value={this.state.confirmPassword}
                    onEndEditing={() => this.validatePassword("confirm")}
                    secureTextEntry
                  />
                </View>
              </View>
              {this.state.confirmPasswordError ? (
                <View style={{ width: "80%" }}>
                  <Text
                    style={{
                      color: "darkred",
                      fontSize: hp("2%")
                    }}
                  >
                    {this.state.confirmErrortext}
                  </Text>
                </View>
              ) : null}

              <TouchableOpacity onPress={this.login} style={styles.submit}>
                <View>
                  <Text style={styles.buttonText}>Submit</Text>
                </View>
              </TouchableOpacity>
              {this.state.showLoader === true ? <Loader /> : null}

              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                presentationStyle="overFullScreen"
                onRequestClose={() => {
                  this.setModalVisible(true);
                }}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalImageContainer}>
                    <Image
                      source={ModalImage}
                      style={styles.modalImage}
                      resizeMode="cover"
                    />
                    <TouchableHighlight
                      onPress={this.cross}
                      style={styles.crossImageContainer}
                    >
                      <Image
                        source={Cross}
                        style={styles.crossImage}
                        resizeMode="contain"
                      />
                    </TouchableHighlight>
                    <View style={styles.modalTextContainer}>
                      <View>
                        <Text style={styles.modalHeaderText}>
                          Congratulations
                        </Text>
                      </View>
                      <View style={styles.modalContentContainer}>
                        <Text style={styles.modalContent}>
                          Your password has been changed, let’s get started
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({
    changePasswordResponse: state.ChangePasswordReducer.changePasswordResponse,
    loginData: state.LoginReducer.loginData,
    currentPasswords: state.ChangePasswordReducer.currentPasswords,
    newPassword: state.ChangePasswordReducer.newPassword,
    confirmPassword: state.ChangePasswordReducer.confirmPassword
  }),
  {
    ...changePassword
  }
)(Changepassword);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%"
  },
  bgImage: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  loginImageContainer: {
    width: wp("80%"),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp("4%")
  },
  fullWidth: {
    width: wp("100%")
  },
  loginImage: {
    width: wp("60%")
  },
  signIn: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  signInHeader: {
    alignItems: "center",
    marginBottom: hp("1%"),
    marginTop: hp("6%"),
    width: wp("90%")
  },
  signInHeaderText: {
    fontSize: hp("5%"),
    color: "#d5efef",
    fontWeight: "normal"
  },
  signInContent: {
    alignItems: "center",
    width: wp("60%")
  },
  signInContentText: {
    color: "#d5efef",
    fontSize: hp("2.5%"),
    textAlign: "center"
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#b3d4d4",
    borderColor: "#b3d4d4",
    borderRadius: 5,
    width: wp("80%"),
    height: hp("6.5%")
  },
  inputTextContainer: {
    justifyContent: "center",
    width: wp("87%")
  },
  topMargin: {
    marginTop: hp("1.5%")
  },
  emailImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    width: "100%",
    borderRightColor: "#68c7bc",
    paddingVertical: hp("1%")
  },
  emailContainer: {
    height: "100%",
    width: wp("9.8%"),
    justifyContent: "center"
  },
  emailImage: {
    width: 17,
    height: 17
  },
  passwordImage: {
    width: 17,
    height: 17
  },
  input: {
    fontSize: hp("1.6%"),
    paddingLeft: wp("2%"),
    color: "#05564d"
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
  },
  invalidEmail: {
    color: "white",
    fontSize: hp("2%")
  },
  invalidEmailContainer: {
    width: "80%",
    alignItems: "flex-end",
    paddingVertical: hp("1%")
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
    fontSize: hp("2%")
  }
});
