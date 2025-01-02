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
  // const {loading, error, value: posts} = useAsync(getPosts)

  const [showComments, setShowComments] = useState(false)

  const posts = [
    {
      title: 'Post 1',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quis officiis nam debitis doloribus. Nam excepturi cumque, officia beatae laborum quas, reprehenderit nesciunt sit voluptatem perspiciatis iure consequatur similique architecto? Similique, nisi blanditiis!',
      _id: '1'
    }
  ]

  const {post, rootComments, createLocalComment} = usePost();
  const {loading, error, execute: createCommentFn} = useAsyncFn(createComment);

  function onCommentCreate(message) {
    return createCommentFn({postId: post.id, message}).then( createLocalComment )
  }

  // if(loading) return <h1>Loading</h1>
  // if(error) return <h1 className='error-msg'>{error}</h1>

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
                <div className="div-post-comment">
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