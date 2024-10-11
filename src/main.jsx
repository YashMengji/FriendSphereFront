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
  useEffect(async () => {
    awakeServerRecursion();
  }, [])

  // Add a retry function with delay
  const retryWithDelay = (fn, retries = 5, delay = 10000) => {
    return new Promise((resolve, reject) => {
      const attempt = (remainingAttempts) => {
        fn()
          .then(resolve)
          .catch((error) => {
            if (remainingAttempts === 0) {
              reject(error); // If no retries left, throw error
            } else {
              console.log(`Retrying... Attempts left: ${remainingAttempts}`);
              setTimeout(() => attempt(remainingAttempts - 1), delay); // Wait before retrying
            }
          });
      };
      attempt(retries); // Start first attempt
    });
  };

  // Awake the server with retries
  const awakeServerRecursion = async () => {
    try {
      await retryWithDelay(awakeServer, 5, 10000); // Retry 5 times, with 10s delay
      console.log("Server is awake!");
    } catch (error) {
      console.error("Error waking up server:", error);
    }
  };

  return (
    <StrictMode>
      <RouterProvider router={createRouter}/>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Main />)
