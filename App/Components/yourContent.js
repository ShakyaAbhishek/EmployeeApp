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
  Modal,
  TouchableHighlight
} from "react-native";
import LogoHeader from "./logoHeader";
import Header from "./header";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import CareerOpacity from "../Images/careerOpacity.png";
import ExerciseOpacity from "../Images/exerciseOpacity.png";
import Exercise from "../Images/exercise.png";
import FinanceOpacity from "../Images/financeOpacity.png";
import Finance from "../Images/finance.png";
import GeneralhealthOpacity from "../Images/generalhealthOpacity.png";
import Generalhealth from "../Images/generalhealth.png";
import MentalhealthOpacity from "../Images/mentalhealthOpacity.png";
import Mentalhealth from "../Images/mentalhealth.png";
import NutritionOpacity from "../Images/nutritionOpacity.png";
import Nutrition from "../Images/nutrition.png";
import PregnancyOpacity from "../Images/pregnancyOpacity.png";
import Pregnancy from "../Images/pregnancy.png";
import SleepOpacity from "../Images/sleepOpacity.png";
import Sleep from "../Images/sleep.png";
import WeightlossOpacity from "../Images/weightlossOpacity.png";
import WellnessOpacity from "../Images/wellnessproductivityOpacity.png";
import Career from "../Images/career.png";
import Wellness from "../Images/wellness.png";
import WeighLoss from "../Images/weight_loss.png";
import { connect } from "react-redux";
import * as articleAction from "../Actions/articleAction";
import Navigator from "./auth";
import * as loginAction from "../Actions/loginInAction";
import ModalImage from "../Images/popup.png";
import Cross from "../Images/cross2.png";

class YourContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeArticle: [],
      contentData: [],
      currentDate: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-"),
      yourContentData: [
        {
          imageContent: CareerOpacity,
          textContent: "Career Development",
          imageContent1: Career,
          chooseimage: false,
          type: "career_development"
        },
        {
          imageContent: ExerciseOpacity,
          textContent: "Exercise",
          imageContent1: Exercise,
          chooseimage: false,
          type: "exercise"
        },
        {
          imageContent: FinanceOpacity,
          textContent: "Finance",
          imageContent1: Finance,
          chooseimage: false,
          type: "finance"
        },
        {
          imageContent: GeneralhealthOpacity,
          textContent: "General Health",
          imageContent1: Generalhealth,
          chooseimage: false,
          type: "general_health"
        },
        {
          imageContent: MentalhealthOpacity,
          textContent: "Mental Health",
          imageContent1: Mentalhealth,
          chooseimage: false,
          type: "mental_health"
        },
        {
          imageContent: NutritionOpacity,
          textContent: "Nutrition",
          imageContent1: Nutrition,
          chooseimage: false,
          type: "nutrition"
        },
        {
          imageContent: PregnancyOpacity,
          textContent: "Pregnancy",
          imageContent1: Pregnancy,
          chooseimage: false,
          type: "pregnancy"
        },
        {
          imageContent: SleepOpacity,
          textContent: "Sleep",
          imageContent1: Sleep,
          chooseimage: false,
          type: "sleep"
        },
        {
          imageContent: WeightlossOpacity,
          textContent: "Weight loss",
          imageContent1: WeighLoss,
          chooseimage: false,
          type: "weight_loss"
        },
        {
          imageContent: WellnessOpacity,
          textContent: "Wellness & Productivity",
          imageContent1: Wellness,
          chooseimage: false,
          type: "wellness_and_productivity"
        }
      ],
      showModal: false
    };
  }

  submitContent = () => {
    if (!this.state.typeArticle) {
      alert("Please choose atleast one article");
    } else {
      let data = {
        articleType: this.state.typeArticle
      };
      AsyncStorage.getItem("userToken").then(token => {
        this.props.uploadContent(data, token);
      });
    }
  };

  handleImage = (item, index) => {
    let contentData = [...this.state.contentData];
    let yourContentData = [...this.state.yourContentData];
    let typeArticle = [...this.state.typeArticle];
    //item.type
    let selectedIndex;
    if (typeArticle && typeArticle.includes(item.type)) {
      typeArticle.splice(typeArticle.indexOf(item.type), 1);
    } else {
      //add item to the arr
      // typeArticle.splice(index, 1, item.type);
      typeArticle.push(item.type);
    }
    yourContentData[index].chooseimage = !yourContentData[index].chooseimage;
    this.setState({ yourContentData: yourContentData, typeArticle });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.yourUploadedContent !== this.props.yourUploadedContent) {
      if (this.props.yourUploadedContent.status === 200) {
        // alert("Your content is successfully added");
        this.setState({ showModal: true });
        // this.props.navigation.navigate("moodStacknavigator");
      }
    }
  }
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.safeAreaContainer}>
          {/* <View style={styles.headerContainer}>
            <Header {...this.props} />
          </View> */}
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainContainer}>
              {/* <View style={styles.innerContainer}> */}
              <View style={styles.headingTextContainer}>
                <View>
                  <Text style={styles.headingText}>Your Content</Text>
                </View>
                <View style={styles.headingContentConatiner}>
                  <Text style={styles.headingContentText}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Text>
                </View>
              </View>
              {/* </View> */}
              <View style={styles.contentMainContainer}>
                <View style={styles.contentInnerContainer}>
                  {this.state.yourContentData.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.contentContainer}
                      onPress={() => this.handleImage(item, index)}
                    >
                      <View>
                        <ImageBackground
                          source={
                            item.chooseimage
                              ? item.imageContent1
                              : item.imageContent
                          }
                          style={styles.contentBgimage}
                          imageStyle={{ borderRadius: 5 }}
                        >
                          <View style={styles.contentTextContainer}>
                            {item.chooseimage ? null : (
                              <Text style={styles.contentText}>
                                {item.textContent}
                              </Text>
                            )}
                          </View>
                        </ImageBackground>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.buttonsContainer}>
                  <View style={styles.buttonWidth}>
                    <TouchableOpacity
                      style={styles.submit}
                      onPress={() =>
                        this.props.navigation.navigate("Dashboard")
                      }
                    >
                      <View>
                        <Text style={styles.buttonText}>Skip</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonWidth}>
                    <TouchableOpacity
                      style={styles.submit}
                      onPress={this.submitContent}
                    >
                      <View>
                        <Text style={styles.buttonText}>Submit</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
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
                          this.props.navigation.navigate("moodStacknavigator")
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
                            this.props.navigation.navigate("moodStacknavigator")
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
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({
    yourUploadedContent: state.ArticleReducer.yourUploadedContent
  }),
  {
    ...articleAction,
    ...loginAction
  }
)(YourContent);

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
  logoContainer: { marginTop: hp("10%"), width: wp("100%") },
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
  contentMainContainer: {
    flex: 1,
    width: wp("85%")
  },
  contentInnerContainer: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  contentContainer: {
    width: wp("40%"),
    marginVertical: hp("1%")
  },
  contentBgimage: {
    width: wp("40%"),
    height: hp("12%"),
    justifyContent: "center"
  },
  contentTextContainer: {
    alignItems: "center"
  },
  contentText: {
    color: "white",
    fontSize: hp("1.5%")
  },
  submit: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#08b89f",
    paddingVertical: hp("1.5%")
  },
  buttonText: {
    color: "#d5efef",
    textTransform: "uppercase",
    fontSize: hp("2%")
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: hp("9%"),
    marginBottom: hp("7%")
  },
  buttonWidth: { width: "40%" },
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
