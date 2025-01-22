import { makeRequests } from "./makeRequests";

export function getPosts(){
  return makeRequests("/posts");
}

export function getOnePost(id){
  return makeRequests(`/posts/${id}`);
}

export function createPost(formData) {
  return makeRequests('/posts', {
    method: 'POST',
    data: formData,
    Headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}

export function deleteSinglePost(id){
  return makeRequests(`/posts/${id}`, {
    method: 'DELETE'
  });
}

export function togglePostLike({postId}){
  return makeRequests(`/posts/${postId}/toggleLike`, {
    method: 'POST'
  });
}

