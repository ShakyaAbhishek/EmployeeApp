import React from "react";
import MultiSlider from "../Components/react-native-multi-slider";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class Multislider extends React.Component {
  
  multiSliderValuesChange = values => {
    this.setState({
      values
    });
  };
  render() {
    return (
      <MultiSlider
        values={[this.props.firstVal, this.props.secondVal]}
        sliderLength={hp("40%")}
        onValuesChange={this.multiSliderValuesChange}
        selectedStyle={{ backgroundColor: "green", height: hp("0.8%") }}
        unselectedStyle={{ backgroundColor: "#111111", height: hp("0.8%") }}
        markerStyle={{
          backgroundColor: "green",
          height: 0,
          width: 0,
          borderRadius: 0
        }}
        
        min={40}
        max={120}
        step={4}
      />
    );
  }
}
export default Multislider;
