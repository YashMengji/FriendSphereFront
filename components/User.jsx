import React from 'react'
import { useAsyncFn } from '../hooks/useAsync';
import { sendRequest } from '../services/users';
import { useRef } from 'react';
import { useUser } from '../contexts/UserContext';
import { unFriend } from '../services/users';

function User({user, isFriend, isRequestSent}) {

  const {_id, fname, lname, username} = user;
  const buttonRef = useRef(null);
  const unFriendBtnRef = useRef(null);
  const {userId} = useUser();

  const sendRequestFn = useAsyncFn(sendRequest)
  const unFriendFn = useAsyncFn(unFriend);

  function sendFriendRequest() {
    buttonRef.current.style.backgroundColor = "#878787";
    buttonRef.current.innerHTML = "Request Sent";
    buttonRef.current.disabled = true;
    sendRequestFn.execute({receiverId: _id})
    .then(ack => {
      if(ack) {
      }
    })
    .catch(err => {
      
    })
  }
  function onUnFriend() {
    unFriendBtnRef.current.style.backgroundColor = "#1877F2";
    unFriendBtnRef.current.innerHTML = "Add Friend";
    unFriendFn.execute({receiverId: _id})
    .then(ack => {
      if(ack) {
      }
    })
  }

  return (
    <div className="user-div">
      <div className="div-profile-img">
        <img src="/images/defaultProfileImg.png" className='profile-img'/>
      </div>
      <div className="div-profile-details"> 
        <div className="div-profile-name ">{fname} {lname}</div>
        <div className="div-profile-username ">{username}</div>
      </div>
      <div className="div-add-friend-btn">
        {
          (isFriend) ? (
            <button ref={unFriendBtnRef} className="add-friend-btn" style={{backgroundColor: "#878787"}} onClick={onUnFriend}>
              Un-Friend
            </button>
          ) : (isRequestSent) ? (
            <button className="add-friend-btn" style={{backgroundColor: "#878787"}} disabled>
              Requested
            </button>
          ) : (
            <button ref={buttonRef} className="add-friend-btn" onClick={sendFriendRequest}>
              Add Friend
            </button>
          )
        }
      </div>
    </div>
  )
}

export default User