import React, { Component } from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import SignIn from "./signIn";
import App from "./index";
import StackNavigation from "./stackNavigation";
import YourMood from "./yourMood";
import DrawerNavigation from "./drawerNavigation";
import PreSignIn from "./preSignIn";
import ChangePassword from "./changePassword";
import UploadImage from "./uploadImage";
import AboutMe from "./aboutMe";
import YourContent from "./yourContent";
import ForgetPassword from "./forgetPassword";
import HealthData from "./healthData";

const Auth = createStackNavigator({
  PreSignIn: {
    screen: PreSignIn,
    navigationOptions: { header: null }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: { header: null }
  },
  ForgetPassword: {
    screen: ForgetPassword,
    navigationOptions: { header: null }
  }
});

const passwordStackNavigator = createStackNavigator({
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: { header: null }
  }
});

const userImageStackNavigator = createStackNavigator({
  UploadImage: {
    screen: UploadImage,
    navigationOptions: { header: null }
  }
});

const userDataStackNavigator = createStackNavigator({
  AboutMe: {
    screen: AboutMe,
    navigationOptions: { header: null }
  }
});

const userHealthNavigator = createStackNavigator({
  HealthData: {
    screen: HealthData,
    navigationOptions: { header: null }
  },
})

const contentStacknavigator = createStackNavigator({
  YourContent: {
    screen: YourContent,
    navigationOptions: { header: null }
  }
});

const moodStacknavigator = createStackNavigator({
  YourMood: {
    screen: YourMood,
    navigationOptions: { header: null }
  }
});

const switchNavigator = createSwitchNavigator({
  App: App,
  Auth: {
    screen: Auth,
    navigationOptions: {
      header: null
    }
  },
  passwordStackNavigator: {
    screen: ChangePassword,
    navigationOptions: {
      header: null
    }
  },
  userImageStackNavigator: {
    screen: UploadImage,
    navigationOptions: {
      header: null
    }
  },
  userDataStackNavigator: {
    screen: AboutMe,
    navigationOptions: {
      header: null
    }
  },
  userHealthNavigator : {
    screen: HealthData,
    navigationOptions : {
    header : null
    }
  },
  contentStacknavigator: {
    screen: YourContent,
    navigationOptions: {
      header: null
    }
  },
  moodStacknavigator: {
    screen: YourMood,
    navigationOptions: {
      header: null
    }
  },
  StackNavigation: StackNavigation
});

const navigator = createAppContainer(switchNavigator);
// const Auth = createAppContainer(StackDrawer);

export default navigator;
