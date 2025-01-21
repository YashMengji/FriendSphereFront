import React, { useEffect } from 'react'
import { useState } from 'react';
import { usePost } from '../contexts/PostContext';
import IconBtn from './IconBtn';
import {FaHeart, FaRegHeart, FaReply, FaEdit, FaTrash} from "react-icons/fa"
import CommentList from './CommentList';
import { createComment, updateComment, deleteComment } from '../services/comments';
import { useAsyncFn } from '../hooks/useAsync';
import CommentForm from './CommentForm';
import { useParams } from 'react-router-dom'
import { useUser } from '../contexts/UserContext';

// import mongoose from 'mongoose';

const dateFormatter = new Intl.DateTimeFormat(undefined /* location*/, {
  dateStyle: "medium",
  timeStyle: "short"
}); //Intilizing format object

function Comment({likedByMe, likeCount, _id, message, userId, postId, createdAt, getReplies = () => [], createLocalComment, updateLocalComment, deleteLocalComment}) {

  // Create special api to fetch currently logged in user (id form cookies) 
  // (to display edit comment of logged in user only) 
  // Cookies.get('userId') // to get userId from cookies
  // console.log(createdAt)

  const {dToken} = useUser();
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isLiked, setIsLiked] = useState(likedByMe);
  
  useEffect(() => {
    setLoggedInUserId(dToken?.userId);
  }, [dToken]) 

  const createCommentFn = useAsyncFn(createComment); // function returns {loading, error, execute} states
  const childComments = getReplies(_id);
  // const childComments = [];
  const updateCommentFn = useAsyncFn(updateComment);
  const deleteCommentFn = useAsyncFn(deleteComment);

  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function onCommentReply(message){
    return createCommentFn.execute({postId, message, parentId: _id})  
    .then( comment => {
      setIsReplying(false);
      createLocalComment(comment);
    })
  }
  function onCommentUpdate(message){
    return updateCommentFn.execute({postId, message, commentId: _id})  
    .then( updatedComment => {
      setIsEditing(false);
      updateLocalComment(_id, message);
    })
  }
  function onCommentDelete() {
    return deleteCommentFn.execute({postId, commentId: _id})  
    .then(({_id: commentId}) => {
      deleteLocalComment(commentId);
    })
  }

  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name">{userId?.username}</span>
          <span className="date">{dateFormatter.format(Date.parse(createdAt))}</span>
        </div>
        { isEditing ? 
          <CommentForm 
            initialValue={message} 
            autoFocus
            onSubmit={onCommentUpdate}
            loading={updateCommentFn.loading}
            error={updateCommentFn.error}
            zeroZ
          /> : 
          <div className="message">{message}</div> 
        }
        <div className="footer">
          <IconBtn 
            onClick={() => {setIsLiked(prev => !prev)}}
            Icon={isLiked ? FaHeart : FaRegHeart} 
            aria-label={likedByMe ? "Unlike" : "Like"}
          >
            {likeCount}
          </IconBtn>
          <IconBtn 
            onClick={() => setIsReplying(prev => !prev)} 
            isActive={isReplying} 
            Icon={FaReply} 
            aria-label={isReplying ? "Cancel Reply" : "Reply"} 
          />
          {loggedInUserId == userId?._id  && ( // Logic to display edit button to owner of comment
            <IconBtn 
              onClick={() => setIsEditing(prev => !prev)} 
              isActive={isEditing} 
              Icon={FaEdit} 
              aria-label={isEditing ? "Cancel Edit" : "Edit"} 
            />
          )}
          {loggedInUserId == userId?._id  && ( // Logic, to display delete button, to owner of comment
            <IconBtn 
              disabled = {deleteCommentFn.loading}
              onClick={onCommentDelete} 
              Icon={FaTrash} 
              aria-label="Delete" 
              color="danger"
            />
          )}
          {deleteCommentFn.error && (
            <div className='error-msg special'>Error:- {deleteCommentFn.error}</div>
          )}
        </div>
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            autoFocus
            loading={createCommentFn.loading}
            error={createCommentFn.error}
            onSubmit={onCommentReply} 
            zeroZ
          />
        </div>
      )}      
      {childComments?.length > 0 && (
        <>
          <div className={`nested-comments-stack ${areChildrenHidden ? "hide" : ""}`}>
            <button className='collapse-line' aria-label='Hide Replies' onClick={() => {setAreChildrenHidden(true)}} />
            <div className='nested-comments'>
              <CommentList 
                comments={childComments}
                getReplies={getReplies} 
                createLocalComment={createLocalComment} 
                updateLocalComment={updateLocalComment} 
                deleteLocalComment={deleteLocalComment} 
              />
            </div>
          </div>
          <button 
            className={`btn mt-1 show-replies-btn ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => {setAreChildrenHidden(false)}}
          >
            Show Replies
          </button>
        </>
      )}
    </>
  )
}

export default Comment