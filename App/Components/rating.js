import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  AsyncStorage
} from "react-native";
import PersonRating from "./personRating";
import DepartmentRating from "./departmentRating";
import RecogRatingTopBar from "./recogRatingTopBar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import * as recognitionActions from "../Actions/recognitionAction";

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 1
    };
  }

  // componentDidMount() {
  //   AsyncStorage.getItem("userToken").then(token => {
  //     let type = "department";
  //     this.props.getRatings(type, token);
  //   });
  // }

  setTabIndex = val => {
    this.setState({ tabIndex: val });
  };
  getTabComponent = index => {
    switch (index) {
      case 1:
        return <PersonRating {...this.props} />;
      case 2:
        return <DepartmentRating {...this.props} />;
    }
  };
  render() {
    return (
      <View style={{ flex: 1, marginBottom: hp("20%") }}>
        <View>
          <RecogRatingTopBar
            {...this.props}
            setTabIndex={this.setTabIndex}
            tabIndex={this.state.tabIndex}
          />
          <ScrollView>{this.getTabComponent(this.state.tabIndex)}</ScrollView>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    allRatings: state.RecognitionReducer.allRatings
  }),
  {
    ...recognitionActions
  }
)(Rating);
