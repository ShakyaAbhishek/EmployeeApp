

const initialState = {
  getCampaign: {},
  viewCampaign: {},
  allPolicies: {},
  allAnnouncements: {},
  getAnnouncements: {},
  setFromDate: "",
  setFromDay: "full",
  setToDate: "",
  totalLeave: "",
  setToDay: "full",
  leaveStatus: {},
  previousConversations: {},
  deleteConversations: {},
  startConversation: {},
  hospitalList : {}
};

const HrReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_HOSPITALS": {
      return {
        ...state,
        hospitalList: action.responseData
      };
    }
    case "GET_ALL_CAMPAIGN": {
      return {
        ...state,
        getCampaign: action.responseData
      };
    }
    case "VIEW_CAMPAIGN": {
      return {
        ...state,
        viewCampaign: action.responseData
      };
    }
    case "ALL_POLICIES": {
      return {
        ...state,
        allPolicies: action.responseData
      };
    }
    case "ALL_ANNOUNCEMENTS": {
      return {
        ...state,
        allAnnouncements: action.responseData
      };
    }

    case "SET_FROM_DATE": {
      return {
        ...state,
        setFromDate: action.value
      };
    }
    case "SET_FROM_DAY": {
      return {
        ...state,
        setFromDay: action.value
      };
    }
    case "SET_TO_DATE": {
      return {
        ...state,
        setToDate: action.value
      };
    }
    case "SET_TO_DAY": {
      return {
        ...state,
        setToDay: action.value
      };
    }
    case "VIEW_ANNOUNCEMENT": {
      return {
        ...state,
        getAnnouncements: action.responseData
      };
    }
    case "LEAVE_BALANCE": {
      return {
        ...state,
        totalLeave: action.responseData
      };
    }
    case "APPLY_LEAVE": {
      return {
        ...state,
        leaveStatus: action.responseData
      };
    }
    case "START_CONVERSATIONS": {
      return {
        ...state,
        startConversation: action.responseData
      }
    }
    case "CHAT_HISTORY": {
      return {
        ...state,
        previousConversations: action.responseData
      }
    }
    case "DELETE_CONVERSATION": {
      return {
        ...state,
        deleteConversations: action.responseData
      }
    }
    default:
      return state;
  }
};

export default HrReducer;
