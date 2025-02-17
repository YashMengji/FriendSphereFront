import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAsyncFn } from '../hooks/useAsync'
import { editUser } from '../services/users'
import { toast } from 'react-toastify'
import { useRef } from 'react'
import { useUser } from '../contexts/UserContext'
import { createPost } from '../services/posts'
import { useParams } from 'react-router-dom';

function EditUser({isPublic}) {
  const { users, setUsers, logUser } = useUser();
  const [displayUser, setDisplayUser] = useState({});
  const { userId } = useParams(); 
  
  useEffect(() => {
    if(isPublic){
      const user = users.find(user => user._id.toString() == userId.toString());
      // console.log(user);
      setDisplayUser(user);
    }
  }, [])

  const [fname, setFname] = useState(logUser?.fname || "");
  const [lname, setLname] = useState(logUser?.lname || "");
  const [username, setUsername] = useState(logUser?.username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(logUser?.email || "");
  const [image, setImage] = useState(null);

  const imageTextRef = useRef(null);

  const editUserFn = useAsyncFn(editUser);

  function onUserEdit(e) {
    e.preventDefault();
    const formData = new FormData();
    if(fname.trim() !== "" && fname.trim() !== logUser?.fname){
      formData.append('fname', fname);
    }
    if(lname.trim() !== "" && lname.trim() !== logUser?.lname){
      formData.append('lname', lname);
    }
    if(username.trim() !== "" && username.trim() !== logUser?.username){
      formData.append('username', username);
    }
    if(password.trim() !== ""){
      formData.append('password', password);
    }
    if(email.trim() !== "" && email.trim() !== logUser?.email){
      formData.append('email', email);
    }
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
          setUsers(prev => [...prev, user]);
          imageTextRef.current.innerText = 'Drop or Choose an image';
          toast.info('User Edited successfully!', { position: 'top-right', autoClose: 3000 });
        }
      })
      .catch(error => {
        console.error(error);
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
            <img className='account-img' src={isPublic ? displayUser?.image : logUser?.image} alt="" />
          </div>
          <div className="div-account-name">
            <div className="div-account-name-label">
              Name:
            </div>
            <div className="div-account-name-text">
              {
                isPublic ?
                  displayUser?.fname?.split(" ").map(name => name.toLowerCase().charAt(0).toUpperCase() + name.toLowerCase().slice(1)) :
                  logUser?.fname.split(" ").map(name => name.toLowerCase().charAt(0).toUpperCase() + name.toLowerCase().slice(1))
              } 
              &nbsp;
              {
                isPublic ?
                  displayUser?.lname?.split(" ").map(name => name.toLowerCase().charAt(0).toUpperCase() + name.toLowerCase().slice(1)) :
                  logUser?.lname.split(" ").map(name => name.toLowerCase().charAt(0).toUpperCase() + name.toLowerCase().slice(1))
              }
            </div>
          </div>
          <div className="div-account-username">
            <div className="div-account-username-label">
              Username:
            </div>
            <div className="div-account-username-text">
              {
                isPublic ?
                  displayUser?.username :
                  logUser?.username
              }
            </div>
          </div>
          <div className="div-account-email">
            <div className="div-account-email-label">
              Email:
            </div>
            <div className="div-account-email-text">
              {
                isPublic ?
                  displayUser?.email :
                  logUser?.email
              }
            </div>
          </div>
        </div>

      </div>
      <div className={`div-edit-account-info ${isPublic ? 'display-none' : ''}`}>
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
              <input type="username" className="username-register-input edit" placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value) }} autoComplete='current-user' />
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