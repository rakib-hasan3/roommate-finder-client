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
import BrowseListing from './Components/BrowseListing.jsx';
import VewDetails from './Components/ViewDetails.jsx';
 import MyFavoriteList from './Components/MyFavoriteList.jsx';
import MyListings from './Components/MyListings.jsx';
import AuthProvider from './Contexts/AuthProvider.jsx';
import PrivateRoute from './Contexts/privateRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
      {
        index:true,
        loader:()=>fetch('https://roommate-finder-server-site.onrender.com/addtofindroommate'),
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
        Component: () => (
          <PrivateRoute>
            <AddToFindRoommate />
          </PrivateRoute>
        )
      },
      {
        path:'/browselisting',
        loader:()=>fetch('https://roommate-finder-server-site.onrender.com/browselisting'),
        Component:BrowseListing
      },
      {
        path:'/viewdetails/:id',
        loader:({params})=>fetch(`https://roommate-finder-server-site.onrender.com/viewdetails/${params.id}`),
        Component:VewDetails
      },
      {
        path:'/mylist',
        
         Component: () => (
          <PrivateRoute>
            <MyFavoriteList />
          </PrivateRoute>
        )
      },
      {
        path:'/ownlistings',
         Component: () => (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
         )
      },
      {
        path: "/update/:id",
        element: <AddToFindRoommate />,
      }


    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
            <RouterProvider router={router} />
     </AuthProvider> 
  </StrictMode>,
)
