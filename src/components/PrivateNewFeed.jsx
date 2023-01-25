import React, { useEffect } from 'react'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {Row, Col,Pagination,PaginationItem,PaginationLink,Container } from 'reactstrap'
import { loadAllPoosts } from '../services/post-service'
import Posts from './Posts'
import { deletePostService } from '../services/post-service'

function PrivateNewFeed() {

 const [postContent,setPostContent]= useState({
  content:[],
  totalPages:'',
  totalElements:'',
  pageSize:'',
  lastPage:false,
  pageNumber:''

 })
 const [currentPage,setCurrentPage] =useState(0)

 const changePage=(pageNumber=0,pageSize=5)=>{
  if(pageNumber>postContent.pageNumber && postContent.lastPage){
    return;
  }
  if(pageNumber<postContent.pageNumber && postContent.pageNumber===0){
    return;
  }
  loadAllPoosts(pageNumber,pageSize).then(data=>{
    setPostContent({
      content:[...postContent.content,...data.content],
      totalPages:data.totalPages,
      totalElements:data.totalElements,
      pageSize:data.pageSize,
      lastPage:data.lastPage,
      pageNumber:data.pageNumber
    })
    window.scroll(0,0)
  }).catch(error=>{
    alert("Error in loading posts")
  })
 }

 useEffect(()=>{
  changePage(currentPage)

// // load all the posts from server
// loadAllPoosts(0,5).then((data)=>{
//   console.log(data);
//   setPostContent(data);
// }).catch(error=>{
//   alert("Error in loading posts")
// })


 },[currentPage])

 const changePageInfinite=()=>{
  console.log('page changed')
  setCurrentPage(currentPage+1)
 }

 function deletePost(post){

  // going to delete post
  deletePostService(post.postId).then(res=>{
    console.log(res)
   alert("post is deleted")
   let newPostContents=  postContent.content.filter(p=>p.postId!=post.postId)
   setPostContent({...postContent,content:newPostContents})

  }).catch(error=>{
    console.log(error)
  })
}



  return (
   <div className="container-fluid">
    <Row>
       <Col md={{
                size:10,
                offset:1
       }}>
               <h1 className='text-white'>Total Blogs Count({postContent?.totalElements})</h1>
             <InfiniteScroll
             dataLength={postContent.content.length}
             next={changePageInfinite}
             hasMore={!postContent.lastPage}
             loader={<h4>Loading...</h4>}
             endMessage={
              <p style={{ textAlign: 'center' }}>
                <b className='text-white'>Yay! You have seen it all</b>
              </p>
            }
             >
             {
               postContent.content.map((post)=>(
                <Posts deletePost={deletePost} post={post} key={post.postId} />
               ))
               }
             </InfiniteScroll>
              {/* <Container className='text-center mt-3'>

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
              </Container> */}
       </Col>
    </Row>
   </div>
  )
}

export default PrivateNewFeed