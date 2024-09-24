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
    sendRequestFn.execute({receiverId: _id})
    .then(ack => {
      if(ack) {
        buttonRef.current.style.backgroundColor = "green";
        buttonRef.current.innerHTML = "Request Sent";
        buttonRef.current.disabled = true;
      }
    })
  }
  function onUnFriend() {
    unFriendFn.execute({receiverId: _id})
    .then(ack => {
      if(ack) {
        unFriendBtnRef.current.style.backgroundColor = "blue";
        unFriendBtnRef.current.innerHTML = "Add Friend";
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
            <button ref={unFriendBtnRef} className="add-friend-btn" style={{backgroundColor: "green"}} onClick={onUnFriend}>
              UnFriend
            </button>
          ) : (isRequestSent) ? (
            <button className="add-friend-btn" style={{backgroundColor: "blue"}} disabled>
              Request Sent
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