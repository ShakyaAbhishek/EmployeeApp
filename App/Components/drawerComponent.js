import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  Text,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert
} from "react-native";
// import { DrawerItems } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Url from "../Actions/url";
import Profile from "../Images/profile.png";
import { connect } from "react-redux";
import * as loginActions from "../Actions/loginInAction";
import * as userActions from '../Actions/userDetailActions'

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      language: "English",
      languageCondition: false,
      drawerText: "Dashboard",
      Name: "",
      userImage: ""
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('userToken').then((token) => {
      this.props.getUserData(token);
    })
    AsyncStorage.getItem("logo").then(logo => {
      this.setState({ logo: logo });
    });
    // AsyncStorage.getItem("userDetails").then(data => {
    //   let data1 = JSON.parse(data);
    //   this.setState({ userImage: data1.userImage });
    // });
  }

  logout = async () => {
    let userToken = await AsyncStorage.getItem("userToken");
    AsyncStorage.getItem("fcmToken").then(token => {
      let data = {
        device_token: token
      };
      this.props.logout(data, userToken);
    });
  };

  async componentDidUpdate(prevProps) {
    // AsyncStorage.getItem("userDetails").then(data => {
    //   let data1 = JSON.parse(data);
    //   if (data1.userImage !== this.state.userImage) {
    //     this.setState({ userImage: data1.userImage });
    //   }
    // });
    if(prevProps.userDetail !== this.props.userDetail) {
      if(this.props.userDetail.status === 200){
        this.setState({userImage : this.props.userDetail.result.imageURI})
      }
    }
    if (prevProps.logoutData !== this.props.logoutData) {
      if (this.props.logoutData.status === 200) {
        await AsyncStorage.removeItem("userToken");
        this.props.navigation.navigate("PreSignIn");
      }
    }
  }

  render() {
    let drawerText = this.state.drawerText;
    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={{ alignItems: "center", marginTop: hp("5%") }}>
              <View style={{ width: "100%", height: wp("28%") }}>
                <Image
                  source={{ uri: Url + `/${this.state.logo}` }}
                  resizeMode="stretch"
                  style={
                    Platform.OS == "android"
                      ? { width: "100%", height: "100%" }
                      : { width: "100%", height: "100%" }
                  }
                  resizeMode="contain"
                />
              </View>
            </View>
            <View
              style={{
                marginTop: hp("5%"),
                height: hp("20%"),
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{ width: wp("28%"), height: wp("28%") }}>
                {this.state.userImage ? (
                  <View>
                    <Image
                      source={{ uri: Url + `/${this.state.userImage}` }}
                      style={
                        Platform.OS == "android"
                          ? { width: "100%", height: "100%", borderRadius: 90 }
                          : { width: "100%", height: "100%", borderRadius: 55 }
                      }
                    />
                  </View>
                ) : (
                  <Image
                    source={Profile}
                    style={
                      Platform.OS === "android"
                        ? { width: "100%", height: "100%", borderRadius: 90 }
                        : { width: "100%", height: "100%", borderRadius: 55 }
                    }
                  />
                )}
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 17,
                  paddingBottom: 15,
                  paddingTop: 15
                }}
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                  this.setState({ drawerText: "Dashboard" });
                  this.props.navigation.navigate("ConnectDevice");
                }}
              >
                <Text style={{ fontSize: hp("2.5%") }}>Connect Device</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 17,
                  paddingBottom: 15,
                  paddingTop: 15
                }}
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                  this.setState({ drawerText: "AboutMe" });
                  this.props.navigation.navigate("AboutMe");
                }}
              >
                <Text style={{ fontSize: hp("2.5%") }}>AboutMe</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 17,
                  paddingBottom: 15,
                  paddingTop: 15
                }}
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                  this.setState({ drawerText: "HealthData" });
                  this.props.navigation.navigate("ConnectDevice");
                }}
              >
                <Text style={{ fontSize: hp("2.5%") }}>Connect device</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 17,
                  paddingBottom: 15,
                  paddingTop: 15
                }}
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                  this.setState({ drawerText: "YourContent" });
                  this.props.navigation.navigate("YourContent");
                }}
              >
                <Text style={{ fontSize: hp("2.5%") }}>YourContent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 17,
                  paddingBottom: 15,
                  paddingTop: 15
                }}
                onPress={this.logout}
              >
                <Text style={{ fontSize: hp("2.5%") }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    logoutData: state.LoginReducer.logoutData,
    userDetail : state.UserDetailReducer.userData
  }),
  {
    ...loginActions, ...userActions
  }
)(DrawerContent);
