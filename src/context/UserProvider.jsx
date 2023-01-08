import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import userContext from './userContext'

function UserProvider({children}) {
const [user,setUser] =useState({
    name:'suraj'
})
 useEffect(()=>{
          setUser({
            name:"suraj sahu"
          })
 },[])
  return (
   <userContext.Provider value={user}>
      {children}
   </userContext.Provider>
  )
}

export default UserProvider