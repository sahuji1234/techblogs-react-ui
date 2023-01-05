import React from 'react'
import { Container } from 'reactstrap'
import AddPost from '../../components/AddPost'
import Base from '../../components/Base'
import PrivateNewFeed from '../../components/PrivateNewFeed'

const Userdashboard=()=> {
  return (
    <Base>
    <Container>
        <AddPost/>
        <PrivateNewFeed/>
    </Container> 
    </Base>
  )
}

export default Userdashboard