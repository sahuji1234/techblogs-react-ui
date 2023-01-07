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