import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import Register from '../components/Register.jsx'
import Login from '../components/Login.jsx'
import UserContext from '../contexts/UserContext.jsx'
import Home from '../components/Home.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import Notification from '../components/Notification.jsx'
import { awakeServer } from '../services/users.js'
import { useAsync } from '../hooks/useAsync.js'

const createRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: '/home',
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/notification", 
          element: (
            <ProtectedRoute>
              <Notification/>
            </ProtectedRoute>
          )
        }, 
      ]
    }
  ]
)

const Main = () => {
  const {loading, error, value} = useAsync(awakeServer);

  useEffect(() => {
    if (!loading && !error && value) {
      // Redirect to the desired URL after the async operation completes successfully
      window.location.href = "https://friendspherefront.onrender.com/";
    }
  }, [loading, error, value]);  // Depend on the async state
  
  return (
    <StrictMode>
      <RouterProvider router={createRouter}/>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Main />)
