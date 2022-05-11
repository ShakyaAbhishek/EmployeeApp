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

class PreSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailValid: true,
      password: "",
      showLoader: false,
      errorText: ""
    };
  }

  async componentDidMount() {
    let userData = await AsyncStorage.getItem("userCredentials");
    let userCredential = JSON.parse(userData);
    console.warn("user", userCredential);
    if (userCredential !== null) {
      this.setState({ email: userCredential.email });
    }

    SplashScreen.hide();
  }

  componentDidUpdate(prevProps) {
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
    if (prevProps.checkUser !== this.props.checkUser) {
      if (this.props.checkUser.status === 200) {
        this.setState({ showLoader: false, emailValid: true }, () => {
          let logo = this.props.checkUser.companyLogo;
          AsyncStorage.setItem("logo", logo);
          this.props.navigation.navigate("SignIn", this.state.email);
        });
      } else {
        // alert("This user does not exist");
        this.setState({
          showLoader: false,
          errorText: "* User not exist",
          emailValid: false,
          email: ""
        });
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

  login = () => {
    // this.props.navigation.navigate("SignIn");
    if (!this.state.email) {
      // Alert.alert('',"Please enter your email id");
      this.setState({
        emailValid: false,
        errorText: " * Please enter your email"
      });
      // alert("Please enter your email id");
    } else {
      let data = {
        email: this.state.email
      };
      this.setState({ showLoader: true });
      this.props.validateUser(data);
    }
  };
  render() {
    console.warn(this.state.errorText);
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
                <Image
                  source={LoginImage}
                  style={[styles.fullWidth, styles.loginImage]}
                  resizeMode="contain"
                />
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
                  <Text style={styles.invalidEmail}>
                    {this.state.errorText}
                  </Text>
                </View>
              ) : null}
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
    checkUser: state.LoginReducer.checkUser,
    email: state.LoginReducer.email,
    errorData: state.LoginReducer.errorData
  }),
  {
    ...loginAction
  }
)(PreSignIn);

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
    width: "63%",
    alignItems: "center",
    justifyContent: "center"
  },
  passwordInfoText: {
    textAlign: "center",
    color: "#b3d4d4",
    fontSize: hp("2%")
  }
});
