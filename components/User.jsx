import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAsyncFn } from '../hooks/useAsync';
import { sendRequest, unFriend, removeRequest } from '../services/users';
import { useRef } from 'react';
import { useUser } from '../contexts/UserContext';

function User({user, isFriendGlobal=false, isRequestSentGlobal=false}) {

  const {_id, fname, lname, username} = user;
  const buttonRef = useRef(null);
  const unFriendBtnRef = useRef(null);
  const requestedBtnRef = useRef(null);
  const {userId} = useUser();
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    if(isFriendGlobal){
      setIsFriend(true);
    }
    if(isRequestSentGlobal){
      setIsRequestSent(true);
    }
    
  }, [isFriendGlobal, isRequestSentGlobal])


  const sendRequestFn = useAsyncFn(sendRequest)
  const unFriendFn = useAsyncFn(unFriend);
  const removeRequestFn = useAsyncFn(removeRequest);

  function sendFriendRequest() {
    sendRequestFn.execute({receiverId: _id})
      .then((ack) => {
        if(ack){
          setIsRequestSent(true);
        }
      })
  }
  function onUnFriend() {
    unFriendFn.execute({receiverId: _id})
      .then((ack) => {
        if(ack){
          setIsFriend(false);
        }
      })
  }
  function onRemoveRequest() {
    removeRequestFn.execute({receiverId: _id})
      .then((ack) => {
        if(ack){
          setIsRequestSent(false);
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
            <button ref={unFriendBtnRef} className="add-friend-btn" style={{backgroundColor: "#878787"}} onClick={onUnFriend} disabled={unFriendFn.loading}>
              Un-Friend
            </button>
          ) : (isRequestSent) ? (
            <button ref={requestedBtnRef} className="add-friend-btn" style={{backgroundColor: "#878787"}} onClick={onRemoveRequest} disabled={removeRequestFn.loading} >
              Requested
            </button>
          ) : (
            <button ref={buttonRef} className="add-friend-btn" onClick={sendFriendRequest} disabled={sendRequestFn.loading}> 
              Add Friend
            </button>
          )
        }
      </div>
    </div>
  )
}

export default User