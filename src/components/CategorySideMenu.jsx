import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { loadPostsByCategoryId ,deletePostService } from '../services/post-service'
import Posts from './Posts'


function CategorySideMenu() {

const { categoryId }= useParams();

const [posts,setPosts] = useState([]);

useEffect(()=>{
    loadPostsByCategoryId(categoryId).then(data=>{
        setPosts([...data])
    }).catch(error=>{
        console.log(error)
        alert('error in loading posts')
    })
},[categoryId])

function deletePost(post){

    // going to delete post
    deletePostService(post.postId).then(res=>{
      console.log(res)
     alert("post is deleted")
     let newPostContents =  posts.content.filter(p=>p.postId!=post.postId)
     setPosts({...posts,content:newPostContents})
  
    }).catch(error=>{
      console.log(error)
    })
  }

  return (
    <div>
          <Container className='mt-3'>
           <Row>
               <Col md={10} className='pt-5'>
                <h1>Blogs count {posts.length}</h1>
                 {
                    posts && posts.map((post,index)=>{
                        return(
                            <Posts deletePost={deletePost} post={post} />
                        )
                    })
                 }
                 {
                    posts.length<=0 ?<h1>No posts in this category</h1> :''
                 }
               </Col>
           </Row>
          </Container>
   </div>
  )
}

export default CategorySideMenu