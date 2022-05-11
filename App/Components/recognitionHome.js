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
  Platform
} from "react-native";
import LogoHeader from "./logoHeader";
import Header from "./header";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import TabNavigation from "./tabNavigation";
import Home from "./homeRecog";
import HashTagPeoples from "./hashTagNewPeople";
import HashTags from "./hashTags";
import Rating from "./rating";
import Search from "../Images/search.png";
import Activity from "../Images/activity.png";
import Camera from "../Images/camera.png";
import Videos from "../Images/video_recorder.png";
import Recognize from "../Images/recognition_1.png";
// import ImagePicker from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";
import HeaderBack from "./headerBack";
import Video from "react-native-video";
import { connect } from "react-redux";
import * as recognitionActions from "../Actions/recognitionAction";
import RecogNotofication from "./recogNotification";
import Url from "../Actions/url";
import Profile from "../Images/profile.png";

class RecognitionHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 1,
      uploadedImages: [],
      userImage: "",
      numberOfNotifications: ""
    };
  }

  getTabComponent = index => {
    switch (index) {
      case 1:
        return <Home {...this.props} />;
      case 2:
        return <HashTagPeoples {...this.props} />;
      case 3:
        return <HashTags {...this.props} />;
      case 4:
        return <Rating {...this.props} />;
      case 5:
        return (
          <RecogNotofication
            {...this.props}
            getBadges={p => this.getBadges(p)}
          />
        );
    }
  };

  componentDidMount() {
    this.getBadges();
    AsyncStorage.getItem("userDetails").then(data => {
      let data1 = JSON.parse(data);
      this.setState({ userImage: data1.userImage });
    });
  }
  getBadges(props) {
    this.setState({ numberOfNotifications: props })
  }

  setTabIndex = val => {
    this.setState({ tabIndex: val });
  };

  searchData = () => {
    if (this.state.tabIndex == 3) {
      AsyncStorage.getItem("userToken").then(token => {
        let searchKey;
        if (!this.state.searchKey) {
          searchKey = encodeURIComponent("#");
        } else {
          searchKey = this.state.searchKey;
        }

        this.props.getHashTags(searchKey, token);
      });
    } else if (this.state.tabIndex == 2) {
      AsyncStorage.getItem("userToken").then(token => {
        let searchKey;
        if (!this.state.searchKey) {
          searchKey = encodeURIComponent("@");
        } else {
          searchKey = this.state.searchKey;
        }

        this.props.getUserList(searchKey, token);
      });
    }
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.openPicker({
      multiple: true,
      includeBase64: true,
      mediaType: "photo"
    }).then(images => {
      this.setState({ uploadedImages: images }, () => { });
    });
  }

  render() {
    console.warn(this.state.numberOfNotifications, 'this.state.latitudelatitude')
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.safeAreaViewContainer}>

          <View>
            <HeaderBack {...this.props} heading = "Recognition" />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <View
            style={{
              backgroundColor: "#62c6be",
              paddingVertical: hp("2%")
            }}
          >
            <TabNavigation
              {...this.props}
              setTabIndex={this.setTabIndex}
              tabIndex={this.state.tabIndex}
              numberOfNotifications={this.state.numberOfNotifications}

            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginVertical: hp("2%"),
                marginHorizontal: 10
              }}
            >
              <View
                style={
                  Platform.OS === "ios"
                    ? {
                      width: 40,
                      height: 40,
                      borderRadius: 20
                    }
                    : {
                      width: 40,
                      height: 40,
                      borderRadius: 50
                    }
                }
              >
                {this.state.userImage ? (
                  <Image
                    source={{ uri: Url + "/" + this.state.userImage }}
                    style={
                      Platform.OS == "android"
                        ? {
                          borderRadius: 90,
                          width: 40,
                          height: 40,
                          borderWidth: 1
                        }
                        : { borderRadius: 20, width: 40, height: 40 }
                    }
                    resizeMode="cover"
                  />
                ) : (
                    <Image
                      source={Profile}
                      style={
                        Platform.OS == "android"
                          ? {
                            borderRadius: 90,
                            width: 40,
                            height: 40,
                            borderWidth: 1
                          }
                          : { borderRadius: 20, width: 40, height: 40 }
                      }
                      resizeMode="cover"
                    />
                  )}
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  flexDirection: "row",
                  width: wp("80%"),
                  height: 40,
                  borderRadius: 6
                }}
              >
                <View style={{ justifyContent: "center", width: "10%" }}>
                  <Image
                    source={Search}
                    style={{ width: 20, height: 20, marginLeft: 10 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={{ width: "90%", justifyContent: "center" }}>
                  <TextInput
                    placeholder={
                      this.state.tabIndex === 3
                        ? "SEARCH  HASHTAG"
                        : this.state.tabIndex === 4 || this.state.tabIndex === 5
                          ? "SEARCH  LEADERBOARD"
                          : "SEARCH"
                    }
                    onSubmitEditing={this.searchData}
                    onChangeText={e => this.setState({ searchKey: e })}
                    style={{
                      fontSize: hp("1.6%")
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={
              this.state.tabIndex === 4
                ? {
                  flex: 1
                }
                : {
                  flex: 1,
                  backgroundColor: "white"
                }
            }
          >
            {/* <ScrollView> */}
            {this.getTabComponent(this.state.tabIndex)}
            {/* </ScrollView> */}
          </View>
          <View style={styles.bottomMenuContainer}>
            <BottomMenu {...this.props} />
          </View>

        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({
    loginData: state.LoginReducer.loginData
  }),
  {
    ...recognitionActions
  }
)(RecognitionHome);

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
  bottomMenuContainer: {
    position: "absolute",
    bottom: 3
  },
});
