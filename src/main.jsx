import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from './Layouts/MainLayout.jsx';
import Home from './Components/Home.jsx';
import SignIn from './Components/SignIn.jsx';
import LogIn from './Components/LogIn.jsx';
import AddToFindRoommate from './Components/AddToFindRoommate.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'/login',
        Component:LogIn
      },
      {
        path:'/signup',
        Component:SignIn
      },
      {
        path:'/addtofindroommate',
        Component:AddToFindRoommate
      }
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
     
    <RouterProvider router={router} />

     
  </StrictMode>,
)
