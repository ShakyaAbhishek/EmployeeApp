import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import ProgressBar from "../Components/ProgressBar";

class MovementCalender extends Component {
  state = {
    data: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30
    ]
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: 22, color: "white" }}>Calender</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            Jan
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {this.state.data.map(item => {
            return (
              <View style={{ width: 50, height: 50, margin: "3%" }}>
                <ProgressBar
                  heightone={50}
                  heighttwo={35}
                  marginSmall={7}
                  label={item + " "}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default MovementCalender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "18%"
  }
});
