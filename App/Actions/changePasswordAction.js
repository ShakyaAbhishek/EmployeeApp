import Url from "./url";

export function changePassword(data, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/changePassword", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: tokenBearer,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("responseData", responseData);
        dispatch({ type: "CHANGE_PASSWORD", responseData });
      })
      .catch(err => console.warn(err));
  };
}

export function currentPassword(value) {
  return dispatch => {
    dispatch({ type: "CURRENT_PASSWORD", value });
  };
}

export function setNewPassword(value) {
  return dispatch => {
    dispatch({ type: "SET_NEW_PASSWORD", value });
  };
}

export function setConfirmPassword(value) {
  return dispatch => {
    dispatch({ type: "SET_CONFIRM_PASSWORD", value });
  };
}

// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtcGxveWVlQGdtYWlsLmNvbSIsInJvbGVzIjoiZW1wbG95ZWUiLCJ1c2VySWQiOiI1Y2JmZmM0ZDA5MGI3YTY1YzZkOGQxMTAiLCJpYXQiOjE1NTYwODg5ODgsImV4cCI6MTU1NjA5MjU4OH0.nqAW-pARmpEQWZ8VUCdk_u7J7Vgjgrrj5OaZ3AtIKWY"
