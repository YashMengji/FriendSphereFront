import React, { useEffect, useState } from 'react';
import FriendRequest from './FriendRequest';
import { useUser } from '../contexts/UserContext';

function Notification() {
  const { users, dToken } = useUser();
  const [friendRequestsReceived, setFriendRequestsReceived] = useState([]);

  // Use useEffect to update state only when users or dToken change
  useEffect(() => {
    const currentUser = users.find(user => user._id === dToken.userId);
    if (currentUser) {
      setFriendRequestsReceived(currentUser.friendRequestsReceived || []);
    }
  }, [users, dToken]); // Run this effect when users or dToken changes

  return (
    <div className="notification-div">
      {
        users.map(user => (
          friendRequestsReceived.includes(user._id) && (
            <FriendRequest key={user._id} user={user} />
          )
        ))
      }
    </div>
  );
}

export default Notification;
