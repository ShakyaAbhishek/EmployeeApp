const initialState = {
  changePasswordResponse: {},
  currentPasswords: "",
  newPassword: "",
  confirmPassword: ""
};

const ChangePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_PASSWORD": {
      return {
        ...state,
        changePasswordResponse: action.responseData
      };
    }

    case "CURRENT_PASSWORD": {
      return {
        ...state,
        currentPasswords: action.value
      };
    }

    case "SET_NEW_PASSWORD": {
      return {
        ...state,
        newPassword: action.value
      };
    }

    case "SET_CONFIRM_PASSWORD": {
      return {
        ...state,
        confirmPassword: action.value
      };
    }

    default:
      return state;
  }
};

export default ChangePasswordReducer;
