import { myAxios, privateAxios } from "./Helper"

// create post function
export const createPost=(postData)=>{
   console.log(postData)
  return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then(response=>response.data)
}

// get all posts

export const loadAllPoosts=(pageNumber,pageSize)=>{
  return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(response=> response.data)
}

// load single post of given id

export const loadPost=(postId)=>{
  return myAxios.get("posts/"+postId).then(response=>response.data);
}

// create comment

export const createComment=(Comment,postId,userId)=>{
  console.log('userid is='+userId)
  return privateAxios.post(`comments/post/${postId}/user/${userId}`,Comment)
}

// upload post banner image

export const uplodaPostImage=(image,postId)=>{
let formData = new FormData()
formData.append("image",image);
return privateAxios.post(`/post/image/upload/${postId}`,formData,{
  headers:{
    'Content-Type':'multipart/form-data'
  }
}).then((response)=> response.data)
}


export const loadPostsByCategoryId=(categoryId)=>{
  return myAxios.get(`/category/${categoryId}/posts`).then(res=>res.data)
}

export const loadPostUserWise=(userId)=>{
  return privateAxios.get(`/user/${userId}/posts`).then(res=>res.data)
}

// delete post 
 export function deletePostService(postId){
  return privateAxios.delete(`/${postId}`).then(response=> response.data)
 }

 // update post
 export function updatePost(post,postId){
   return privateAxios.put(`/posts/${postId}`,post).then(response=>response.data);
 }