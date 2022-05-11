import Url from "./url";

export function getHealthQuestions(token) {
  let tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/view/health-questions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        // console.warn("responseData", responseData);
        dispatch({ type: "STORE_HEALTH_DATA", value: responseData });
      })
      .catch(err => alert(err));
  };
}

export function submitHealthData(data, token) {
  let tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/submit/health-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("submit action", responseData);
        dispatch({ type: "SUBMIT_HEALTH_DATA", value: responseData });
      })
      .catch(err => alert(err));
  };
}

export function setHeathDataQuestions(value, type) {
  console.warn("type", value);
  if (type === "smoke") {
    return dispatch => dispatch({ type: "SET_SMOKE", value });
  } else if (type === "diabetes") {
    return dispatch => dispatch({ type: "SET_DIABETES", value });
  } else if (type === "cardio") {
    return dispatch => dispatch({ type: "SET_CARDIO", value });
  } else if (type === "activityLevel") {
    return dispatch => dispatch({ type: "SET_ACTIVITY_LEVEL", value });
  } else if (type === "numberSmoke") {
    return dispatch => dispatch({ type: "SET_NUMBER_SMOKE", value });
  }
}
