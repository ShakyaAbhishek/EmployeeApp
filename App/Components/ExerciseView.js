import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
class ExerciseView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerView}>
          <View>
              <Text style={styles.textStyle}>{this.props.headingTwo}</Text>
          </View>
          <View>
              <Text style={styles.textStyle}>{this.props.valueTwo}</Text>
          </View>
        </View>
        <View style={styles.innerView}>
          <View>
              <Text style={styles.textStyle}>{this.props.headingThree}</Text>
          </View>
          <View>
          <Text style={styles.textStyle}>{this.props.valueThree}</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default ExerciseView;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    padding: "1%",
    //backgroundColor:'red'
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  innerView: {
    borderTopColor: "white",
    borderTopWidth: 2,
    marginBottom: "4%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center'
  },
  textStyle:{
    color:'#ffffff', 
    fontSize:14, 
    fontWeight:'500'
  }
});
