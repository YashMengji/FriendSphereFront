import React from 'react'
import { useState, useEffect } from "react"
import { useAsync, useAsyncFn } from '../hooks/useAsync'
import { createComment } from "../services/comments";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { Link } from "react-router-dom"
import { use } from 'react';
import { useMemo } from 'react';


function Post({post}) {

  const [showComments, setShowComments] = useState(true)
  const [comments, setComments] = useState([]);
  const [rootComments, setRootComments] = useState([]);

  const {loading, error, execute: createCommentFn} = useAsyncFn(createComment);

  useEffect(() => {
    if(post?.comments == null) return undefined;
    setComments(post.comments);
  }, [post?.comments]);

  const commentsByParentId = useMemo(() => {
    if(comments == null) return []
    const group = {};
    comments.forEach(comment => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    
    return group;
  }, [comments]);
  
  useEffect(() => {
    setRootComments(commentsByParentId[undefined])
  }, [commentsByParentId])
  

  function getReplies(parentId){
    return commentsByParentId[parentId]
  }

  function onCommentCreate(message) {
    return createCommentFn({postId: post._id, message}).then( createLocalComment )
  }

  function createLocalComment(comment) {
    setComments(prevComments => [comment, ...prevComments]);  
  }
  function updateLocalComment(commentId, message) {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if(commentId == comment._id){
          return {...comment, message};
        }
        else{
          return comment;
        }
      })
    });  
  }
  function deleteLocalComment(commentId) {
    // console.log(comments);
    setComments(prevComments => {
      return prevComments.filter(comment => comment._id !== commentId); // Filter out the comment to delete
    });
  }

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
      <div className={`div-post-comment-section ${showComments ? "" : "display-none"}`}>
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
              <CommentList
                comments={rootComments}
                getReplies={getReplies}
                createLocalComment={createLocalComment}
                updateLocalComment={updateLocalComment}
                deleteLocalComment={deleteLocalComment}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post