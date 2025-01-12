import React, { useEffect } from 'react'
// import { getPosts } from '../services/posts'
import { createComment } from "../services/comments";
import CommentForm from "./CommentForm";
import {usePost} from "../contexts/PostContext"
import Post from "./Post";


function Posts() {



  const {posts} = usePost();

  useEffect(() => {
    // console.log(posts)
  }, [posts])
  return (
    <div className="posts-div">
      {
        posts?.map((post) => {
          return (
            <Post key={post._id} post={post} posts={posts}/>
          )
        })
      }
    </div>
  )


}

export default Posts