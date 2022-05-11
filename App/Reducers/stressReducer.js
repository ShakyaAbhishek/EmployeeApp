const initialState = {
  stressQuestions: {},
  submitResponse: {}
};

const StressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STRESS": {
      return {
        ...state,
        stressQuestions: action.responseData
      };
    }
    case "SUBMIT_STRESS": {
      return {
        ...state,
        submitResponse: action.responseData
      };
    }
    default:
      return state;
  }
};

export default StressReducer;
