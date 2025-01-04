import React from 'react'
import Comment from './Comment'

function CommentList({comments, getReplies, createLocalComment, updateLocalComment, deleteLocalComment}) {
  return (
    <div>
      {comments.map(comment => 
        <div key={comment._id} className='comment-stack'>
          <Comment 
            {...comment} 
            getReplies={getReplies} 
            createLocalComment={createLocalComment} 
            updateLocalComment={updateLocalComment} 
            deleteLocalComment={deleteLocalComment} 

          />
        </div>
      )}
    </div>
  )
}

export default CommentList