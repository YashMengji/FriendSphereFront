import React from 'react'
// import { getPosts } from '../services/posts'
import { createComment } from "../services/comments";
import CommentForm from "./CommentForm";
import {usePost} from "../contexts/PostContext"
import Post from "./Post";


function Posts() {



  const {posts} = usePost();


  return (
    <div className="posts-div">
      {
        posts?.map((post) => {
          return (
            <Post key={post._id} post={post}/>
          )
        })
      }
    </div>
  )


}

export default Posts