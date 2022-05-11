const initialState = {
    getStartDate  : "",
    getEndDate  : "",
    getChallengeType : "step"
  };
  
  const GoalReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_START_DATE": {
        return {
          ...state,
          getStartDate: action.value
        };
      }
      case "SET_END_DATE": {
        return {
          ...state,
          getEndDate: action.value
        };
      }
      case "SET_CHALLENGE_TYPE": {
        return {
          ...state,
          getChallengeType: action.value
        };
      }
      default:
        return state;
    }
  };
  
  export default GoalReducer;
  