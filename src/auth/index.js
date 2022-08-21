// is logged in==>
export const isLoggedIn=()=>{
   let data= localStorage.getItem("Authorization")
   if(data===null){
    return false
   }
   else{
    return true
   }
}

//do login ==> set to local storage
export const doLogin=(data,next)=>{
    localStorage.setItem("Authorization",JSON.stringify(data));
    next();
}

// do logout ==> remove data from local storage

export const doLogout=(next)=>{
    localStorage.removeItem("Authorization");
    next();
}

// getCurrent User

export const getCurrentUserDetails=()=>{
if(isLoggedIn()){
    return JSON.parse(localStorage.getItem("Authorization")).user;
}
else {
    return undefined;
}

}