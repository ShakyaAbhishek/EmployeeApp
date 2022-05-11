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
  Dimensions,
  SafeAreaView,
  Platform,
  Alert,
  AsyncStorage
} from "react-native";
import backgroundImage from "../Images/bgImage.png";
import LoginImage from "../Images/loginimage.png";
import Email from "../Images/email.png";
import Password from "../Images/password2.png";
import Url from "../Actions/url";
import SplashScreen from "react-native-splash-screen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import * as loginAction from "../Actions/loginInAction";
import firebase from "react-native-firebase";
import Loader from "./loader";
import Navigator from "./auth";
import CheckBox from "react-native-check-box";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailValid: true,
      password: "",
      showLoader: false,
      isChecked: false,
      passwordValid: true,
      errorText: ""
    };
  }

  async componentDidMount() {
    console.warn(this.props.navigation.state.params);
    this.setState({ email: this.props.navigation.state.params });
    let userData = await AsyncStorage.getItem("userCredentials");
    let userCredential = JSON.parse(userData);
    if (userCredential !== null) {
      this.setState({ password: userCredential.password });
    }

    SplashScreen.hide();
    this.checkPermission();
    AsyncStorage.getItem("logo").then(logo => {
      this.setState({ logo: logo });
    });
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    this.setState({ deviceToken: fcmToken });
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  componentDidUpdate(prevProps) {
    let currentDate = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "-");
    console.warn(typeof currentDate);
    if (prevProps.errorData !== this.props.errorData) {
      this.setState(
        {
          showLoader: false
        },
        () => {
          alert(this.props.errorData);
        }
      );
    }
    if (prevProps.loginData !== this.props.loginData) {
      if (this.props.loginData.status === 200) {
        this.setState({ showLoader: false }, () => {
          let token = this.props.loginData.token;
          AsyncStorage.setItem("userToken", token);
          AsyncStorage.setItem(
            "userDetails",
            JSON.stringify(this.props.loginData)
          );
          if (this.props.loginData.trackUser) {
            if (this.props.loginData.trackUser.password !== true) {
              console.warn("password");
              this.props.navigation.navigate("passwordStackNavigator");
            } else if (
              this.props.loginData.trackUser.profileImageOrLogoUpdated !== true
            ) {
              this.props.navigation.navigate("userImageStackNavigator");
              console.warn("image");
            } else if (this.props.loginData.trackUser.profileUpdated !== true) {
              this.props.navigation.navigate("userDataStackNavigator");
              console.warn("profile");
            } else if (
              this.props.loginData.trackUser.yourContentUpdated !== true
            ) {
              this.props.navigation.navigate("contentStacknavigator");
              console.warn("mood");
            } else if (
              this.props.loginData.trackUser.moodLastUpdatedAt !== currentDate
            ) {
              this.props.navigation.navigate("moodStacknavigator");
              console.warn("mood");
            } else {
              console.warn("else");
              AsyncStorage.getItem("content").then(content => {
                // if (content == null) {
                //   this.props.navigation.navigate("contentStacknavigator");
                // } else {
                this.props.navigation.navigate("Dashboard");
                // }
              });
            }
          } else if (this.props.loginData.userImage) {
            console.warn("4");
            this.props.navigation.navigate("Dashboard");
          } else {
            console.warn("5");
            this.props.navigation.navigate("passwordStackNavigator");
          }
          // AsyncStorage.getItem("password").then(passwordBool => {
          //   if (passwordBool !== null) {
          //     Alert.alert("Alert", "Successfully logged-in", [
          //       {
          //         text: "OK",
          //         onPress: () => this.setState({showLoader:false}, () => {
          //           this.props.navigation.navigate("Dashboard")
          //         })
          //       }
          //     ]);
          //   } else {
          //     Alert.alert("Alert", "Successfully logged-in", [
          //       {
          //         text: "OK",
          //         onPress: () =>
          //           this.setState({showLoader:false}, () => {
          //             this.props.navigation.navigate("passwordStackNavigator")
          //           })
          //       }
          //     ]);
          //   }
          // });
        });
      } else {
        this.setState({
          showLoader: false,
          passwordValid: false,
          errorText: "*" + this.props.loginData.message,
          password:""
        })
        // Alert.alert("Alert", this.props.loginData.message, [
        //   {
        //     text: "OK",
        //     onPress: () =>
        //       this.setState({
        //         showLoader: false,
        //         passwordValid: false,
        //         errorText: this.props.loginData.message
        //       })
        //   }
        // ]);
      }
    }
  }

  validateEmail = () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.state.email) === false) {
      this.setState({ email: "", emailValid: false });
    } else {
      this.setState({ emailValid: true });
    }
  };

  login = async () => {
    if (!this.state.email) {
      alert("Please enter your email id");
    } else if (!this.state.password) {
      this.setState({
        passwordValid: false,
        errorText: "* Please enter your password"
      });
      // alert("Please enter your password");
    } else {
      this.getToken();
      let data = {
        email: this.state.email,
        password: this.state.password,
        device_token: this.state.deviceToken
      };
      console.warn("signin", data);
      this.setState({ showLoader: true }, () => {
        if (this.state.isChecked) {
          let data = {
            email: this.state.email,
            password: this.state.password
          };
          AsyncStorage.setItem("userCredentials", JSON.stringify(data));
        }
      });
      this.props.loginUser(data);
    }
  };

  rememberMe = () => {
    let { isChecked, password } = this.state;
    let { email } = this.props;
    isChecked = !isChecked;
    this.setState({ isChecked });
  };

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.mainContainer}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.signIn}>
              <View style={styles.signInHeader}>
                <Text style={styles.signInHeaderText}>Sign In</Text>
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
                    source={LoginImage}
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
                      source={Email}
                      resizeMode="contain"
                      style={styles.emailImage}
                    />
                  </View>
                </View>
                <View style={[styles.fullWidth, styles.inputTextContainer]}>
                  <TextInput
                    editable={false}
                    keyboardType="email-address"
                    style={styles.input}
                    placeholder="EMAIL ID"
                    placeholderTextColor="#05564d"
                    onChangeText={e => this.setState({ email: e })}
                    // onEndEditing={this.validateEmail}
                    value={this.state.email}
                  />
                </View>
              </View>
              {this.state.emailValid === false ? (
                <View style={styles.invalidEmailContainer}>
                  <Text style={styles.invalidEmail}>*Invalid Email</Text>
                </View>
              ) : null}
              <View style={[styles.inputContainer, styles.topMargin]}>
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
                    placeholder="PASSWORD"
                    placeholderTextColor="#05564d"
                    onChangeText={e => this.setState({ password: e })}
                    value={this.state.password}
                    secureTextEntry
                  />
                </View>
              </View>
              {this.state.passwordValid === false ? (
                <View style={styles.invalidEmailContainer}>
                  <Text style={styles.invalidEmail}>
                    {this.state.errorText}
                  </Text>
                </View>
              ) : null}
              <View style={[styles.passwordInfoContainer, styles.topMargin]}>
                <CheckBox
                  style={{ flex: 1, padding: 5 }}
                  onClick={this.rememberMe}
                  isChecked={this.state.isChecked}
                  rightText={"Remember me"}
                  rightTextStyle={{ color: "#b3d4d4", fontSize: hp("1.7%") }}
                  checkBoxColor="#b3d4d4"
                />
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("ForgetPassword")
                  }
                >
                  <Text style={styles.passwordInfoText}>Forget password ?</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={this.login} style={styles.submit}>
                <View>
                  <Text style={styles.buttonText}>Next</Text>
                </View>
              </TouchableOpacity>
              {this.state.showLoader === true ? <Loader /> : null}
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({
    loginData: state.LoginReducer.loginData,
    email: state.LoginReducer.email,
    password: state.LoginReducer.password,
    errorData: state.LoginReducer.errorData
  }),
  {
    ...loginAction
  }
)(SignIn);

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
    width: "80%"
  },
  signIn: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  signInHeader: {
    alignItems: "center",
    marginBottom: hp("1%"),
    marginTop: hp("6%")
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
    width: "80%",
    height: hp("6.5%")
  },
  inputTextContainer: {
    justifyContent: "center",
    width: "87%"
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
    paddingLeft: 8,
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
    color: "darkred",
    fontSize: hp("2%")
  },
  invalidEmailContainer: {
    width: "80%",
    paddingVertical: hp("1%")
  },
  passwordInfoContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  passwordInfoText: {
    textAlign: "center",
    color: "#b3d4d4",
    fontSize: hp("1.7%")
  }
});
