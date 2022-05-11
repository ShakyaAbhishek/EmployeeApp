import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  AsyncStorage,
  Modal,
  ScrollView,
  FlatList,
  StyleSheet,
  ListView,
  TouchableHighlight,
  ActivityIndicator,
  Dimensions,
  Platform,
  SafeAreaView
} from "react-native";
import Like from "../Images/like.png";
import Comments from "../Images/comment.png";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import HeaderBack from "./headerBack";
import Url from "../Actions/url";
import BackImage from "../Images/back2.png";
import Profile from "../Images/profile.png";
import { connect } from "react-redux";
import moment from "moment";
import * as recognitionActions from "../Actions/recognitionAction";

class OpenPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderPost: {
        fullName: "Rahul gupta",
        total_comments: 0,
        total_likes: 1,
        description: "Testing",
        liked: true
      }
    };
  }

  componentDidMount() {
    console.warn("cdm", this.props.navigation.state.params);
  }

  handletoggleLike = () => {
    let data = {
      recognition_post_id: this.props.navigation.state.params.moduleId
    };
    // this.setState({
    //   postIndex: index,
    //   skip: index % 2 == 0 ? index : index + 1
    // });
    AsyncStorage.getItem("userToken").then(token => {
      this.props.toggleLike(data, token);
    });
  };

  commentPost = (postCreatorId, totalComments) => {
    let id = this.props.navigation.state.params.moduleId;
    let postCreator_id = postCreatorId;
    this.setState({ postCreator_id, postId: id, like: true });
    AsyncStorage.getItem("userToken").then(token => {
      this.props.viewComments(totalComments, 0, id, token);
    });
  };

  componentDidUpdate(prevProps) {
    let getParam = this.props.navigation.state.params;
    if (prevProps.allComments !== this.props.allComments) {
      if (this.props.allComments.status === 200) {
        let data = {
          postCreator_id: this.state.postCreator_id,
          postId: this.state.postId,
          type: "openPost",
          moduleType: getParam.moduleType,
          moduleId: getParam.moduleId,
          _id: getParam._id,
          status: getParam.status
        };
        this.props.navigation.navigate("PostComments", data);
      }
    }

    if (prevProps.likedPost !== this.props.likedPost) {
      // console.warn('like')
      let data = {
        moduleType: getParam.moduleType,
        moduleId: getParam.moduleId,
        _id: getParam._id,
        status: getParam.status
      };
      AsyncStorage.getItem("userToken").then(token => {
        this.props.openRecogNotification(data, token);
      });
    }
  }

  back = () => {
    AsyncStorage.getItem("userToken").then(token => {
      this.props.getNotifications(token);
      this.props.navigation.goBack();
    });
  };

  render() {
    let renderPost = this.state.renderPost;
    let openNotificationRecog = this.props.openNotificationRecog;
    let liked;
    if (this.props.likedPost) {
      liked = this.props.likedPost.liked;
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            paddingVertical: hp("2%"),
            borderBottomColor: "#d2d2d2",
            borderBottomWidth: 2
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              justifyContent: "center"
            }}
          >
            <View style={{ width: "20%", justifyContent: "center" }}>
              <TouchableOpacity onPress={() => this.back()}>
                <Image
                  source={BackImage}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: "black"
                  }}
                  tintColor="black"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={{ width: "80%", alignItems: "flex-start" }}>
              <Text
                style={{
                  fontSize: hp("2.5%"),
                  fontWeight: "bold",
                  color: "black"
                }}
              >
                Post
              </Text>
            </View>
          </View>
        </View>

        {openNotificationRecog.status == 200 ? (
          <View
            style={{
              alignItems: "center",
              borderBottomWidth: 5,
              borderBottomColor: "#d2d2d2",
              marginTop: 10
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "90%"
              }}
            >
              <View
                style={{
                  width: "20%"
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50
                  }}
                >
                  {openNotificationRecog.data.postCreator.imageURI ? (
                    <Image
                      source={{
                        uri:
                          Url +
                          `/${openNotificationRecog.data.postCreator.imageURI}`
                      }}
                      style={
                        Platform.os == "android"
                          ? {
                              borderRadius: 90,
                              width: 50,
                              height: 50
                            }
                          : {
                              borderRadius: 25,
                              width: 50,
                              height: 50
                            }
                      }
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={Profile}
                      style={{
                        borderRadius: 90,
                        width: 50,
                        height: 50
                      }}
                      resizeMode="cover"
                    />
                  )}
                </View>
              </View>
              <View
                style={{
                  width: "70%"
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    fontSize: hp("2%")
                  }}
                >
                  {openNotificationRecog.data.postCreator.fullName
                    ? openNotificationRecog.data.postCreator.fullName
                    : "Testing"}
                </Text>
                <Text style={{ fontSize: hp("1.5%") }}>
                  {moment(
                    openNotificationRecog.data.createdAt,
                    "YYYYMMDD"
                  ).fromNow()}
                </Text>
              </View>
              {/* <TouchableOpacity
              style={{ width: "10%", height: 20 }}
              onPress={() => this.deleteCurrentPost(item.item.postId)}
            >
              <View
                style={{
                  alignItems: "center"
                }}
              >
                <Image
                  source={Delete}
                  style={{ width: 15, height: 15 }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity> */}
            </View>
            {renderPost.description == "undefined" ? null : (
              <View
                style={{
                  width: "90%",
                  justifyContent: "flex-start",
                  paddingVertical: 10
                }}
              >
                <Text>{openNotificationRecog.data.description}</Text>
              </View>
            )}
            {openNotificationRecog.data.images.length > 1 ? (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around"
                }}
              >
                {openNotificationRecog.data.images.map((postImages, i) => {
                  return (
                    <View
                      style={{
                        width: "45%",
                        marginBottom: hp("2%")
                      }}
                    >
                      <Image
                        source={{
                          uri: Url + `/${postImages}`
                        }}
                        style={{
                          width: "100%",
                          height: 200,
                          borderWidth: 1
                        }}
                        resizeMode="cover"
                      />
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={{ width: "100%" }}>
                {openNotificationRecog.data.images.map((postImages, i) => {
                  return (
                    <View>
                      <Image
                        source={{
                          uri: Url + `/${postImages}`
                        }}
                        style={{ width: "100%", height: 200 }}
                        resizeMode="contain"
                      />
                    </View>
                  );
                })}
              </View>
            )}
            <View
              style={{
                justifyContent: "flex-start",
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "#d2d2d2",
                alignItems: "center",
                paddingVertical: 5
              }}
            >
              <View style={{ width: "90%" }}>
                <Text>
                  {openNotificationRecog.data.total_likes +
                    " " +
                    "likes" +
                    " ." +
                    openNotificationRecog.data.total_comments +
                    " " +
                    "comments"}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 10 }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  width: "40%",
                  justifyContent: "center"
                }}
                onPress={() => this.handletoggleLike()}
              >
                <View style={{ flexDirection: "row" }}>
                  {liked ? (
                    <View
                      style={{
                        paddingHorizontal: 10
                      }}
                    >
                      <Image
                        source={Like}
                        style={{
                          width: 20,
                          height: 20
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  ) : (
                    <View style={{ paddingHorizontal: 10 }}>
                      <Image
                        source={Like}
                        style={{ width: 20, height: 20 }}
                        resizeMode="contain"
                        tintColor="black"
                      />
                    </View>
                  )}

                  <View>
                    <Text>Like</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  width: "60%",
                  justifyContent: "center"
                }}
                onPress={() =>
                  this.commentPost(
                    openNotificationRecog.data.postCreator._id,
                    openNotificationRecog.data.total_comments
                  )
                }
              >
                <View
                  style={{
                    flexDirection: "row"
                  }}
                >
                  <View style={{ paddingHorizontal: 10 }}>
                    <Image
                      source={Comments}
                      style={{ width: 20, height: 20 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text>Comment</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ alignItems: "center", paddingTop: hp("2%") }}>
            <Text style={{ fontSize: hp("2%"), fontWeight: "bold" }}>
              {openNotificationRecog.message}
            </Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    openNotificationRecog: state.RecognitionReducer.openNotificationRecog,
    allComments: state.RecognitionReducer.allComments,
    likedPost: state.RecognitionReducer.likedPost
  }),
  {
    ...recognitionActions
  }
)(OpenPost);
