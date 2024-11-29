import { makeRequests } from "./makeRequests"

export function awakeServer(){
  return makeRequests(`/`, {
    method: "GET",
  })
}

export function createUser({fname, lname, username, password, email}){
  return makeRequests(`/register`, {
    method: "POST",
    data: {fname, lname, username, password, email},
  })
}

// export function checkUser({username, password}){
//   return makeRequests(`/login`, {
//     method: "POST",
//     data: {username, password},
//   })
// }
export function checkUser({ username, password }) {
  console.log("Attempting login with:", { username, password });
  return makeRequests(`/login`, {
    method: "POST",
    data: { username, password },
  })
    .then((data) => {
      console.log("Login Success:", data);
      return data;
    })
    .catch((error) => {
      console.error("Login Error:", error);
      throw error;
    });
}


export function getUser(){
  return makeRequests(`/users`, {
    method: "GET",
  })
}

export function sendRequest({receiverId}){ 
  return makeRequests(`/sendRequest`, {
    method: "POST",
    data: {receiverId},
  })
}

export function acceptRequest({senderId}){ 
  return makeRequests(`/acceptRequest`, {
    method: "POST",
    data: {senderId},
  })
}

export function rejectRequest({senderId}){ 
  return makeRequests(`/rejectRequest`, {
    method: "POST",
    data: {senderId},
  })
}

export function onLogout(){
  return makeRequests(`/logout`, {
    method: "POST",
  })
}

export function unFriend({receiverId}){
  return makeRequests(`/unFriend`, {
    method: "POST",
    data: {receiverId},
  })
}