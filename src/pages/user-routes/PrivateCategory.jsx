import React from 'react'
import { Container } from 'reactstrap'
import Base from '../../components/Base'
import CategorySideMenu from '../../components/CategorySideMenu'
import image from "../../img/login.jpg";

const PrivateCategory=()=> {
  return (
    <div style={{ backgroundImage:`url(${image})` ,
    height:'100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',} }>
    <Base>
     <Container className="mt-3">
       <CategorySideMenu/>
    </Container> 
    </Base>
    </div>
  )
}

export default PrivateCategory