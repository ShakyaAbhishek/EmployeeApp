const initialState = {
  yourUploadedContent: {}
};

const ArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_CONTENT": {
      return {
        ...state,
        yourUploadedContent: action.responseData
      };
    }

    default:
      return state;
  }
};

export default ArticleReducer;
