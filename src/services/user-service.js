import { myAxios } from "./Helper";

export const signUp = (user) => {
  return myAxios
    .post("/auth/register",user)
    .then((respones) => respones.data);
};

export const signIn = (user) => {
  return myAxios
    .post("/auth/login",user)
    .then((response) => response.data);
};


export const getUser=(userId)=>{
  return myAxios.get(`/users/${userId}`).then(resp=>resp.data)
}

export const getOtp=(username)=>{
  return myAxios.get(`/generateOtp?username=${username}`).then(resp=>resp.data)
}
export const validateOtp=(username,otp)=>{
  return  myAxios.get(`/validateOtp?otpnum=${otp}&username=${username}`).then(resp=>resp)
}

export const resetPassword=(data)=>{
  return myAxios.post("/users/forgetPassword",data).then(resp=>resp.data)
}