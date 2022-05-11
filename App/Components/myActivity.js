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
import LogoHeader from "./logoHeader";
import Header from "./header";
import backgroundImage from "../Images/bgImage.png";
import DatePicker from "./react-native-datepicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Banner from '../Images/activityBanner.png';
import FootStep from '../Images/footstep.png';
import Heart from '../Images/heart.png';
import Movement from '../Images/movement.png'
import { connect } from "react-redux";
import BottomMenu from "./bottomMenu";
import HeaderBack from "./headerBack";
import * as userActions from '../Actions/userDetailActions';
import GoogleFit, { Scopes } from "react-native-google-fit";

class MyActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myHealthData: [
        {
          healthTypeImagee: FootStep,
          content: "Steps"
        },
        {
          healthTypeImagee: Movement,
          content: "Movement"
        },
        {
          healthTypeImagee: Heart,
          content: "Your heart"
        }
      ]
    };
  }

  // componentDidMount(){
  //   if(Platform.OS==="android"){
  //     const options = {
  //       scopes: [
  //         Scopes.FITNESS_ACTIVITY_READ_WRITE,
  //         Scopes.FITNESS_BODY_READ_WRITE
  //       ]
  //     };
    
  //     GoogleFit.authorize(options)
  //       .then(res => {
  //         if (res.success) {
  //           // alert("Successfully connected");
  //           // const options = {
  //           //   // startDate: new Date().toISOString(), // required ISO8601Timestamp
  //           //   endDate: new Date().toISOString() // required ISO8601Timestamp
  //           // };
  //           // GoogleFit.getDailyStepCountSamples(options)
  //           //   .then(res => {
  //           //     console.warn(res)
                
  //           //   })
  //           //   .catch(err => {
  //           //     console.warn(err);
  //           //   });
  //           const options = {
  //             startDate: "2017-01-01T00:00:17.971Z", // required
  //             endDate: new Date().toISOString(), // required
  //           }
  //           const callback = ((error, response) => {
  //             console.warn(error, response)
  //           });
             
  //           GoogleFit.getHeartRateSamples(options, callback)
  //         }
  //       })
  //       .catch(err => {
  //         console.warn("err >>> ", err);
  //       })
  //   } else {
  //     console.warn('ios')
  //   }
  // }

  handleImage = async index => {
    if (index == 0) {
     this.props.navigation.navigate("Steps")
     AsyncStorage.getItem('userToken').then((token) => {
      this.props.getUserData(token)
     })
    } else if(index ==1) {
       this.props.navigation.navigate("Movement")
    } else if(index ==2) {
      this.props.navigation.navigate("TimebasedData")
    }
  };

 
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
          <View>
            <HeaderBack {...this.props} heading="My Activity" />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          
            <View>
              <Image
                source={Banner}
                resizeMode="cover"
                style={styles.healthBannerImage}
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            {/* <View style={styles.headingContainer}>
              <Text style={styles.headingText}>My Activity</Text>
            </View> */}
            <View style={styles.myHealthContainer}>
              <View style={styles.contentInnerContainer}>
                {this.state.myHealthData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.contentContainer}
                    onPress={() => this.handleImage(index)}
                  >
                    <ImageBackground
                      source={item.healthTypeImagee}
                      style={styles.contentBgimage}
                      imageStyle={{ borderRadius: 8 }}
                    >
                      <View style={styles.contentTextContainer}>
                        <Text style={styles.contentText}>{item.content}</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottomMenuContainer}>
            <BottomMenu {...this.props} />
          </View>
         
        </SafeAreaView>
        </ImageBackground>
      
    );
  }
}

export default connect(
  state => ({
    UserDetailReducer : state.UserDetailReducer.userData
  }),
 {...userActions}
)(MyActivity);

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%"
  },
  logoContainer: {
    marginTop: hp("2.5%")
  },
  safeAreaViewContainer: {
    flex: 1
  },
  healthBannerImage: {
    width: "100%",
    height: hp("35%")
  },
  headingContainer: {
    marginVertical: hp("2.5%"),
    alignItems: "center"
  },
  headingText: {
    fontSize: hp("5%"),
    color: "#d5efef"
  },
  contentInnerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    // width: "5%"
  },
  contentContainer: {
    marginBottom: hp("2%"),
    marginHorizontal:hp('1.5%'),
    width: wp("24%"),
    height: wp("24%")
  },
  contentBgimage: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  contentTextContainer: {
    position: "absolute",
    bottom: hp("2.5%")
  },
  contentText: {
    fontSize: hp("1.7%"),
    color: "white",
    textAlign: "center"
  },
  myHealthContainer: {
    alignItems: "center",
    marginVertical: hp("10%")
  },
  bottomMenuContainer: {
    position: "absolute",
    bottom: 3
  }
});
