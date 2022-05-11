//import liraries
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
  ActivityIndicator,
  TextInput,
  FlatList,
  Platform,
  AsyncStorage
} from "react-native";
import LogoHeader from "./logoHeader";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import HeaderBack from "./headerBack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Url from "../Actions/url";
import moment from "moment";
import HRImage from "../Images/hrdepartmentimg.png";
import Announcement from "../Images/announcement.png";
import Campaign from "../Images/campaign.png";
import Leave from "../Images/leaverequest.png";
import Insurance from "../Images/myinsurance.png";
import Policies from "../Images/policies.png";
import TalkHr from "../Images/talktohr.png";
import { connect } from "react-redux";
import * as hrActions from "../Actions/hrActions";
import ImagePicker from "react-native-image-crop-picker";
// create a component
class TalkToHrChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth_Token: "",
      loader: true,
      chatData: {
        messages: []
      },
      hideTab: false,
      uploadedImages: "",
      articleBool: "",
      conversationText: "",
      errMessageArr: [],
      conversationId: "",
      conversationTextErr: ""
    };
  }

  attachImages = () => {
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
      includeBase64: false,
      mediaType: "photo"
    }).then(images => {
      this.setState({ uploadedImages: images }, () => {
        const tokenBearer = "Bearer " + this.state.auth_Token;
        console.warn("token", tokenBearer);
        let form = new FormData();
        this.state.uploadedImages &&
          this.state.uploadedImages.map(image => {
            let parts = image.path.split("/");
            let uri =
              Platform.OS === "android"
                ? image.path
                : image.path.replace("file://", "");
            let name = parts[parts.length - 1];
            let type = image.mime;

            const file = {
              uri,
              name,
              type
            };
            form.append("image", file);
            console.warn("files", file);
          });

        console.warn("form", Url + "/conversation/attachment");

        fetch(Url + "/conversation/attachment", {
          method: "POST",
          headers: {
            // Accept: "application/json",
            Authorization: tokenBearer,
            "Content-Type": "multipart/form-data"
          },
          body: form
        })
          .then(response => response.json())
          .then(responseData => {
            console.warn("chat", responseData);
            if (responseData.status === 201) {
              this.setState({ imageUpload: responseData.company[0] }, () =>
                this.sendMessage()
              );
            }

            //   dispatch({ type: "UPLOAD_POST", responseData });
          })
          .catch(err => alert(err.message));
      });
    });
  };

  async componentDidMount() {
    // /conversation/history/:conversationId
    var value = await AsyncStorage.getItem("userToken");
    this.setState({ auth_Token: value });
    let ChatId = await this.props.navigation.getParam("chatId", "");
    this.setState({ conversationId: ChatId });
    await this.Chatlist();
    // setInterval(async () => {
      await this.Chatlist();
    // }, 900);
    console.warn("chat Id------>", ChatId);
  }

  componentWillUnmount() {
    clearInterval();
  }

  Chatlist = () => {
    let { auth_Token } = this.state;
    const tokenBearer = "Bearer" + " " + auth_Token;
    return fetch(Url + `/conversation/history/${this.state.conversationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          chatData: responseData.company,
          loader: false,
          articleBool: responseData.company.subject
        });
      })
      .catch(err => alert(err));
  };

  sendMessage = () => {
    if (this.state.uploadedImages.length) {
      let {
        articleBool,
        conversationText,
        auth_Token,
        errMessageArr,
        conversationId
      } = this.state;
      let variable = {
        _id: conversationId,
        subject: articleBool.toUpperCase(),
        messages: {
          type: "ATTACHMENT",
          text: this.state.imageUpload,
          panel:"mobile"
        }
      };
      let method = "PUT";
      this.props.startConversation(variable, auth_Token, method);
    } else {
      let {
        articleBool,
        conversationText,
        auth_Token,
        errMessageArr,
        conversationId
      } = this.state;
      console.warn(conversationId);
      errMessageArr = [];
      let conversationTexts = conversationText.trim();
      if (
        conversationTexts == "" ||
        conversationTexts == undefined ||
        conversationTexts == null
      ) {
        this.setState({
          conversationTextErr: "Please enter some text!",
          errMessageArr: errMessageArr.push("Please enter some text!")
        });
      }
      setTimeout(() => {
        if (this.state.errMessageArr.length == 0) {
          let variable = {
            _id: conversationId,
            subject: articleBool.toUpperCase(),
            messages: {
              text: conversationTexts,
              panel:"mobile"
            }
          };
          let method = "PUT";
          this.props.startConversation(variable, auth_Token, method);
        }
      }, 200);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.startConversations !== this.props.startConversations) {
      if (this.props.startConversations.status === 201) {
        this.setState({ conversationText: "" });
        console.warn("check --------->", this.props.startConversations);
        this.Chatlist();
        // this.props.conversationHistory(this.state.auth_Token)
      }
    }
  }

  _chatListView = (item, index) => {
    // console.warn(Url + `/${item.from.imageURI}`)
    console.warn('chats', item.panel)
    return (
      <View style={{}}>
        {item.panel === "mobile" ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              margin: hp("1%")
            }}
          >
            <View style={{ maxWidth: hp("50%") }}>
              {item.type === "TEXT" ? (
                <View>
                  <View
                    style={{
                      backgroundColor: "#50b7a3",
                      padding: hp("0.5%"),
                      marginTop: hp("2%"),
                      borderRadius: 5,
                      marginLeft: wp("13%")
                    }}
                  >
                    <Text style={{ fontSize: hp("1.7%"), color: "#ffffff" }}>
                      {item.text}
                    </Text>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      zIndex: -1,
                      right: -6,
                      top: 12
                    }}
                  >
                    <Image
                      style={{ tintColor: "#50b7a3" }}
                      source={require("../Images/droparrow.png")}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View
                    style={{
                      height: hp("30%"),
                      width: wp("60%"),
                      backgroundColor: "#50b7a3",
                      marginTop: hp("2%"),
                      borderRadius: 10,
                      marginLeft: wp("15%")
                    }}
                  >
                    <Image
                      resizeMode={"cover"}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 10
                      }}
                      source={{ uri: Url + `/${item.text}` }}
                    />
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      zIndex: -1,
                      right: -6,
                      top: 12
                    }}
                  >
                    <Image
                      style={{ tintColor: "#50b7a3" }}
                      source={require("../Images/droparrow.png")}
                    />
                  </View>
                </View>
              )}
              <View
                style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
              >
                <Text style={{ fontSize: hp("1.2%"), color: "#05564d" }}>
                  {moment(item.sentAt).format("DD-MM-YYYY, h:mm a")}
                </Text>
              </View>
            </View>

            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                marginLeft: wp("2.3%"),
                borderWidth: 0.5,
                borderColor: "#ffffff"
              }}
            >
              <Image
                resizeMode={"stretch"}
                style={{ height: "100%", width: "100%", borderRadius: 20 }}
                source={{ uri: Url + `/${item.from.imageURI}` }}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              margin: hp("1%")
            }}
          >
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                borderWidth: 0.5,
                borderColor: "#ffffff",
                marginRight: wp("2.3%")
              }}
            >
              <Image
                resizeMode={"stretch"}
                style={{ height: "100%", width: "100%", borderRadius: 20 }}
                source={{ uri: Url + `/${item.from.imageURI}` }}
              />
            </View>
            <View style={{ maxWidth: hp("50%") }}>
              {item.type === "TEXT" ? (
                <View>
                  <View
                    style={{
                      backgroundColor: "#7a7a7a",
                      padding: hp("0.5%"),
                      marginTop: hp("2%"),
                      borderRadius: 5,
                      marginRight: wp("13%")
                    }}
                  >
                    <Text style={{ fontSize: hp("1.7%"), color: "#ffffff" }}>
                      {item.text}
                    </Text>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      zIndex: -1,
                      left: -6,
                      top: 12
                    }}
                  >
                    <Image
                      style={{ tintColor: "#7a7a7a" }}
                      source={require("../Images/droparrow.png")}
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View
                    style={{
                      height: hp("30%"),
                      width: wp("60%"),
                      backgroundColor: "#7a7a7a",
                      marginTop: hp("2%"),
                      borderRadius: 10,
                      marginRight: wp("15%")
                    }}
                  >
                    <Image
                      resizeMode={"cover"}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 10
                      }}
                      source={{ uri: Url + `/${item.text}` }}
                    />
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      zIndex: -1,
                      left: -6,
                      top: 12
                    }}
                  >
                    <Image
                      style={{ tintColor: "#7a7a7a" }}
                      source={require("../Images/droparrow.png")}
                    />
                  </View>
                </View>
              )}
              <View
                style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
              >
                <Text
                  style={{
                    fontSize: hp("1.2%"),
                    color: "#05564d",
                    marginRight: wp("7%")
                  }}
                >
                  {moment(item.sentAt).format("DD-MM-YYYY, h:mm a")}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  render() {
    console.warn("img", this.state.chatData.messages.length - 1);
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <View>
            <HeaderBack {...this.props} heading="Talk to HR" />
          </View>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.scrollViewStyle}
          >
            {/* for the text of screen */}
            {/* <View style={{ height: hp('12%'), marginHorizontal: wp('2%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: hp('2%'), color: '#05564d' }}>
                                Lorem Ipsum is simple dummy text of the printing and typesetting industry.
                            </Text>
                        </View> */}
            {/* chat view */}
            <View
              style={{
                height: hp("75%"),
                marginTop: hp("1%"),
                marginHorizontal: wp("3%"),
                backgroundColor: "#e7e7e7",
                borderRadius: 10
              }}
            >
              {/* chat header view */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: "#a4dbdd",
                  borderRadius: 10
                }}
              >
                <View
                  style={{
                    flex: 3,
                    marginLeft: wp("3%"),
                    justifyContent: "center"
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: hp("2%"), color: "#05564d" }}
                  >
                    {this.state.chatData.subject} -{" "}
                    {moment(this.state.chatData.createdAt).format("DD-MM-YYYY")}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => alert("search")}
                    style={{
                      justifyContent: "center",
                      width: wp("15%"),
                      alignItems: "center"
                    }}
                  >
                    <Image
                      resizeMode={"contain"}
                      style={{ height: "60%", tintColor: "#ffffff" }}
                      source={require("../Images/search.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* chat view */}
              <View style={{ flex: 8 }}>
                {this.state.loader ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <ActivityIndicator size={"large"} color={"#05564d"} />
                  </View>
                ) : (
                  <FlatList
                    style={{ flex: 1, marginBottom: hp("7%") }}
                    ref="flatList"
                    data={this.state.chatData.messages}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                      this._chatListView(item, index)
                    }
                    onContentSizeChange={() => this.refs.flatList.scrollToEnd()}
                    // initialScrollIndex={this.state.chatData.messages.length !== 0 ? this.state.chatData.messages.length : 0 }

                    // initialNumToRender={(this.state.chatData.length - 1 )}
                  />
                )}
              </View>
              {/* chat footer view */}
              <View
                style={{
                  height: hp("8%"),
                  flexDirection: "row",
                  position: "absolute",
                  zIndex: 5,
                  width: wp("90%"),
                  alignSelf: "center",
                  bottom: 0
                }}
              >
                <View
                  style={{
                    flex: 4,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      height: hp("4%"),
                      flexDirection: "row",
                      width: wp("65%"),
                      backgroundColor: "#ffffff",
                      borderRadius: 30
                    }}
                  >
                    <TextInput
                      style={{
                        flex: 4,
                        marginLeft: wp("1%"),
                        fontSize: hp("1.4%")
                      }}
                      placeholder=""
                      value={this.state.conversationText}
                      onChangeText={text =>
                        this.setState({ conversationText: text })
                      }
                      onFocus={() => {
                        this.setState({
                          hideTab: true,
                          imageUpload: "",
                          uploadedImages: []
                        });
                      }}
                      onEndEditing={() => {
                        this.setState({ hideTab: false });
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => this.attachImages()}
                        style={{
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Image
                          resizeMode={"contain"}
                          style={{ height: "70%", tintColor: "#05564d" }}
                          source={require("../Images/attach.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1.5,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.sendMessage()}
                    style={{
                      height: hp("4%"),
                      width: wp("20%"),
                      backgroundColor: "#05564d",
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: hp("1.4%"),
                        color: "#ffffff",
                        textAlign: "center",
                        fontWeight: "bold"
                      }}
                    >
                      SEND
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
          {this.state.hideTab ? null : (
            <View style={styles.bottomMenuContainer}>
              <BottomMenu {...this.props} />
            </View>
          )}
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%"
  },
  safeAreaViewContainer: {
    flex: 1
  },
  scrollViewStyle: {
    //height: hp('80%'),
    backgroundColor: "transparent"
  },
  bottomMenuContainer: {
    position: "absolute",
    bottom: 3
  }
});

//make this component available to the app
// export default TalkToHrChat;
export default connect(
  state => ({
    previousConversations: state.HrReducer.previousConversations,
    startConversations: state.HrReducer.startConversation
  }),
  {
    ...hrActions
  }
)(TalkToHrChat);

// message: [
//     {
//         from: {
//             email: "rahul@yopmail.com",
//             fullName: "Rahul Gupta",
//             imageURI: "public/uploads/2019-10-23T09:43:35.607Z-image-2ffc7cbc-d575-4aba-b292-05a8dd4fd4ae.jpg",
//             roles: ["employee"],
//             _id: "5db019a5d6652f187f153918"
//         },
//         sentAt: "2019-10-31T05:43:24.167Z",
//         text: "public/uploads/2019-10-31T05:43:22.793Z-7147AB94-D299-44D4-993B-2D8A0FC6ECA6.jpg",
//         type: 'ATTACHMENT',
//         _id: "5dba747c7231f546ab94c9e8"
//     },
//     {
//         from: {
//             email: "rahul@yopmail.com",
//             fullName: "Rahul Gupta",
//             imageURI: "public/uploads/2019-10-23T09:43:35.607Z-image-2ffc7cbc-d575-4aba-b292-05a8dd4fd4ae.jpg",
//             roles: ["employee"],
//             _id: "5db019a5d6652f187f153918"
//         },
//         sentAt: "2019-10-31T05:43:24.167Z",
//         text: "hello",
//         type: 'TEXT',
//         _id: "5dba747c7231f546ab94c9e8"
//     },
//     {
//         from: {
//             email: "rahul@yopmail.com",
//             fullName: "Rahul Gupta",
//             imageURI: "public/uploads/2019-10-23T09:43:35.607Z-image-2ffc7cbc-d575-4aba-b292-05a8dd4fd4ae.jpg",
//             roles: ["HR"],
//             _id: "5db019a5d6652f187f153918"
//         },
//         sentAt: "2019-10-31T05:43:24.167Z",
//         text: "hello",
//         type: 'TEXT',
//         _id: "5dba747c7231f546ab94c9e8"
//     },
//     {
//         from: {
//             email: "rahul@yopmail.com",
//             fullName: "Rahul Gupta",
//             imageURI: "public/uploads/2019-10-23T09:43:35.607Z-image-2ffc7cbc-d575-4aba-b292-05a8dd4fd4ae.jpg",
//             roles: ["HR"],
//             _id: "5db019a5d6652f187f153918"
//         },
//         sentAt: "2019-10-31T05:43:24.167Z",
//         text: "public/uploads/2019-10-31T05:43:22.793Z-7147AB94-D299-44D4-993B-2D8A0FC6ECA6.jpg",
//         type: 'ATTACHMENT',
//         _id: "5dba747c7231f546ab94c9e8"
//     },
// ]
