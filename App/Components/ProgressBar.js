import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { BarChart, ProgressCircle } from "react-native-svg-charts";

class ProgressBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ProgressCircle
          style={{ height: this.props.heightone }}
          progress={0.7}
          strokeWidth={0.5}
          progressColor={"red"}
        >
          <ProgressCircle
            style={{
              height: this.props.heighttwo,
              marginTop: this.props.marginSmall
            }}
            progress={0.8}
            progressColor={"cyan"}
            strokeWidth={0.5}
          >
            {this.props.label ? (
              <View style={{ justifyContent:'center', alignItems:'center'}}>
                <Text style={{ fontWeight:'bold',color:'white'}}>{this.props.label}</Text>
              </View>
              
            ) : null}
          </ProgressCircle>
        </ProgressCircle>
      </View>
    );
  }
}
export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
