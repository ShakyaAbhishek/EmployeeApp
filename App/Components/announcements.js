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
  ActivityIndicator,
  Modal
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Url from "../Actions/url";
import backgroundImage from "../Images/bgImage.png";
import BottomMenu from "./bottomMenu";
import LogoHeader from "./logoHeader";
import HeaderBack from "./headerBack";
import ExerciseOpacity from "../Images/exerciseOpacity.png";
import moment from "moment";
import Cross from "../Images/cross2.png";
import ModalImage from "../Images/popup.png";
import ReadMore from "react-native-read-more-text";
import { connect } from "react-redux";
import * as hrActions from "../Actions/hrActions";

class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      announcementData: {}
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userToken").then(token => {
      this.props.getAllAnnouncements(token);
    });
  }

  viewAnnouncement = id => {
    AsyncStorage.getItem("userToken").then(token => {
      this.props.viewAnnouncement(id, token);
      this.setState({ showModal: true });
    });
  };

  cross = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.safeAreaViewContainer}>

          <View>
            <HeaderBack {...this.props} heading="Announcements" />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <ScrollView>
            <View style={{ alignItems: "center" }}>
              <View style={styles.headingMainContainer}>
                {/* <View>
                <Text style={styles.mainHeadingText}>Announcements</Text>
              </View> */}
                <View style={styles.headingContentContainer}>
                  <Text style={styles.headingContentText}>
                    Lorem Ipsum is simply dummy text of the printing and type
                    setting industry.
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={{ width: "90%", paddingBottom: hp("15%") }}>
                {this.props.allAnnouncements &&
                  this.props.allAnnouncements.announcements &&
                  this.props.allAnnouncements.announcements.length > 0 ? (
                    this.props.allAnnouncements.announcements.map(
                      (item, index) => {
                        return (
                          <TouchableOpacity
                            style={{ marginVertical: hp("2%") }}
                            onPress={() => this.viewAnnouncement(item._id)}
                          >
                            <View>
                              <ImageBackground
                                source={{ uri: Url + `/${item.announcementURI}` }}
                                style={{ width: "100%", height: hp("20%") }}
                                imageStyle={{ borderRadius: 6 }}
                              >
                                <View
                                  style={{
                                    width: "90%",
                                    paddingLeft: wp("5%"),
                                    paddingTop: hp("2%")
                                  }}
                                >
                                  <View style={{ width: "70%" }}>
                                    <Text
                                      style={{
                                        color: "#fff",
                                        fontSize: hp("2.4%"),
                                        fontWeight: "bold",
                                        textTransform: "capitalize"
                                      }}
                                    >
                                      {item.announcementTitle}
                                    </Text>
                                  </View>
                                  <View style={{ width: "80%" }}>
                                    <ReadMore numberOfLines={2}>
                                      <Text
                                        style={{
                                          color: "#d5efef",
                                          fontSize: hp("1.5%")
                                        }}
                                      >
                                        {item.description}
                                      </Text>
                                    </ReadMore>
                                    <Text
                                      style={{
                                        color: "#d5efef",
                                        fontSize: hp("1.5%")
                                      }}
                                    >
                                      {moment(
                                        item.createdAt,
                                        "YYYYMMDD"
                                      ).fromNow()}
                                    </Text>
                                  </View>
                                </View>
                            </ImageBackground>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  )
                ) : (
                  <ActivityIndicator color="white" />
                )}
              </View>
            </View>
          </ScrollView>

          {this.state.showModal ? (
            <View>
              <Modal
                transparent={true}
                onRequestClose={() => {
                  this.setState({ showModal: false });
                }}
              >
                <View style={styles.container}>
                  <View
                    style={{
                      width: wp("90%"),
                      height: hp("80%"),
                      backgroundColor: "white"
                    }}
                  >
                    <TouchableOpacity
                      onPress={this.cross}
                      style={styles.crossImageContainer}
                    >
                      <Image
                        source={Cross}
                        style={styles.crossImage}
                        resizeMode="contain"
                        tintColor="black"
                      />
                    </TouchableOpacity>
                    <Image
                      source={ModalImage}
                      style={{
                        width: "100%",
                        height: "17%",
                        bottom: 0,
                        position: "absolute",
                        borderRadius: 5
                      }}
                      resizeMode="cover"
                    />
                    {Object.keys(this.state.announcementData).length > 0 ? (
                      <View>
                        {/* <Text
                        style={{
                          textAlign: "center",
                          fontSize: hp("5%"),
                          textTransform: "capitalize"
                        }}
                      >
                        {
                         this.state.announcementData.title
                        }
                      </Text> */}
                        <View>
                          <Image
                            source={{
                              uri:
                                Url + `/${this.state.announcementData.images}`
                            }}
                            resizeMode="cover"
                            style={{ width: "100%", height: hp("30%") }}
                          />
                        </View>
                        <View style={{ alignItems: "center" }}>
                          <View style={{ width: "90%" }}>
                            <Text
                              style={{
                                textAlign: "center",
                                fontSize: hp("4%"),
                                textTransform: "capitalize"
                              }}
                            >
                              {this.state.announcementData.title}
                            </Text>
                            <Text
                              style={{
                                textAlign: "left",
                                fontSize: hp("2%"),
                                textTransform: "capitalize"
                              }}
                            >
                              {this.state.announcementData.description}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ) : null}
                    {/* {this.props.getAnnouncements &&
                    this.props.getAnnouncements.announcement ? (
                      
                    ) : null} */}
                  </View>
                </View>
              </Modal>
            </View>
          ) : null}
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
    allAnnouncements: state.HrReducer.allAnnouncements,
    getAnnouncements: state.HrReducer.getAnnouncements
  }),
  {
    ...hrActions
  }
)(Announcement);

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
  headingMainContainer: {
    alignItems: "center",
    marginVertical: hp("6%"),
    width: "85%"
  },
  mainHeadingText: {
    fontSize: hp("5%"),
    color: "#d5efef"
  },
  headingContentContainer: {
    paddingTop: hp("1%")
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#d5efef",
    textAlign: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099"
  },
  crossImageContainer: {
    alignItems: "flex-end",
    right: 0,
    padding: hp("1%"),
    zIndex: 999,
    // backgroundColor: "white",
    width: 30,
    right: 0,
    position: "absolute"
  },
  crossImage: {
    width: 15,
    height: 15
  }
});
