import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAsyncFn } from '../hooks/useAsync';
import { sendRequest, unFriend, removeRequest } from '../services/users';
import { useRef } from 'react';
import { useUser } from '../contexts/UserContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function User({user, isFriendGlobal=false, isRequestSentGlobal=false}) {

  const {_id, fname, lname, username, image} = user;
  const buttonRef = useRef(null);
  const unFriendBtnRef = useRef(null);
  const requestedBtnRef = useRef(null);
  const {userId} = useUser();
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const {logUser} = useUser();

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
      .catch(error => {
        toast.error(error, { position: 'top-right', autoClose: 3000 });
      })
  }
  function onUnFriend() {
    unFriendFn.execute({receiverId: _id})
      .then((ack) => {
        if(ack){
          setIsFriend(false);
        }
      })
      .catch(error => {
        toast.error(error, { position: 'top-right', autoClose: 3000 });
      })
  }
  function onRemoveRequest() {
    removeRequestFn.execute({receiverId: _id})
      .then((ack) => {
        if(ack){
          setIsRequestSent(false);
        }
      })
      .catch(error => {
        toast.error(error, { position: 'top-right', autoClose: 3000 });
      })
  }

  return (
    <div className="user-div">
      <div className="div-profile-img">
        <img src={image} className='profile-img'/>
      </div>
      <div className="div-profile-details"> 
        <div className="div-profile-name ">{fname} {lname}</div>
        <div className="div-profile-username ">
          <Link to={`/users/${_id}`} className="user-username">
            {username}
          </Link>
        </div>
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