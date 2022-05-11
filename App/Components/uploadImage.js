import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  SafeAreaView,
  AsyncStorage,
  Modal,
  TouchableHighlight
} from "react-native";
import backgroundImage from "../Images/bgImage.png";
import AddIcon from "../Images/addicon.png";
import Profile from "../Images/profile.png";
import ImagePicker from "react-native-image-picker";
import LogoHeader from "./logoHeader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import * as uploadImageAction from "../Actions/uploadImageAction";
import Loader from "./loader";
import SplashScreen from "react-native-splash-screen";
import Navigator from "./auth";
import * as userActions from "../Actions/userDetailActions";
import ModalImage from "../Images/popup.png";
import Cross from "../Images/cross2.png";

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userImage: Profile,
      showLoader: false,
      validImage: true,
      showModal: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('userImage').then((data) => {
      console.warn('image', data)
    })
  }

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    // ImagePicker.launchImageLibrary(options, response => {
    // // Same code as in above section!
    // });
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        // console.warn('User cancelled image picker');
      } else if (response.error) {
        // console.warn('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.warn('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          userImage: source,
          imageDetails: response
        });
      }
    });
  };

  submit = () => {
    if (!this.state.imageDetails) {
      this.setState({ validImage: false });
      // alert("Please choose file");
    } else {
      this.setState({ showLoader: true });
      AsyncStorage.getItem("userToken").then(token => {
        this.props.uploadImage(this.state.imageDetails, token);
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.userDetail !== this.props.userDetail) {
      if (this.props.userDetail.status === 200) {
        this.setState({ userImage: this.props.userDetail.result.imageURI });
      }
    }
    if (prevProps.uploadImageData !== this.props.uploadImageData) {
      if (this.props.uploadImageData.status === 200) {
        this.setState({ showLoader: false, showModal: true }, () => {
          // alert("Image uploaded successfully");
          AsyncStorage.setItem(
            "userImage",
            this.props.uploadImageData.imageURI
          );
          // this.props.navigation.navigate("userDataStackNavigator");
        });
      }
    }
  }
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.mainContainer}>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.innerContainer}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingtext}>Insert Picture</Text>
              </View>
              <View style={styles.headingContentContainer}>
                <Text style={styles.headingContentText}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Text>
              </View>

              <View style={styles.mainImagePickerContainer}>
                <View style={styles.imageContainer}>
                  <Image source={this.state.userImage} style={styles.image} />
                  <View style={styles.addIconContainer}>
                    <TouchableOpacity onPress={this.selectPhotoTapped}>
                      <Image source={AddIcon} style={styles.addIconn} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {this.state.imageDetails ? (
                <View style={styles.editTextContainer}>
                  <TouchableOpacity onPress={this.selectPhotoTapped}>
                    <Text style={styles.editText}>EDIT</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {this.state.validImage ? null : (
                <View>
                  <Text style={{ color: "darkred", fontSize: hp("2%") }}>
                    * Please choose file
                  </Text>
                </View>
              )}
              <View style={styles.buttonContainer}>
                <View style={styles.buttonWidth}>
                  <TouchableOpacity style={styles.submit} onPress={this.submit}>
                    <View>
                      <Text style={styles.buttonText}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                  {/* {this.state.showLoader === true ? <Loader /> : null} */}
                </View>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showModal}
                presentationStyle="overFullScreen"
                // onRequestClose={() => {
                //   this.setState({ showModal: false });
                // }}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalImageContainer}>
                    <Image
                      source={ModalImage}
                      style={styles.modalImage}
                      resizeMode="cover"
                    />
                    <TouchableHighlight
                      onPress={() =>
                        this.setState({ showModal: false }, () => {
                          this.props.navigation.navigate(
                            "userDataStackNavigator"
                          );
                        })
                      }
                      style={styles.crossImageContainer}
                    >
                      <Image
                        source={Cross}
                        style={styles.crossImage}
                        resizeMode="contain"
                      />
                    </TouchableHighlight>
                    <View style={styles.modalTextContainer}>
                      {/* <View>
                        <Text style={styles.modalHeaderText}>
                          Congratulations
                        </Text>
                      </View> */}
                      <View style={styles.modalContentContainer}>
                        <Text style={styles.modalContent}>
                          Image uploaded successfully
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate(
                            "userDataStackNavigator"
                          )
                        }
                        style={{
                          backgroundColor: "#08b89f",
                          paddingVertical: hp("1%"),
                          paddingHorizontal:wp('3%'),
                          borderRadius: 5,
                          marginTop: hp("2%")
                        }}
                      >
                        <View>
                          <Text style={{color:"#fff"}}>Done</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({
    loginData: state.LoginReducer.loginData,
    uploadImageData: state.UploadImageReducer.uploadImageData,
    userDetail: state.UserDetailReducer.userData
  }),
  {
    ...uploadImageAction,
    ...userActions
  }
)(UploadImage);

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  mainContainer: {
    width: "100%",
    flex: 1
  },
  logoContainer: {
    marginTop: hp("10%"),
    marginBottom: hp("5%")
  },
  innerContainer: { alignItems: "center", marginTop: hp("6%") },
  headingContainer: {
    alignItems: "center",
    width: "90%"
  },
  headingtext: {
    fontSize: hp("5%"),
    color: "#d5efef",
    fontWeight: "normal"
  },
  headingContentContainer: {
    paddingVertical: hp("1.5%"),
    width: wp("85%"),
    marginTop: hp("15%")
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#d5efef",
    fontWeight: "normal",
    textAlign: "center"
  },
  mainImagePickerContainer: {
    alignItems: "center",
    paddingTop: hp("4%"),
    paddingBottom: hp("2%")
  },
  imageContainer: {
    alignItems: "center",
    width: 150,
    height: 140
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: Platform.OS === "android" ? 80 : 70
  },
  addIconContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0
  },
  addIconn: {
    width: 50,
    height: 50
  },
  buttonWidth: {
    width: "47%"
  },
  submit: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#08b89f",
    paddingVertical: hp("1.5%")
  },
  buttonText: {
    color: "#d5efef",
    textTransform: "uppercase",
    fontSize: hp("2%")
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: hp("15%"),
    paddingBottom: hp("8%"),
    width: "85%"
  },
  editTextContainer: {
    width: "90%",
    alignItems: "center"
  },
  editText: {
    fontSize: hp("2.5%"),
    color: "#d5efef",
    fontWeight: "normal"
  },
  modalContainer: {
    backgroundColor: "#00000099",
    justifyContent: "center",
    flex: 1,
    alignItems: "center"
  },
  modalImageContainer: {
    width: wp("90%"),
    height: hp("35%"),
    backgroundColor: "white",
    borderRadius: 5
  },
  modalImage: {
    width: wp("90%"),
    height: "37%",
    bottom: 0,
    position: "absolute",
    borderRadius: 5
  },
  crossImageContainer: {
    alignItems: "flex-end",
    right: 0,
    padding: hp("2%")
  },
  crossImage: {
    width: 10,
    height: 10
  },
  modalTextContainer: {
    alignItems: "center",
    paddingVertical: hp("2.5%")
  },
  modalHeaderText: {
    textAlign: "center",
    fontSize: hp("5.5%"),
    fontWeight: "normal"
  },
  modalContentContainer: {
    width: wp("65%")
  },
  modalContent: {
    textAlign: "center",
    fontSize: hp("3%")
  }
});
