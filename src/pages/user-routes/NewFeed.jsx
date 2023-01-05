import React from 'react'
import { Container } from 'reactstrap'
import Base from '../../components/Base'
import PrivateNewFeed from '../../components/PrivateNewFeed'

const NewFeed=()=> {
  return (
    <Base>
    <Container className="mt-3">
    <PrivateNewFeed/>
    </Container>
      
    </Base>
  )
}

export default NewFeed