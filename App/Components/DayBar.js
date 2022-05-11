import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

import ProgressBar from "../Components/ProgressBar";

class DayBar extends Component {
  state = {
    data: [
      { label: "S" },
      { label: "M" },
      { label: "T" },
      { label: "W" },
      { label: "T" },
      { label: "F" },
      { label: "S" }
    ]
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.data.map(item => {
          return (
            <TouchableHighlight
              style={{ flex: 1,}}
              onPress={() => alert(item)}
            >
              <ProgressBar heightone={50} heighttwo={36} marginSmall={7} label={item.label} strokeWidth={2}/>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  }
}
export default DayBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: "5%"
  }
});
