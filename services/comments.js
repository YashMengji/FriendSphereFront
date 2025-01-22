import { makeRequests } from "./makeRequests"

export function createComment({postId, message, parentId}){
  return makeRequests(`posts/${postId}/comments`, {
    method: "POST",
    data: {message, parentId},
  })
}

export function updateComment({postId, message, commentId}){
  return makeRequests(`posts/${postId}/comments/${commentId}`, {
    method: "PUT",
    data: {message},
  })
}

export function deleteComment({postId, commentId}) {
  return makeRequests(`posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
  })
}

export function toggleCommentLike({postId, commentId}){
  return makeRequests(`/posts/${postId}/comments/${commentId}/toggleLike`, {
    method: 'POST'
  });
}