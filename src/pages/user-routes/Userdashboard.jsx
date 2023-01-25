import { keyboard } from '@testing-library/user-event/dist/keyboard'
import React from 'react'
import { useEffect,useState } from 'react'
import { Container } from 'reactstrap'
import { getCurrentUserDetails } from '../../auth'
import AddPost from '../../components/AddPost'
import Base from '../../components/Base'
import PrivateNewFeed from '../../components/PrivateNewFeed'
import { loadPostUserWise } from '../../services/post-service'
import Posts from '../../components/Posts'
import { toast } from 'react-toastify'
import { deletePostService } from '../../services/post-service'
import image from "../../img/login.jpg";

const Userdashboard=()=> {

const [user,setUser] = useState({})
const [posts,setPosts] = useState([])

useEffect(()=>{
  console.log(getCurrentUserDetails());
  setUser(getCurrentUserDetails())
  loadPostData()
},[])

function loadPostData(){
  loadPostUserWise(getCurrentUserDetails().id).then(data=>{
    console.log(data)
    setPosts([...data])
}).catch(error=>{
  console.log(error)
})
}

// function to delete post

function deletePost(post){

  // going to delete post
  deletePostService(post.postId).then(res=>{
    console.log(res)
    toast.success("post is deleted")
    loadPostData()
  }).catch(error=>{
    console.log(error)
  })
}


  return (
    <Base>
        <div style={{ backgroundImage:`url(${image})` ,
    height:'120%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',} }>
    <Container>
        <AddPost/>
        {/* <PrivateNewFeed/> */}
        <h1 className='my-3'>Total Posts : ({posts.length})</h1>

        {
          posts.map((post,index)=>{
            return(
              <Posts post={post} key ={index} deletePost={deletePost} />
            )
          })
        }
    </Container> 
    </div>
    </Base>

  )
}

export default Userdashboard