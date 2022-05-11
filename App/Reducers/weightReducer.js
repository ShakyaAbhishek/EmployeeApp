const initialState = {
  selectWeeks: "",
  selectWeight: "",
  bmiresponse: ""
};

const WeightReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WEIGHT": {
      return {
        ...state,
        selectWeight: action.value
      };
    }
    case "SET_WEEKS": {
      return {
        ...state,
        selectWeeks: action.value
      };
    }
    case "GET_BMI": {
      return {
        ...state,
        bmiresponse: action.responseData
      };
    }
    default:
      return state;
  }
};

export default WeightReducer;
