import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Base from '../components/Base'
import userContext from '../context/userContext'
import { loadPost, updatePost } from '../services/post-service'
import { loadAllCategories } from '../services/category-service'
import { Button, Card, CardBody,Container,Form, Input, Label} from "reactstrap";
import JoditEditor from 'jodit-react';
import { useRef } from 'react'



function UpdateBlog() {

   const editor = useRef(null)
   const [categories,setCategories]=useState([])
   const {blogId}= useParams()
   const object = useContext(userContext)
   const navigate = useNavigate()
   const [post,setPost]=useState(null)

//=====================================================================================================================>


  useEffect(()=>{    
   // load categories 
   loadAllCategories().then((data)=>{
    setCategories(data)
   }).catch(error=>{
    console.log(error)
   })

   // load a post by given blogId
   loadPost(blogId).then((data)=>{
    setPost({...data,categoryId:data.category.categoryId})
   }).catch(error=>{
     console.log("error while fetching the post"+error)
   })

  },[])

//===================================================================================================================>

 useEffect(()=>{
        if(post){
            if(post.user.id != object.user.data.id){
                alert("this is not your post !!")
                navigate("/user/new-feed")
            }
        }
  },[post])

//=====================================================================================================================>

const handleChange=(event,fieldName)=>{
  setPost({
    ...post,
    [fieldName]:event.target.value
  })
}
//====================================================================================================================>
const updatedPost=(event)=>{
  event.preventDefault()
  console.log(post)
  updatePost({...post,category:{categoryId:post.categoryId}},post.postId).then(res=>{
    console.log(res)
  alert("post updated successfully")
  }).catch(error=>{
    console.log(error);
    alert("error in updating ")
  })
}
//=====================================================================================================================>
const updateHtml=()=>{
        return(
            <div className="wrapper">
           <Card className="shadow-sm border-0 mt-2">
            <CardBody>
                {/* {JSON.stringify(post)} */}
            <h3>update post from here !!</h3>
            <Form onSubmit={updatedPost}>
              <div className="my-3">
                <Label for="title">Post title</Label>
                <Input type="text"
                 id ="title"
                placeholder="enter here" 
                className="rounded-0"
                name="title"
                value={post.title}
                onChange={(event)=>handleChange(event,'title')}
                />
              </div>

              <div className="my-3">
                 <Label for="content">Post content</Label>

                <JoditEditor 
                ref={editor}
                value={post.content}
                
                onChange={(newContent=>setPost({...post,content:newContent}))}

                />
              </div>
                 {/* file field */}
              <div className="mt-3">
                <Label for ="image"> select post banner</Label>
                <Input id ="image" type="file" multiple onChange={''}></Input>
             </div>

              <div className="my-3">
                <Label for="category">Post category</Label>
                <Input type="select"
                id ="category"
                placeholder="enter here" 
                className="rounded-0" 
                name="categoryId"
                onChange={(event)=> handleChange(event,'categoryId')}
                value={post.categoryId}
                >
                    <option disabled value={0}>---select category--</option>
                   {
                    categories.map((category)=>(
                        <option value={category.categoryId} key={category.categoryId}>
                           {category.categoryTitle}
                        </option>
                    ))
                   }
                </Input>
              </div>
                 <Container className="text-center">
                    <Button type="submit" className="rounded-0" color="primary">Update Post</Button>
                 </Container>
            </Form>
            </CardBody>
           </Card>
        </div>
        )
    }

//=======================================================================================================================>

    return (
    <Base>
      <Container>
      {post&& updateHtml()}
      </Container>
    </Base>
  )
}

export default UpdateBlog