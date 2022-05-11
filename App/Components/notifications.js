import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Platform,
  Dimensions
} from "react-native";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import HeaderBack from "./headerBack";
import { ScrollView } from "react-native-gesture-handler";
import imageGirl from "../Images/girl.png";
import ModalImage from "../Images/popup.png";
import imageExercise from "../Images/exercise.png";
const { width, height } = Dimensions.get("window");

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalType: "",
      notificationType: "HR",
      modalData: {},
      hrData: [
        {
          modalHeading: "HR Notifications",
          modalImg: "../Images/exercise.png",
          title: "HR Notification",
          description:
            "Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday.",
          img: "../Images/girl.png"
        },
        {
          modalHeading: "HR Notifications",
          modalImg: "../Images/exercise.png",
          title: "HR Notification",
          description: "challenge data challenge data challenge data",
          img: "../Images/girl.png"
        },
        {
          modalHeading: "HR Notifications",
          modalImg: "../Images/exercise.png",
          title: "HR Notification",
          description:
            "Special Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday",
          img: "../Images/girl.png"
        }
      ],
      personalData: [
        {
          modalHeading: "Personal Notifications",
          modalImg: "../Images/exercise.png",
          title: "Personal Notification",
          description:
            "Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday",
          img: "../Images/girl.png"
        },
        {
          modalHeading: "Personal Notifications",
          modalImg: "../Images/exercise.png",
          title: "Personal Notification",
          description: "challenge data challenge data challenge data",
          img: "../Images/girl.png"
        },
        {
          modalHeading: "Personal Notifications",
          modalImg: "../Images/exercise.png",
          title: "Personal Notification",
          description:
            "Special Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday",
          img: "../Images/girl.png"
        }
      ],
      otherData: [
        {
          modalHeading: "Other Notifications",
          modalImg: "../Images/exercise.png",
          title: "Other Notification",
          description:
            "Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday",
          img: "../Images/girl.png"
        },
        {
          modalHeading: "Other Notifications",
          modalImg: "../Images/exercise.png",
          title: "Other Notification",
          description: "challenge data challenge data challenge data",
          img: "../Images/girl.png"
        },
        {
          modalHeading: "Other Notifications",
          modalImg: "../Images/exercise.png",
          title: "Other Notification",
          description:
            "Special Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday Ramandan Holiday",
          img: "../Images/girl.png"
        }
      ]
    };
  }

  render() {
    let {
      hrData,
      personalData,
      otherData,
      notificationType,
      modalVisible,
      modalData
    } = this.state;

    let notificationData = [];
    if (notificationType === "HR") notificationData = [...hrData];
    else if (notificationType === "PERSON")
      notificationData = [...personalData];
    else if (notificationType === "OTHER") notificationData = [...otherData];

    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <SafeAreaView style={{ flex: 1, backgroundColor: "#11111190" }}>
              <View
                style={{
                  height: hp("100%"),
                  width: wp("100%"),
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    height: hp("80%"),
                    width: wp("93%"),
                    margin: 15,
                    borderRadius: 10
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: "18%",
                      bottom: 0,
                      position: "absolute",
                      borderRadius: 5,
                      zIndex: -1
                    }}
                    source={ModalImage}
                    resizeMode={"cover"}
                  />
                  <View
                    style={{
                      justifyContent: "flex-end",
                      width: wp("87%"),
                      marginLeft: 10,
                      flexDirection: "row",
                      marginHorizontal: "1%"
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.setState({ modalVisible: false })}
                    >
                      <Image
                        style={{ height: 30, width: 20, marginTop: 10 }}
                        source={require("../Images/close.png")}
                      />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      justifyContent: "center",
                      width: wp("93%")
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ textAlign: "center", fontSize: hp("2.6%") }}
                    >
                      {modalData.modalHeading}
                    </Text>
                  </View>

                  <View
                    style={{
                      height: hp("25%"),
                      width: wp("93%"),
                      marginTop: 10
                    }}
                  >
                    <Image
                      style={{ height: "100%", width: "100%" }}
                      source={imageExercise}
                      resizeMode={"stretch"}
                    />
                  </View>

                  <ScrollView
                    style={{
                      zIndex: 5,
                      width: wp("93%"),
                      paddingHorizontal: hp("2%")
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ fontSize: hp("2.6%"), color: "#111111" }}
                    >
                      {modalData.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: hp("1.6%"),
                        marginTop: 3,
                        color: "#111111",
                        paddingBottom: 10
                      }}
                    >
                      {modalData.description}
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </SafeAreaView>
          </Modal>
          {/* <ImageBackground source={backgroundImage} style={styles.bgImage}> */}
          <View>
            <HeaderBack {...this.props} heading="Notifications" />
            <View style={{ paddingTop: hp("5%"), alignItems: "center" }}>
              <View
                style={{
                  width: wp("90%"),
                  flexDirection: "row"
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ notificationType: "HR" })}
                  style={[styles.tabViews, { backgroundColor: "yellow" }]}
                >
                  <View style={{ flex: 1 }}>
                    <Image
                      style={{ height: 37, width: 37 }}
                      source={require("../Images/hrnoti.png")}
                      resizeMode="contain"
                    />

                    <Text style={styles.tabViewFont}>HR</Text>
                  </View>
                  <View>
                    <Text style={styles.tabViewsnotificationFont}>15</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setState({ notificationType: "PERSON" })}
                  style={[
                    styles.tabViews,
                    {
                      backgroundColor: "#61c6be",
                      marginHorizontal: wp("3%")
                    }
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Image
                      style={{ height: 35, width: 35 }}
                      source={require("../Images/personal.png")}
                      resizeMode="contain"
                    />

                    <Text style={styles.tabViewFont}>Personal</Text>
                  </View>
                  <View>
                    <Text style={styles.tabViewsnotificationFont}>15</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setState({ notificationType: "OTHER" })}
                  style={[
                    styles.tabViews,
                    {
                      backgroundColor: "#e9415b"
                    }
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Image
                      style={{ height: 37, width: 37 }}
                      source={require("../Images/alarm.png")}
                      resizeMode="contain"
                    />

                    <Text style={styles.tabViewFont}>Others</Text>
                  </View>
                  <View>
                    <Text style={styles.tabViewsnotificationFont}>15</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {notificationType !== "" ? (
              <View style={{ width: "100%", alignItems: "center" }}>
                <View
                  style={[
                    {
                      width: 0,
                      height: 0,
                      backgroundColor: "transparent",
                      borderStyle: "solid",
                      borderTopWidth: 0,
                      borderRightWidth: 45,
                      borderBottomWidth: 45,
                      borderLeftWidth: 45,
                      borderTopColor: "transparent",
                      borderRightColor: "transparent",
                      borderLeftColor: "transparent",
                      position: "absolute",
                      top: 13,
                      zIndex: 5
                    },
                    notificationType === "HR"
                      ? styles.borderColorYellow
                      : notificationType === "PERSON"
                      ? styles.borderColorGreen
                      : notificationType === "OTHER" && styles.borderColorRed
                  ]}
                />
                <View
                  style={[
                    {
                      width: "90%",
                      marginTop: hp("5%"),
                      paddingVertical: hp("3%")
                    },
                    notificationType === "HR"
                      ? styles.colorYellow
                      : notificationType === "PERSON"
                      ? styles.colorGreen
                      : notificationType === "OTHER" && styles.colorRed
                  ]}
                >
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: hp("2.6%"),
                        fontWeight: "500"
                      }}
                    >
                      {notificationType === "HR"
                        ? "HR NOTIFICATIONS"
                        : notificationType === "PERSON"
                        ? "PERSONAL NOTIFICATIONS"
                        : notificationType === "OTHER" && "OTHER NOTIFICATIONS"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: "55%",
                    width: "90%",
                    backgroundColor: "white"
                  }}
                >
                  <ScrollView>
                    {notificationData.map((item, index) => (
                      <View
                        style={{
                          flexDirection: "row",
                          backgroundColor: "white",
                          width: "90%"
                        }}
                      >
                        <View
                          style={{
                            width: wp("25%"),
                            paddingVertical: hp("1.5%"),
                            alignItems: "center"
                          }}
                        >
                          <Image
                            style={{
                              width: 60,
                              height: 60
                            }}
                            source={imageGirl}
                            resizeMode="contain"
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              modalVisible: true,
                              modalData: item
                            })
                          }
                          style={{ width: "75%" }}
                        >
                          <View style={{ paddingTop: hp("1%") }}>
                            <Text
                              style={{
                                fontSize: hp("2.2%"),
                                fontWeight: "500",
                                color: "skyblue"
                              }}
                            >
                              {item.title}
                            </Text>
                          </View>
                          <Text
                            numberOfLines={3}
                            style={{
                              fontSize: hp("1.8%")
                            }}
                          >
                            {item.description}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            ) : null}
          </View>
          <View style={{ position: "absolute", bottom: 3 }}>
            <BottomMenu {...this.props} />
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%"
  },
  txtStyle: {
    justifyContent: "center",
    textAlign: "center"
  },
  logoContainer: {
    marginTop: hp("2.5%")
  },
  container: {
    flex: 1,
    backgroundColor: "yellow"
  },
  safeAreaViewContainer: {
    flex: 1
  },
  bottomMenuContainer: {
    position: "absolute",
    bottom: 0
  },
  bottomMenuContainer: {
    position: "absolute",
    bottom: 0
  },
  contentInnerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "70%"
  },
  contentContainer: {
    marginBottom: hp("2%"),
    width: wp("30%"),
    height: hp("14%")
  },
  contentBgimage: {
    width: wp("30%"),
    height: hp("14%"),
    alignItems: "center"
  },
  contentTextContainer: {
    position: "absolute",
    bottom: hp("1.5%")
  },
  contentText: {
    fontSize: hp("1.6%"),
    color: "white",
    textAlign: "center"
  },
  colorYellow: {
    backgroundColor: "yellow"
  },
  colorGreen: {
    backgroundColor: "#61c6be"
  },
  colorRed: {
    backgroundColor: "#e9415b"
  },
  borderColorYellow: {
    borderBottomColor: "yellow",
    left: hp("3%")
    //top:hp('1.2%')
  },
  borderColorGreen: {
    borderBottomColor: "#61c6be",
    left: hp("18%")
    //top:hp('1.2%')
  },
  borderColorRed: {
    borderBottomColor: "#e9415b",
    right: hp("3%")
    //top:hp('1.2%')
  },
  tabViews: {
    flexDirection: "row",
    width: wp("28%"),
    borderRadius: 5,
    padding: 5
  },
  tabViewFont: {
    fontSize: hp("1.8%"),
    fontWeight: "400",
    marginTop: 2
  },
  tabViewsnotificationFont: {
    fontSize: hp("3.5%")
  }
});
