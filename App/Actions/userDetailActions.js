import Url from "./url";

export function getUserData(token) {
    const tokenBearer = "Bearer" + " " + token;
    return dispatch => {
      fetch(Url + "/get/user/details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenBearer
        }
      })
        .then(response => response.json())
        .then(responseData => {
          console.warn('responseData', responseData)
          dispatch({ type: "USER_DATA", responseData });
        })
        .catch(err => {
          dispatch({ type: "ERROR", err });
        });
    };
  }