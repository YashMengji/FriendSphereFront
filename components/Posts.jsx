import React from 'react'
import { useState, useEffect } from "react"
// import { getPosts } from '../services/posts'
import { Link } from "react-router-dom"
import { useAsync, useAsyncFn } from '../hooks/useAsync'
import { createComment } from "../services/comments";
import CommentForm from "./CommentForm";
import {usePost} from "../contexts/PostContext"
import CommentList from "./CommentList";

function Posts() {

  const [showComments, setShowComments] = useState(false)

  const {post, posts, rootComments, createLocalComment, getCommentPerPost} = usePost();
  const {loading, error, execute: createCommentFn} = useAsyncFn(createComment);

  function onCommentCreate(message) {
    return createCommentFn({postId: post._id, message}).then( createLocalComment )
  }

  return (
    <div className="posts-div">
      {
        posts.map((post) => {
          return (
            <div className="div-post" key={post._id}>
              <div className="div-poster-info">
                <div className="div-poster-img">
                  <img className='poster-img' src="/images/defaultProfileImg.png" alt="Avatar" />
                </div>
                <div className="div-poster-username">
                  YashMengji
                </div>
              </div>
              <div className="div-post-title">
                {post.title}
              </div>
              <div className="div-post-body">
                {post.body}
              </div>
              <div className="div-post-img">
                <img src="/images/image.png" alt="" className="post-img" />
              </div>
              <div className="div-post-activity-bar">
                <div className="div-post-like">
                  <i className="fa-regular fa-heart fa-xl"></i>
                </div>
                <div className="div-post-comment" onClick={() => {getCommentPerPost(post._id)}}>
                  {
                    !showComments ? (<i className="fa-regular fa-comment fa-xl " onClick={() => setShowComments(true)}></i>) :
                      (<i className="fa-solid fa-comment fa-xl" onClick={() => setShowComments(false)}></i>)
                  }
                </div>
              </div>
              <div className="div-post-comment-section">
                <div className="div-comment-section-heading">
                  Comments
                </div>
                <div>
                  <CommentForm
                    loading={loading}
                    error={error}
                    onSubmit={onCommentCreate}
                  />
                  {rootComments != null && rootComments.length && (
                    <div className="mt-4">
                      <CommentList comments={rootComments} />
                    </div>
                  )}
                </div>
              </div>
            </div>

          )
        })
      }
    </div>
  )


}

export default Posts