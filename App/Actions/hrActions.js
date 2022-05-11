import Url from "./url";

export function getAllInsuranceList(data, token) {
  let locationTrack = JSON.stringify(data.locationTrack);
  const tokenBearer = "Bearer" + " " + token;
  let baseUrl = "";
  return dispatch => {
    if (data.searchKey) {
      // console.warn("if");
      baseUrl =
        Url +
        "/view/hospital-plans/" +
        locationTrack +
        "/" +
        `${data.type}` +
        "?searchPattern=" +
        data.searchKey;
    } else {
      // console.warn("if");ss
      baseUrl =
        Url + "/view/hospital-plans/" + locationTrack + "/" + `${data.type}`;
    }
    fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("insurance", responseData);
        dispatch({ type: "GET_ALL_HOSPITALS", responseData });
      })
      .catch(err => alert(err));
  };
}

export function getAllCampaigns(token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/get/campaigns", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        // console.warn("CAMPAIGN", responseData);
        dispatch({ type: "GET_ALL_CAMPAIGN", responseData });
      })
      .catch(err => alert(err));
  };
}

export function viewCampaigns(id, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/get/campaign/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        // console.warn("VIEW CAMPAIGN", responseData);
        dispatch({ type: "VIEW_CAMPAIGN", responseData });
      })
      .catch(err => alert(err));
  };
}

export function getAllPolicies(token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/get/all-policies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("all policies", responseData);
        dispatch({ type: "ALL_POLICIES", responseData });
      })
      .catch(err => alert(err));
  };
}

export function downloadPolicy(id, token) {
  console.warn("action", id);
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(`http://10.0.0.74:3206/download-policy/5d11cdb1c507c26791f429f7`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => console.warn("response", response.status))

      .catch(err => alert(err));
  };
}

export function getAllAnnouncements(token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/get/announcements", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        // console.warn("all announcements", responseData);
        dispatch({ type: "ALL_ANNOUNCEMENTS", responseData });
      })
      .catch(err => alert(err));
  };
}

export function viewAnnouncement(id, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/get/announcement/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        // console.warn("VIEW announce", responseData);
        dispatch({ type: "VIEW_ANNOUNCEMENT", responseData });
      })
      .catch(err => alert(err));
  };
}

export function setLeavesDataInStore(value, type) {
  if (type === "fromDate") {
    return dispatch => dispatch({ type: "SET_FROM_DATE", value });
  } else if (type === "fromDay") {
    return dispatch => dispatch({ type: "SET_FROM_DAY", value });
  } else if (type === "toDate") {
    return dispatch => dispatch({ type: "SET_TO_DATE", value });
  } else if (type === "toDay") {
    console.warn("toDay");
    return dispatch => dispatch({ type: "SET_TO_DAY", value });
  }
}

export function leaveBalance(token) {
  console.warn("toker", token);
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/leave-balance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("leaves balance", responseData);
        dispatch({ type: "LEAVE_BALANCE", responseData });
      })
      .catch(err => alert(err));
  };
}

export function applyLeaves(data, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/apply/leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("leaves apply", responseData);
        dispatch({ type: "APPLY_LEAVE", responseData });
      })
      .catch(err => alert(err));
  };
}

// HR Conversation Actions --------------------------->

export function startConversation(variable, token, method) {
  console.warn('panel', variable)
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/conversation", {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      },
      body: JSON.stringify(variable)
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("start data", responseData);
        dispatch({ type: "START_CONVERSATIONS", responseData });
      })
      .catch(err => alert(err));
  };
}

export function conversationHistory(token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/conversation", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("history data", responseData);
        dispatch({ type: "CHAT_HISTORY", responseData });
      })
      .catch(err => alert(err));
  };
}

export function deleteConversations(conversationId, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + `/conversation/${conversationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        dispatch({ type: "DELETE_CONVERSATION", responseData });
      })
      .catch(err => alert(err));
  };
}
