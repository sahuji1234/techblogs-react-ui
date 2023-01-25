import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col ,Container,Row, Table } from 'reactstrap'
import { getCurrentUserDetails, isLoggedIn } from '../auth'

const ViewUserProfile=({user})=> {

const [currentUser,setCurrentUser] = useState(null)
const [login, setLogin] =useState(false)
useEffect(()=>{
    setCurrentUser(getCurrentUserDetails())
    setLogin(isLoggedIn())
},[])
  return (
    <Card className='mt-2 boreder-0 rounded-0 shadow-sm'>
        <CardBody>
          
           <Container className='text-center'>
           <h3 className='text-uppercase'>user information</h3>
            <img style={{maxWidth:'250px',maxHeight:'250px'}} src='https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png' alt='user image not found' className='img-fluid rounded-circle'></img>
           </Container>
           <Table responsive striped hover bordered ={true} className='mt-5 text-center'>
               <tbody>
               
                 <tr>                    
                       <td>
                           User ID
                       </td>
                       <td>
                             {user.id}
                       </td>
                 </tr>

                 <tr>                    
                       <td>
                           User name
                       </td>
                       <td>
                           {user.name}
                       </td>
                 </tr>

                 <tr>                    
                       <td>
                           User email
                       </td>
                       <td>
                           {user.email}
                       </td>
                 </tr>

                 <tr>                    
                       <td>
                           User  Mobile Number
                       </td>
                       <td>
                           {user.phone}
                       </td>
                 </tr>
             
               </tbody>
           </Table>
          {/* {
            currentUser ? (currentUser.id==user.id)?(
                <CardFooter className='text-center'>
                <Button color='warning' >update profile</Button>
              </CardFooter>
            ):'':''
          } */}
        </CardBody>
       </Card>
  )
}

export default ViewUserProfile