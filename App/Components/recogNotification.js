import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  FlatList,
  AsyncStorage,
  Image,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import VerticleLine from "../Images/more_vert.png";
import Url from "../Actions/url";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Profile from "../Images/profile.png";
import { connect } from "react-redux";
import * as recogActions from "../Actions/recognitionAction";

class RecogNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationData: [],
      showLoader: true
    };
  }

  componentDidMount() {
    // this.props.getBadges(this.state.notificationData.length);
    AsyncStorage.getItem("userToken").then(token => {
      this.props.getNotifications(token);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allNotifications !== this.props.allNotifications) {
      if (this.props.allNotifications.notifications) {
        this.setState({
          notificationData: this.props.allNotifications.notifications,
          showLoader: false
        });
        // this.props.allNotifications.notifications.map(item => {
        //   if (item.moduleType === "recognition") {
        //     return this.props.getBadges(
        //       this.props.allNotifications.notifications.length
        //     );
        //   }
        // });
      }
    }

    if (prevProps.openNotificationRecog !== this.props.openNotificationRecog) {
      if (this.props.openNotificationRecog) {
        this.props.navigation.navigate("OpenPost", this.state.item);
      }
    }
  }

  openNotification = item => {
    let data = {
      moduleType: item.moduleType,
      moduleId: item.moduleId,
      _id: item._id,
      status: item.status
    };
    this.setState({ item: item }, () => {
      AsyncStorage.getItem("userToken").then(token => {
        this.props.openRecogNotification(data, token);
      });
    });

    // this.props.navigation.navigate("OpenPost")
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: "100%",
                paddingTop: hp("2%"),
                paddingBottom: hp("10%")
              }}
            >
              {this.state.showLoader ? (
                <ActivityIndicator />
              ) : this.state.notificationData.length !== 0 ? (
                <FlatList
                  data={this.props.allNotifications.notifications}
                  renderItem={({ item, index }) => {
                    // console.warn('type', item.moduleType)
                    if (item.moduleType == "recognition") {
                      // console.warn("item", item);
                      return (
                        <TouchableOpacity
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            backgroundColor: "#eaece9",
                            borderBottomWidth: 1,
                            borderColor: "#e2e2e2",
                            paddingVertical: hp("1%"),
                            borderTopWidth: index === 0 ? 1 : 0
                          }}
                          onPress={() => this.openNotification(item)}
                        >
                          <View
                            style={{
                              width: "20%",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <View
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 90,
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <Image
                                source={{ uri: Url + `/${item.senderImg}` }}
                                style={{
                                  width: 45,
                                  height: 45,
                                  //borderRadius: 90
                                }}
                              />
                            </View>
                          </View>
                          <View style={{ width: "60%" }}>
                            <Text
                              style={
                                item.status == "unread"
                                  ? { fontWeight: "bold" }
                                  : null
                              }
                            >
                              {item.msg}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  }}
                />
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text>No data found</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({
    allNotifications: state.RecognitionReducer.allNotifications,
    openNotificationRecog: state.RecognitionReducer.openNotificationRecog
  }),
  {
    ...recogActions
  }
)(RecogNotification);
