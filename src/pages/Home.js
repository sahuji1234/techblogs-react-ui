import Base from "../components/Base";
import React, { useState } from 'react';
import image from "../img/login.jpg";
import { useEffect } from "react";
import { loadAllPoosts } from "../services/post-service";
import Posts from '../components/Posts'
import { Col, Row } from "reactstrap";
const Home = () => {

  const [postContent,setPostContent]= useState({
    content:[],
    totalPages:'',
    totalElements:'',
    pageSize:'',
    lastPage:false,
    pageNumber:''
  
   })
useEffect(()=>{
 loadAllPoosts(0,5).then((data)=>{
 
setPostContent({
   content:[...postContent.content,...data.content],
   totalPages:data.totalPages,
   totalElements:data.totalElements,
   pageSize:data.pageSize,
   lastPage:data.lastPage,
   pageNumber:data.pageNumber
})
    console.log(postContent.content)

 }).catch((error)=>{
         console.log(error);
 })

},[])

  return (
    <div
    style={{ backgroundImage:`url(${image})` ,
    height:'100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',} }
    >
    <div  className="container-fluid">
    <Base>
    <Row>
      <Col 
      md={{
        size:10,
        offset:1
      }}
      >
        

      {
        postContent.content && postContent.content.map((post)=>(
        <Posts post={post} deletePost={''} key={post.postId}/>
      ))
     }
      </Col>
    </Row> 
    </Base>
    </div>
  </div>
  );
};

export default Home;
