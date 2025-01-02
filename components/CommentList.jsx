import React from 'react'
import Comment from './Comment'

function CommentList({comments}) {
  return (
    <div>
      {comments.map(comment => 
        <div key={comment._id} className='comment-stack'>
          <Comment {...comment}/>
        </div>
      )}
    </div>
  )
}

export default CommentList