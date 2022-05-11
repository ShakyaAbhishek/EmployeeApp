const initialState = {
  submitPost: {},
  getUsers: {},
  getTags: {},
  getPost: {},
  likedPost: "",
  allComments: {},
  replies: {},
  likedComment: {},
  addComment: {},
  addReply: {},
  deletePost: {},
  allNotifications : {},
  openNotificationRecog : {},
  allRatings : {}
};

const RecognitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RATINGS": {
      return {
        ...state,
        allRatings: action.responseData
      };
    }
    case "OPEN_NOTIFICATION": {
      return {
        ...state,
        openNotificationRecog: action.responseData
      };
    }
    case "GET_NOTIFICATIONS": {
      return {
        ...state,
        allNotifications: action.responseData
      };
    }
    case "UPLOAD_POST": {
      return {
        ...state,
        submitPost: action.responseData
      };
    }
    case "DELETE_POST": {
      return {
        ...state,
        deletePost: action.responseData
      };
    }
    case "UPLOAD_COMMENT": {
      return {
        ...state,
        addComment: action.responseData
      };
    }
    case "UPLOAD_REPLY": {
      return {
        ...state,
        addReply: action.responseData
      };
    }
    case "LIKE_UNLIKE": {
      return {
        ...state,
        likedPost: action.responseData
      };
    }
    case "LIKE_UNLIKE_COMMENT": {
      return {
        ...state,
        likedComment: action.responseData
      };
    }
    case "LIKE_UNLIKE_REPLY": {
      return {
        ...state,
        likedReply: action.responseData
      };
    }
    case "GET_ALL_COMMENTS": {
      return {
        ...state,
        allComments: action.responseData
      };
    }
    case "GET_REPLIES": {
      return {
        ...state,
        replies: action.responseData
      };
    }

    case "GET_USERLIST": {
      return {
        ...state,
        getUsers: action.responseData
      };
    }
    case "GET_TAGS": {
      return {
        ...state,
        getTags: action.responseData
      };
    }
    case "GET_ALL_POST": {
      return {
        ...state,
        getPost: action.responseData
      };
    }
    default:
      return state;
  }
};

export default RecognitionReducer;
