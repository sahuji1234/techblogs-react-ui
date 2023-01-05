import { myAxios, privateAxios } from "./Helper"

// create post function
export const createPost=(postData)=>{
   console.log(postData)
  return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then(response=>response.data)
}

// get all posts

export const loadAllPoosts=(pageNumber,pageSize)=>{
  return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(response=> response.data)
}