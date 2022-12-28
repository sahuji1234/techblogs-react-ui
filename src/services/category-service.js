import { myAxios } from "./Helper";

export const loadAllCategories=()=>{

    return myAxios.get(`/categories/`).then(response=>{return response.data})
}