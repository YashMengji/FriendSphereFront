import React from 'react'
import { useState, useEffect, useRef } from "react"
import { useAsync, useAsyncFn } from '../hooks/useAsync'
import { createComment } from "../services/comments";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useMemo } from 'react';
import { useUser } from '../contexts/UserContext';
import { usePost } from '../contexts/PostContext';
import { set } from '@cloudinary/url-gen/actions/variable';
import { toast } from 'react-toastify';
import { deleteSinglePost } from '../services/posts';
import { togglePostLike } from '../services/posts';
import { Link } from 'react-router-dom';

function Post({post, setShowDeleteDialog, deletePost}) {

  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([]);
  const [rootComments, setRootComments] = useState([]);
  const elementsRef = useRef();
  const {logUser} = useUser();
  const {posts, setPosts} = usePost();
  
  const {loading, error, execute: createCommentFn} = useAsyncFn(createComment);
  const deleteSinglePostFn = useAsyncFn(deleteSinglePost);
  const togglePostLikeFn = useAsyncFn(togglePostLike);

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
  
  useEffect(() => {
    
  }, [deletePost])

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

  function onDeleteSinglePost() {
    // setShowDeleteDialog(true)
    // if(deletePost){
      deleteSinglePostFn.execute(post._id)
      .then(() => {
        setPosts(prevPosts => prevPosts.filter(p => p._id !== post._id))
        toast.success('Post Deleted Successfully!', { position: 'top-right', autoClose: 3000 });
      })
      .catch(error => {
        toast.error(error, { position: 'top-right', autoClose: 3000 });
      })
    // }
  }
  function toggleLocalCommentLike(id, addLike){
    // console.log(id, addLike);
    setComments(prevComments => {
      return prevComments.map(comment => {
        if(comment._id == id){
          return {
            ...comment, 
            likeCount: addLike ? comment.likeCount + 1 : comment.likeCount - 1,
            likedByMe: addLike ? true : false
          };
        }
        else{
          return comment;
        }
      })
    });
  }
  function onTogglePostLike(){
    return togglePostLikeFn.execute({postId: post._id})
    .then((addLike) => {
      // console.log(addLike);
      toggleLocalPostLike(post._id, addLike);
    })
    .catch((error) => {
      console.error(error);
    })
  }
  function toggleLocalPostLike(id, addLike){
    // console.log(id, addLike);
    setPosts(prevPosts => {
      return prevPosts.map(p => {
        if(p._id == id){
          return {
            ...p, 
            likeCountPost: addLike ? p.likeCountPost + 1 : p.likeCountPost - 1,
            likedByMePost: addLike ? true : false
          };
        }
        else{
          return p;
        }
      })
    });
  }

  return (
    <div className="div-post" key={post._id}>
      <div className="div-post-wrapper">
        <div className="div-poster-info">
          <div className="div-user-image-username-wrapper">
            <div className="div-poster-img">
              <img className='poster-img' src={`${post?.userId?.image || "/images/defaultProfileImg.png"}`} alt="Avatar" />
              {/* <img className='poster-img' src="/images/defaultProfileImg.png" alt="Avatar" /> */}

            </div>
            <div className='div-poster-username'>
              <Link to={`/users/${post?.userId?._id}`} className="poster-username">
                {post?.userId?.username}
              </Link>
            </div>
          </div>
          {
            logUser._id === post.userId._id && (
              <div className="div-post-delete-btn">
                <button disabled={deleteSinglePostFn.loading}  onClick={onDeleteSinglePost} className="post-delete-btn">Delete</button>
              </div>
            )
          }
         
        </div>
        <div className="div-post-title">
          {post.title}
        </div>
        <div className="div-post-body">
          {post.body}
        </div>
        <div className="div-post-img">
          {
            post?.image && <img src={post.image} alt="" className="post-img" />
          }
        </div>
      </div>
      <div className="div-post-activity-bar">
        <div className="div-post-like-comment">
          <div className="div-post-like">
            <div className="div-post-like-img" onClick={() => {onTogglePostLike()}}>
              <i className={`fa-regular ${post.likedByMePost ? "fa-solid" : ""} fa-heart fa-xl post-like`}></i>
            </div>
            <div className="div-post-like-count">
              {post.likeCountPost}
            </div>
          </div>
          <div className="div-post-comment" onClick={() => setShowComments(p => !p)}>
            {
              !showComments ? (<i className="fa-regular fa-comment fa-xl post-comment" ></i>) :
                (<i className="fa-solid fa-comment fa-xl post-comment" ></i>)
            }
          </div>
        </div>
        <div className="div-post-time">
          {new Date(post.createdAt).toLocaleDateString()}&nbsp;{new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      <div className={`div-post-comment-section ${showComments ? "show" : ""} fade-in`} ref={elementsRef}>
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
                toggleLocalCommentLike={toggleLocalCommentLike}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post