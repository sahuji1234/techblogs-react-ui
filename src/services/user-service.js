import { myAxios } from "./Helper";

export const signUp = (user) => {
  return myAxios
    .post("/api/v1/auth/register",user)
    .then((respones) => respones.json());
};

export const signIn = (user) => {
  return myAxios
    .post("/api/v1/auth/register",user)
    .then((response) => response.json());
};
