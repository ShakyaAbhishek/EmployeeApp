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
  FlatList,
  ActivityIndicator
} from "react-native";
import LogoHeader from "./logoHeader";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import CampaignImag from "../Images/campainsimg.png";
import HeaderBack from "./headerBack";
import Url from "../Actions/url";
import { connect } from "react-redux";
import * as hrActions from "../Actions/hrActions";

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = { allCampaign: [] };
  }

  componentDidMount() {
    AsyncStorage.getItem("userToken").then(token => {
      this.props.getAllCampaigns(token);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.getCampaign !== this.props.getCampaign) {
      this.setState({ allCampaign: this.props.getCampaign.campaigns });
    }
    if (prevProps.viewCampaign !== this.props.viewCampaign) {
      if (this.props.viewCampaign.status === 201) {
        this.props.navigation.navigate("ViewCampaign");
      }
    }
  }

  campaign = id => {
    AsyncStorage.getItem("userToken").then(token => {
      this.props.viewCampaigns(id, token);
    });
  };

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
      <SafeAreaView style={styles.safeAreaViewContainer}>

          <View>
            <HeaderBack {...this.props} heading="Campaigns" />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <View style={{ alignItems: "center" }}>
            <View style={styles.headingMainContainer}>
              {/* <View>
                <Text style={styles.mainHeadingText}>Campaigns</Text>
              </View> */}
              <View style={styles.headingContentContainer}>
                <Text style={styles.headingContentText}>
                  Lorem Ipsum is simply dummy text of the printing and type
                  setting industry.
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
              <View style={styles.contentInnerContainer}>
                {this.state.allCampaign && this.state.allCampaign.length > 0 ? (
                  this.state.allCampaign.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.contentContainer}
                        onPress={() => this.campaign(item._id)}
                      >
                        <View>
                          <ImageBackground
                            source={{
                              uri: Url + `/${item.imageUrl}`
                            }}
                            style={styles.contentBgimage}
                            imageStyle={{ borderRadius: 5, opacity:0.5 }}
                          >
                            <View style={styles.contentTextContainer}>
                              <Text
                                style={{
                                  color: "#fff",
                                  textTransform: "capitalize",
                                  opacity:1,
                                  // fontWeight:'bold',
                                  fontSize:hp('2.5%')
                                }}
                              >
                                {item.campaignName}
                              </Text>
                            </View>
                          </ImageBackground>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View style={{ alignItems: "center", width: "100%" }}>
                    <ActivityIndicator color="#fff" />
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
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
    getCampaign: state.HrReducer.getCampaign,
    viewCampaign: state.HrReducer.viewCampaign
  }),
  {
    ...hrActions
  }
)(Campaign);

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
  contentContainer: {
    width: wp("40%"),
    marginVertical: hp("1%")
  },
  contentBgimage: {
    width: wp("40%"),
    height: hp("12%"),
    justifyContent: "center",
    // opacity:0.5
  },
  contentTextContainer: {
    alignItems: "center",
    opacity:1, 
    zIndex:999
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#fff",
    textAlign: "center"
  },
  contentInnerContainer: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: hp("10%")
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
  }
});
