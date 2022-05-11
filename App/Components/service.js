import Url from "../Actions/url";

// export function getUserSuggestions(displayName = "") {
//   return dispatch => {
//     fetch("http://10.0.2.61:3206/get/userlist/r", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlJhaHVsZ3VwdGFAZ21haWwuY29tIiwicm9sZXMiOiJlbXBsb3llZSIsInVzZXJJZCI6IjVjZWUxYTg0MjJmY2U0Mjg5OWFhN2EzMiIsImlhdCI6MTU1OTcxOTI2MSwiZXhwIjoxNTU5ODA1NjYxfQ._2ZeJw3FNgYgiwWemKUOKu_zWUfQOYZ9Dl7vCOjNANw"
//       }
//     })
//       .then(res => res.json())
//       .then(responseData => {
//         console.warn("response", responseData);
//         dispatch({ type: "GET_USERLIST", responseData });
//       });
//   };
// }
// export const getUserSuggestions = (displayName = "") => {
//   return fetch(`http://10.0.2.61:3206/get/userlist/r`, {
//     method: "GET",
//     headers: {
//       "Content-type": "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlJhaHVsZ3VwdGFAZ21haWwuY29tIiwicm9sZXMiOiJlbXBsb3llZSIsInVzZXJJZCI6IjVjZWUxYTg0MjJmY2U0Mjg5OWFhN2EzMiIsImlhdCI6MTU1OTgxNzg4OCwiZXhwIjoxNTU5OTA0Mjg4fQ.2NP5XK9OsGQVq-n9DHIESctXkC5J6WJSKHDvpZbDzZA"
//     }
//   })
//     .then(res => res.json())
//     .then(responseData => {
//       console.warn("res.json()", responseData);
//       return responseData;
//     })
//     .catch(err => console.warn(err));
// };

export const getUserSuggestions = (displayName = "") => {
  return fetch(`http://10.0.2.61:3206/get/userlist/r`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlJhaHVsZ3VwdGFAZ21haWwuY29tIiwicm9sZXMiOiJlbXBsb3llZSIsInVzZXJJZCI6IjVjZWUxYTg0MjJmY2U0Mjg5OWFhN2EzMiIsImlhdCI6MTU1OTgxNzg4OCwiZXhwIjoxNTU5OTA0Mjg4fQ.2NP5XK9OsGQVq-n9DHIESctXkC5J6WJSKHDvpZbDzZA"
    }
  }).then(res => {
    // console.warn(res);
    if (!res.ok) {
      console.warn("res");
      throw new Error("Went wrong");
    }
    return res.json();
  });
};
