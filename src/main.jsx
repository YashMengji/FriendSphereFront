import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import Register from '../components/Register.jsx'
import Login from '../components/Login.jsx'
import Home from '../components/Home.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import Notification from '../components/Notification.jsx'
import Posts from '../components/Posts.jsx'

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
        {
          path: "/posts",
          element: (
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          )
        }
      ]
    }
  ]
)

const Main = () => {
  
  return (
    <StrictMode>
      <RouterProvider router={createRouter}/>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Main />)
