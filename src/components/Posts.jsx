import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetails, isLoggedIn } from '../auth'
import { useContext } from 'react'
import userContext from '../context/userContext'

function Posts({post={id:-1 ,title:"this is default post title",content:"This is default post content"},deletePost}) {
 
 const userContextData=useContext(userContext)

 const [login,setLogin] = useState(null)
 const [user,setUser] = useState(null)
 useEffect(()=>{
   setUser(getCurrentUserDetails())
   setLogin(isLoggedIn())
 },[])
 
 
 
  return (
   <Card className='border-0 shadow-sm mb-3 mt-3'>
       <CardBody>
        <h2>{post.title}</h2>
        <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,100)+"..."}}>
        </CardText>
        <div>
            <Link className='btn btn-secondary border-0' to={'/post/'+post.postId}>Read more...</Link>
            
          {
            
            userContextData.user.login && (user && user.id===post.user.id ? <Button onClick={()=>deletePost(post)} className='ms-2' color='danger'>Delete</Button> :'')
         }
       
         {
           userContextData.user.login && (user && user.id===post.user.id ? <Button tag={Link} to={`/user/update-blog/${post.postId}`} className='ms-2' color='info'>update</Button> :'')
         }

        </div>
       </CardBody>
   </Card>
  )
}

export default Posts
