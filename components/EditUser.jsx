import React from 'react'
import { useState } from 'react'
import { useAsyncFn } from '../hooks/useAsync'
import { editUser } from '../services/users'
import { toast } from 'react-toastify'
import { useRef } from 'react'
import { useUser } from '../contexts/UserContext'
import { createPost } from '../services/posts'

function EditUser() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  const imageTextRef = useRef(null);
  const { users, setUsers } = useUser();

  const editUserFn = useAsyncFn(editUser);

  function onUserEdit() {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    if (image) {
      formData.append('image', image);
    }
    editUserFn.execute(formData)
      .then(user => {
        if (user) {
          setFname("");
          setLname("");
          setUsername("");
          setPassword("");
          setEmail("");
          setImage(null);
          setUsers([...users, user]);
          imageTextRef.current.innerText = 'Drop or Choose an image';
          toast.info('User Edited successfully!', { position: 'top-right', autoClose: 3000 });
        }
      })
  }

  return (
    <div className="edit-user-div">
      <div className="div-account-info">
        <div className="div-account-heading">
          Account Information
        </div>
        <hr />
        <div className="div-account-content">
          <div className="div-account-img">
            <img className='account-img' src="/images/defaultProfileImg.png" alt="" />
          </div>
          <div className="div-account-name">
            <div className="div-account-name-label">
              Name:
            </div>
            <div className="div-account-name-text">
              John Doe
            </div>
          </div>
          <div className="div-account-username">
            <div className="div-account-username-label">
              Username:
            </div>
            <div className="div-account-username-text">
              johndoe
            </div>
          </div>
          <div className="div-account-email">
            <div className="div-account-email-label">
              Email:
            </div>
            <div className="div-account-email-text">
              yash@gmail.com
            </div>
          </div>
        </div>

      </div>
      <div className="div-edit-account-info">
        <div className="div-edit-account-heading">
          Edit Account Information
        </div>
        <hr />
        <div className="div-edit-account-form">
          <form onSubmit={onUserEdit} className='register-form'>
            <div className="name-register-input">
              <input type="text" className="Fname-input edit" placeholder="First Name" value={fname} onChange={(e) => { setFname(e.target.value) }} />
              <input type="text" className="Lname-input edit" placeholder="Last Name" value={lname} onChange={(e) => { setLname(e.target.value) }} />
            </div>
            <div className="div-username-input">
              <input type="username" className="username-register-input edit" placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
              <input type="password" className="password-register-input edit" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <input type="email" className="email-register-input edit" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <label htmlFor="image-upload" className="image-upload-label edit-img" ref={imageTextRef}>
              Profile Image
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
            {editUserFn.error && (
              <div className="div-register-error">
                {editUserFn.error}
              </div>
            )}
            <button disabled={editUserFn.loading} type="submit" className="edit-btn">Edit details</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditUser