import Url from "./url";

export function setAboutMeDataInStore(value, type) {
  if (type === "dob") {
    return dispatch => dispatch({ type: "SET_DOB", value });
  } else if (type === "gender") {
    return dispatch => dispatch({ type: "SET_GENDER", value });
  } else if (type === "height") {
    return dispatch => dispatch({ type: "SET_HEIGHT", value });
  } else if (type === "heightunit") {
    return dispatch => dispatch({ type: "SET_HEIGHT_UNIT", value });
  } else if (type === "weight") {
    return dispatch => dispatch({ type: "SET_WEIGHT", value });
  } else if (type === "weightunit") {
    return dispatch => dispatch({ type: "SET_WEIGHT_UNIT", value });
  } else if (type === "bloodgroup") {
    return dispatch => dispatch({ type: "SET_BLOODGROUP", value });
  } else if (type === "nationality") {
    return dispatch => dispatch({ type: "SET_NATIONALITY", value });
  }
}

export function postAboutMeData(aboutMeData, token) {
  console.warn("action", aboutMeData);
  let tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/create-edit/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      },
      body: JSON.stringify(aboutMeData)
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("aboutme response", responseData);
        dispatch({ type: "SET_ABOUTME_RESP", responseData });
      })
      .catch(err => console.warn(err));
  };
}
