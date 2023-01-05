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
