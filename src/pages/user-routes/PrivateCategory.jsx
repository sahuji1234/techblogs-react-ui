import React from 'react'
import { Container } from 'reactstrap'
import Base from '../../components/Base'
import CategorySideMenu from '../../components/CategorySideMenu'


const PrivateCategory=()=> {
  return (
    <Base>
     <Container className="mt-3">
       <CategorySideMenu/>
    </Container>
      
    </Base>
  )
}

export default PrivateCategory