import Url from "./url";

export function trackUser(token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/trackedUserResult", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn(responseData)
        dispatch({ type: "TRACK_USER", responseData });
      })
      .catch(err => {
        dispatch({ type: "ERROR", err });
      });
  };
}

export function validateUser(value) {
  console.warn(value);
  return dispatch => {
    fetch(Url + "/get-companyLogo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("login", responseData);
        dispatch({ type: "VALIDATE_USER", responseData });
      })
      .catch(err => {
        dispatch({ type: "ERROR", err });
      });
  };
}

export function forgetPassword(value) {
  return dispatch => {
    fetch(Url + "/forgetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("forget", responseData);
        dispatch({ type: "FORGET_PASSWORD", responseData });
      })
      .catch(err => {
        dispatch({ type: "ERROR", err });
      });
  };
}

export function loginUser(value) {
  console.warn("value", value);
  return dispatch => {
    fetch(Url + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn('login data', responseData)
        dispatch({ type: "LOGIN_DATA", responseData });
      })
      .catch(err => {
        console.warn(err)
        dispatch({ type: "ERROR", err });
      });
  };
}

export function setEmail(value) {
  return dispatch => {
    dispatch({ type: "SET_EMAIL", value });
  };
}

export function setPassword(value) {
  return dispatch => {
    dispatch({ type: "SET_PASSWORD", value });
  };
}

export function logout(data, token) {
  let tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("logout", responseData);
        dispatch({ type: "LOGOUT_DATA", responseData });
      })
      .catch(err => {
        dispatch({ type: "ERROR", err });
      });
  };
}

// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtcGxveWVlQGdtYWlsLmNvbSIsInJvbGVzIjoiZW1wbG95ZWUiLCJ1c2VySWQiOiI1Y2JmZmM0ZDA5MGI3YTY1YzZkOGQxMTAiLCJpYXQiOjE1NTYwODg5ODgsImV4cCI6MTU1NjA5MjU4OH0.nqAW-pARmpEQWZ8VUCdk_u7J7Vgjgrrj5OaZ3AtIKWY"
