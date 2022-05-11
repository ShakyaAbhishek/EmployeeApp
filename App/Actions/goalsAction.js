import Url from "./url";

export function setGoalDataInStore(value, type) {
  if (type === "startDate") {
    return dispatch => dispatch({ type: "SET_START_DATE", value });
  } else if (type === "endDate") {
    return dispatch => dispatch({ type: "SET_END_DATE", value });
  } else if (type === "challengeType") {
    return dispatch => dispatch({ type: "SET_CHALLENGE_TYPE", value });
  }
}

export function createGoal(data, token) {
  const tokenBearer = "Bearer " + token;
  return dispatch => {
    fetch(Url + "/create-goal", {
      method: "POST",
      headers: {
        // Accept: "application/json",
        Authorization: tokenBearer,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("goal", responseData);
        dispatch({ type: "UPLOAD_CONTENT", responseData });
      })
      .catch(err => console.warn(err));
  };
}

export function getMyGoal(token) {
  const tokenBearer = "Bearer " + token;
  return dispatch => {
    fetch(Url + "/view-goal?skip=0&count=10", {
      method: "GET",
      headers: {
        // Accept: "application/json",
        Authorization: tokenBearer,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("goal", responseData);
        // dispatch({ type: "UPLOAD_CONTENT", responseData });
      })
      .catch(err => console.warn(err));
  };
}
