import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import SignUp from "../components/Register/SignUp";
import Update from "../components/Update/Update";
import AllUsers from "../components/AllUsers/AllUsers";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:'/',
            element: <Home/>
        },
        {
            path:'/login',
            element: <Login/>
        },
        {
            path:'/reg',
            element: <SignUp/>
        },
        {
            path:'/update',
            element: <Update/>
        },
        {
            path:'/allusers',
            element: <AllUsers/>
        },
      ]
    },
  ]);