import { makeRequests } from "./makeRequests"


export function createUser({fname, lname, username, password, email}){
  return makeRequests(`/auth/register`, {
    method: "POST",
    data: {fname, lname, username, password, email},
  })
}

export function checkUser({username, password}){
  return makeRequests(`/auth/login`, {
    method: "POST",
    data: {username, password},
  })
}

export function onLogout(){
  return makeRequests(`/auth/logout`, {
    method: "POST",
  })
}

export function getUser(){
  return makeRequests(`/u/users`, {
    method: "GET",
  })
}

export function sendRequest({receiverId}){ 
  return makeRequests(`/u/sendRequest`, {
    method: "POST",
    data: {receiverId},
  })
}

export function acceptRequest({senderId}){ 
  return makeRequests(`/u/acceptRequest`, {
    method: "POST",
    data: {senderId},
  })
}

export function rejectRequest({senderId}){ 
  return makeRequests(`/u/rejectRequest`, {
    method: "POST",
    data: {senderId},
  })
}

export function unFriend({receiverId}){
  return makeRequests(`/u/unFriend`, {
    method: "POST",
    data: {receiverId},
  })
}

export function removeRequest({receiverId}) {
  return makeRequests(`/u/removeRequest`, {
    method: "POST",
    data: {receiverId},
  })
}

export function editUser(formData){
  return makeRequests(`/u/editUser`, {
    method: "PUT",
    data: formData,
    Headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}
