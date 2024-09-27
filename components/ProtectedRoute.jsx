import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRoute({ children }) {
  const token = Cookies.get('token');
  
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />; //Similar to navigate("/login", { replace: true }); BUT THIS FUNCTION THING SHLD BE SPECIFIED IN USEFFECT ONLY
  }

  // If token exists, render the children (protected component)
  return children;
}

export default ProtectedRoute;
