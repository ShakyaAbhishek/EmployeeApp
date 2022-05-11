import Url from "./url";

export function getAllArticles(token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/get/your/all-articles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("response", responseData);
        dispatch({ type: "GET_ALL_ARTICLES", responseData });
      })
      .catch(err => alert(err));
  };
}

export function getMyArticles(token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/get/my-articles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("response", responseData);
        dispatch({ type: "GET_MY_ARTICLES", responseData });
      })
      .catch(err => alert(err));
  };
}

export function getArticle(id, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/get/article/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("article", responseData);
        dispatch({ type: "VIEW_ARTICLE", responseData });
      })
      .catch(err => alert(err));
  };
}

export function getAllArticleData(id, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/employee/view/articles/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("response data", responseData);
        dispatch({ type: "GET_MY_ARTICLES", responseData });
        dispatch({ type: "GET_ALL_ARTICLES_DATA", responseData });
      })
      .catch(err => alert(err));
  };
}

export function saveArticles(id, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/save/my-article/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("save data", responseData);
        dispatch({ type: "SAVE_ARTICLES", responseData });
        // dispatch({ type: "GET_ALL_ARTICLES_DATA", responseData });
      })
      .catch(err => alert(err));
  };
}
