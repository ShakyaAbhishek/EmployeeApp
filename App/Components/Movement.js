import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Image
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import ProgressBar from "./ProgressBar";
import DayBar from "./DayBar";
import MovementGraph from "./MovementGraph";
import BottomMenu from "./bottomMenu";
import Calender from "./MovementCalender";
import backgroundImage from "../Images/bgImage.png";
import imageUp from "../Images/up.png";
import imageRight from "../Images/right.png";
import HeaderBack from "./headerBack";

class Movement extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={backgroundImage}
        >
          <View>
            <HeaderBack {...this.props} heading="My Movement" />
          </View>
          <View style={styles.body}>
            <ScrollView style={{ flex: 1 }}>
              {/* <View style={styles.innerHeader}>
                <View style={[styles.center, { flex: 1 }]}>
                  <Text style={{ color: "white" }}>Icon</Text>
                </View>
                <View style={{ flex: 6, justifyContent: "center" }}>
                  <Text
                    style={{ fontSize: 26, marginLeft: "25%", color: "white" }}
                  >
                    Movement
                  </Text>
                </View>
              </View> */}
              <View style={styles.innerBody}>
                <DayBar />
                <View style={{ flex: 1, marginTop: "5%" }}>
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "white",
                      marginBottom: "5%",
                      fontWeight: "500"
                    }}
                  >
                    Sunday March 17 | 2019
                  </Text>
                  <ProgressBar
                    heightone={170}
                    heighttwo={135}
                    marginSmall={17}
                  />
                </View>
                <View style={{ flex: 1, marginTop: "5%" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 20
                    }}
                  >
                    <View style={{ marginHorizontal: 5, marginBottom: "3%" }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "500",
                          color: "cyan"
                        }}
                      >
                        Exercise
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 15,
                          fontWeight: "500"
                        }}
                      >
                        78/30 Minutes
                      </Text>
                    </View>
                    <View>
                      <Image
                        style={{ height: 40 }}
                        resizeMode={"contain"}
                        source={`${imageRight}`}
                      />
                    </View>
                  </View>
                  <MovementGraph
                    headingTwo="Exercise minutes"
                    valueTwo="78 MIN"
                    headingThree="Total Active Time"
                    valueThree="17 HR 35 MIN"
                    barColor="cyan"
                    strokeWidth={4}
                    buttonColor={"cyan"}
                  />
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10
                      }}
                    >
                      <View style={{ marginHorizontal: 5, marginBottom: "3%" }}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "500",
                            color: "#CC415D"
                          }}
                        >
                          Stand Up
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 15,
                            fontWeight: "500"
                          }}
                        >
                          78/30 Minutes
                        </Text>
                      </View>
                      <View>
                        <Image
                          style={{ height: 40 }}
                          resizeMode={"contain"}
                          source={`${imageUp}`}
                        />
                      </View>
                    </View>
                    <MovementGraph
                      headingTwo="Hours Stood"
                      valueTwo="18"
                      headingThree="Idle Hours"
                      valueThree="1"
                      barColor="red"
                      strokeWidth={5}
                      buttonColor={"red"}
                    />
                  </View>
                </View>
                <View style={{ flex: 1, marginTop: "5%", padding: 10 }}>
                  <Calender />
                </View>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0
            }}
          >
            <BottomMenu {...this.props} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
export default Movement;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    flex: 2
  },
  innerHeader: {
    flex: 1,
    flexDirection: "row"
  },
  innerBody: {
    flex: 6
  },
  body: {
    flex: 6
  },
  footer: {
    flex: 0.7
  }
});
