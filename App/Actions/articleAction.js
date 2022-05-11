import Url from "./url";

export function uploadContent(data, token) {
  const tokenBearer = "Bearer " + token;
  console.warn("action", data);
  return dispatch => {
    fetch(Url + "/post/your-content", {
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
        console.warn("responseData", responseData);
        dispatch({ type: "UPLOAD_CONTENT", responseData });
      })
      .catch(err => console.warn(err));
  };
}

// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtcGxveWVlQGdtYWlsLmNvbSIsInJvbGVzIjoiZW1wbG95ZWUiLCJ1c2VySWQiOiI1Y2JmZmM0ZDA5MGI3YTY1YzZkOGQxMTAiLCJpYXQiOjE1NTYwODg5ODgsImV4cCI6MTU1NjA5MjU4OH0.nqAW-pARmpEQWZ8VUCdk_u7J7Vgjgrrj5OaZ3AtIKWY"
