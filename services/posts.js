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