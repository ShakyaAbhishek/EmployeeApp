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
import { connect } from "react-redux";
import * as wellnessActions from "../Actions/wellnessAction";
import MyArticles from "./myArticles";

class AllArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: true,
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
          imageContent1: WeightlossOpacity,
          chooseimage: false,
          type: "weight_loss"
        },
        {
          imageContent: WellnessOpacity,
          textContent: "Wellness & Productivity",
          imageContent1: WellnessOpacity,
          chooseimage: false,
          type: "wellness_and_productivity"
        }
      ]
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allArticleData !== this.props.allArticleData) {
      if (this.props.allArticleData.status === 200) {
        this.setState({ bool: false });
      } else {
        this.setState({ bool: true });
        alert(this.props.allArticleData.message);
      }
    }
  }

  handleArticle = item => {
    AsyncStorage.getItem("userToken").then(token => {
      this.props.getAllArticleData(item.type, token);
    });
  };

  render() {
    return (
      <View>
        {this.state.bool ? (
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              flexWrap: "wrap",
              justifyContent: "space-between"
            }}
          >
            {this.props.allArticle &&
            this.props.allArticle.result &&
            this.props.allArticle.result.length > 0 ? (
              this.props.allArticle.result.map(obj => {
                return this.state.yourContentData.map((item, index) => {
                  if (obj.toLowerCase() === item.type.toLowerCase()) {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.contentContainer}
                        onPress={() => this.handleArticle(item)}
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
                              <Text style={styles.contentText}>
                                {item.textContent}
                              </Text>
                            </View>
                          </ImageBackground>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                });
              })
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <ActivityIndicator color="white" />
              </View>
            )}
          </View>
        ) : (
          <MyArticles {...this.props} bool={true} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    width: wp("40%"),
    height: 100,
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
    fontSize: hp("2%")
  }
});

export default connect(
  state => ({
    allArticle: state.WellnessReducer.allArticle,
    allArticleData: state.WellnessReducer.allArticleData
  }),
  {
    ...wellnessActions
  }
)(AllArticles);
