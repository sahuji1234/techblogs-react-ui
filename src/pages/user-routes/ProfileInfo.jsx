import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardBody, Col ,Container,Row, Table } from 'reactstrap'
import Base from '../../components/Base'
import ViewUserProfile from '../../components/ViewUserProfile'
import userContext from '../../context/userContext'
import { getUser } from '../../services/user-service'

const ProfileInfo=()=> {
  const object = useContext(userContext)
  const {userId} = useParams()
  const [user,setUser] = useState(null)

  useEffect(()=>{
    getUser(userId).then(data=>{
      console.log(data)
      setUser({...data})
    })
  },[])

const userView=()=>{
  return(
    <Row>
      <Col md={{size:6,offset:3}}>
       <ViewUserProfile user={user} />
      </Col>
    </Row>
  )
}

  return (
   <Base>
    {user ?userView():'loading user data'}
   </Base>
  )
}

export default ProfileInfo