import { useState } from "react"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Card,CardBody, CardText, Col, Container, Input, Row } from "reactstrap"
import Base from "../components/Base"
import { createComment, loadPost } from "../services/post-service"
import { BASE_URL } from "../services/Helper"
import { getCurrentUserDetails, isLoggedIn } from "../auth";
import image from "../img/login.jpg";
const PostPage=()=>{
    
// fetch current user details

const [user,setUser] = useState(undefined)

useState(
    ()=>{
        setUser(getCurrentUserDetails)
      }
 
 ,[])

const [comment,setComment] = useState({
    content:''
})
const {postId}= useParams()
const [post,setPost]=useState(null);
 useEffect(()=>{
    //load post of postId
    loadPost(postId).then(data=>{
       setPost(data)
       console.log(data)
    }).catch(error=>{
        console.log(error)
        alert("oops something went wrong "+error)
    })
 },[])

 const printDate=(number)=>{
      return new Date(number).toLocaleDateString()
 }

 const submitComment=()=>{
    if(comment.content.trim()===''){
        return
    }
    if(!isLoggedIn()){
        alert('you need to log in first')
        return
    }
    createComment(comment,post.postId,user.id).then(data=>{
       alert('commented on post successfully')
       setPost({
        ...post, comments:[...post.comments,data.data]
       })
        setComment({
            content:''
        })
    }).catch(error=>{
        console.log(error)
    })
 }

 

    return(

        <div
        style={{ backgroundImage:`url(${image})` ,
        height:'100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',} }
        >

       <Base>
          
        <Container className="mt-4">
        <Link to='/user/new-feed'>feed</Link> / {post && (<Link to="">{post.title}</Link>)}

        <Row>
            <Col md={{
                size:12
            }}>
          

       <Card className="mt-3">
       {
        (post)&&(
            <CardBody>
            <CardText>Posted by <b>{post.user.name}</b> on  <b>{printDate(post.addedDate)}</b></CardText>
             
             <CardText>
                   <span className="text-muted">{post.category.categoryTitle} </span>
            </CardText>

        <CardText className="mt-3">
            <h3>
                {post.title}
            </h3>
        </CardText>
        <div className="image-container mt-4 container text-center shadow" style={{maxWidth:'50%'}} >
             <img  className="img-fluid" src={BASE_URL+'/post/image/'+post.imageName} alt="no image found" />
        </div>

        <CardText className="mt-3" dangerouslySetInnerHTML={{__html:post.content}}>
        </CardText>


        </CardBody>
        )
       }
       </Card>



            </Col>
        </Row>

        <Row className="mt-2 my-4">
            <Col md={
                {size:9,
                offset:1}
            }>
                <h3 className="text-white">Comments({post ? post.comments.length:0})</h3>
                {
                   post  && post.comments.map((c,index)=>(
                       <Card className="mt-2 border-0" key={index}>
                        <CardBody>
                            <CardText>
                          {c.content}
                            </CardText>
                        </CardBody>
                       </Card>
                      
                    ))
                   
                }


                     <Card className="mt-2 border-0" >
                        <CardBody>
                            <CardText>
                         <Input 
                         type="textarea" 
                         placeholder="comments here.." 
                         value={comment.content}
                         onChange={(event)=>setComment({content:event.target.value})}
                         />
                         <Button className="mt-2" 
                         color="primary"
                         onClick={submitComment}
                         >Submit</Button>
                            </CardText>
                        </CardBody>
                       </Card>   
            </Col>
        </Row>
     </Container>
       </Base>
       </div>
    )
}

export default PostPage