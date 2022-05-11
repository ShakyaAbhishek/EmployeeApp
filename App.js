import React, { Component } from "react";
import { View, Text } from "react-native";
import Index from "./App/Components/auth";
import store from "./App/Store/index";
import { Provider } from "react-redux";
import { Notification } from "react-native-firebase";
import firebase from "react-native-firebase";
import SplashScreen from "react-native-splash-screen";

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(notification => {
        console.log("CDM1");
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        console.log("CDM2", notification);
        // Process your notification as required
      });
  }

  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
  }
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}
