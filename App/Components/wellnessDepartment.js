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
import MyArticles from "./myArticles";
import AllArticles from "./allArticles";
import BottomMenu from "./bottomMenu";
import { connect } from "react-redux";
import * as wellnessActions from "../Actions/wellnessAction";

class WellnessDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleBool: true
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userToken").then(token => {
      this.props.getMyArticles(token);
    });
  }

  handleAllArticles = () => {
    this.setState({ articleBool: false }, () => {
      [
        AsyncStorage.getItem("userToken").then(token => {
          this.props.getAllArticles(token);
        })
      ];
    });
  };

  handleMyArticle = () => {
    this.setState({ articleBool: true }, () => {
      [
        AsyncStorage.getItem("userToken").then(token => {
          this.props.getMyArticles(token);
        })
      ];
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <ImageBackground source={backgroundImage} style={styles.bgImage}>
          <View>
            <HeaderBack {...this.props} heading = "Wellness department" />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.headingMainContainer}>
                {/* <View>
                  <Text style={styles.mainHeadingText}>
                    Wellness department
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
                  <View style={{
                    borderBottomWidth: this.state.articleBool ? 2 : null,
                    borderBottomColor: this.state.articleBool
                      ? "#d5efef"
                      : null,
                  }}>
                    <Text
                      style={{
                        color: "#d5efef",
                        fontSize: hp("2.5%"),
                        textTransform: "uppercase",

                      }}
                    >
                      My articles
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: "50%", alignItems: "center" }}
                  onPress={this.handleAllArticles}
                >
                  <View style={{
                    borderBottomWidth: this.state.articleBool ? null : 2,
                    borderBottomColor: this.state.articleBool
                      ? 2
                      : "#d5efef"
                  }}>
                    <Text
                      style={{
                        color: "#d5efef",
                        fontSize: hp("2.5%"),
                        textTransform: "uppercase",

                      }}
                    >
                      all articles
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "90%",
                  marginVertical: hp("3%")
                }}
              >
                <View
                  style={{
                    height: hp("60%")
                  }}
                >
                  <ScrollView>
                    {this.state.articleBool ? (
                      <MyArticles {...this.props} />
                    ) : (
                        <AllArticles {...this.props} />
                      )}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
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
    fontSize: hp("4%"),
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
  {
    ...wellnessActions
  }
)(WellnessDepartment);
