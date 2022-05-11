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

class PostReplyOfComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allComments: [],
      currentReply: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.addReply !== this.props.addReply) {
      if (this.props.addReply.status === 201) {
        AsyncStorage.getItem("userToken").then(token => {
          let id = this.props.navigation.state.params.comment_id;
          this.props.viewReplyOfComments(50, 0, id, token);
        });
      }
    }
    if (prevProps.likedReply !== this.props.likedReply) {
      if (this.props.likedReply.status === 200) {
        AsyncStorage.getItem("userToken").then(token => {
          let id = this.props.navigation.state.params.comment_id;
          this.props.viewReplyOfComments(50, 0, id, token);
        });
      }
    }
  }

  replyLike = id => {
    let data = {
      comment_id: id,
      post_id: this.props.navigation.state.params.postId,
      post_created_by: this.props.navigation.state.params.postCreator_id
    };
    AsyncStorage.getItem("userToken").then(token => {
      this.props.toggleLikeOfReply(data, token);
    });
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

  replyOfComment = () => {
    if(!this.state.reply){
      alert("Please write something")
    } else {
      let data = {
        comment_body: this.state.reply,
        comment_id: this.props.navigation.state.params.comment_id,
        post_id: this.props.navigation.state.params.postId,
        post_created_by: this.props.navigation.state.params.postCreator_id,
        comment_created_by: this.props.navigation.state.params.comment_created_by,
        comment_creator_fullname: "",
        tagged_users: null,
        comment_images: this.state.uploadedImages
      };
      AsyncStorage.getItem("userToken").then(token => {
        this.props.uploadReply(data, token);
      });
  
    }
    
  };

  back = () => {
    AsyncStorage.getItem("userToken").then(token => {
      let id = this.props.navigation.state.params.postId;
      this.props.viewComments(50, 0, id, token);
    });
    this.props.navigation.navigate("PostComments");
  };

  render() {
    return (
      <SafeAreaView style={{flex:1}}>
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
                  style={{ width: 20, height: 20, tintColor:'black' }}
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
                Replies
              </Text>
            </View>
          </View>
        </View>
        <View>
          {this.props.replies &&
          this.props.replies.replies &&
          this.props.replies.replies.length > 0 ? (
            <FlatList
              data={this.props.replies.replies}
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
                          style={Platform.OS=="android" ? { width: 35, height: 35, borderRadius: 40 } : { width: 35, height: 35, borderRadius: 18 }}
                        />
                      ) : (
                        <Image
                          source={Profile}
                          style={{ width: 35, height: 35, borderRadius: 40 }}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        width: "80%"
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        {item.item.fullName ? item.item.fullName : "Rahul"}
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
                        <View style={{ width: "100%" }}>
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
                      <View style={{ flexDirection: "row", paddingTop: 10 }}>
                        <View>
                          <Text style={{ fontSize: 10 }}>
                            {moment(item.item.createdAt, "YYYYMMDD").fromNow()}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => this.replyLike(item.item.replyId)}
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
                                paddingHorizontal: 3,
                                flexDirection: "row"
                              }}
                            >
                              <View style={{ paddingHorizontal: 3 }}>
                                <Text style={{ fontSize: 10 }}>
                                  {item.item.likes}
                                </Text>
                              </View>
                              <Text style={{ fontSize: 10 }}>Like</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>No comments available</Text>
            </View>
          )}
        </View>
        <View
          style={{
            borderTopWidth: 3,
            borderTopColor: "#d2d2d2",
            position: "absolute",
            bottom: 0,
            width: "100%",
            flexDirection: "row",
            height: hp("7%"),
          }}
        >
          <View style={{ width: "70%", justifyContent:'center' }}>
            <TextInput
              placeholder="Post your reply here"
              onChangeText={e => this.setState({ reply: e })}
              value={this.state.reply}
              style={{ paddingLeft: wp("2%"), justifyContent:'center' }}
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
            onPress={this.replyOfComment}
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
    replies: state.RecognitionReducer.replies,
    likedReply: state.RecognitionReducer.likedReply,
    addReply: state.RecognitionReducer.addReply
  }),
  {
    ...recognitionActions
  }
)(PostReplyOfComment);
