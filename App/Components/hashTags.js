import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import * as recognitionActions from "../Actions/recognitionAction";
import { connect } from "react-redux";

class HashTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allHashTags: [
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        },
        {
          label: "#WELLNESS"
        }
      ]
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userToken").then(token => {
      let searchKey = encodeURIComponent("#");
      this.props.getHashTags(searchKey, token);
    });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                width: "90%",
                justifyContent: "center",
                marginVertical: hp("3%")
              }}
            >
              {this.props.getTags &&
              this.props.getTags.tags &&
              this.props.getTags.tags.length > 0 ? (
                this.props.getTags.tags.map((tags, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: "29%",
                        backgroundColor: "#08b89f",
                        margin: wp("1.5%"),
                        borderRadius: 5
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            textAlign: "center",
                            color: "white",
                            paddingVertical: hp("1%")
                          }}
                        >
                          {"#" + tags.tag}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View style={{alignItems:'center'}}>
            <Text>No Hashtags Found</Text>
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
    getTags: state.RecognitionReducer.getTags
  }),
  {
    ...recognitionActions
  }
)(HashTags);
