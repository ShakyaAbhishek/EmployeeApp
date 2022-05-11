const initialState = {
  WeeklyMood: ""
};

const WeeklyMoodReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_WEEKLY_MOOD": {
      return {
        ...state,
        WeeklyMood: action.responseData
      };
    }

    default:
      return state;
  }
};

export default WeeklyMoodReducer;
