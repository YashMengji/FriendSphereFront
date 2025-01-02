import React from 'react'
import {useState, useEffect} from "react"
// import { getPosts } from '../services/posts'
import {Link} from "react-router-dom"
import { useAsync } from '../hooks/useAsync'

function Posts() {
  // const {loading, error, value: posts} = useAsync(getPosts)

  const posts = [
    {
      title: 'Post 1',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quis officiis nam debitis doloribus. Nam excepturi cumque, officia beatae laborum quas, reprehenderit nesciunt sit voluptatem perspiciatis iure consequatur similique architecto? Similique, nisi blanditiis!',
      _id: '1'
    }
  ]

  // if(loading) return <h1>Loading</h1>
  // if(error) return <h1 className='error-msg'>{error}</h1>

  return (
    <div className="posts-div">
      {
        posts.map((post) => {
                  return(
                    <div className="div-post" key={post._id}>
                      <div className="div-poster-info">
                        <div className="div-poster-img">
                          <img className='poster-img' src="/images/defaultProfileImg.png" alt="Avatar"  />
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
                          <i className="fa-regular fa-comment fa-xl "></i>
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