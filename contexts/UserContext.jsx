import React, { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'
import { useAsync } from '../hooks/useAsync';
import { getUser } from '../services/users';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const userContext = createContext();

export function useUser() {
  return useContext(userContext)
}

function UserContext({ children }) {

  const [users, setUsers] = useState([])
  const [dToken, setDToken] = useState({});
  const [search, setSearch] = useState('');
  const {loading, error, value} = useAsync(getUser);
  const [showLogoutBtn, setShowLogoutBtn] = useState(Cookies.get('token') ? true : false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setDToken(jwtDecode(token));
    }
  },[])

  useEffect(() => {
    if(value){
      setUsers(value);
    }
  }, [value]);

  function createLocalUser(user) {
    setUsers(prevUsers => [user, ...prevUsers]); 
    console.log(users);
  }

  return (
    <userContext.Provider value={
      {
        createLocalUser,
        users,
        dToken,
        search,
        setSearch,
        setUsers,
        showLogoutBtn,
        setShowLogoutBtn,
      }
    }
    >
      {
        loading ? (<h1>Loading...</h1>) :
        error ? (<h1>Error</h1>) :
        children
      }
    </userContext.Provider>
  )
}

export default UserContext