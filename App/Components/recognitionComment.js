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
  SafeAreaView,
  Platform
} from "react-native";
import Like from "../Images/like.png";
import Comments from "../Images/comment.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Camera from "../Images/camera.png";
import ImagePicker from "react-native-image-crop-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import moment from "moment";
import Url from "../Actions/url";
import { connect } from "react-redux";
import Activity from "../Images/activity.png";
import Profile from "../Images/profile.png";
import * as recognitionActions from "../Actions/recognitionAction";
import BackImage from "../Images/back2.png";

class PostComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allComments: [],
      currentReply: "",
      showUsers: false,
      commentId: "",
      comment_created_by: "",
      usersId: []
    };
  }

  componentDidMount() {
    console.warn("params", this.props.navigation.state.params);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.addComment !== this.props.addComment) {
      if (this.props.addComment.status === 201) {
        AsyncStorage.getItem("userToken").then(token => {
          let id = this.props.navigation.state.params.postId;
          this.props.viewComments(50, 0, id, token);
        });
      }
    }
    if (prevProps.getUsers !== this.props.getUsers) {
      if (this.props.getUsers.status === 200) {
        this.setState({ showUsers: true });
      }
    }

    if (prevProps.likedComment !== this.props.likedComment) {
      if (this.props.likedComment.status === 200) {
        AsyncStorage.getItem("userToken").then(token => {
          let id = this.props.navigation.state.params.postId;
          this.props.viewComments(50, 0, id, token);
        });
      }
    }
    if (prevProps.replies !== this.props.replies) {
      if (this.props.replies.status === 200) {
        let data = {
          postCreator_id: this.props.navigation.state.params.postCreator_id,
          postId: this.props.navigation.state.params.postId,
          comment_id: this.state.commentId,
          comment_created_by: this.state.comment_created_by
        };
        console.warn(this.props.replies);
        this.props.navigation.navigate("PostReplyOfComment", data);
      }
    }
  }
  commentBody = e => {
    this.setState({ comment: e }, () => {
      if (e.includes("@")) {
        this.validateString("@", e);
      }
    });
  };

  setUser = item => {
    let usersId = [...this.state.usersId];
    let data = {
      userId: item._id
    };
    usersId.push(data);

    this.setState(state => {
      return {
        comment: this.state.comment.split("@")[0] + item.fullName,
        showUsers: false,
        usersId
      };
    });
  };

  validateString = (checkValue, e) => {
    if (e.length > 1) {
      let searchUser = e.split(checkValue);
      if (searchUser[1]) {
        AsyncStorage.getItem("userToken").then(token => {
          if (checkValue === "@") {
            this.props.getUserList(searchUser[1], token);
          }
        });
      } else {
        console.warn("niothing to do....");
      }
    }
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.openPicker({
      multiple: true,
      includeBase64: true,
      mediaType: "photo"
    }).then(images => {
      this.setState({ uploadedImages: images }, () => {});
    });
  }
  //   toggleReply = index => {
  //     console.warn("index", index);
  //     let allComments = [...this.state.allComments];
  //     allComments[index].replyBoolean = !allComments[index].replyBoolean;
  //     this.setState({ allComments, currentReply: index });
  //   };

  reply = (id, comment_creator) => {
    this.setState({ commentId: id, comment_created_by: comment_creator });
    AsyncStorage.getItem("userToken").then(token => {
      this.props.viewReplyOfComments(50, 0, id, token);
    });
  };

  likeComment = id => {
    let data = {
      comment_id: id,
      post_id: this.props.navigation.state.params.postId,
      post_created_by: this.props.navigation.state.params.postCreator_id
    };
    AsyncStorage.getItem("userToken").then(token => {
      this.props.toggleLikeOfComment(data, token);
    });
  };

  submitComment = () => {
    if (!this.state.comment) {
      alert("Please write something");
    } else {
      let data = {
        comment_body: this.state.comment,
        recognition_post: this.props.navigation.state.params.postId,
        tagged_users: null,
        post_createdBy: this.props.navigation.state.params.postCreator_id,
        comment_images: this.state.uploadedImages
      };

      AsyncStorage.getItem("userToken").then(token => {
        this.props.uploadComment(data, token);
      });
    }
  };

  back = () => {
    let getParam = this.props.navigation.state.params;
    if (this.props.navigation.state.params.type === "allPost") {
      AsyncStorage.getItem("userToken").then(token => {
        this.props.getAllPost(0, 50, token);
      });
      this.props.navigation.navigate("RecognitionHome", { like: true });
    } else {
      let data = {
        moduleType: getParam.moduleType,
        moduleId: getParam.moduleId,
        _id: getParam._id,
        status: getParam.status
      };
      AsyncStorage.getItem("userToken").then(token => {
        this.props.openRecogNotification(data, token);
      });
      this.props.navigation.goBack();
    }
  };

  render() {
    let data = [];
    if (this.props.getUsers && this.props.getUsers.users) {
      data = this.props.getUsers.users;
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
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
                <TouchableOpacity onPress={this.back}>
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
                  All Comments
                </Text>
              </View>
            </View>
          </View>
          <ScrollView>
            <View style={{ marginBottom: 200 }}>
              {this.props.allComments &&
              this.props.allComments.comments &&
              this.props.allComments.comments.length > 0 ? (
                <FlatList
                  data={this.props.allComments.comments}
                  renderItem={(item, index) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          marginVertical: 10
                        }}
                      >
                        <View style={{ width: "20%", alignItems: "center" }}>
                          {item.item.imageURI ? (
                            <Image
                              source={{ uri: Url + `/${item.item.imageURI}` }}
                              style={
                                Platform.OS == "android"
                                  ? { width: 35, height: 35, borderRadius: 40 }
                                  : { width: 35, height: 35, borderRadius: 18 }
                              }
                            />
                          ) : (
                            <Image
                              source={Profile}
                              style={{
                                width: 35,
                                height: 35,
                                borderRadius: 40
                              }}
                            />
                          )}
                        </View>
                        <View
                          style={{
                            width: "80%"
                          }}
                        >
                          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                            {item.item.fullName
                              ? item.item.fullName.charAt(0).toUpperCase() +
                                item.item.fullName.slice(1)
                              : "Rahul"}
                          </Text>
                          <Text>{item.item.body}</Text>
                          {item.item.images.length > 1 ? (
                            <View
                              style={{
                                width: "100%",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "space-around"
                              }}
                            >
                              {item.item.images.map((postImages, i) => {
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
                            <View
                              style={{
                                width: "100%"
                              }}
                            >
                              {item.item.images.map((postImages, i) => {
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
                            style={{ flexDirection: "row", paddingTop: 10 }}
                          >
                            <View>
                              <Text style={{ fontSize: 10 }}>
                                {moment(
                                  item.item.createdBy.createdAt,
                                  "YYYYMMDD"
                                ).fromNow()}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() =>
                                this.likeComment(item.item.comment_id)
                              }
                            >
                              <View
                                style={{
                                  paddingHorizontal: 10,
                                  flexDirection: "row",
                                  alignItems: "center"
                                }}
                              >
                                {item.item.liked === true ? (
                                  <Image
                                    source={Like}
                                    style={{ width: 12, height: 12 }}
                                    resizeMode="contain"
                                  />
                                ) : (
                                  <Image
                                    source={Like}
                                    style={{ width: 12, height: 12 }}
                                    resizeMode="contain"
                                    tintColor="black"
                                  />
                                )}
                                <View
                                  style={{
                                    paddingLeft: 3,
                                    flexDirection: "row"
                                  }}
                                >
                                  <View>
                                    <Text
                                      style={{
                                        fontSize: 10,
                                        paddingHorizontal: 2
                                      }}
                                    >
                                      {item.item.total_likes}
                                    </Text>
                                  </View>
                                  <Text style={{ fontSize: 10 }}>Like</Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() =>
                                this.reply(
                                  item.item.comment_id,
                                  item.item.createdBy._id
                                )
                              }
                            >
                              <View style={{ flexDirection: "row" }}>
                                <View style={{ paddingRight: 3 }}>
                                  <Text style={{ fontSize: 10 }}>
                                    {item.item.total_replies}
                                  </Text>
                                </View>
                                <Text style={{ fontSize: 10 }}>Reply</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              ) : (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text>No comments available</Text>
                </View>
              )}
            </View>
          </ScrollView>
          {this.state.showUsers === true ? (
            <View
              elevation={1}
              style={{
                position: "absolute",
                width: "50%",
                bottom: hp("8%"),
                alignItems: "center",
                backgroundColor: "fff",
                borderRadius: 6,
                left: wp("3%")
              }}
            >
              <ScrollView style={{}}>
                {data &&
                  data.map((user, index) => {
                    return (
                      <TouchableOpacity onPress={() => this.setUser(user)}>
                        <View>
                          <Text>{user.fullName}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
          ) : null}
          <View
            style={{
              borderTopWidth: 3,
              borderTopColor: "#d2d2d2",
              position: "absolute",
              bottom: 0,
              width: "100%",
              flexDirection: "row",
              height: hp("7%"),
              zIndex: 999,
              backgroundColor: "#fff"
            }}
          >
            <View
              style={{
                width: "70%",
                justifyContent: "center"
              }}
            >
              <TextInput
                placeholder="Post your comment here"
                onChangeText={e => this.commentBody(e)}
                value={this.state.comment}
                style={{ paddingLeft: wp("2%") }}
              />
            </View>
            <TouchableOpacity
              style={{
                width: "15%",
                justifyContent: "center",
                borderColor: "#d2d2d2",
                alignItems: "center",
                borderRightWidth: 2,
                borderLeftWidth: 2
              }}
              onPress={this.selectPhotoTapped.bind(this)}
            >
              <View>
                <Image
                  source={Camera}
                  tintColor="#03574e"
                  style={{ width: 25, height: 25 }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                width: "15%",
                alignItems: "center"
              }}
              onPress={this.submitComment}
            >
              <View>
                <Text>Post</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    allComments: state.RecognitionReducer.allComments,
    replies: state.RecognitionReducer.replies,
    likedComment: state.RecognitionReducer.likedComment,
    getUsers: state.RecognitionReducer.getUsers,
    addComment: state.RecognitionReducer.addComment
  }),
  {
    ...recognitionActions
  }
)(PostComment);
