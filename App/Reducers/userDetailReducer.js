


const initialState = {
    userData: {},
  };
  
  const UserDetailReducer = (state = initialState, action) => {
    switch (action.type) {
      case "USER_DATA": {
        return {
          ...state,
          userData: action.responseData
        };
      }

      default:
        return state;
    }
  };
  
  export default UserDetailReducer;
  