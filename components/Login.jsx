import React, { useState } from 'react'
import { useAsyncFn } from '../hooks/useAsync';
import { checkUser } from '../services/users';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate hook
import { useUser } from '../contexts/UserContext';

function Login() {

  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");

  const checkUserFn = useAsyncFn(checkUser);
  const {setShowLogoutBtn} = useUser();
  const navigate = useNavigate(); // Initialize navigate

  function onUserLogin(e){
    e.preventDefault(); // Prevent default form submission
    checkUserFn.execute({username, password})
    .then(user => {
      setUsername("");
      setPassword("");
      setShowLogoutBtn(true);
      if (user) {
        // Navigate to /home on successful login
        navigate("/home");
        // Refresh the page
        window.location.reload();
      }
    })
  }
  
  return (
    <div className="div-full-container">
      <div className="div-login-form">
        <div className="div-logo-img">
          <img src="/images/logo_img.jpg" className="logo-img" />
        </div>
        <div className="div-sign-text">
          Sign in
        </div>
        <form onSubmit={onUserLogin} className='login-form'>
          <input required value={username} onChange={e => setUsername(e.target.value)} type="text" className="username-input" placeholder="Username"/>
          <input required value={password} onChange={e => setPassword(e.target.value)} type="password" className="password-input" placeholder="Password"/>
          <Link to="/register" className="register-link">New Here? Register</Link>
          <button disabled={checkUserFn.loading} type='submit' className="login-btn">Login</button>
          {checkUserFn.error && (
            <div className="div-login-error">
              {checkUserFn.error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

 export default Login