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
  ActivityIndicator,
  Alert
} from "react-native";

import LogoHeader from "./logoHeader";
import Header from "./header";
import HeaderBack from "./headerBack";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import RNPickerSelect from "./react-native-picker-select";
import DropDown from "../Images/dropdown.png";
import { connect } from "react-redux";
import * as stressAction from "../Actions/stressAction";

class Stress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitStressQuestions: [],
      weeks: [
        {
          label: "BETWEEN 1-2 WEEK",
          value: "BETWEEN 1-2 WEEK"
        },
        {
          label: "BETWEEN 2-3 WEEK",
          value: "BETWEEN 2-3 WEEK"
        }
      ],
      answer: []
    };
    this.defaultAnswwers = this.defaultAnswwers.bind(this);
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if (nextProps.stressQuestions !== this.props.stressQuestions) {
      this.defaultAnswwers(nextProps.stressQuestions.questions);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.submitResponse !== this.props.submitResponse) {
      Alert.alert("Alert", "Your answers has been stored", [
        {
          text: "OK",
          onPress: () => this.props.navigation.navigate("Dashboard")
        }
      ]);
    }
  }

  defaultAnswwers(questions) {
    // const { questions } = this.props.stressQuestions;
    // console.warn("questions", questions);
    // let questLen = questions.length;
    // console.warn("length", questLen);
    let data = [];
    let data1 = {};
    let i = 0;
    for (i in questions) {
      data1 = {
        questionId: questions[i].options[0]._id,
        question: questions[i].question,
        answer: {
          value: questions[i].options[0].value,
          score: questions[i].options[0].score
        }
      };
      data.push(data1);
    }
    // let data = [
    //   {
    //     questionId: questions[0].options[0]._id,
    //     question: questions[0].question,
    //     answer: {
    //       value: questions[0].options[0].value,
    //       score: questions[0].options[0].score
    //     }
    //   },
    //   {
    //     questionId: questions[1].options[0]._id,
    //     question: questions[1].question,
    //     answer: {
    //       value: questions[1].options[0].value,
    //       score: questions[1].options[0].score
    //     }
    //   },
    //   {
    //     questionId: questions[2].options[0]._id,
    //     question: questions[2].question,
    //     answer: {
    //       value: questions[2].options[0].value,
    //       score: questions[2].options[0].score
    //     }
    //   }
    // ];
    this.setState({ submitStressQuestions: data });
  }

  submitStressData = () => {
    // console.warn("data", this.state.submitStressQuestions);
    let data = {
      stressData: this.state.submitStressQuestions
    };

    AsyncStorage.getItem("userToken").then(token => {
      console.warn("hello", token);
      this.props.submitData(data, token);
    });
  };

  answersOfStress = (value, index, item) => {
    let answer = [...this.state.answer];
    let submitStressQuestions = [...this.state.submitStressQuestions];
    let questionId = "";
    let values = "";
    let scores = "";

    item.options.map((valueSelected, index) => {
      if (value === valueSelected.value) {
        questionId = valueSelected._id;
        values = valueSelected.value;
        scores = valueSelected.score;
      }
    });
    answer[index] = value;
    let data = {
      questionId: questionId,
      question: item.question,
      answer: {
        value: values,
        score: scores
      }
    };
    let finalArr = submitStressQuestions.map(element => {
      if (element.question === data.question) {
        return (element = data);
      }
      return element;
    });
    this.setState({ answer, submitStressQuestions: finalArr });
  };

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
          <View>
            <HeaderBack {...this.props} heading="Stress level" />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <View
            style={{
              backgroundColor: "white",
              marginTop: hp("0.5%"),
              height: "100%",
              alignItems: "center"
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.headingMainContainer}>
                {/* <View style={styles.mainHeadingTextContainer}>
                  <Text style={styles.mainHeadingText}>Stress level</Text>
                </View> */}
                <View style={styles.headingContentContainer}>
                  <Text style={styles.headingContentText}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Text>
                </View>
              </View>
              {this.props.stressQuestions &&
              this.props.stressQuestions.questions &&
              this.props.stressQuestions.questions.length > 0 ? (
                this.props.stressQuestions.questions.map((item, index) => {
                  return (
                    <View key={index}>
                      <View>
                        <Text>
                          {item.question.charAt(0).toUpperCase() +
                            item.question.slice(1)}
                        </Text>
                      </View>
                      <View style={styles.mainPickerContainer}>
                        <View style={styles.pickerContainer}>
                          <RNPickerSelect
                            placeholder={{}}
                            hideIcon
                            items={item.options}
                            useNativeAndroidPickerStyle={false}
                            style={genderPicker}
                            onValueChange={value => {
                              this.answersOfStress(value, index, item);
                            }}
                            value={this.state.answer[index]}
                          />
                        </View>
                        <View style={styles.dropDownImageContainer}>
                          <Image
                            source={DropDown}
                            style={styles.DropDownImage}
                            resizeMode="contain"
                            tintColor="#446e68"
                          />
                        </View>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text>No questions found</Text>
                </View>
              )}
              {this.props.stressQuestions &&
              this.props.stressQuestions.questions &&
              this.props.stressQuestions.questions.length > 0 ? (
                <View style={styles.submitButtonContainer}>
                  <TouchableOpacity
                    onPress={this.submitStressData}
                    style={styles.submit}
                  >
                    <View>
                      <Text style={styles.buttonText}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                  {this.state.showLoader === true ? <Loader /> : null}
                </View>
              ) : null}
            </ScrollView>
          </View>
          <View style={styles.bottomMenuContainer}>
            <BottomMenu {...this.props} />
          </View>
      </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({
    stressQuestions: state.StressReducer.stressQuestions,
    submitResponse: state.StressReducer.submitResponse
  }),
  {
    ...stressAction
  }
)(Stress);

const genderPicker = StyleSheet.create({
  placeholder: {
    color: "#446e68",
    fontSize: hp("1.6%"),
    paddingVertical: hp("0.9%"),
    paddingLeft: 20
  },
  inputIOS: {
    color: "#05564d",
    fontSize: hp("1.6%"),
    paddingVertical: hp("0.9%"),
    paddingLeft: 8
  },
  inputAndroid: {
    color: "#05564d",
    fontSize: hp("1.6%"),
    paddingVertical: hp("0.9%"),
    paddingLeft: 8
  }
});

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
  mainHeadingText: {
    fontSize: hp("5%"),
    color: "#446e68"
  },
  mainHeadingTextContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center"
  },
  headingContentContainer: {
    paddingTop: hp("1%"),
    width: wp("85%")
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#446e68",
    textAlign: "center"
  },
  headingMainContainer: {
    alignItems: "center",
    marginVertical: hp("6%")
  },
  mainPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("90%"),
    borderRadius: 5,
    backgroundColor: "#ededea",
    marginVertical: hp("1%")
  },
  pickerContainer: {
    width: wp("90%"),
    justifyContent: "center",
    zIndex: 2
  },
  dropDownImageContainer: {
    position: "absolute",
    right: wp("3%")
  },
  DropDownImage: {
    width: 10,
    height: 12
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
  submitButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("5%"),
    marginBottom: hp("30%")
  },
  bottomMenuContainer: {
    position: "absolute",
    bottom: 3
  }
});
