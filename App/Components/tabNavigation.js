import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  AsyncStorage
} from "react-native";
import Home from "../Images/home.png";
import People from "../Images/people.png";
import HashTag from "../Images/hashtag.png";
import Star from "../Images/star.png";
import Notification from "../Images/notifications.png";
import { connect } from "react-redux";
import * as recogActions from "../Actions/recognitionAction";

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfNotifications: 0
    };
  }

  componentDidMount() {
    // this.props.getBadges(this.state.notificationData.length);
    AsyncStorage.getItem("userToken").then(token => {
      this.props.getNotifications(token);
    });
  }

  componentDidUpdate(prevProps) {
    let numberOfNotifications = 0;
    if (prevProps.allNotifications !== this.props.allNotifications) {
      if (this.props.allNotifications.notifications) {
        this.props.allNotifications.notifications.map(item => {
          if (item.moduleType === "recognition" && item.status === "unread") {
            numberOfNotifications = numberOfNotifications + 1;
          }
          this.setState({ numberOfNotifications });
        });
      }
    }
  }

  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.setTabIndex(1)}
            style={
              this.props.tabIndex == 1
                ? {
                    borderBottomWidth: 2,
                    paddingBottom: 5,
                    borderBottomColor: "#fff"
                  }
                : null
            }
          >
            <Image
              source={Home}
              style={{
                width: 25,
                height: 25
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.setTabIndex(2)}
            style={
              this.props.tabIndex == 2
                ? {
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                    borderBottomColor: "#fff"
                  }
                : null
            }
          >
            <Image
              source={People}
              style={{
                width: 25,
                height: 25
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.setTabIndex(3)}
            style={
              this.props.tabIndex == 3
                ? {
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                    borderBottomColor: "#fff"
                  }
                : null
            }
          >
            <Image
              source={HashTag}
              style={{
                width: 25,
                height: 25
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.setTabIndex(4)}
            style={
              this.props.tabIndex == 4
                ? {
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                    borderBottomColor: "#fff"
                  }
                : null
            }
          >
            <Image
              source={Star}
              style={{
                width: 25,
                height: 25
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.setTabIndex(5)}
            style={
              this.props.tabIndex == 5
                ? {
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                    borderBottomColor: "#fff"
                  }
                : null
            }
          >
            <Image
              source={Notification}
              style={{
                width: 25,
                height: 25
              }}
              resizeMode="contain"
            />
            {this.state.numberOfNotifications ? (
              <View
                style={{
                  position: "absolute",
                  right: "-40%",
                  bottom: "50%",
                  borderRadius: 50,
                  height: 20,
                  width: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "yellow"
                }}
              >
                <Text>{this.state.numberOfNotifications}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    allNotifications: state.RecognitionReducer.allNotifications
  }),
  {
    ...recogActions
  }
)(Tab);

const styles = StyleSheet.create({
  // topBarImage: {
  //   width: 30,
  //   height: 30
  // }
});
