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
  AsyncStorage
} from "react-native";
import LogoHeader from "./logoHeader";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import HeaderBack from "./headerBack";
import HRImage from "../Images/hrdepartmentimg.png";
import Announcement from "../Images/announcement.png";
import Campaign from "../Images/campaign.png";
import Leave from "../Images/leaverequest.png";
import Insurance from "../Images/myinsurance.png";
import Policies from "../Images/policies.png";
import TalkHr from "../Images/talktohr.png";
import { connect } from "react-redux";
import * as hrActions from "../Actions/hrActions";

class MyHRDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hrData: [
        {
          image: TalkHr,
          text: "Talk to HR"
        },
        {
          image: Insurance,
          text: "MY Insurance"
        },
        {
          image: Policies,
          text: "Policies"
        },
        {
          image: Campaign,
          text: "Campaign"
        },
        {
          image: Announcement,
          text: "Announcements"
        },
        {
          image: Leave,
          text: "Leave request"
        }
      ]
    };
  }

  handleHrData = index => {
    if (index === 3) {
      this.props.navigation.navigate("Campaign");
    } else if (index === 2) {
      AsyncStorage.getItem("userToken").then(token => {
        this.props.getAllPolicies(token);
      });
    } else if (index === 4) {
      this.props.navigation.navigate("Announcement");
    } else if (index === 5) {
      AsyncStorage.getItem("userToken").then(token => {
        this.props.leaveBalance(token);
      });
      // this.props.navigation.navigate("Leaves");
    } else if (index === 1) {
      this.props.navigation.navigate("MyInsurance")
    }
    else if (index === 0){
      this.props.navigation.navigate("TalkToHr")
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.allPolicies !== this.props.allPolicies) {
      if (this.props.allPolicies.status === 200) {
        this.props.navigation.navigate("Policies");
      }
    }
    if (prevProps.totalLeave !== this.props.totalLeave) {
      if (this.props.totalLeave.status == 200) {
        this.props.navigation.navigate("Leaves");
      }
    }
  }
  render() {
    console.warn(this.props.totalLeave)
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          {/* <ImageBackground source={backgroundImage} style={styles.bgImage}> */}
            <View>
              <HeaderBack {...this.props} heading="My HR Department" />
            </View>
            {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
            <ScrollView>
              <View>
                <Image
                  source={HRImage}
                  resizeMode="cover"
                  style={styles.HRImage}
                />
              </View>
              {/* <View style={styles.headingContainer}>
              <Text style={styles.headingText}>My HR Department</Text>
            </View> */}
              <View style={styles.myHealthContainer}>
                <View style={styles.contentInnerContainer}>
                  {this.state.hrData.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.contentContainer}
                        onPress={() => this.handleHrData(index)}
                      >
                        <ImageBackground
                          source={item.image}
                          // resizeMode={'stretch'}
                          style={styles.contentBgimage}
                         imageStyle={{ borderRadius: 10 }}
                        >
                          <View style={styles.contentTextContainer}>
                            <Text style={styles.contentText}>{item.text}</Text>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
            <View style={styles.bottomMenuContainer}>
              <BottomMenu {...this.props} />
            </View>
          {/* </ImageBackground> */}
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({
    allPolicies: state.HrReducer.allPolicies,
    totalLeave: state.HrReducer.totalLeave,
  }),
  {
    ...hrActions
  }
)(MyHRDepartment);

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
  HRImage: {
    width: "100%",
    height: hp("35%")
  },
  contentContainer: {
    width: wp("24%"),
    height: wp("24%"),
    marginVertical:hp('1%')
  },
  contentBgimage: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  contentTextContainer: {
    position: "absolute",
    bottom: hp("2.5%")
  },
  contentText: {
    fontSize: hp("1.4%"),
    color: "white",
    textAlign: "center"
  },
  contentInnerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "80%"
  },
  myHealthContainer: {
    alignItems: "center",
    marginVertical: hp("10%")
  },
  headingContainer: {
    marginVertical: hp("3%"),
    alignItems: "center"
  },
  headingText: {
    fontSize: hp("5%"),
    color: "#d5efef"
  },
  bottomMenuContainer: {
    position: "absolute",
    bottom: 3
  }
});
