import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getOnePost } from "../services/posts";
import { useState } from 'react';

export const postContext = createContext();

export function usePost(){
  return useContext(postContext)
}

// Here childern is automatically passed when any <PostContext> <Post/> <PostContext /> 
function PostContext({children}) {
  
  const {id} = useParams();
  const {loading, error, value: post} =  useAsync(() => getOnePost(id), [id]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if(post?.comments == null) return undefined;
    setComments(post.comments);
  }, [post?.comments]);

  useEffect(() => {
    console.log(comments);
  }, [comments])

  const commentsByParentId = useMemo(() => {
    if(comments == null) return []
    const group = {};
    comments.forEach(comment => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });

    return group;
  }, [comments]);

  function getReplies(parentId){
    return commentsByParentId[parentId]
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
    console.log(comments);
    setComments(prevComments => {
      return prevComments.filter(comment => comment._id !== commentId); // Filter out the comment to delete
    });
  }
  

  return (
    <postContext.Provider value={
        {
          post: {id, ...post}, //id is const defined above...doing this because on server side we haven't extracted _id from database and sent along with post object
          rootComments: commentsByParentId[undefined],
          getReplies,
          createLocalComment,
          updateLocalComment,
          deleteLocalComment,
        }                        
      }
    > 
    {
      loading ? (<h1>Loading...</h1>) :
      error ? (<h1>Error</h1>) :
      children
    }
    </postContext.Provider>
  )
}

export default PostContext