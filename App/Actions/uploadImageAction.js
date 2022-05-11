import Url from "./url";

export function uploadImage(image, token) {
  const tokenBearer = "Bearer " + token;
  return dispatch => {
    let form = new FormData();
    form.append("image", {
      name: image.fileName,
      type: image.type,
      uri: image.uri
    })
    form.append("operation", "edit")
    fetch(Url + "/upload/image", {
      method: "POST",
      headers: {
        // Accept: "application/json",
        Authorization: tokenBearer
        // "Content-Type": "multipart/form-data"
      },
      body: form
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("responseData", responseData);
        dispatch({ type: "UPLOAD_IMAGE", responseData });
      })
      .catch(err => console.warn(err));
  };
}

// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtcGxveWVlQGdtYWlsLmNvbSIsInJvbGVzIjoiZW1wbG95ZWUiLCJ1c2VySWQiOiI1Y2JmZmM0ZDA5MGI3YTY1YzZkOGQxMTAiLCJpYXQiOjE1NTYwODg5ODgsImV4cCI6MTU1NjA5MjU4OH0.nqAW-pARmpEQWZ8VUCdk_u7J7Vgjgrrj5OaZ3AtIKWY"
