import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import * as Progress from "react-native-progress";
import Award from "../Images/award.png";
import Activity from "../Images/activity.png";
import Star from "../Images/star_1.png";
import { ScrollView } from "react-native-gesture-handler";
import Url from "../Actions/url";
import { connect } from "react-redux";
import * as recognitionActions from "../Actions/recognitionAction";

class PersonRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employessData: [],
      showLoader: true
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userToken").then(token => {
      let type = "employee";
      this.props.getRatings(type, token);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allRatings !== this.props.allRatings) {
      this.setState({
        employessData: this.props.allRatings.data,
        showLoader: false
      });
    }
  }

  render() {
    // <Progress.Bar progress={0.3} width={200} />
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <ScrollView>
          {this.state.showLoader ? (
            <ActivityIndicator color="white" />
          ) : this.state.employessData.length !== 0 ? (
            this.state.employessData.map((employee, index) => {
              let rating = employee.percentage / 100;
              return (
                <View
                  style={{
                    flexDirection: "row",
                    width: "90%",
                    justifyContent: "space-around",
                    marginVertical: 10
                  }}
                  key={index}
                >
                  <View
                    style={{
                      width: 50,
                      backgroundColor: "white",
                      borderRadius: 90,
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <View style={{ position: "absolute", bottom: "45%" }}>
                      <Text>{index + 1}</Text>
                    </View>
                    {index === 0 || index === 1 || index === 2 ? (
                      <Image
                        source={Award}
                        style={{ width: 40, height: 40}}
                        resizeMode="contain"
                      />
                    ) : null}
                  </View>
                  <View
                    style={{
                      width: "80%",
                      backgroundColor: "#a5dbdb",
                      borderRadius: 30,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: 50
                    }}
                  >
                    <View
                      style={{
                        width: 50,
                        borderRadius: 90,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Image
                        source={{ uri: Url + `/${employee.imageURI}` }}
                        style={{ width: 45, height: 45}}
                        resizeMode="cover"
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: "#02564d",
                          fontWeight: "bold",
                          fontSize: 14,
                          textTransform: "capitalize",
                        }}
                      >
                        {employee.firstName}
                      </Text>
                      {/* <Text style={{ color: "#02564d", fontSize: 10 }}>
                        {employee.designation}
                      </Text> */}
                    </View>
                    <View>
                      <Progress.Bar
                        progress={rating}
                        width={100}
                        color="#45bead"
                      />
                    </View>
                    <View
                      style={{
                        paddingRight: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        width: 35,
                        height: 35
                      }}
                    >
                      {/* <View style={{ position: "absolute", zIndex: 99 }}>
                      <Text>12</Text>
                    </View> */}
                      <View>
                        <Image
                          source={Star}
                          style={{ width: 30, height: 30 }}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}
            >
              <Text style={{ color: "white" }}>No result found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({
    allRatings: state.RecognitionReducer.allRatings
  }),
  {
    ...recognitionActions
  }
)(PersonRating);
