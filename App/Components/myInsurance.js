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
  ActivityIndicator,
  Alert,
  TouchableHighlight,
  PermissionsAndroid,
  ToastAndroid,
  Platform,
  Linking,
  Modal
} from "react-native";

import LogoHeader from "./logoHeader";
import HeaderBack from "./headerBack";
import backgroundImage from "../Images/bgImage.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import RNPickerSelect from "./react-native-picker-select";
import DropDown from "../Images/dropdown.png";
import Download from "../Images/download.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Search from "../Images/search.png";
import Cross from "../Images/cross2.png";
import Url from "../Actions/url";
import { connect } from "react-redux";
import * as hrActions from "../Actions/hrActions";
import Geolocation from "react-native-geolocation-service";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import RNFetchBlob from "rn-fetch-blob";
import ModalImage from "../Images/popup.png";

class MyInsurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadInsurance: [
        {
          insuarnceName: "My insurance"
        }
      ],
      listHospitals: [
        {
          label: "Hospitals",
          value: "Hospital"
        },
        {
          label: "Clinics",
          value: "Clinic"
        },
        {
          label: "Health Center",
          value: "health center"
        }
      ],
      listClinics: [
        {
          label: "CLINICS",
          value: "CLINICS"
        }
      ],
      hospitals: "",
      clinics: "",
      searchType: "hospital",
      searchResult: [
        {
          name: "abc Dubai"
        },
        {
          name: "abc Dubai"
        },
        {
          name: "abc Dubai"
        },
        {
          name: "abc Dubai"
        },
        {
          name: "abc Dubai"
        }
      ],
      listIndex: "",
      locationBool: true,
      hospitalLists: [],
      insuranceLogo: "",
      insuarnceName: "",
      insuranceDetails: "",
      type: "Hospital",
      policyDoc: "",
      showModal: false
    };
  }

  async componentDidMount() {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) return;

    this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({ location: position, loading: false });
          // console.warn(position);
        },
        error => {
          this.setState({ location: error, loading: false });
          console.warn(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 50,
          forceRequestLocation: true
        }
      );
    });

    AsyncStorage.getItem("userToken").then(token => {
      let data = {
        locationTrack: [25.3463, 55.4209],
        type: this.state.type,
        searchKey: this.state.searchKey
      };
      // console.warn("data", data);
      this.props.getAllInsuranceList(data, token);
    });
  }

  hasLocationPermission = async () => {
    if (
      Platform.OS === "ios" ||
      (Platform.OS === "android" && Platform.Version < 23)
    ) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        "Location permission denied by user.",
        ToastAndroid.LONG
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        "Location permission revoked by user.",
        ToastAndroid.LONG
      );
    }

    return false;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.hospitalList !== this.props.hospitalList) {
      if (this.props.hospitalList.status === 200) {
        this.setState({
          hospitalLists: this.props.hospitalList.hospitalList,
          insuranceLogo: this.props.hospitalList.logo,
          insuarnceName: this.props.hospitalList.name,
          insuranceDetails: this.props.hospitalList.details,
          policyDoc: this.props.hospitalList.policyDoc
        });
      }
    }
  }

  openMap = data => {
    // console.warn("map", data);
    let lat = data.location.coordinates[0];
    let long = data.location.coordinates[1];
    // console.warn("lat", lat);
    if (Platform.OS === "android") {
      Linking.openURL(`http://maps.google.com/maps?daddr=${lat},${long}`);
    } else if (Platform.OS === "ios") {
      Linking.openURL(`http://maps.apple.com/maps?daddr=${lat},${long},`);
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.type !== nextState.type) {
      AsyncStorage.getItem("userToken").then(token => {
        let data = {
          locationTrack: [25.3463, 55.4209],
          type: nextState.type,
          searchKey: this.state.searchKey
        };
        this.props.getAllInsuranceList(data, token);
      });
    }
    return true;
  }

  find = () => {
    AsyncStorage.getItem("userToken").then(token => {
      let data = {
        locationTrack: [25.3463, 55.4209],
        type: this.state.type,
        searchKey: this.state.searchKey
      };
      this.props.getAllInsuranceList(data, token);
    });
  };

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

  downloadPolicy = async () => {
    let policyUrl = Url + `/${this.state.policyDoc}`;
    if (await this.requestExternalStoreageRead()) {
      var date = new Date();
      var url = encodeURI(policyUrl);
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

  render() {
    const regex = /(<([^>]+)>)/gi;
    return (
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <ImageBackground source={backgroundImage} style={styles.bgImage}>
          <View>
            <HeaderBack {...this.props} heading="My Insurance" />
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
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.headingMainContainer}>
                {/* <View style={styles.mainHeadingTextContainer}>
                  <Text style={styles.mainHeadingText}>My Insurance</Text>
                </View> */}
                <View style={{ width: "95%" }}>
                  <View style={styles.headingContentContainer}>
                    <Text style={styles.headingContentText}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: "#eaf6f6",
                      flexDirection: "row",
                      paddingVertical: hp("2%"),
                      borderRadius: 6,
                      marginVertical: hp("2%")
                    }}
                  >
                    <View style={{ width: "40%", alignItems: "center" }}>
                      <Image
                        source={{ uri: Url + `/${this.state.insuranceLogo}` }}
                        style={{ width: "90%", height: 100 }}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{ width: "60%", paddingLeft: 6 }}>
                      <Text
                        style={{
                          fontSize: hp("3%"),
                          fontWeight: "bold",
                          color: "#446e68"
                        }}
                      >
                        {this.state.insuarnceName}
                      </Text>
                      <Text style={{ color: "#446e68" }}>
                        {this.state.insuranceDetails.replace(regex, "")}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: "yellow",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      marginTop: hp("2%")
                    }}
                  >
                    {/* {this.state.downloadInsurance.map((data, i) => {
                      return ( */}
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "50%" }}>
                        <Text>My insurance</Text>
                      </View>
                      <View
                        style={{
                          width: "50%",
                          alignItems: "flex-end"
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: "70%",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "flex-end"
                          }}
                          onPress={() => this.downloadPolicy()}
                        >
                          <Text>Download PDF</Text>
                          <Image
                            source={Download}
                            style={{
                              width: 10,
                              height: 10,
                              marginLeft: wp("2%"),
                              justifyContent: "center"
                            }}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
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
                    {/* );
                    })} */}
                  </View>
                  <View style={{ width: "100%", paddingVertical: hp("2%") }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        width: "60%"
                      }}
                      // onPress={() =>
                      //   this.setState({
                      //     locationBool: !this.state.locationBool
                      //   })
                      // }
                    >
                      <View
                        style={{
                          borderWidth: 1,
                          width: 20,
                          height: 20,
                          borderRadius: 90,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 90,
                            borderWidth: this.state.locationBool ? 0 : 1,
                            backgroundColor: this.state.locationBool
                              ? "#08b89f"
                              : "transparent"
                          }}
                        ></View>
                      </View>
                      <View style={{ paddingLeft: 5 }}>
                        <Text>Find hospitals/clinics near me</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: "95%",
                      flexDirection: "row",
                      justifyContent: "space-around"
                    }}
                  >
                    <View style={styles.dataInnerContainer}>
                      <View style={styles.mainPickerContainer}>
                        <View style={styles.pickerContainer}>
                          {/* <TouchableOpacity
                            onPress={() =>
                              this.setState({ searchType: "hospital" })
                            }
                          > */}
                          <RNPickerSelect
                            placeholder={{}}
                            hideIcon={true}
                            items={this.state.listHospitals}
                            useNativeAndroidPickerStyle={false}
                            style={genderPicker}
                            onValueChange={value =>
                              this.setState({
                                type: value,
                                searchType: "hospital"
                              })
                            }
                            value={this.state.type}
                          />
                          {/* </TouchableOpacity> */}
                        </View>
                        <View style={styles.dropDownImageContainer}>
                          <Image
                            source={DropDown}
                            style={styles.dropDownImage}
                            resizeMode="contain"
                            tintColor="#fff"
                          />
                        </View>
                      </View>
                    </View>
                    {/* <View
                    style={[
                      styles.dataInnerContainer,
                      { marginHorizontal: wp("6%") }
                    ]}
                  >
                    <View style={styles.mainPickerContainer}>
                      <View style={styles.pickerContainer}>
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({ searchType: "clinic" })
                          }
                        >
                          <RNPickerSelect
                            placeholder={{}}
                            hideIcon={true}
                            items={this.state.listClinics}
                            useNativeAndroidPickerStyle={false}
                            style={genderPicker}
                            onValueChange={value =>
                              this.setState({
                                clinics: value,
                                searchType: "clinic"
                              })
                            }
                            value={this.state.clinics}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.dropDownImageContainer}>
                        <Image
                          source={DropDown}
                          style={styles.dropDownImage}
                          resizeMode="contain"
                          tintColor="#fff"
                        />
                      </View>
                    </View>
                  </View> */}
                    <View
                      style={[
                        styles.dataInnerContainer,
                        {
                          backgroundColor: "transparent",
                          borderWidth: 1,
                          borderColor: "#08b89f"
                        }
                      ]}
                    >
                      <View style={styles.mainPickerContainer}>
                        <View style={styles.pickerContainer}>
                          <TextInput
                            onFocus={() =>
                              this.setState({ searchType: "search" })
                            }
                            onChangeText={e => this.setState({ searchKey: e })}
                            onEndEditing={() => this.find()}
                          />
                        </View>
                        <View style={styles.dropDownImageContainer}>
                          <Image
                            source={Search}
                            style={styles.dropDownImage}
                            resizeMode="contain"
                          />
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={{ width: "100%", marginBottom: hp("30%") }}>
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
                          left:
                            this.state.searchType === "search"
                              ? wp("70%")
                              : wp("5%")
                        }}
                      />
                    </View>
                    <View>
                      {this.state.hospitalLists.length > 0 ? (
                        this.state.hospitalLists.map((searchData, index) => {
                          return (
                            <View key={index}>
                              <TouchableOpacity
                                style={{
                                  // height: hp("5%"),
                                  paddingVertical: hp("1%"),
                                  width: "100%",
                                  borderTopWidth: 0,
                                  borderWidth: 1,
                                  borderColor: "#d2d2d2",
                                  backgroundColor: "#ededea",
                                  justifyContent: "flex-start",
                                  paddingHorizontal: 5,
                                  flexDirection: "row"
                                }}
                                onPress={() =>
                                  this.setState({ listIndex: index })
                                }
                              >
                                <View
                                  style={{
                                    width: "50%",
                                    alignItems: "flex-start",
                                    justifyContent: "center"
                                  }}
                                >
                                  <Text style={{ color: "#446e68" }}>
                                    {searchData.hospitalName +
                                      " " +
                                      searchData.area}
                                  </Text>
                                </View>
                                {this.state.listIndex === index ? (
                                  <View
                                    style={{
                                      alignItems: "flex-end",
                                      width: "50%",
                                      justifyContent: "center"
                                    }}
                                  >
                                    <TouchableHighlight
                                      onPress={() =>
                                        this.setState({ listIndex: "" })
                                      }
                                      style={{ padding: 5 }}
                                    >
                                      <Image
                                        source={Cross}
                                        style={{ width: 10, height: 10 }}
                                        resizeMode="contain"
                                      />
                                    </TouchableHighlight>
                                  </View>
                                ) : null}
                              </TouchableOpacity>
                              <View>
                                {this.state.listIndex === index ? (
                                  <View style={{ flexDirection: "row" }}>
                                    <View
                                      style={{
                                        paddingVertical: hp("1%"),
                                        width: "50%"
                                      }}
                                    >
                                      <View>
                                        <Text
                                          style={{
                                            fontSize: hp("3%"),
                                            fontWeight: "bold",
                                            color: "#446e68"
                                          }}
                                        >
                                          {searchData.hospitalName}
                                        </Text>
                                      </View>
                                      <View style={{ flexDirection: "row" }}>
                                        <Text
                                          style={{
                                            color: "#446e68",
                                            fontWeight: "bold"
                                          }}
                                        >
                                          Phone :
                                        </Text>
                                        <Text style={{ color: "#446e68" }}>
                                          {searchData.telephone}
                                        </Text>
                                      </View>
                                    </View>
                                    <View style={{ width: "50%" }}>
                                      <TouchableOpacity
                                        style={styles.mapContainer}
                                        onPress={() => this.openMap(searchData)}
                                        activeOpacity={0.9}
                                      >
                                        <MapView
                                          style={styles.map}
                                          initialRegion={{
                                            latitude: 28.5355,
                                            longitude: 77.391,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421
                                          }}
                                          scrollEnabled={false}
                                        >
                                          <Marker
                                            coordinate={{
                                              latitude: 28.5355,
                                              longitude: 77.391
                                            }}
                                          />
                                        </MapView>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                ) : null}
                              </View>
                            </View>
                          );
                        })
                      ) : (
                        <View
                          style={{
                            width: "100%",
                            alignItems: "center",
                            paddingTop: hp("1%")
                          }}
                        >
                          <Text style={{ fontSize: hp("2%") }}>
                            No nearby hospital found
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
          <View style={styles.bottomMenuContainer}>
            <BottomMenu {...this.props} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default connect(
  state => ({
    hospitalList: state.HrReducer.hospitalList
  }),
  { ...hrActions }
)(MyInsurance);

const genderPicker = StyleSheet.create({
  placeholder: {
    color: "#fff",
    fontSize: hp("1.6%"),
    paddingVertical: hp("0.9%"),
    paddingLeft: 8
  },
  inputIOS: {
    color: "#fff",
    fontSize: hp("1.6%"),
    paddingVertical: hp("0.9%"),
    paddingLeft: 8
  },
  inputAndroid: {
    color: "#fff",
    fontSize: hp("1.6%"),
    paddingVertical: hp("0.9%"),
    paddingLeft: 8
  }
});

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
  dataInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#08b89f",
    width: wp("35%"),
    borderRadius: 6,
    height: hp("6%"),
    marginVertical: hp("2%"),
    justifyContent: "center"
  },
  mainPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("35%")
  },
  pickerContainer: {
    width: wp("35%"),
    justifyContent: "center",
    zIndex: 2
  },
  dropDownImageContainer: {
    right: wp("2%"),
    position: "absolute"
  },
  dropDownImage: {
    width: 10,
    height: 12
  },
  mapContainer: {
    top: 0,
    left: 0,
    height: 100,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 10
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
    // borderColor: 'red',
    // borderWidth: 3
  },
  bottomMenuContainer: {
    position: "absolute",
    bottom: 3,
    borderWidth: 1
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
