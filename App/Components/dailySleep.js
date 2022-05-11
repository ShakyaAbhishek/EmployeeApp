import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  AsyncStorage,
  Platform
} from "react-native";
import * as Progress from "react-native-progress";
import { ProgressCircle } from "react-native-svg-charts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Clock1 from "../Images/clock1.png";
import Foot from "../Images/shoes.png";

export default class DailySleep extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Text>Daily Sleep</Text> */}
        {/* <Progress.Circle size={300} progress={0.5} color={"#08b89f"}  /> */}
        <View>
          <ProgressCircle
            style={{
              height: wp("60%"),
              width: wp("60%"),
              alignSelf: "center",
              justifyContent: "center"
            }}
            progress={0.5}
            progressColor={"#08b89f"}
            //   strokeWidth={10}
          />
        </View>
        <View
          style={{
            alignSelf: "center",
            top: wp("5%"),
            borderRadius: 100,
            position: "absolute"
          }}
        >
          <Image
            source={Clock1}
            style={{ height: wp("50%"), width: wp("50%"), borderRadius: 90 }}
          />
        </View>
        <View style={{position:'absolute', alignSelf:'center', top:wp('25%')}}>
          <View style={{alignItems:'center'}}>
            <Text style={{color:'#08b89f', fontSize:hp('2%')}}>
              17 march
            </Text>
          </View>
          <View>
            <Text style={{color:'#08b89f', fontSize:hp('2%')}}>
            12:00 am - 6:10 am
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", width: "90%" }}>
          <View style={{ width: "20%", justifyContent: "center" }}>
            <Image
              source={Foot}
              style={{ width: 40, height: 40, tintColor:"#446e68" }}
              resizeMode="contain"
              tintColor="#446e68"
            />
          </View>
          <View style={{ width: "50%", justifyContent: "center" }}>
            <Text style={{fontSize:hp('2%')}}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Ipsum been the industry’s specimen book.
            </Text>
          </View>
          <View style={{ width: "30%", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("MyPersonalGoals")}
            >
              <View
                style={{
                  backgroundColor: "#08b89f",
                  paddingVertical: 4,
                  borderRadius: 10
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Add Goal
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
