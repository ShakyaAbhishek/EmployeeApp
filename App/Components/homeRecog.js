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
  Platform
} from "react-native";
import Like from "../Images/like.png";
import Comments from "../Images/comment.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Camera from "../Images/camera.png";
import Videos from "../Images/video_recorder.png";
import Recognize from "../Images/recognition_1.png";
import Toast from "react-native-simple-toast";
import ImagePicker from "react-native-image-crop-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import moment from "moment";
import Url from "../Actions/url";
import { connect } from "react-redux";
import Profile from "../Images/profile.png";
import Delete from "../Images/delete.png";
import MentionsTextInput from "react-native-mentions";
import * as recognitionActions from "../Actions/recognitionAction";
import { getUserSuggestions } from "./service";
// import * as userActions from "./service";

const { height, width } = Dimensions.get("window");
const count = 5;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUsers: false,
      userData: [],
      formattedText: "",
      tag: [],
      test: "",
      value: "",
      keyword: "",
      data: [],
      loading: false,
      skip: 0,
      count: 2,
      like: false,
      post: [],
      postCreator_id: "",
      postId: "",
      showLoader: true
    };
    this.reqTimer = 0;
  }

  componentDidMount() {
    console.warn("CDM", this.state.like);
    AsyncStorage.getItem("userToken").then(token => {
      this.props.getAllPost(this.state.skip, count, token);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deletePosts !== this.props.deletePosts) {
      if (this.props.deletePosts.status === 200) {
        Toast.show("Post deleted successfully");
        this.setState({ like: true }, () => {
          AsyncStorage.getItem("userToken").then(token => {
            this.props.getAllPost(0, this.state.post.length, token);
          });
        });
      }
    }
    if (prevProps.allComments !== this.props.allComments) {
      if (this.props.allComments.status === 200) {
        let data = {
          postCreator_id: this.state.postCreator_id,
          postId: this.state.postId,
          type : "allPost"
        };
        this.props.navigation.navigate("PostComments", data);
      }
    }
    if (prevProps.likedPost !== this.props.likedPost) {
      if (this.props.likedPost.status === 200) {
        this.setState({ like: true }, () => {
          AsyncStorage.getItem("userToken").then(token => {
            this.props.getAllPost(0, this.state.post.length, token);
          });
        });
      }
    }

    if (prevProps.getPost !== this.props.getPost && this.props.getPost.posts) {
      if (!this.state.like) {
        console.warn(" ! like ");
        let post = [...this.props.getPost.posts, ...this.state.post];

        this.setState({ post: post, loading: false, showLoader: false });
      } else {
        console.warn("like");
        this.setState({
          post: [...this.props.getPost.posts],
          loading: false,
          showLoader: false
        });
      }
    }
    if (prevProps.getUsers !== this.props.getUsers) {
      if (this.props.getUsers.status === 200) {
        this.setState({ showUsers: true });
      }
    }
    if (prevProps.getTags !== this.props.getTags) {
      if (this.props.getTags.status === 200) {
        this.setState({ showUsers: true });
      }
    }
    if (prevProps.submitPost !== this.props.submitPost) {
      if (this.props.submitPost.status === 201) {
        Toast.show("Post submitted successfully");
        // alert("Post submitted successfully");
        this.setState({ uploadedImages: [], like: false }, () => {
          AsyncStorage.getItem("userToken").then(token => {
            this.props.getAllPost(0, 1, token);
          });
        });
      }
    }
    if (
      this.props.getUsers !== prevProps.getUsers &&
      this.props.getUsers.users
    ) {
      this.setState({ data: this.props.getUsers.users });
    }
    if (prevProps.getTags !== this.props.getTags && this.props.getTags.tags) {
      this.setState({ data: this.props.getTags.tags });
    }
  }

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
      this.setState({ uploadedImages: images }, () => {
        console.warn(images);
      });
    });
  }
  addPost = () => {
    if (this.state.name || this.state.uploadedImages) {
      let data = {
        description: this.state.name,
        tags: JSON.stringify([
          // { tagId: "5ce7ac115bf9aa4ca0b5b934" },
          // { tagId: "5ce7ab005bf9aa4ca0b5b92f" }
        ]),
        recognized_users: JSON.stringify([
          // { userId: "5cee1a8422fce42899aa7a32" }
        ]),
        recognition_images: this.state.uploadedImages,
        panel: "mobile"
      };
      console.warn("data", data);
      AsyncStorage.getItem("userToken").then(token => {
        this.props.uploadPost(data, token);
        this.setState({ name: "" });
      });
    } else {
      alert("Write something to post");
    }
  };

  commentPost = (id, postCreatorId, totalComments) => {
    let postCreator_id = postCreatorId;
    this.setState({ postCreator_id, postId: id, like: true });
    AsyncStorage.getItem("userToken").then(token => {
      this.props.viewComments(totalComments, 0, id, token);
    });
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleLoadMore = () => {
    if (this.props.getPost && this.props.getPost.haveMorePosts) {
      let skip = this.state.skip;
      skip = skip + count;
      this.setState({ skip, loading: true, like: false }, () => {
        AsyncStorage.getItem("userToken").then(token => {
          this.props.getAllPost(this.state.skip, count, token);
        });
      });
    }
  };

  handletoggleLike = (id, index) => {
    let data = {
      recognition_post_id: id
    };
    this.setState({
      postIndex: index,
      skip: index % 2 == 0 ? index : index + 1
    });
    AsyncStorage.getItem("userToken").then(token => {
      this.props.toggleLike(data, token);
    });
  };

  deleteCurrentPost = id => {
    AsyncStorage.getItem("userToken").then(token => {
      this.props.deletePost(id, token);
    });
  };

  renderSuggestionsRow({ item }, hidePanel) {
    // console.warn("item", item);
    return (
      <TouchableOpacity
        onPress={() => this.onSuggestionTap(item.firstName, hidePanel)}
      >
        <View style={styles.suggestionsRowContainer}>
          <View style={styles.userIconBox}>
            <Text style={styles.usernameInitials}>
              {!!item.firstName && item.firstName.substring(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userDetailsBox}>
            <Text style={styles.displayNameText}>{item.firstName}</Text>
            <Text style={styles.usernameText}>@{item.firstName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  onSuggestionTap(username, hidePanel) {
    hidePanel();
    const comment = this.state.value.slice(0, -this.state.keyword.length);
    this.setState({
      data: [],
      value: comment + "@" + username
    });
  }

  callback(keyword) {
    if (this.reqTimer) {
      clearTimeout(this.reqTimer);
    }

    this.reqTimer = setTimeout(() => {
      getUserSuggestions(keyword)
        .then(data => {
          // console.warn("api", data);
          this.setState({
            keyword: keyword,
            data: [...data.users]
          });
        })
        .catch(err => {
          console.warn(err.stack);
        });
    }, 200);
  }

  render() {
    console.warn(this.state.uploadedImages);
    return (
      <View style={{ flex: 1, marginBottom: 50 }}>
        {/* <KeyboardAwareScrollView> */}
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 2,
            borderBottomColor: "#d2d2d2",
            paddingVertical: 5
          }}
        >
          <View
            style={{
              width: "80%",
              flexDirection: "row"
            }}
          >
            <View style={{ justifyContent: "center", paddingHorizontal: 10 }}>
              <Image
                source={Recognize}
                tintColor="#03574e"
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                width: "70%",
                height: 36,
                justifyContent: "center"
              }}
            >
              <TextInput
                placeholder="Give a recognition"
                onChangeText={e => this.setState({ name: e })}
                value={this.state.name}
              />

              {/* <View
                  style={{
                    position: "absolute",
                    top: 0,
                    width: "100%"
                    // height: 36
                  }}
                >
                  <MentionsTextInput
                    textInputStyle={{
                      borderColor: "#ebebeb",
                      // borderWidth: 1,
                      padding: 5,
                      fontSize: 15
                    }}
                    suggestionsPanelStyle={{
                      backgroundColor: "white",
                      zIndex: 10
                    }}
                    loadingComponent={() => (
                      <View
                        style={{
                          flex: 1,
                          width,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <ActivityIndicator />
                      </View>
                    )}
                    textInputMinHeight={30}
                    textInputMaxHeight={80}
                    placeholder="Give a recognition"
                    trigger={"@"}
                    triggerLocation={"new-word-only"} // 'new-word-only', 'anywhere'
                    value={this.state.value}
                    onChangeText={val => {
                      this.setState({ value: val });
                    }}
                    triggerCallback={this.callback.bind(this)}
                    renderSuggestionsRow={this.renderSuggestionsRow.bind(this)}
                    suggestionsData={this.state.data} // array of objects
                    keyExtractor={(item, index) => item.firstName}
                    suggestionRowHeight={45}
                    horizontal={false} // defaut is true, change the orientation of the list
                    MaxVisibleRowCount={3} // this is required if horizontal={false}
                  />
                </View> */}
            </View>
            <TouchableOpacity
              style={{
                width: "20%",
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 2,
                borderLeftWidth: 2,
                borderColor: "#d2d2d2"
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
              onPress={this.addPost}
              style={{
                width: "20%",
                alignItems: "center",
                padding: 5,
                borderRadius: 6,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  paddingHorizontal: 3,
                  color: "grey",
                  fontWeight: "bold"
                }}
              >
                POST
              </Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            style={{
              width: "10%",
              justifyContent: "center",
              alignItems: "center",
              borderRightWidth: 2,
              borderLeftWidth: 2,
              borderColor: "#d2d2d2"
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
            onPress={this.addPost}
            style={{
              borderWidth: 1,
              width: "10%",
              alignItems: "center",
              backgroundColor: "#62c6be",
              borderColor: "#62c6be",
              padding: 5,
              borderRadius: 6
            }}
          >
            <Text style={{ paddingHorizontal: 10, color: "white" }}>POST</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
                style={{
                  width: "15%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={this.selectVideoTapped.bind(this)}
              >
                <View>
                  <Image
                    source={Videos}
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity> */}
        </View>
        {/* {this.state.showUsers === true ? (
            <View
              style={{
                position: "absolute",
                width: "50%",
                alignItems: "center",
                top: 50,
                zIndex: 9,
                backgroundColor: "#fff",
                left: 50,
                flex: 1,
                borderWidth: 1,
                borderRadius: 6
              }}
            > */}
        {/* <ScrollView style={{}}>
                {this.state.data &&
                  this.state.data.map((user, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.setUser(user)}
                        key={index}
                      >
                        <View>
                          <Text>
                            {user.fullName ? user.fullName : user.tag}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView> */}
        {/* </View>
          ) : null} */}
        {
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              flexWrap: "wrap"
            }}
          >
            {this.state.uploadedImages &&
              this.state.uploadedImages.map((item, i) => {
                return (
                  <View
                    style={{
                      width: "45%",
                      marginVertical: 5,
                      alignItems: "center"
                    }}
                    key={i}
                  >
                    <Image
                      source={{ uri: item.path }}
                      style={{ width: 150, height: 80 }}
                    />
                  </View>
                );
              })}
          </View>
        }
        <View style={{ alignItems: "center", marginVertical: 10 }} />
        <View style={{ flex: 1 }}>
          {this.state.showLoader ? (
            <ActivityIndicator color="#62c6be" />
          ) : this.state.post.length !== 0 ? (
            <FlatList
              data={this.state.post}
              ListFooterComponent={this.renderFooter}
              onEndReached={this.handleLoadMore.bind(this)}
              onEndReachedThreshold={0.1}
              renderItem={(item, index) => {
                return (
                  <View
                    key={index}
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
                          {item.item.postCreator.imageURI ? (
                            <Image
                              source={{
                                uri: Url + `/${item.item.postCreator.imageURI}`
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
                          {item.item.postCreator.fullName
                            ? item.item.postCreator.fullName
                            : "Testing"}
                        </Text>
                        <Text style={{ fontSize: hp("1.5%") }}>
                          {moment(item.item.createdAt, "YYYYMMDD").fromNow()}
                        </Text>
                      </View>
                      <TouchableOpacity
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
                      </TouchableOpacity>
                    </View>
                    {item.item.description == "undefined" ? null : (
                      <View
                        style={{
                          width: "90%",
                          justifyContent: "flex-start",
                          paddingVertical: 10
                        }}
                      >
                        <Text>{item.item.description}</Text>
                      </View>
                    )}
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
                          {item.item.total_likes +
                            " " +
                            "likes" +
                            " ." +
                            item.item.total_comments +
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
                        onPress={() =>
                          this.handletoggleLike(item.item.postId, item.index)
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          {item.item.liked ? (
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
                            item.item.postId,
                            item.item.postCreator._id,
                            item.item.total_comments
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
                );
              }}
            />
          ) : (
            <View style={{ alignItems: "center" }}>
              <Text>No Post Found</Text>
            </View>
          )}
        </View>
        {/* </KeyboardAwareScrollView> */}
      </View>
    );
  }
}
export default connect(
  state => ({
    getUsers: state.RecognitionReducer.getUsers,
    getTags: state.RecognitionReducer.getTags,
    getPost: state.RecognitionReducer.getPost,
    submitPost: state.RecognitionReducer.submitPost,
    likedPost: state.RecognitionReducer.likedPost,
    allComments: state.RecognitionReducer.allComments,
    deletePosts: state.RecognitionReducer.deletePost
  }),
  {
    ...recognitionActions
  }
)(Home);

const styles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: "space-between",
    paddingTop: 100
  },
  suggestionsRowContainer: {
    padding: 5,
    flexDirection: "row",
    paddingRight: 15,
    paddingBottom: 15,
    borderWidth: 1
  },
  userAvatarBox: {
    width: 35,
    paddingTop: 2
  },
  userIconBox: {
    margin: 5,
    height: 25,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db"
  },
  usernameInitials: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12
  },
  userDetailsBox: {
    flex: 1,
    margin: 5
  },
  displayName: {
    fontSize: 12,
    fontWeight: "500"
  },
  usernameText: {
    fontSize: 12,
    color: "rgba(0,0,0,0.6)"
  }
});
