const initialState = {
  allArticle: {},
  myArticle: {},
  viewArticle: {},
  allArticleData: {},
  saveArticle: {}
};

const WellnessReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_ARTICLES": {
      return {
        ...state,
        allArticle: action.responseData
      };
    }

    case "GET_ALL_ARTICLES_DATA": {
      return {
        ...state,
        allArticleData: action.responseData
      };
    }

    case "GET_MY_ARTICLES": {
      return {
        ...state,
        myArticle: action.responseData
      };
    }
    case "VIEW_ARTICLE": {
      return {
        ...state,
        viewArticle: action.responseData
      };
    }
    case "SAVE_ARTICLES": {
      return {
        ...state,
        saveArticle: action.responseData
      };
    }
    default:
      return state;
  }
};

export default WellnessReducer;
