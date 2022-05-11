import React, { Component } from "react";
import { Button, Image, Text, View, SafeAreaView } from "react-native";
import {
  createDrawerNavigator,
  createAppContainer,
  Dimensions,
  DrawerItems,
  createStackNavigator,
  StyleSheet
} from "react-navigation";
import HealthData from "./healthData";
import AboutMe from "./aboutMe";
import YourContent from "./yourContent";
import YourMood from "./yourMood";
import ConnectDevice from "./connectDevice";
import DrawerContent from "./drawerComponent";
import Dashboard from "./dashboard";
import UploadImage from "./uploadImage";
import ChangePassword from "./changePassword";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
const RootDrawer = createDrawerNavigator(
  {
    // YourMood: { screen: YourMood },
    Dashboard: { screen: Dashboard },
    AboutMe: { screen: AboutMe },
    YourContent: { screen: YourContent },
    UploadImage: { screen: UploadImage },
    ChangePassword: { screen: ChangePassword }
  },
  {
    contentComponent: DrawerContent,
    // drawerWidth: 300,
    drawerWidth: wp("70%"),
    drawerPosition: "left",
    drawerBackgroundColor: "#b3d4d4"
    // drawerOpenRoute: 'DrawerOpen',
    // drawerCloseRoute: 'DrawerClose',
    // drawerToggleRoute: 'DrawerToggle',
    // contentOptions: {
    //   activeTintColor: "red",
    //   backgroundColor: "black",
    //   flex: 1
    // }
  }
);
// RootDrawer.navigationOptions = ({ navigation }) => {
//   return { title: "aman", headerLeft: <Text>headerLeft</Text>, headerRight: <Text>headerRight</Text> };
// }

const DrawerNavigation = createAppContainer(RootDrawer);

export default DrawerNavigation;
