import React from 'react'
import { useState, useRef } from 'react';
import { useAsyncFn } from '../hooks/useAsync';
import { createPost } from '../services/posts';
import { usePost } from '../contexts/PostContext';
import { toast } from 'react-toastify';
import { useUser } from '../contexts/UserContext';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const imageTextRef = useRef(null);
  const { posts, setPosts } = usePost();
  const {logUser} = useUser();

  const createPostFn = useAsyncFn(createPost); 

  function onCreatePost(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    createPostFn.execute(formData)
      .then((newPost) => {
        // console.log(newPost);
        setTitle('');
        setContent('');
        setImage(null)
        imageTextRef.current.innerText = 'Drop or Choose an image';
        setPosts(prev => [...prev, newPost]);
        // console.log(posts);
        toast.success('Post created successfully!', { position: 'top-right', autoClose: 3000 });
      })
      .catch((error) => {
        toast.error(error);
      });

  }

  return (
    <div className="create-blog-div">
      <div className="div-create-blog-heading">
        Create Post
      </div>
      <div className="div-create-blog-form">
        <form className="create-blog-form" onSubmit={onCreatePost}>
          <div className="div-create-blog-title-input">
            <div className="div-create-blog-title-input-label">Title</div>
            <input required type="text" className="create-blog-title-input" placeholder="Enter Title of Post" value={title} onChange={(e) => { setTitle(e.target.value) }} />
          </div>
          <div className="div-create-blog-content-input">
            <div className="div-create-blog-content-input-label">
              Content
            </div>
            <textarea required className="create-blog-content-input" placeholder="Write Content for Post" value={content} onChange={(e) => {setContent(e.target.value)}}></textarea>
          </div>
          <div className="div-create-blog-image-input">
            <div className="div-create-blog-image-input-label">
              Image
            </div>
            <label htmlFor="image-upload" className="image-upload-label" ref={imageTextRef}>
              Drop or Choose an image
            </label>
            <input
              type="file"
              id="image-upload"
              className="create-blog-image-input"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0])
                imageTextRef.current.innerText = e.target.files[0].name;
              }}
            />
          </div>
          <div className="div-create-blog-post-button">
            <button type='submit' className="create-blog-post-button" disabled={createPostFn.loading}>Post</button>
          </div>
        </form>
      </div>
    </div>
  )

}

export default CreatePost