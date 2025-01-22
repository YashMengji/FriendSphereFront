import React, { useState, useEffect } from 'react'
// import { getPosts } from '../services/posts'
import { createComment } from "../services/comments";
import CommentForm from "./CommentForm";
import {usePost} from "../contexts/PostContext"
import Post from "./Post";


function Posts() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(true);
  const [deletePost, setDeletePost] = useState(false);


  const {posts} = usePost();

  useEffect(() => {
    console.log(posts)
  }, [posts])
  return (
    <>
      <div className="posts-div">
        {
          posts?.map((post) => {
            return (
              <Post key={post._id} post={post} posts={posts} setShowDeleteDialog={setShowDeleteDialog} deletePost={deletePost} />
            )
          })
        }
      </div>
      {/* {showDeleteDialog && (
        <div className="div-delete-dialog">
            <div className="delete-dialog">
              <h3>Are you sure you want to delete this post?</h3>
              <div>
                <button onClick={() => {setDeletePost(true); setShowDeleteDialog(false)}}>Yes</button>
                <button onClick={() => setShowDeleteDialog(false)}>No</button>
              </div>
            </div>
        </div>
      )} */}
    </>
  )


}

export default Posts