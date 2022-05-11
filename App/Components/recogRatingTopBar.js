import React, { Component } from "react";
import { TouchableOpacity, Text, View } from "react-native";

export default class RecogNotification extends Component {
  render() {
    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "80%"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.setTabIndex(1)}
            style={
              this.props.tabIndex == 1
                ? {
                    width: "45%",
                    padding: 20,
                    alignItems: "center"
                  }
                : {
                    width: "45%",
                    padding: 20,
                    alignItems: "center"
                  }
            }
          >
            <View
              style={
                this.props.tabIndex == 1
                  ? {
                      borderBottomWidth: 1,
                      paddingBottom: 5,
                      borderBottomColor: "#fff"
                    }
                  : null
              }
            >
              <Text style={{ textTransform: "uppercase", color: "white" }}>
                Personal
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.setTabIndex(2)}
            style={
              this.props.tabIndex == 2
                ? {
                    width: "45%",
                    padding: 20,
                    alignItems: "center"
                  }
                : {
                    width: "45%",
                    padding: 20,
                    alignItems: "center"
                  }
            }
          >
            <View
              style={
                this.props.tabIndex == 2
                  ? {
                      borderBottomWidth: 1,
                      paddingBottom: 5,
                      borderBottomColor: "#fff"
                    }
                  : null
              }
            >
              <Text style={{ textTransform: "uppercase", color: "white" }}>
                Department
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
