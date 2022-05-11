const initialState = {
  allMoodData: {},
  setMood: ""
};

const MoodReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_MOOD": {
      return {
        ...state,
        allMoodData: action.responseData
      };
    }

    case "SET_MOOD": {
      return {
        ...state,
        setMood: action.responseData
      };
    }

    default:
      return state;
  }
};

export default MoodReducer;
