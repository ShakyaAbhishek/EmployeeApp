

const initialState = {
    allChallenges : {}
    };
    
    const ChallengesReducer = (state = initialState, action) => {
      switch (action.type) {
        case "CHALLENGES": {
          return {
            ...state,
            allChallenges: action.responseData
          };
        }
        default:
          return state;
      }
    };
    
    export default ChallengesReducer;
    