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
import Url from "../Actions/url";
import { connect } from "react-redux";
import * as wellnessActions from "../Actions/wellnessAction";
import Video from "react-native-video";

class ViewCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.warn(this.props.viewCampaign.campaign);
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
     
          <View>
            <HeaderBack {...this.props} />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          {this.props.viewCampaign && this.props.viewCampaign.campaign ? (
            <View
              style={{
                backgroundColor: "white",
                flex: 1,
                marginTop: 5
              }}
            >
              <ScrollView>
                {this.props.viewCampaign.campaign.videoUrl ? (
                  <View style={{ height: hp("35%")}}>
                    <Video
                      source={{
                        uri:
                          Url + `/${this.props.viewCampaign.campaign.videoUrl}`
                      }}
                      style={{ width: "100%", height: '100%' }}
                      repeat={false}
                      controls={true}
                      resizeMode="cover"
                      playInBackground={false}
                      resizeMode="contain"
                      allowsExternalPlayback={false}
                      // onLoadStart={() => this.loadStart()}
                      // onEnd={() => this.endVideo()}
                    />
                  </View>
                ) : (
                  <View style={{ height: hp("35%") }}>
                    <Image
                      source={{
                        uri:
                          Url + `/${this.props.viewCampaign.campaign.imageUrl}`
                      }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                )}

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
                        {this.props.viewCampaign.campaign.campaignName}
                      </Text>
                    </View>
                    <View>
                      <Text>
                        {this.props.viewCampaign.campaign.description}
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          ) : (
            <ActivityIndicator />
          )}
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
    viewCampaign: state.HrReducer.viewCampaign
  }),
  {
    ...wellnessActions
  }
)(ViewCampaign);

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
