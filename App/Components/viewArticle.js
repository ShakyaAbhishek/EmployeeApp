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
  ActivityIndicator
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import LogoHeader from "./logoHeader";
import HeaderBack from "./headerBack";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import ExerciseOpacity from "../Images/exercise.png";
import Facebook from "../Images/fb.png";
import Instagram from "../Images/inst.png";
import Linkedin from "../Images/linkdin.png";
import Add from "../Images/add.png";
import Url from "../Actions/url";
import Twitter from "../Images/twitter.png";
import ShareImage from "../Images/share.png";
import { connect } from "react-redux";
import * as wellnessActions from "../Actions/wellnessAction";

class ViewArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    AsyncStorage.getItem("userToken").then(token => {
      this.props.getArticle(this.props.navigation.state.params.ids, token);
    });
  }
  saveArticle = id => {
    AsyncStorage.getItem("userToken").then(token => {
      this.props.saveArticles(id, token);
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.saveArticle !== this.props.saveArticle) {
      if (this.props.saveArticle.status === 201) {
        alert("Article successfully saved to my article");
      }
    }
  }
  render() {
    const regex = /(<([^>]+)>)/ig;
    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <ImageBackground source={backgroundImage} style={styles.bgImage}>
          <View>
            <HeaderBack {...this.props} />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          {this.props.viewArticle && this.props.viewArticle.article ? (
            <View
              style={{
                backgroundColor: "white",
                flex: 1,
                marginTop: 5
              }}
            >
              <ScrollView>
                <View style={{ height: hp("20%") }}>
                  <Image
                    source={{
                      uri: Url + `/${this.props.viewArticle.article.articleURI}`
                    }}
                    style={{ width: "100%", height: "100%" }}
                  />
                </View>
                <View style={{ alignItems: "center" }}>
                  <View style={{ width: "90%" }}>
                    <View style={{ paddingVertical: 10 }}>
                      <Text
                        style={{
                          color: "#40be99",
                          fontSize: hp("4.5%"),
                          textTransform: "capitalize"
                        }}
                      >
                        {this.props.viewArticle.article.articleTitle}
                      </Text>
                    </View>
                    <View>
                      <Text>{this.props.viewArticle.article.articleBody.replace(regex, '')}</Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        // top: "55%",
                        // position: "relative",
                        flexDirection: "row",
                        paddingVertical: 10
                      }}
                    >
                      {/* <View style={{ width: "10%", justifyContent: "center" }}>
                        <TouchableOpacity
                          onPress={() => {
                            Share.open(shareOptions);
                          }}
                        >
                          <Image
                            source={ShareImage}
                            style={{ width: 25, height: 25 }}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View> */}
                      {this.props.navigation.state &&
                      this.props.navigation.state.params &&
                      this.props.navigation.state.params.bool ? (
                        <TouchableOpacity
                          onPress={() =>
                            this.saveArticle(this.props.viewArticle.article._id)
                          }
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              borderWidth: 1,
                              padding: 2,
                              alignItems: "center"
                            }}
                          >
                            <Image
                              source={Add}
                              style={{ width: 15, height: 15 }}
                              tintColor="black"
                            />
                            <View style={{ paddingLeft: 5 }}>
                              <Text>Save to my content</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          ) : (
            <ActivityIndicator />
          )}
          <View style={{ position: "absolute", bottom: 0 }}>
            <BottomMenu {...this.props} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    viewArticle: state.WellnessReducer.viewArticle,
    saveArticle: state.WellnessReducer.saveArticle
  }),
  {
    ...wellnessActions
  }
)(ViewArticle);

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
  }
});
