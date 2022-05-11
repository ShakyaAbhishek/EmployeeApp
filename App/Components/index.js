import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  Linking,
  Platform,
  Dimensions
} from "react-native";
import Video from 'react-native-video';
import Navigator from "./auth";
import SplashScreenVideo from '../Videos/Splashscreenvideo.mp4';
import { connect } from "react-redux";
import * as loginAction from "../Actions/loginInAction";


const { width, height } = Dimensions.get('window');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideo: false,
      currentDate: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-"),
    };
  }
  async componentDidMount() {
    const videoPlay = await AsyncStorage.getItem('videoPlay');
    if (videoPlay === null || videoPlay === '0') {
      setTimeout(() => this.getUserData(), 10000);
      this.setState({ showVideo: true })
    } else {
      this.setState({ showVideo: false })
      this.getUserData();
    }
  }

  async getUserData() {
    let token = await AsyncStorage.getItem("userToken");
    let date = await AsyncStorage.getItem("userMood");
    // let userImage = await AsyncStorage.getItem("userImage");
    // let passwordBool = await AsyncStorage.getItem("password");
    // let profileData = await AsyncStorage.getItem("profile");
    let dataContent = await AsyncStorage.getItem("content");
    let storedDate = JSON.parse(date);
    // let userData = await AsyncStorage.getItem('userDetails');
    // let userDetails = JSON.parse(userData);
    if (token) {
      this.props.trackUser(token)
      // if (userDetails.trackUser && userDetails.trackUser.password !== true) {
      //   this.props.navigation.navigate("passwordStackNavigator");
      // } else if (userDetails.trackUser && userDetails.trackUser.imageUpdated !== true) {
      //   this.props.navigation.navigate("userImageStackNavigator");
      // } else if (userDetails.trackUser && userDetails.trackUser.profileUpdated !== true) {
      //   this.props.navigation.navigate("userDataStackNavigator");
      // } 

    } else {
      this.props.navigation.navigate("Auth");
    }
  }

  async componentDidUpdate(prevProps) {
    let date = await AsyncStorage.getItem("userMood");
    let dataContent = await AsyncStorage.getItem("content");
    let storedDate = JSON.parse(date);
    if (prevProps.userTrack !== this.props.userTrack) {
      if (this.props.userTrack.status === 200) {
        if (this.props.userTrack.userTrack.password !== true) {
          this.props.navigation.navigate("passwordStackNavigator");
        } else if (this.props.userTrack.userTrack.profileImageOrLogoUpdated !== true) {
          this.props.navigation.navigate("userImageStackNavigator");
        } else if (this.props.userTrack.userTrack.profileUpdated !== true) {
          this.props.navigation.navigate("userDataStackNavigator");
        } else if (this.props.userTrack.userTrack.healthDataSubmitted !== true) {
          this.props.navigation.navigate("userHealthNavigator");
        }
        else if (this.props.userTrack.userTrack.yourContentUpdated !== true) {
          this.props.navigation.navigate("contentStacknavigator");
        }
        else if (this.props.userTrack.userTrack.moodLastUpdatedAt !== this.state.currentDate) {
          this.props.navigation.navigate("moodStacknavigator");
        }
        else {
          // AsyncStorage.removeItem("userMood");
          this.props.navigation.navigate("StackNavigation");
        }
      }
    }
  }

  loadStart = () => {
    const video = '1';
    AsyncStorage.setItem('videoPlay', video);
  }

  endVideo = () => {
    console.warn('end reached')
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {
          this.state.showVideo ? <Video
            source={SplashScreenVideo}
            style={{ width: width, height: height }}
            repeat={true}
            resizeMode="cover"
            playInBackground={false}
            allowsExternalPlayback={false}
            onLoadStart={() => this.loadStart()}
            onEnd={() => this.endVideo()}
          /> : <ActivityIndicator />
        }

      </View>
    );
  }
}

export default connect(
  state => ({
    userTrack: state.LoginReducer.userTrack
  }),
  {
    ...loginAction

  }
)(App);