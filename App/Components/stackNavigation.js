import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SignIn from "./signIn";
import ChangePassword from "./changePassword";
import UploadImage from "./uploadImage";
import AboutMe from "./aboutMe";
import HealthData from "./healthData";
import YourContent from "./yourContent";
import YourMood from "./yourMood";
import ConnectDevice from "./connectDevice";
import Dashboard from "./dashboard";
import DrawerNavigation from "./drawerNavigation";
import MyHealth from "./myHealth";
import Weight from "./myHealthWeight";
import Stress from "./stress";
import WeeklyMood from "./weeklyMood";
import RecognitionHome from "./recognitionHome";
import PostComments from "./recognitionComment";
import PostReplyOfComment from "./RecognitionReplyOfComment";
import WellnessDepartment from "./wellnessDepartment";
import ViewArticle from "./viewArticle";
import HeaderBack from "./headerBack";
import MyHRDepartment from "./myHRDepartment";
import Campaign from "./campaign";
import ViewCampaign from "./viewCampaign";
import Policies from "./policies";
import Announcement from "./announcements";
import Leaves from "./leaves";
import Challenges from "./challenges";
import PhysicalChallenge from "./physicalChallenges";
import MyInsurance from "./myInsurance";
import HabitudeChallenge from "./habitudeChallenges";
import MyPersonalGoals from "./myPersonalGoals";
import HabtitudeActiveChallenges from "./habtitudeActive";
import HabitudeMyChallenges from "./habtitudeMy";
import ViewHabitudeChallenge from "./viewChallenge";
import JoinHabitudeChallenge from "./joinHabitudeChallenge";
import SelfRatingChallenge from "./selfRatingChallenges";
import MyActivity from "./myActivity";
import Steps from "./steps";
import Notifications from "./notifications";
import TimebasedData from "./TimebasedData";
import Movement from "./Movement";
import Sleep from './sleep'
import TalkToHr from './talkToHr';
import TalkToHrChat from './talkToHrChat';
import OpenPost from './openPost'

const StackDrawer = createStackNavigator({
  // SignIn: {
  //   screen: SignIn,
  //   navigationOptions: { header: null }
  // },

  Dashboard: {
    screen: DrawerNavigation,
    navigationOptions: { header: null }
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: { header: null }
  },
  Sleep: {
    screen: Sleep,
    navigationOptions: { header: null }
  },
  Movement: { screen: Movement, navigationOptions: { header: null } },
  Challenges: {
    screen: Challenges,
    navigationOptions: { header: null }
  },
  TimebasedData: { screen: TimebasedData, navigationOptions: { header: null } },
  PhysicalChallenge: {
    screen: PhysicalChallenge,
    navigationOptions: { header: null }
  },
  HabitudeChallenge: {
    screen: HabitudeChallenge,
    navigationOptions: { header: null }
  },
  HabtitudeActiveChallenges: {
    screen: HabtitudeActiveChallenges,
    navigationOptions: { header: null }
  },
  HabitudeMyChallenges: {
    screen: HabitudeMyChallenges,
    navigationOptions: { header: null }
  },
  ViewHabitudeChallenge: {
    screen: ViewHabitudeChallenge,
    navigationOptions: { header: null }
  },
  JoinHabitudeChallenge: {
    screen: JoinHabitudeChallenge,
    navigationOptions: { header: null }
  },
  SelfRatingChallenge: {
    screen: SelfRatingChallenge,
    navigationOptions: { header: null }
  },
  MyPersonalGoals: {
    screen: MyPersonalGoals,
    navigationOptions: { header: null }
  },
  MyActivity: {
    screen: MyActivity,
    navigationOptions: { header: null }
  },
  Steps: {
    screen: Steps,
    navigationOptions: { header: null }
  },

  MyHRDepartment: {
    screen: MyHRDepartment,
    navigationOptions: { header: null }
  },
  MyInsurance: {
    screen: MyInsurance,
    navigationOptions: { header: null }
  },
  Campaign: {
    screen: Campaign,
    navigationOptions: { header: null }
  },
  ViewCampaign: {
    screen: ViewCampaign,
    navigationOptions: { header: null }
  },
  Policies: {
    screen: Policies,
    navigationOptions: { header: null }
  },
  Announcement: {
    screen: Announcement,
    navigationOptions: { header: null }
  },
  Leaves: {
    screen: Leaves,
    navigationOptions: { header: null }
  },
  RecognitionHome: {
    screen: RecognitionHome,
    navigationOptions: { header: null }
  },
  WeeklyMood: {
    screen: WeeklyMood,
    navigationOptions: { header: null }
  },
  YourMood: {
    screen: YourMood,
    navigationOptions: { header: null }
  },

  Weight: {
    screen: Weight,
    navigationOptions: { header: null }
  },
  Stress: {
    screen: Stress,
    navigationOptions: { header: null }
  },
  MyHealth: {
    screen: MyHealth,
    navigationOptions: { header: null }
  },
  ConnectDevice: {
    screen: ConnectDevice,
    navigationOptions: { header: null }
  },
  // UploadImage: {
  //   screen: UploadImage,
  //   navigationOptions: { header: null }
  // },
  // ChangePassword: {
  //   screen: ChangePassword,
  //   navigationOptions: { header: null }
  // },
  YourContent: {
    screen: YourContent,
    navigationOptions: { header: null }
  },
  // AboutMe: {
  //   screen: AboutMe,
  //   navigationOptions: { header: null }
  // },
  HealthData: {
    screen: HealthData,
    navigationOptions: { header: null }
  },
  PostComments: {
    screen: PostComments,
    navigationOptions: { header: null }
  },
  PostReplyOfComment: {
    screen: PostReplyOfComment,
    navigationOptions: { header: null }
  },
  OpenPost: {
    screen: OpenPost,
    navigationOptions: { header: null }
  },
  WellnessDepartment: {
    screen: WellnessDepartment,
    navigationOptions: { header: null }
  },
  ViewArticle: {
    screen: ViewArticle,
    navigationOptions: { header: null }
  },
  TalkToHr: {
    screen: TalkToHr,
    navigationOptions: { header: null }
  },
  TalkToHrChat: {
    screen: TalkToHrChat,
    navigationOptions: { header: null }
  }
});

// const StackNavigation = createAppContainer(StackDrawer);

export default StackDrawer;
