import Url from "./url";

export function getBmi(token) {
  let tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/get/weight", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("aboutme response", responseData);
        dispatch({ type: "GET_BMI", responseData });
      })
      .catch(err => console.warn(err));
  };
}

export function recalculateBmi(data, token) {
  let tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/put/weight", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        // console.warn("aboutme response", responseData);
        dispatch({ type: "GET_BMI", responseData });
      })
      .catch(err => console.warn(err));
  };
}

export function setDuration(value, type) {
  if (type === "weight") {
    return dispatch => dispatch({ type: "SET_WEIGHT", value });
  } else if (type === "weeks") {
    return dispatch => dispatch({ type: "SET_WEEKS", value });
  }
}
