
import React from 'react'
import { useState } from 'react';

function CommentForm({loading, error, initialValue="", autoFocus=false, onSubmit, zeroZ=false}) {
  const [message, setMessage] = useState(initialValue);

  function handleSubmit(e){
    e.preventDefault();
    onSubmit(message)
    .then(() => setMessage(""))
    .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
  }

  return (
    <form onSubmit={handleSubmit} className={`comment-form ${zeroZ ? "zero-z-index" : ""}`} >
      <div className="comment-form-row">
        <textarea
          autoFocus= {autoFocus}
          value={message} 
          className='message-input' 
          id='message'
          name='message'
          onChange={(e) => {setMessage(e.target.value)}}
        />
        <button className="btn post-btn" disabled={loading} type='submit'>
          {loading ? "Loading..." : "Post"}
        </button>
      </div>  
      <div className="error-msg">
        {error}
      </div>
    </form>
  )
}

export default CommentForm