import Url from "./url";

export function getWeeklyMood(token) {
  let tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/weekly/user/mood", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("mood response", responseData);
        dispatch({ type: "GET_WEEKLY_MOOD", responseData });
      })
      .catch(err => console.warn(err));
  };
}
