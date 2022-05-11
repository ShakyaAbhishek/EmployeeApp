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
  Platform
} from "react-native";
import LogoHeader from "./logoHeader";
import Header from "./header";
import backgroundImage from "../Images/bgImage.png";
import RNPickerSelect from "./react-native-picker-select";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import AppleHealth from "../Images/applehealtth.png";
import GoogleFitImage from "../Images/googlefit.png";
import SamsungHealth from "../Images/samsunghealth.png";
import HeaderBack from "./headerBack";
import AppleHealthKit from "rn-apple-healthkit";
import GoogleFit, { Scopes } from "react-native-google-fit";

export default class ConnectDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  appleDevice = () => {
    let options = {
      permissions: {
        read: [
          "Height",
          "Weight",
          "StepCount",
          "DateOfBirth",
          "BodyMassIndex",
          "ActiveEnergyBurned"
        ],
        write: [
          "Height",
          "Weight",
          "StepCount",
          "BodyMassIndex",
          "Biotin",
          "Caffeine",
          "Calcium",
          "Carbohydrates",
          "Chloride",
          "Cholesterol",
          "Copper",
          "EnergyConsumed",
          "FatMonounsaturated",
          "FatPolyunsaturated",
          "FatSaturated",
          "FatTotal",
          "Fiber",
          "Folate",
          "Iodine",
          "Iron",
          "Magnesium",
          "Manganese",
          "Molybdenum",
          "Niacin",
          "PantothenicAcid",
          "Phosphorus",
          "Potassium",
          "Protein",
          "Riboflavin",
          "Selenium",
          "Sodium",
          "Sugar",
          "Thiamin",
          "VitaminA",
          "VitaminB12",
          "VitaminB6",
          "VitaminC",
          "VitaminD",
          "VitaminE",
          "VitaminK",
          "Zinc",
          "Water"
        ]
      }
    };
    let option = {
      startDate: new Date(2019, 10, 1).toISOString(), // required
      endDate: new Date().toISOString(), // optional; default now
      limit: 10 // optional; default no limit
    };
    AppleHealthKit.initHealthKit(options, (err, results) => {
      console.warn(err, results)
      if (err) {
        console.warn("error initializing Healthkit: ", results);
        return;
      }

    });
    AppleHealthKit.getDateOfBirth(null, (err, results) => {
      // if (this._handleHealthkitError(err, 'getDateOfBirth')) {
      //     return;
      // }
      console.warn("birht", results)
    });
    AppleHealthKit.getSleepSamples(option, (err, samples) => {
      console.warn("err", err);
      console.warn("samples", samples);
      // use samples ...
    });
    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.warn("step", err)
        return;
      }
      console.warn("step", results)
    });
  };

  googleDevice = () => {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ_WRITE,
        Scopes.FITNESS_BODY_READ_WRITE
      ]
    };

    GoogleFit.authorize(options)
      .then(res => {
        alert(res.message);
        if (res.success) {
          alert("Successfully connected");
          const options = {
            startDate: "2019-09-18T00:00:17.971Z", // required ISO8601Timestamp
            endDate: new Date().toISOString() // required ISO8601Timestamp
          };

          this.props.navigation.navigate("contentStacknavigator");

          GoogleFit.getDailyStepCountSamples(options)
            .then(res => {
              console.warn("Daily steps >>> ", res);
            })
            .catch(err => {
              console.warn(err);
            });
        }
      })
      .catch(err => {
        console.warn("err >>> ", err);
      });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={backgroundImage} style={styles.bgImage}>
          {/* <View>
            <HeaderBack {...this.props} />
          </View>
          <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headingMainContainer}>
                  <View style={{ width: "100%" }}>
                    <Text style={styles.mainHeadingText}>Congratulations!</Text>
                  </View>
                  <View style={styles.headingContentContainer}>
                    <Text style={styles.headingContentText1}>
                      Your account is created
                    </Text>
                  </View>
                  <View style={styles.headingContentContainer}>
                    <Text style={styles.headingContentText}>
                      Please select your preferred App to link your device
                    </Text>
                  </View>
                </View>

                <View style={styles.mainDeviceContainer}>
                  <TouchableOpacity
                    onPress={
                      Platform.OS === "android" ? this.googleDevice : null
                    }
                  >
                    <View style={styles.innerDeviceContainer}>
                      <View>
                        <Image
                          source={GoogleFitImage}
                          style={styles.image}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={{ paddingVertical: hp("2%") }}>
                        <Text style={styles.deviceType}>GoogleFit</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={Platform.OS === "ios" ? this.appleDevice : null}
                  >
                    <View style={styles.innerDeviceContainer}>
                      <Image source={AppleHealth} style={styles.image} />
                      <View style={{ paddingVertical: hp("2%") }}>
                        <Text style={styles.deviceType}>Apple health</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={styles.innerDeviceContainer}>
                      <Image source={SamsungHealth} style={styles.image} />
                      <View style={{ paddingVertical: hp("2%") }}>
                        <Text style={styles.deviceType}>Samsung health</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("YourContent")
                    }
                    style={styles.submit}
                  >
                    <View>
                      <Text style={styles.buttonText}>skip</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%"
  },
  logoContainer: {
    marginTop: hp("2.5%")
  },
  mainContainer: {
    alignItems: "center",
    marginTop: hp("5%")
  },
  innerContainer: {
    width: wp("90%")
  },
  headingMainContainer: {
    alignItems: "center",
    marginBottom: hp("5%"),
    marginTop: hp("2%")
  },
  mainHeadingText: {
    fontSize: hp("5%"),
    color: "#b3d4d4",
    textAlign: "center"
  },
  headingContentContainer: {
    paddingTop: hp("1%")
  },
  headingContentText1: {
    fontSize: hp("2%"),
    color: "#b3d4d4"
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#b3d4d4",
    textAlign: "center"
  },
  mainDeviceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center"
  },
  innerDeviceContainer: {
    width: wp("35%")
  },
  deviceType: {
    textAlign: "center",
    color: "white",
    fontSize: hp("2%")
  },
  image: {
    width: 120,
    height: 120
  },
  submit: {
    alignItems: "center",
    width: wp("35%"),
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: hp("8%"),
    backgroundColor: "#08b89f",
    paddingVertical: hp("1.5%"),
    marginBottom: hp("30%")
  },
  buttonText: {
    color: "#d5efef",
    textTransform: "uppercase",
    fontSize: hp("2%")
  }
});
