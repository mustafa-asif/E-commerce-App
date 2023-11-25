import React from 'react'
import SignUp from '../Screens/SignUp';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import Error from '../Screens/Error';
import Sell from '../Screens/Sell';
import Cart from '../Screens/Cart';




    const routeList =[
        {
            path: "/",
            element: <SignUp /> 
        },
        {
            path: "/home",
            element:<Home/>
        },
        {
            path :'/login',
            element:<Login />
        },
        {
            path :'/sell',
            element:<Sell />
        },
        {
            path :'/cart',
            element:<Cart />
        },
        {
            path: "*",
            element:<Error/>
        }
       
      
    
    ];
 


export default routeList;