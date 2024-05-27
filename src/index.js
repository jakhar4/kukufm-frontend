import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'

import Layout from './components/Layout/Layout';
import Home from './pages/Home'
import Audiobook from './pages/Audiobook'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { AuthProvider } from './store/auth';
import Logout from './pages/Logout';
import Explore from './pages/Explore';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {index: true ,element: <Home />},
      {path: 'audiobook/:id' ,element: <Audiobook/>},
      {path: 'signin' ,element: <Signin />},
      {path: 'signup' ,element: <Signup />},
      {path: 'logout' ,element: <Logout />},
      {path: 'explore' ,element: <Explore />}
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
);
