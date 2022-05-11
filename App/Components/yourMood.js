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
  Alert,
  Modal,
  TouchableHighlight
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import LogoHeader from "./logoHeader";
import Header from "./header";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Url from "../Actions/url";
import Frustated from "../Images/frustated.png";
import Angry from "../Images/angry.png";
import Annoyed from "../Images/annoyed.png";
import Chillout from "../Images/chilledout.png";
import Excited from "../Images/excited.png";
import Grateful from "../Images/grateful.png";
import Healthy from "../Images/healthy.png";
import Meh from "../Images/meh.png";
import Motivated from "../Images/motivated.png";
import Quite from "../Images/quiet.png";
import Sleepy from "../Images/sleepy.png";
import Stress from "../Images/stress1.png";
import Frustatedgreen from "../Images/frustatedgreen.png";
import Angrygreen from "../Images/angrygreen.png";
import Annoyedgreen from "../Images/annoyedgreen.png";
import Chilloutgreen from "../Images/chilledoutgreen.png";
import Excitedgreen from "../Images/excitedgreen.png";
import Gratefulgreen from "../Images/gratefulgreen.png";
import Healthygreen from "../Images/healthygreen.png";
import Mehgreen from "../Images/mehgreen.png";
import Motivatedgreen from "../Images/motivatedgreen.png";
import Quitegreen from "../Images/quietgreen.png";
import Sleepygreen from "../Images/sleepygreen.png";
import Stressgreen from "../Images/stressgreen1.png";
import { connect } from "react-redux";
import * as moodAction from "../Actions/moodAction";
import ModalImage from "../Images/popup.png";
import Cross from "../Images/cross2.png";

class YourMood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      moodType: "",
      yourMoodData: [
        {
          moodImage1: Angry,
          moodImage2: Angrygreen,
          chooseImage: false,
          textContent: "Angry"
        },
        {
          moodImage1: Healthy,
          moodImage2: Healthygreen,
          chooseImage: false,
          textContent: "Healthy"
        },
        {
          moodImage1: Sleepy,
          moodImage2: Sleepygreen,
          chooseImage: false,
          textContent: "Sleepy"
        },
        {
          moodImage1: Quite,
          moodImage2: Quitegreen,
          chooseImage: false,
          textContent: "Quite"
        },
        {
          moodImage1: Annoyed,
          moodImage2: Annoyedgreen,
          chooseImage: false,
          textContent: "Annoyed"
        },
        {
          moodImage1: Meh,
          moodImage2: Mehgreen,
          chooseImage: false,
          textContent: "Meh"
        },
        {
          moodImage1: Grateful,
          moodImage2: Gratefulgreen,
          chooseImage: false,
          textContent: "Grateful"
        },
        {
          moodImage1: Stress,
          moodImage2: Stressgreen,
          chooseImage: false,
          textContent: "Stress"
        },
        {
          moodImage1: Motivated,
          moodImage2: Motivatedgreen,
          chooseImage: false,
          textContent: "Motivated"
        },
        {
          moodImage1: Chillout,
          moodImage2: Chilloutgreen,
          chooseImage: false,
          textContent: "Chillout"
        },
        {
          moodImage1: Excited,
          moodImage2: Excitedgreen,
          chooseImage: false,
          textContent: "Excited"
        },
        {
          moodImage1: Frustated,
          moodImage2: Frustatedgreen,
          chooseImage: false,
          textContent: "Frustrated"
        }
      ],
      showModal: false
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    // this.setState({
    //   currentDate: new Date()
    //     .toJSON()
    //     .slice(0, 10)
    //     .replace(/-/g, "/")
    // });
    // AsyncStorage.getItem("userMood").then(data => {
    //   let data1 = JSON.parse(data);
    //   if (this.state.currentDate === data1) {
    //     console.warn("if");
    //     console.warn(typeof data1);
    //     this.props.navigation.navigate("Dashboard");
    //   } else {
    //     AsyncStorage.removeItem("userMood");
    //     console.warn("else");
    //   }
    // });
    // AsyncStorage.getItem("userToken").then(token => {
    //   this.props.getAllMood(token);
    // });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.setMood !== this.props.setMood) {
      console.warn("mood", this.props.setMood);
      if (this.props.setMood.status === 201) {
        let currentDate = new Date()
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, "/");
        this.setState({ currentDate });
        AsyncStorage.setItem("userMood", JSON.stringify(currentDate));
        this.setState({ showModal: true });
        // Alert.alert("Alert", "Your mood has been stored", [
        //   {
        //     text: "OK",
        //     onPress: () => this.props.navigation.navigate("Dashboard")
        //   }
        // ]);
      } else if (this.props.setMood.status === 401) {
        let currentDate = new Date()
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, "/");
        this.setState({ currentDate });
        AsyncStorage.setItem("userMood", JSON.stringify(currentDate));
        this.setState({ showModal: true });
        // Alert.alert("Alert", this.props.setMood.message, [
        //   {
        //     text: "OK",
        //     onPress: () => this.props.navigation.navigate("Dashboard")
        //   }
        // ]);
      } else {
        alert(this.props.setMood.message);
      }
    }
  }

  handleImage = (item, index) => {
    let id = "";
    id = item._id;
    let moodType = this.state.moodType;
    moodType = item.textContent;

    this.setState({ id, mood: index, moodType });
    // let yourMoodData = [...this.state.yourMoodData];
    // yourMoodData[index].chooseimage = !yourMoodData[index].chooseimage;
    // this.setState({ yourMoodData: yourMoodData, mood: index });
  };

  submitYourMood = () => {
    if (!this.state.moodType) {
      alert("Please select your mood");
    } else {
      let data = {
        moodType: this.state.moodType
      };
      AsyncStorage.getItem("userToken").then(token => {
        this.props.submitMood(data, token);
      });
    }
  };

  render() {
    console.warn(this.state.moodType);
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.safeAreaContainer}>
          {/* <View style={styles.headerContainer}>
            <Header {...this.props} />
          </View> */}
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.headingTextContainer}>
                <View>
                  <Text style={styles.headingText}>Enter Mood</Text>
                </View>
                <View style={styles.headingContentConatiner}>
                  <Text style={styles.headingContentText}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.moodMainContiner}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.moodInnerContainer}>
                  {this.state.yourMoodData.map((item, index) => {
                    let selectMood = false;
                    if (index === this.state.mood) {
                      selectMood = true;
                    }

                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.moodContainer}
                        onPress={() => this.handleImage(item, index)}
                      >
                        <View>
                          <ImageBackground
                            source={
                              selectMood ? item.moodImage2 : item.moodImage1
                            }
                            style={styles.moodBgImage}
                            imageStyle={{
                              borderRadius: 6
                            }}
                          >
                            <View style={styles.moodTextContainer}>
                              <Text style={styles.moodText}>
                                {item.textContent}
                              </Text>
                            </View>
                          </ImageBackground>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.submit}
                    onPress={this.submitYourMood}
                  >
                    <View>
                      <Text style={styles.buttonText}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.showModal}
                  presentationStyle="overFullScreen"
                  // onRequestClose={() => {
                  //   this.setState({ showModal: false });
                  // }}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalImageContainer}>
                      <Image
                        source={ModalImage}
                        style={styles.modalImage}
                        resizeMode="cover"
                      />
                      <TouchableHighlight
                        onPress={() =>
                          this.props.navigation.navigate("Dashboard")
                        }
                        style={styles.crossImageContainer}
                      >
                        <Image
                          source={Cross}
                          style={styles.crossImage}
                          resizeMode="contain"
                        />
                      </TouchableHighlight>
                      <View style={styles.modalTextContainer}>
                        {/* <View>
                        <Text style={styles.modalHeaderText}>
                          Congratulations
                        </Text>
                      </View> */}
                        <View style={styles.modalContentContainer}>
                          <Text style={styles.modalContent}>
                            Data recorded successfully
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate("Dashboard")
                          }
                          style={{
                            backgroundColor: "#08b89f",
                            paddingVertical: hp("1%"),
                            paddingHorizontal: wp("3%"),
                            borderRadius: 5,
                            marginTop: hp("2%")
                          }}
                        >
                          <View>
                            <Text style={{ color: "#fff" }}>Done</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({
    allMoodData: state.MoodReducer.allMoodData,
    setMood: state.MoodReducer.setMood
  }),
  {
    ...moodAction
  }
)(YourMood);

const styles = StyleSheet.create({
  bgImage: {
    width: wp("100%"),
    height: hp("100%")
  },
  safeAreaContainer: {
    flex: 1,
    alignItems: "center"
  },
  headerContainer: {
    width: wp("100%")
  },
  logoContainer: {
    marginTop: hp("10%"),
    width: wp("100%")
  },
  mainContainer: {
    alignItems: "center",
    flex: 1
  },
  innerContainer: {
    width: wp("85%")
  },
  headingTextContainer: {
    alignItems: "center",
    marginVertical: hp("5%")
  },
  headingText: {
    fontSize: hp("5%"),
    color: "#b3d4d4"
  },
  headingContentConatiner: {
    paddingTop: hp("1%")
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#b3d4d4",
    textAlign: "center"
  },
  moodMainContiner: {
    flex: 1,
    width: wp("85%")
  },
  moodInnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  moodContainer: {
    width: wp("20%"),
    marginVertical: hp("0.5%"),
    paddingHorizontal: wp("1%"),
    borderRadius: 6
  },
  moodBgImage: {
    width: "100%",
    height: hp("10%")
  },
  moodTextContainer: {
    bottom: 6,
    position: "absolute",
    width: "100%"
  },
  moodText: {
    color: "white",
    fontSize: hp("1.5%"),
    textAlign: "center"
  },
  submit: {
    alignItems: "center",
    width: wp("35%"),
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: hp("8%"),
    backgroundColor: "#08b89f",
    paddingVertical: hp("1.5%")
  },
  buttonText: {
    color: "#d5efef",
    textTransform: "uppercase",
    fontSize: hp("2%")
  },
  modalContainer: {
    backgroundColor: "#00000099",
    justifyContent: "center",
    flex: 1,
    alignItems: "center"
  },
  modalImageContainer: {
    width: wp("90%"),
    height: hp("35%"),
    backgroundColor: "white",
    borderRadius: 5
  },
  modalImage: {
    width: wp("90%"),
    height: "37%",
    bottom: 0,
    position: "absolute",
    borderRadius: 5
  },
  crossImageContainer: {
    alignItems: "flex-end",
    right: 0,
    padding: hp("2%")
  },
  crossImage: {
    width: 10,
    height: 10
  },
  modalTextContainer: {
    alignItems: "center",
    paddingVertical: hp("2.5%")
  },
  modalHeaderText: {
    textAlign: "center",
    fontSize: hp("5.5%"),
    fontWeight: "normal"
  },
  modalContentContainer: {
    width: wp("65%")
  },
  modalContent: {
    textAlign: "center",
    fontSize: hp("3%")
  },
  errorText: { color: "darkred", fontSize: hp("2%") }
});
