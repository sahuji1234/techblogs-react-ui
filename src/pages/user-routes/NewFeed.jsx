import React from 'react'
import { Container } from 'reactstrap'
import Base from '../../components/Base'
import PrivateNewFeed from '../../components/PrivateNewFeed'
import image from "../../img/login.jpg";
const NewFeed=()=> {
  return (
  
    <div  style={{ backgroundImage:`url(${image})` ,
    height:'100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',} }>
    <Base>
     
    <Container className="mt-3">
    <PrivateNewFeed/>
    </Container>
    
    </Base>
    </div>
   
  )
}

export default NewFeed