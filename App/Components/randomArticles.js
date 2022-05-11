import React, { Component } from "react";
import { View, Text } from "react-native";

export default class RandomArticles extends Component {
  render() {
    return (
      <View style={{ flexDirection: "row", }}>
        {this.props.articlesData &&
          this.props.articlesData.map((article, index) => {
            return (
              <View style={{ width: "50%", borderWidth:1,  alignItems:'center' }}>
                <Text>rahul</Text>
              </View>
            );
          })}
      </View>
    );
  }
}
