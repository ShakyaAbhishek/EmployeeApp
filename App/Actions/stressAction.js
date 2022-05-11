import Url from "./url";

export function getStressQuestions(token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/view/stress-questions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        dispatch({ type: "GET_STRESS", responseData });
      })
      .catch(err => alert(err));
  };
}

export function submitData(data, token) {
  console.warn("data in actions", data);
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/submit/stress-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("responseData", responseData);
        dispatch({ type: "SUBMIT_STRESS", responseData });
      })
      .catch(err => alert(err));
  };
}
