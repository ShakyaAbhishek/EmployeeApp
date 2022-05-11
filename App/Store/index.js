import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import LoginReducer from "../Reducers/loginReducer";
import ChangePasswordReducer from "../Reducers/changePasswordReducer";
import UploadImageReducer from "../Reducers/uploadImageReducer";
import AboutMeReducer from "../Reducers/aboutMeReducer";
import HealthDataReducer from "../Reducers/healthDataReducer";
import WeightReducer from "../Reducers/weightReducer";
import StressReducer from "../Reducers/stressReducer";
import MoodReducer from "../Reducers/moodReducer";
import WeeklyMoodReducer from "../Reducers/weeklyReducer";
import ArticleReducer from "../Reducers/articleReducer";
import RecognitionReducer from "../Reducers/recognitionReducer";
import WellnessReducer from "../Reducers/wellnessReducer";
import HrReducer from "../Reducers/hrReducer";
import UserDetailReducer from '../Reducers/userDetailReducer';
import GoalReducer from '../Reducers/goalReducer';
import ChallengesReducer from '../Reducers/challengesReducer'

const rootReducer = combineReducers({
  LoginReducer,
  ChangePasswordReducer,
  UploadImageReducer,
  AboutMeReducer,
  HealthDataReducer,
  WeightReducer,
  StressReducer,
  MoodReducer,
  WeeklyMoodReducer,
  ArticleReducer,
  RecognitionReducer,
  WellnessReducer,
  HrReducer,
  UserDetailReducer,
  GoalReducer,
  ChallengesReducer
});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
