import { myAxios } from "./Helper";

export const signUp = (user) => {
  return myAxios
    .post("/api/v1/auth/register",user)
    .then((respones) => respones.data);
};

export const signIn = (user) => {
  return myAxios
    .post("/api/v1/auth/login",user)
    .then((response) => response.data);
};
