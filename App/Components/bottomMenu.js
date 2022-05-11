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
  TextInput
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Challenges from "../Images/challenges.png";
import DashBoard from "../Images/dashboard.png";
import Notifications from "../Images/notification.png";
import Recognition from "../Images/recognition.png";
import Rewards from "../Images/rewards.png";

export default class BottomMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuContent: [
        {
          menuImage: DashBoard,
          menuText: "DashBoard"
        },
        {
          menuImage: Notifications,
          menuText: "Notifications"
        },
        {
          menuImage: Challenges,
          menuText: "Challenges"
        },
        {
          menuImage: Recognition,
          menuText: "Recognition"
        }
      ]
    };
  }
  handleNavigation = index => {
    if (index == 0) {
      this.props.navigation.navigate("Dashboard");
    } else if (index == 1) {
      this.props.navigation.navigate("Notifications");
    } else if (index == 3) {
      this.props.navigation.navigate("RecognitionHome");
    } else if (index == 2) {
      this.props.navigation.navigate("Challenges");
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "#202020"
        }}
      >
        {this.state.menuContent.map((item, index) => (
          <TouchableOpacity
            style={{ width: "25%" }}
            onPress={() => this.handleNavigation(index)}
            key={index}
          >
            <View
              style={
                index + 1 === this.state.menuContent.length
                  ? {
                      width: "100%",
                      alignItems: "center",
                      paddingVertical: hp("1.4%")
                    }
                  : {
                      width: "100%",
                      borderRightWidth: 1,
                      borderRightColor: "#68c7bc",
                      alignItems: "center",
                      paddingVertical: hp("1.4%")
                    }
              }
            >
              <View>
                <Image
                  source={item.menuImage}
                  style={{ width: 17, height: 17 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ marginTop: hp("0.3%") }}>
                <Text style={{ color: "white", fontSize: hp("1.5%") }}>
                  {item.menuText}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
