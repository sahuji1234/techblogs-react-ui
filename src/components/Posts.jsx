import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardText } from 'reactstrap'

function Posts({post={title:"this is default post title",content:"This is default post content"}}) {
  return (
   <Card className='border-0 shadow-sm mb-3 mt-3'>
       <CardBody>
        <h2>{post.title}</h2>
        <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,30)+"..."}}>
        </CardText>
        <div>
            <Link className='btn btn-secondary border-0' to={'/user/post/'+post.postId}>Read more...</Link>
        </div>
       </CardBody>
   </Card>
  )
}

export default Posts
