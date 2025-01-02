import { makeRequests } from "./makeRequests";

export function getPosts(){
  return makeRequests("/posts");
}

export function getOnePost(id){
  return makeRequests(`/posts/${id}`);
}