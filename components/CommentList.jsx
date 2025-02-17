import React from 'react'
import Comment from './Comment'

function CommentList({ comments, getReplies, createLocalComment, updateLocalComment, deleteLocalComment, toggleLocalCommentLike }) {

  return (
    <div>
      {comments.map(comment => {
        // console.log(comment)
        return (
          <div key={comment._id} className='comment-stack'>
            <Comment
              {...comment}
              getReplies={getReplies}
              createLocalComment={createLocalComment}
              updateLocalComment={updateLocalComment}
              deleteLocalComment={deleteLocalComment}
              toggleLocalCommentLike={toggleLocalCommentLike}
            />
          </div>
        )
      }

      )}
    </div>
  )
}

export default CommentList