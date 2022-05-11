import Url from "./url";
import { Platform } from "react-native";

export function uploadPost(data, token) {
  const tokenBearer = "Bearer " + token;
  let description = data.description;
  let tags = data.tags;
  let recognized_users = data.recognized_users;
  let recognition_images = data.recognition_images;
  return dispatch => {
    let form = new FormData();
    form.append("description", data.description);
    form.append("tags", data.tags);
    form.append("panel", data.panel);
    form.append("recognized_users", data.recognized_users);
    data.recognition_images &&
      data.recognition_images.map(image => {
        let parts = image.path.split("/");
        let uri =
          Platform.OS === "android"
            ? image.path
            : image.path.replace("file://", "");
        let name = parts[parts.length - 1];
        let type = image.mime;

        const file = {
          uri,
          name,
          type
        };
        form.append("recognition_images", file);
      });

    fetch(Url + "/create/recognition-post", {
      method: "POST",
      headers: {
        // Accept: "application/json",
        Authorization: tokenBearer,
        "Content-Type": "multipart/form-data"
      },
      body: form
    })
      .then(response => response.json())
      .then(responseData => {
        // console.warn("UPLOAD POST", responseData);
        dispatch({ type: "UPLOAD_POST", responseData });
      })
      .catch(err => alert(err.message));
  };
}

export function getHashTags(searchKey, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/get/hash-tags?searchPattern=" + searchKey, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        // console.warn("gethashtags", responseData);
        dispatch({ type: "GET_TAGS", responseData });
      })
      .catch(err => alert(err));
  };
}

export function getUserList(searchKey, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/get/userlist?searchPattern=" + searchKey, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("getuserlist", responseData);
        dispatch({ type: "GET_USERLIST", responseData });
      })
      .catch(err => alert(err));
  };
}

export function getAllPost(skip, count, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/get/recogniton-posts?count=" + count + "&skip=" + skip, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("getAllPost", responseData);
        dispatch({ type: "GET_ALL_POST", responseData });
      })
      .catch(err => alert(err));
  };
}

export function deletePost(id, token) {
  console.warn(id);
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/delete/recognition-post?post_id=" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("delete post", responseData);
        dispatch({ type: "DELETE_POST", responseData });
      })
      .catch(err => alert(err));
  };
}

export function toggleLike(data, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/post/recognition/like-unlike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("like", responseData);
        dispatch({ type: "LIKE_UNLIKE", responseData });
      })
      .catch(err => alert(err));
  };
}

export function viewComments(count, skip, id, token) {
  console.warn(count, skip);
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(
      Url +
        "/get/recogniton-post/comments?skip=" +
        skip +
        "&count=" +
        count +
        "&post_id=" +
        id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenBearer
        }
      }
    )
      .then(response => response.json())
      .then(responseData => {
        console.warn("Coments", responseData);
        dispatch({ type: "GET_ALL_COMMENTS", responseData });
      })
      .catch(err => alert(err));
  };
}

export function viewReplyOfComments(count, skip, id, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(
      Url +
        "/get/recogniton-comment/replies?skip=" +
        skip +
        "&count=" +
        count +
        "&comment_id=" +
        id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenBearer
        }
      }
    )
      .then(response => response.json())
      .then(responseData => {
        console.warn("replies", responseData);
        dispatch({ type: "GET_REPLIES", responseData });
      })
      .catch(err => alert(err));
  };
}

export function toggleLikeOfComment(data, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/post/recognition-comment/like-unlike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        // console.warn("like coment", responseData);
        dispatch({ type: "LIKE_UNLIKE_COMMENT", responseData });
      })
      .catch(err => alert(err));
  };
}

export function toggleLikeOfReply(data, token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/post/recognition-comment/like-unlike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("like reply", responseData);
        dispatch({ type: "LIKE_UNLIKE_REPLY", responseData });
      })
      .catch(err => alert(err));
  };
}

export function uploadComment(data, token) {
  const tokenBearer = "Bearer " + token;
  let comment_body = data.comment_body;
  let recognition_post = data.recognition_post;
  let tagged_users = data.tagged_users;
  let post_createdBy = data.post_createdBy;
  let comment_images = data.comment_images;
  return dispatch => {
    let form = new FormData();
    form.append("comment_body", comment_body);
    form.append("recognition_post", recognition_post);
    form.append("tagged_users", tagged_users);
    form.append("post_createdBy", post_createdBy);
    data.comment_images &&
      data.comment_images.map(image => {
        let parts = image.path.split("/");
        let uri =
          Platform.OS === "android"
            ? image.path
            : image.path.replace("file://", "");
        let name = parts[parts.length - 1];
        let type = image.mime;

        const file = {
          uri,
          name,
          type
        };
        form.append("comment_images", file);
      });

    fetch(Url + "/post/recogniton-comment", {
      method: "POST",
      headers: {
        // Accept: "application/json",
        Authorization: tokenBearer,
        "Content-Type": "multipart/form-data"
      },
      body: form
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("SUBMIT COMMENT", responseData);
        dispatch({ type: "UPLOAD_COMMENT", responseData });
      })
      .catch(err => alert(err.message));
  };
}

export function uploadReply(data, token) {
  const tokenBearer = "Bearer " + token;
  let comment_body = data.comment_body;
  let comment_id = data.comment_id;
  let post_id = data.post_id;
  let post_created_by = data.post_created_by;
  let comment_created_by = data.comment_created_by;
  let comment_creator_fullname = data.comment_creator_fullname;
  let tagged_users = data.tagged_users;
  let comment_images = data.comment_images;
  return dispatch => {
    let form = new FormData();
    form.append("comment_body", comment_body);
    form.append("comment_id", comment_id);
    form.append("post_id", post_id);
    form.append("post_created_by", post_created_by);
    form.append("comment_created_by", comment_created_by);
    form.append("comment_creator_fullname", comment_creator_fullname);
    form.append("tagged_users", tagged_users);
    data.comment_images &&
      data.comment_images.map(image => {
        let parts = image.path.split("/");
        let uri =
          Platform.OS === "android"
            ? image.path
            : image.path.replace("file://", "");
        let name = parts[parts.length - 1];
        let type = image.mime;

        const file = {
          uri,
          name,
          type
        };
        form.append("comment_images", file);
      });

    fetch(Url + "/post/recognition/reply-comment", {
      method: "POST",
      headers: {
        // Accept: "application/json",
        Authorization: tokenBearer,
        "Content-Type": "multipart/form-data"
      },
      body: form
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("SUBMIT REPLY", responseData);
        dispatch({ type: "UPLOAD_REPLY", responseData });
      })
      .catch(err => alert(err.message));
  };
}

export function getNotifications(token) {
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/notifications?skip=0&limit=5", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("notifications", responseData);
        dispatch({ type: "GET_NOTIFICATIONS", responseData });
      })
      .catch(err => alert(err));
  };
}

export function openRecogNotification(data, token) {
  console.warn("open");
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(
      Url +
        "/open/notification?moduleType=" +
        data.moduleType +
        "&moduleId=" +
        data.moduleId +
        "&_id=" +
        data._id +
        "&status=" +
        data.status,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenBearer
        }
      }
    )
      .then(response => response.json())
      .then(responseData => {
        console.warn("open notificationß", responseData);
        dispatch({ type: "OPEN_NOTIFICATION", responseData });
      })
      .catch(err => alert(err));
  };
}

export function getRatings(type, token) {
  // console.warn("type", type);
  const tokenBearer = "Bearer" + " " + token;
  return dispatch => {
    fetch(Url + "/get/recognized-users/data?type=" + type, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenBearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.warn("ratings", responseData);
        dispatch({ type: "RATINGS", responseData });
      })
      .catch(err => alert(err));
  };
}

// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtcGxveWVlQGdtYWlsLmNvbSIsInJvbGVzIjoiZW1wbG95ZWUiLCJ1c2VySWQiOiI1Y2JmZmM0ZDA5MGI3YTY1YzZkOGQxMTAiLCJpYXQiOjE1NTYwODg5ODgsImV4cCI6MTU1NjA5MjU4OH0.nqAW-pARmpEQWZ8VUCdk_u7J7Vgjgrrj5OaZ3AtIKWY"
