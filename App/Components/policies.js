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
  PermissionsAndroid,
  Modal,
  Platform,
  TouchableHighlight
} from "react-native";
import LogoHeader from "./logoHeader";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import Download from "../Images/download.png";
import PdfImage from "../Images/viewpdf.png";
import HeaderBack from "./headerBack";
import Url from "../Actions/url";
import Cross from "../Images/cross2.png";
import { connect } from "react-redux";
import * as hrActions from "../Actions/hrActions";
import RNFetchBlob from "rn-fetch-blob";
import Pdf from "./react-native-pdf";
import ModalImage from "../Images/popup.png";

class Policies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: false,
      pdfUri: "",
      showModal: false
    };
  }

  async requestExternalStoreageRead() {
    if (Platform.OS == "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );

        return granted == PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        //Handle this error
        console.warn("error");
        return false;
      }
    } else {
      return true;
      console.warn("ios");
    }
  }
  download = async item => {
    let pdfUrl = Url + `/${item.policyDoc}`;
    if (await this.requestExternalStoreageRead()) {
      var date = new Date();
      var url = encodeURI(pdfUrl);
      var ext = this.extention(url);
      ext = "." + ext[0];
      const { config, fs } = RNFetchBlob;
      let PictureDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            "/image_" +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: "Image"
        }
      };
      config(options)
        .fetch("GET", url)
        .then(res => {
          this.setState({ showModal: true });
          // alert("Successfully downloaded");
        })
        .catch(err => alert(err));
    }
  };
  extention(filename) {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  }

  viewPdf = item => {
    let pdfUri = "";
    pdfUri = Url + `/${item.policyDoc}`;

    this.setState({ bool: !this.state.bool, pdfUri });
  };
  cross = () => {
    this.setState({ bool: false });
  };
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.bgImage}>
        <SafeAreaView style={styles.safeAreaViewContainer}>

          <View>
            <HeaderBack {...this.props} heading="Policies" />
          </View>
          {/* <View style={styles.logoContainer}>
            <LogoHeader />
          </View> */}
          <View
            style={{
              backgroundColor: "white",
              marginTop: hp("0.5%"),
              height: "100%",
              alignItems: "center"
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ alignItems: "center" }}>
                <View style={{ width: "95%" }}>
                  <View style={styles.headingMainContainer}>
                    {/* <View style={styles.mainHeadingTextContainer}>
                      <Text style={styles.mainHeadingText}>Policies</Text>
                    </View> */}
                    <View style={styles.headingContentContainer}>
                      <Text style={styles.headingContentText}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={{
                      width: "30%",
                      alignItems: "center",
                      borderRadius: 6,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      backgroundColor: "#40be99"
                    }}
                  >
                    <View>
                      <Text
                        style={{ color: "white", textTransform: "uppercase" }}
                      >
                        policies
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ width: "100%" }}>
                    <View
                      style={{
                        height: hp("5%"),
                        backgroundColor: "#40be99",
                        marginTop: hp("5%")
                      }}
                    >
                      <View
                        style={{
                          width: 0,
                          height: 0,
                          backgroundColor: "transparent",
                          borderStyle: "solid",
                          borderTopWidth: 0,
                          borderRightWidth: 15,
                          borderBottomWidth: 15,
                          borderLeftWidth: 15,
                          borderTopColor: "transparent",
                          borderRightColor: "transparent",
                          borderBottomColor: "#40be99",
                          borderLeftColor: "transparent",
                          position: "absolute",
                          bottom: hp("5%"),
                          left: hp("2%")
                        }}
                      />
                    </View>
                    {this.props.allPolicies &&
                      this.props.allPolicies.data.policies &&
                      this.props.allPolicies.data.policies.map(
                        (item, index) => {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                height: hp("5%"),
                                width: "100%",
                                borderTopWidth: 0,
                                borderWidth: 1,
                                borderColor: "#d2d2d2",
                                backgroundColor: "#ededea"
                              }}
                            >
                              <View
                                style={{
                                  width: "50%",
                                  alignItems: "flex-start",
                                  justifyContent: "center",
                                  paddingLeft: wp("2%")
                                }}
                              >
                                <Text style={{ textTransform: "capitalize" }}>
                                  {item.policyName}
                                </Text>
                              </View>
                              <View
                                style={{
                                  width: "18%",
                                  alignItems: "center",
                                  justifyContent: "center"
                                }}
                              >
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: "#40be99",
                                    paddingHorizontal: 5,
                                    paddingVertical: 3,
                                    borderRadius: 5,
                                    flexDirection: "row",
                                    alignItems: "center"
                                  }}
                                  onPress={() => this.viewPdf(item)}
                                >
                                  <Text style={{ fontSize: hp("1.2%") }}>
                                    View PDF
                                  </Text>

                                  <Image
                                    source={PdfImage}
                                    style={{
                                      width: 10,
                                      height: 10,
                                      marginLeft: wp("2%")
                                    }}
                                    resizeMode="contain"
                                  />
                                </TouchableOpacity>
                              </View>
                              <View
                                style={{
                                  width: "30%",
                                  alignItems: "center",
                                  justifyContent: "center"
                                }}
                              >
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: "#40be99",
                                    paddingHorizontal: 5,
                                    paddingVertical: 3,
                                    borderRadius: 5,
                                    flexDirection: "row",
                                    alignItems: "center"
                                  }}
                                  onPress={() => this.download(item)}
                                >
                                  <Text style={{ fontSize: hp("1.2%") }}>
                                    Download PDF
                                  </Text>
                                  <Image
                                    source={Download}
                                    style={{
                                      width: 10,
                                      height: 10,
                                      marginLeft: wp("2%")
                                    }}
                                    resizeMode="contain"
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        }
                      )}
                    {this.state.bool === true ? (
                      <Modal
                        transparent={true}
                        onRequestClose={() => {
                          this.setState({ bool: false });
                        }}
                      >
                        <View style={styles.container}>
                          <View
                            style={{
                              width: wp("90%"),
                              height: hp("80%")
                            }}
                          >
                            <TouchableOpacity
                              onPress={this.cross}
                              style={styles.crossImageContainer}
                            >
                              <Image
                                source={Cross}
                                style={styles.crossImage}
                                resizeMode="contain"
                                tintColor="black"
                              />
                            </TouchableOpacity>
                            <Pdf
                              source={{ uri: this.state.pdfUri }}
                              onLoadComplete={(numberOfPages, filePath) => { }}
                              onPageChanged={(page, numberOfPages) => { }}
                              onError={error => {
                                alert(error);
                              }}
                              style={styles.pdf}
                            />
                          </View>
                        </View>
                      </Modal>
                    ) : null}
                  </View>
                </View>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showModal}
                presentationStyle="overFullScreen"
                onRequestClose={() => {
                  this.setState({ showModal: false });
                }}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalImageContainer}>
                    <Image
                      source={ModalImage}
                      style={styles.modalImage}
                      resizeMode="cover"
                    />
                    <TouchableHighlight
                      onPress={() => this.setState({ showModal: false })}
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
                          Policy download successfully
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </ScrollView>
          </View>
          <View style={{ position: "absolute", bottom: 3 }}>
            <BottomMenu {...this.props} />
          </View>

        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default connect(
  state => ({
    allPolicies: state.HrReducer.allPolicies
  }),
  {
    ...hrActions
  }
)(Policies);

const styles = StyleSheet.create({
  crossImageContainer: {
    alignItems: "flex-end",
    right: 0,
    padding: hp("1%"),
    zIndex: 999,
    // backgroundColor: "white",
    width: 30,
    right: 0,
    position: "absolute"
  },
  crossImage: {
    width: 15,
    height: 15
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099"
  },
  pdf: {
    width: "100%",
    height: "100%"
  },
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
  mainHeadingText: {
    fontSize: hp("5%"),
    color: "#446e68"
  },
  mainHeadingTextContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center"
  },
  headingContentContainer: {
    paddingTop: hp("1%"),
    width: wp("85%")
  },
  headingContentText: {
    fontSize: hp("2.5%"),
    color: "#446e68",
    textAlign: "center"
  },
  headingMainContainer: {
    alignItems: "center",
    marginVertical: hp("6%")
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
