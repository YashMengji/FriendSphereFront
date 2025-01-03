import React from 'react'
// import { getPosts } from '../services/posts'
import { createComment } from "../services/comments";
import CommentForm from "./CommentForm";
import {usePost} from "../contexts/PostContext"
import Post from "./Post";


function Posts() {



  const {post, posts, rootComments, createLocalComment} = usePost();


  return (
    <div className="posts-div">
      {
        posts.map((post) => {
          return (
            <Post post={post}/>
          )
        })
      }
    </div>
  )


}

export default Posts