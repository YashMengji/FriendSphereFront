import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Cookies from 'js-cookie'; // Import js-cookie to easily manage cookies
import { useNavigate } from 'react-router-dom';
import UserContext from "../contexts/UserContext";
import { useEffect } from "react";

function App(){

  const navigate = useNavigate();
  const location = useLocation(); // Get current location (route)


  useEffect(() => {
    const token = Cookies.get('token');
    if (location.pathname == "/" && token) {
      navigate('/home');
    }
  }, [location.pathname]);


  return (
    <>   
      <UserContext>
        <Navbar/>
        <Outlet/>
      </UserContext>
    </>
  )
}

export default App
