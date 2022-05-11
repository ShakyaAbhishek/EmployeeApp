import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
  AsyncStorage,
  ActivityIndicator,
  Platform
} from "react-native";
import Activity from "../Images/activity.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Profile from "../Images/profile.png";
import Url from "../Actions/url";
import { connect } from "react-redux";
import * as recognitionActions from "../Actions/recognitionAction";

class HashTagsPeoples extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEmployess: [
        {
          name: "AMY ANNE",
          label: "Lorem Ipsum is simply dummy text",
          userImage: Activity
        },
        {
          name: "AMY ANNE",
          label: "Lorem Ipsum is simply dummy text",
          userImage: Activity
        },
        {
          name: "AMY ANNE",
          label: "Lorem Ipsum is simply dummy text",
          userImage: Activity
        },
        {
          name: "AMY ANNE",
          label: "Lorem Ipsum is simply dummy text",
          userImage: Activity
        },
        {
          name: "AMY ANNE",
          label: "Lorem Ipsum is simply dummy text",
          userImage: Activity
        },
        {
          name: "AMY ANNE",
          label: "Lorem Ipsum is simply dummy text",
          userImage: Activity
        },
        {
          name: "AMY ANNE",
          label: "Lorem Ipsum is simply dummy text",
          userImage: Activity
        },
        {
          name: "AMY ANNE",
          label: "Lorem Ipsum is simply dummy text",
          userImage: Activity
        },
        {
          name: "AMY ANNE",
          label: "Lorem Ipsum is simply dummy text",
          userImage: Activity
        },
        {
          name: "AMY ANNE",
          label: "Lorem Ipsum is simply dummy text",
          userImage: Activity
        },
        {
          name: "AMY ANNE",
          label: "Lorem Ipsum is simply dummy text",
          userImage: Activity
        },
        {
          name: "AMY ANNE",
          label: "Lorem Ipsum is simply dummy text",
          userImage: Activity
        }
      ]
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userToken").then(token => {
      let searchKey = encodeURIComponent("@");
      this.props.getUserList(searchKey, token);
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          marginBottom: hp("7%")
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                width: "95%",
                justifyContent: "center",
                marginVertical: hp("3%")
              }}
            >
              {this.props.getUsers &&
              this.props.getUsers.users &&
              this.props.getUsers.users.length > 0 ? (
                this.props.getUsers.users.map((item, index) => {
                  return (
                    <View
                      elevation={5}
                      style={{
                        width: "30%",
                        backgroundColor: "#fff",
                        margin: wp("1.5%"),
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: hp("2%"),
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 1
                      }}
                      key={index}
                    >
                      <View>
                        {item.imageURI ? (
                          <Image
                            source={{
                              uri: Url + `/${item.imageURI}`
                            }}
                            style={{ width: 50, height: 50, borderRadius:Platform.OS==="android"? 40:25 }}
                          />
                        ) : (
                          <Image
                            source={Profile}
                            style={{ width: 50, height: 50, borderRadius:Platform.OS==="android"? 40:25 }}
                          />
                        )}
                      </View>
                      <View style={{ paddingVertical: hp("0.5%") }}>
                        <Text
                          style={{
                            color: "#03574e",
                            fontSize: hp("1.3%"),
                            textTransform: "uppercase",
                            textAlign: "center"
                          }}
                        >
                          {item.fullName}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{ textAlign: "center", fontSize: hp("1.3%") }}
                        >
                          {item.label}
                        </Text>
                      </View>
                      <TouchableOpacity>
                        <View
                          style={{
                            width: "80%",
                            backgroundColor: "#08b89f",
                            margin: wp("1%"),
                            borderRadius: 5,
                            padding: wp("1%")
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: wp("2%"),
                              textAlign: "center"
                            }}
                          >
                            GIVE RECOGNITION
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <View>
                  <ActivityIndicator />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({
    getUsers: state.RecognitionReducer.getUsers
  }),
  {
    ...recognitionActions
  }
)(HashTagsPeoples);
