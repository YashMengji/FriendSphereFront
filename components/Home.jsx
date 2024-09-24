import React, { useEffect, useState } from 'react'
import User from './User'
import { useUser } from '../contexts/UserContext'


function Home() {

  const {users, setUsers, dToken, search} = useUser();
  const [friends, setFriends] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [friendRequestsSent, setFriendRequestsSent] = useState([]);
  const [searchResults, setSearchResults] = useState([]); 
  console.log(users);

  useEffect(() => {
    const currentUser = users.find(user => user._id === dToken.userId);
    if (currentUser) {
      setFriends(currentUser.friends || []);
      setFriendRequestsSent(currentUser.friendRequestsSent || []);
    }
  }, [users, dToken]); // Run this effect when users or dToken changes

  useEffect(() => {
    if(search){
      setSearchResults( users.filter(user => user.fname.toLowerCase().includes(search.toLowerCase()) || user.lname.toLowerCase().includes(search.toLowerCase()) || user.username.toLowerCase().includes(search.toLowerCase())) );
      // console.log(searchResults);
    }
  }, [search]);




  return (
    <div className="home-div">
      {
          (search != "") ? (
            console.log(searchResults),
            searchResults.map(user => {
              if(friends.includes(user._id)){
                return <User key={user._id} user={user} isFriend />
              }
              else if(friendRequestsSent.includes(user._id)){
                return <User key={user._id} user={user} isRequestSent />
              }
              else if(user._id == dToken.userId){
                return null;
              }
              else{
                return <User key={user._id} user={user} />
              }
            })
          ) : (
            users.map(user => {
              if(friends.includes(user._id)){
                return <User key={user._id} user={user} isFriend />
              }
              else if(friendRequestsSent.includes(user._id)){
                return <User key={user._id} user={user} isRequestSent />
              }
              else if(user._id == dToken.userId){
                return null;
              }
              else{
                return <User key={user._id} user={user} />
              }
            })
          )
      }
    </div>
  )
}

export default Home