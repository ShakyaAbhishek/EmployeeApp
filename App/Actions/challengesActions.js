import Url from "./url";

export function getChallenges(type,token) {
    const tokenBearer = "Bearer " + token;
    return dispatch => {
      fetch(Url + "/view/challenges?challengeType=" + type, {
        method: "GET",
        headers: {
          // Accept: "application/json",
          Authorization: tokenBearer,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(responseData => {
          console.warn("challenges", responseData);
          dispatch({ type: "CHALLENGES", responseData });
        })
        .catch(err => console.warn(err));
    };
  }