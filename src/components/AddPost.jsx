import { useState } from "react";
import { useEffect ,useRef} from "react";
import { Button, Card, CardBody,Container,Form, Input, Label} from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from 'jodit-react';
import {createPost as doCreatePost, uplodaPostImage} from "../services/post-service";
import { getCurrentUserDetails } from "../auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddPost=()=>{

const editor = useRef(null)
//const [content,setContent] =useState('')
 
const [user,setUser]=useState(undefined)

const [post,setPost] =useState({
    title:'',
    content:'',
    categoryId:''
})

// const config ={
//     placeholder:"Start typing"
// }

const [categories,setCategories]=useState([])


useEffect(
()=>{
    // SETTING THE CURRENT USER 
    setUser(getCurrentUserDetails)
    loadAllCategories().then((data)=>{
        console.log(data)
        setCategories(data)
    }).catch(error=>{
        console.log(error)
    })

},[]
)

// field changed function
const fieldChanged =(event)=>{
    setPost({...post,[event.target.name]:event.target.value})

}

const contentFiledChanged=(data)=>{
    setPost({...post,'content':data})
}
// create post function

const createPost=(event)=>{

    event.preventDefault();
    
    console.log(post);
    if(post.title.trim()===''){
        toast.warning("post title is required")
        return;
    }
    if(post.content.trim()===''){
        toast.warning("post title is required")
        return;
    }
    if(post.categoryId===''){
        toast.warning("please select some category")
        return;
    }
    // submit the post on server
    post['userId'] = user.id
    doCreatePost(post).then(data=>{
    // upload Image

      uplodaPostImage(image,data.postId).then(data=>{
        toast.success("Image uploaded")
      }).catch(error=>{
        toast.error('error in uploading image')
      })

        alert("post created")
        setPost({
            title:'',
            content:'',
            categoryId:''
        })
        // console.log(post)
     }).catch((error)=>{
        toast.error("opps something went wrong")
        alert(error)
     })
}
const [image,setImage] = useState(null)
// handling file change event

const handleFileChange=(event)=>{
    setImage(event.target.files[0])
}

return(
        <div className="wrapper">
            <ToastContainer />
           <Card className="shadow-sm border-0 mt-2">
            <CardBody>
                {/* {JSON.stringify(post)} */}
            <h3>what's going in your mind?</h3>
            <Form onSubmit={createPost}>
              <div className="my-3">
                <Label for="title">Post title</Label>
                <Input type="text"
                 id ="title"
                placeholder="enter here" 
                className="rounded-0"
                name="title"
                onChange={fieldChanged}
                />
              </div>

              <div className="my-3">
                 <Label for="content">Post content</Label>
               {/* <Input type="textarea" id ="content" placeholder="enter here" className="rounded-0" 
                style={{height:'300px'}}
                /> */}

                <JoditEditor 
                ref={editor}
                value={post.content}
                
                onChange={contentFiledChanged}

                />
              </div>
                 {/* file field */}
              <div className="mt-3">
                <Label for ="image"> select post banner</Label>
                <Input id ="image" type="file" multiple onChange={handleFileChange}></Input>
             </div>

              <div className="my-3">
                <Label for="category">Post category</Label>
                <Input type="select"
                id ="category"
                placeholder="enter here" 
                className="rounded-0" 
                name="categoryId"
                onChange={fieldChanged}
                defaultValue={0}
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
                    <Button type="submit" className="rounded-0" color="primary">Create Post</Button>
                    <Button className="rounded-0 ms-2" color="danger">Reset Content</Button>
                 </Container>

            </Form>
            </CardBody>
           </Card>
        </div>
    )
}
export default AddPost;