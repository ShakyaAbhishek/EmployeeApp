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
import SplashScreen from "react-native-splash-screen";
import LogoHeader from "./logoHeader";
import HeaderBack from "./headerBack";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import AddGoals from "./addGoals";
import MyGoals from "./myGoals";
import BottomMenu from "./bottomMenu";
import { connect } from "react-redux";

class MyPersonalGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalBool: false
    };
  }

  componentDidMount() {}

  handleAllArticles = () => {
    this.setState({ goalBool: false });
  };

  handleMyArticle = () => {
    this.setState({ goalBool: true });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <ImageBackground source={backgroundImage} style={styles.bgImage}>
          <View>
            <HeaderBack {...this.props} heading="My Personal Goals" />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.headingMainContainer}>
                {/* <View>
                  <Text style={styles.mainHeadingText}>
                    My Personal Goals
                  </Text>
                </View> */}
                <View style={styles.headingContentContainer}>
                  <Text style={styles.headingContentText}>
                    Lorem Ipsum is simply dummy text of the printing and type
                    setting industry.
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "90%"
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "50%",
                    alignItems: "center"
                  }}
                  onPress={this.handleMyArticle}
                >
                  <View
                    style={{
                      borderBottomWidth: this.state.goalBool ? 2 : null,
                      borderBottomColor: this.state.goalBool ? "#d5efef" : "transparent"
                    }}
                  >
                    <Text
                      style={{
                        color: "#d5efef",
                        fontSize: hp("2.5%"),
                        textTransform: "uppercase"
                      }}
                    >
                      My Goals
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: "50%", alignItems: "center" }}
                  onPress={this.handleAllArticles}
                >
                  <View
                    style={{
                      borderBottomWidth: this.state.goalBool ? null : 2,
                      borderBottomColor: this.state.goalBool ? "transparent" : "#d5efef"
                    }}
                  >
                    <Text
                      style={{
                        color: "#d5efef",
                        fontSize: hp("2.5%"),
                        textTransform: "uppercase"
                      }}
                    >
                      Add goals
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "100%",
                  marginVertical: hp("3%")
                }}
              >
                <View
                  style={{
                    // height: hp("100%"),
                    // paddingBottom:hp('20%')
                  }}
                >
                  {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                    {this.state.goalBool ? (
                      <MyGoals {...this.props} />
                    ) : (
                      <AddGoals {...this.props} />
                    )}
                  {/* </ScrollView> */}
                </View>
              </View>
            </View>
          </View>
          </ScrollView>
          <View style={{ position: "absolute", bottom: 0 }}>
            <BottomMenu {...this.props} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%"
  },
  safeAreaViewContainer: {
    flex: 1
  },
  logoContainer: {
    marginTop: hp("2.5%")
  },
  mainContainer: {
    alignItems: "center",
    paddingBottom: hp("16%")
  },
  innerContainer: {
    width: wp("100%"),
    alignItems: "center"
  },
  headingMainContainer: {
    alignItems: "center",
    marginVertical: hp("6%"),
    width: "85%"
  },
  mainHeadingText: {
    fontSize: hp("4.5%"),
    color: "#d5efef"
  },
  headingContentContainer: {
    paddingTop: hp("1%")
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#d5efef",
    textAlign: "center"
  }
});

export default connect(
  state => ({
    allComments: state.RecognitionReducer.allComments
  }),
  null
)(MyPersonalGoals);
