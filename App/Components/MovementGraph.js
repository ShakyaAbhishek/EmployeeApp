import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Image
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");
import ExerciseView from "../Components/ExerciseView";

import CustomBarGraph from "../Components/CustomBarGraph";
import circle from "../Images/circle.png";

class MovementGraph extends Component {
  state = { screen: 1 };

  renderScreen = () => {
    const data = [
      { label: "Jan", value: 500 },
      { label: "Feb", value: 312 },
      { label: "Mar", value: 424 },
      { label: "Apr", value: 745 },
      { label: "May", value: 89 },
      { label: "Jun", value: 434 },
      { label: "Jul", value: 650 },
      { label: "Aug", value: 980 },
      { label: "Sep", value: 123 },
      { label: "Oct", value: 186 },
      { label: "Nov", value: 689 },
      { label: "Dec", value: 643 }
    ];

    if (this.state.screen === 1) {
      return (
        <View style={{  width }}>
          <CustomBarGraph
            data={data}
            barColor={this.props.barColor}
            strokeWidth={this.props.strokeWidth}
            round={100}
            unit="$"
          />
        </View>
      );
    } else {
      return (
        <View style={{  width }}>
          <ExerciseView
            headingTwo={this.props.headingTwo}
            headingThree={this.props.headingThree}
            valueTwo={this.props.valueTwo}
            valueThree={this.props.valueThree}
          />
        </View>
      );
    }
  };

  render() {
    var button_nackgroundColor = this.props.buttonColor;
    return (
      <View style={styles.container}>
        <View style={{  }}>{this.renderScreen()}</View>
        <View style={[{ flex: 1 }, styles.center]}>
          <View style={{ flexDirection: "row", width: '15%',marginTop:10, marginBottom: 10, justifyContent: 'space-around' }}>
            <TouchableHighlight activeOpacity={0.9} onPress={() => this.setState({ screen: 1 })}>
              <View style={{ backgroundColor: this.state.screen == 1 ? button_nackgroundColor : '#4F4F4D', height: 15, width: 15, borderRadius: 8 }}>

              </View>
              {/* <Image resizeMode={'contain'} source={circle} style={{ height: 20, width: 20 }} /> */}
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.setState({ screen: 2 })}>
              <View style={{ backgroundColor: this.state.screen == 2 ? button_nackgroundColor : '#4F4F4D', height: 15, width: 15, borderRadius: 8 }}>

              </View>
              {/* <Image resizeMode={'contain'} source={circle} style={{ marginLeft: 10, height: 20, width: 20 }} /> */}
            </TouchableHighlight>
          </View>
          <TouchableHighlight
            style={{
              width: 100,
              height: 30,
              alignItems: "center",
              borderRadius: 10,
              justifyContent: "center",
              backgroundColor: button_nackgroundColor, 
              marginTop:hp('2%'),
              marginBottom:hp('4%')
            }}
            activeOpacity={0.9}
            onPress={()=>alert('Add Goal')}
          >
            <Text style={{fontSize:14, color:'#ffffff', fontWeight:'500'}}>ADD GOAL</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
export default MovementGraph;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  }
});
