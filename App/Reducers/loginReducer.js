

const initialState = {
  loginData: {},
  email: "",
  password: "",
  errorData: "",
  logoutData: {},
  checkUser: {},
  passwordForget: {},
  userTrack : {}
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TRACK_USER": {
      return {
        ...state,
        userTrack: action.responseData
      };
    }
    case "FORGET_PASSWORD": {
      return {
        ...state,
        passwordForget: action.responseData
      };
    }
    case "VALIDATE_USER": {
      return {
        ...state,
        checkUser: action.responseData
      };
    }
    case "LOGIN_DATA": {
      return {
        ...state,
        loginData: action.responseData
      };
    }
    case "LOGOUT_DATA": {
      return {
        ...state,
        logoutData: action.responseData
      };
    }

    case "SET_EMAIL": {
      return {
        ...state,
        email: action.value
      };
    }
    case "ERROR": {
      return {
        ...state,
        errorData: action.err
      };
    }

    case "SET_PASSWORD": {
      return {
        ...state,
        password: action.value
      };
    }

    default:
      return state;
  }
};

export default LoginReducer;
