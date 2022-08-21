import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { isLoggedIn } from '../auth';

const PrivateRoute=()=> {
 
//  if(isLoggedIn()){
//     return <Outlet/>
//  }else{
//     return <Navigate to={"/login"}/>
// }

return isLoggedIn() ? <Outlet/> : <Navigate to={"/login"}/>
}

export default PrivateRoute