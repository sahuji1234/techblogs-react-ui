import React from 'react'
import { useEffect,useState } from 'react'
import { Container } from 'reactstrap'
import { getCurrentUserDetails } from '../../auth'
import AddPost from '../../components/AddPost'
import Base from '../../components/Base'
import PrivateNewFeed from '../../components/PrivateNewFeed'
import { loadPostUserWise } from '../../services/post-service'

const Userdashboard=()=> {

const [user,setUser] = useState({})
const [posts,setPosts] = useState([])

useEffect(()=>{
  console.log(getCurrentUserDetails());
  setUser(getCurrentUserDetails())

  loadPostUserWise(getCurrentUserDetails().id).then(data=>{
    console.log(data)
    setPosts([...data])
}).catch(error=>{
  console.log(error)
})
},[])

  return (
    <Base>
    <Container>
        <AddPost/>
        {/* <PrivateNewFeed/> */}
    </Container> 
    </Base>
  )
}

export default Userdashboard