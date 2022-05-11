import Url from "./url";

export function getAllMood(token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/view/moods", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn(responseData);
        dispatch({ type: "GET_ALL_MOOD", responseData });
      })
      .catch(err => alert(err));
  };
}

export function submitMood(data, token) {
  console.warn("action", data);
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/submit/moodData/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("respons", responseData);
        dispatch({ type: "SET_MOOD", responseData });
      })
      .catch(err => console.warn(err));
  };
}
