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
import Url from "../Actions/url";
import ExerciseOpacity from "../Images/exerciseOpacity.png";
import moment from "moment";
import ReadMore from "react-native-read-more-text";
import { connect } from "react-redux";
import * as wellnessActions from "../Actions/wellnessAction";

class MyArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myArticles: [
        {
          articleImage: ExerciseOpacity,
          heading: "VAT-check: How far has your business come?",
          subHeading:
            "As we near the completion of 7 months since VAT was first introduced in the UAE, it’s worth...",
          createdAt: new Date()
        },
        {
          articleImage: ExerciseOpacity,
          heading: "VAT-check: How far has your business come?",
          subHeading:
            "As we near the completion of 7 months since VAT was first introduced in the UAE, it’s worth...",
          createdAt: new Date()
        },
        {
          articleImage: ExerciseOpacity,
          heading: "VAT-check: How far has your business come?",
          subHeading:
            "As we near the completion of 7 months since VAT was first introduced in the UAE, it’s worth...",
          createdAt: new Date()
        }
      ]
    };
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.viewArticle !== this.props.viewArticle) {
    // if (this.props.viewArticle.status === 201) {
    // this.props.navigation.navigate("ViewArticle");
    // }
    // }
  }

  viewArticle = id => {
    let data = {
      ids: id,
      bool: this.props.bool
    };
    console.warn('data', data)
    this.props.navigation.navigate("ViewArticle", data);
    // AsyncStorage.getItem("userToken").then(token => {
    //   this.props.getArticle(id, token);
    // });
  };

  render() {
    const regex = /(<([^>]+)>)/gi;
    return (
      <View>
        {this.props.myArticle &&
        this.props.myArticle.articles &&
        this.props.myArticle.articles.length > 0 ? (
          this.props.myArticle.articles.map((item, index) => {
            return (
              <TouchableOpacity
                style={{ marginVertical: hp("2%") }}
                onPress={() => this.viewArticle(item._id)}
              >
                <View>
                  <ImageBackground
                    source={{ uri: Url + `/${item.articleURI}` }}
                    style={{ width: "100%", height: hp("20%") }}
                    imageStyle={{ borderRadius: 6 }}
                  >
                    <View
                      style={{
                        width: "90%",
                        paddingLeft: wp("5%"),
                        paddingTop: hp("2%")
                      }}
                    >
                      <View style={{ width: "70%" }}>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: hp("2.4%"),
                            fontWeight: "bold",
                            textTransform: "capitalize"
                          }}
                        >
                          {item.articleTitle}
                        </Text>
                      </View>
                      <View style={{ width: "80%" }}>
                        <ReadMore numberOfLines={2}>
                          <Text
                            style={{ color: "#d5efef", fontSize: hp("1.5%") }}
                          >
                            {item.articleBody}
                          </Text>
                        </ReadMore>
                        <Text
                          style={{ color: "#d5efef", fontSize: hp("1.5%") }}
                        >
                          {moment(item.createdAt, "YYYYMMDD").fromNow()}
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white" }}>No Articles Found</Text>
          </View>
        )}
      </View>
    );
  }
}

export default connect(
  state => ({
    myArticle: state.WellnessReducer.myArticle,
    viewArticle: state.WellnessReducer.viewArticle
  }),
  {
    ...wellnessActions
  }
)(MyArticles);
