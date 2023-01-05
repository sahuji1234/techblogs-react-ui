import React, { useEffect } from 'react'
import { useState } from 'react'
import {Row, Col,Pagination,PaginationItem,PaginationLink, Container } from 'reactstrap'
import { loadAllPoosts } from '../services/post-service'
import Posts from './Posts'

function PrivateNewFeed() {

 const [postContent,setPostContent]= useState({
  content:[],
  totalPages:'',
  totalElements:'',
  pageSize:'',
  lastPage:false,
  pageNumber:''

 })

 const changePage=(pageNumber=0,pageSize=5)=>{
  if(pageNumber>postContent.pageNumber && postContent.lastPage){
    return;
  }
  if(pageNumber<postContent.pageNumber && postContent.pageNumber===0){
    return;
  }
  loadAllPoosts(pageNumber,pageSize).then(data=>{
    setPostContent(data)
    window.scroll(0,0)
  }).catch(error=>{
    alert("Error in loading posts")
  })
 }

 useEffect(()=>{
  changePage(0)

// // load all the posts from server
// loadAllPoosts(0,5).then((data)=>{
//   console.log(data);
//   setPostContent(data);
// }).catch(error=>{
//   alert("Error in loading posts")
// })


 },[])


  return (
   <div className="container-fluid">
    <Row>
       <Col md={{
                size:10,
                offset:1
       }}>
               <h1>Blogs Count({postContent?.totalElements})</h1>
               {
               postContent.content.map((post)=>(
                <Posts post={post} key={post.postId} />
               ))
               }
              <Container className='text-center mt-3'>

              <Pagination size='lg'>
                <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber===0}>
                  <PaginationLink previous>
                     previous   
                  </PaginationLink>
                </PaginationItem>

              {
                [...Array(postContent.totalPages)].map((item,index)=>(

                  <PaginationItem onClick={()=>changePage(index)} active={index===postContent.pageNumber} key={index}>
                    <PaginationLink>
                      {index+1}
                    </PaginationLink>
                  </PaginationItem>
                  ))
              }
                
                <PaginationItem onClick={()=>changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                  <PaginationLink next>
                      next
                  </PaginationLink>
                </PaginationItem>
               </Pagination>

              </Container>
       </Col>
    </Row>
   </div>
  )
}

export default PrivateNewFeed