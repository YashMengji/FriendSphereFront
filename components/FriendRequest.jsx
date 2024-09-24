import React from 'react'
import { useAsyncFn } from '../hooks/useAsync';
import { acceptRequest , rejectRequest} from '../services/users';
import { useRef } from 'react';


function FriendRequest({user}) {
  const {_id, fname, lname, username} = user;
  const acceptButtonRef = useRef(null);
  const rejectButtonRef = useRef(null);

  const acceptRequestFn = useAsyncFn(acceptRequest);
  const rejectRequestFn = useAsyncFn(rejectRequest);

  function acceptFriendRequest() {
    acceptRequestFn.execute({senderId: _id})
    .then(ack => {
      if(ack) {
        acceptButtonRef.current.style.backgroundColor = "green";
        acceptButtonRef.current.innerHTML = "Request Accepted";
        acceptButtonRef.current.disabled = true;
        rejectButtonRef.current.disabled = true;
      }
    })
  }
  function rejectFriendRequest() {
    rejectRequestFn.execute({senderId: _id})
    .then(ack => {
      if(ack) {
        rejectButtonRef.current.style.backgroundColor = "red";
        rejectButtonRef.current.innerHTML = "Request Rejected";
        rejectButtonRef.current.disabled = true;
        acceptButtonRef.current.disabled = true;
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
      <div className="div-request-friend-btn">
        <button ref={acceptButtonRef} className="accept-friend-btn " onClick={acceptFriendRequest}>
          Accept
        </button>
        <button ref={rejectButtonRef} className="reject-friend-btn " onClick={rejectFriendRequest}>
          Reject
        </button>
      </div>
    </div>
  )
}

export default FriendRequest