import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Multislider from "./Multislider";
import Detailedata from "./Detailedata";

class StatusbasedData extends React.Component {
  state = { statusData: "general" };

  mobilityData = activity => {
    this.setState({ statusData: activity });
  };
  renderdata = () => {
    if (this.props.stepsProp === "today") {
      if (this.state.statusData === "general")
        return (
          <View>
            <View
              style={{
                backgroundColor: "red",
                height: 12,
                width: 4,
                top: "50%",
                left: "30%",
                zIndex: 1
              }}
            ></View>
            <Multislider firstVal={61} secondVal={76} />
          </View>
        );
      else if (this.state.statusData === "resting")
        return (
          <View >
            <View
              style={{
                backgroundColor: "red",
                height: 10,
                width: 4,
                top: "50%",
                left: "12%",
                zIndex: 1
              }}
            ></View>
            <Multislider firstVal={48} secondVal={58} />
          </View>
        );
      else return ( 
      <View><View
        style={{
          backgroundColor: "red",
          height: 10,
          width: 4,
          top: "50%",
          left: "72%",
          zIndex: 1
        }}
      ></View>
      <Multislider firstVal={90} secondVal={115} /></View>
      );
    } else if (this.props.stepsProp === "week") {
      if (this.state.statusData === "general") return <Detailedata />;
      else if (this.state.statusData === "resting") return <Detailedata />;
      else return <Detailedata />;
    } else if (this.props.stepsProp === "year") {
      if (this.state.statusData === "general") return <Detailedata />;
      else if (this.state.statusData === "resting") return <Detailedata />;
      else return <Detailedata />;
    }
  };

  render() {
    let statusData = this.state.statusData;
    console.warn("sbd props", this.props.steps);
    return (
      <View style={{ flex: 1, marginTop: "3%", marginLeft: "5%", padding: 10 }}>
        <View style={{ flexDirection: "row", width: "90%" }}>
          <View style={{ width: "33%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => this.mobilityData("general")}
              style={
                statusData === "general"
                  ? {
                      borderBottomWidth: 2,
                      borderBottomColor: "#446e68"
                    }
                  : null
              }
            >
              <Text style={styles.headingContentText}>GENERAL</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "33%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => this.mobilityData("resting")}
              style={
                statusData === "resting"
                  ? {
                      borderBottomWidth: 2,
                      borderBottomColor: "#446e68"
                    }
                  : null
              }
            >
              <Text style={styles.headingContentText}>RESTING</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "33%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => this.mobilityData("exercise")}
              style={
                statusData === "exercise"
                  ? {
                      borderBottomWidth: 2,
                      borderBottomColor: "#446e68"
                    }
                  : null
              }
            >
              <Text style={styles.headingContentText}>EXERCISE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: "5%" }}>{this.renderdata()}</View>
      </View>
    );
  }
}
export default StatusbasedData;
const styles = StyleSheet.create({
  headingContentText: {
    fontSize: hp("2%"),
    color: "#446e68",
    textAlign: "center"
  }
});
