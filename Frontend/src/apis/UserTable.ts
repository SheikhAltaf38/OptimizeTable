import axios from "axios"
import api from "./main"
import { TUser } from "../Types/TableTypes";

const getUsers = async ():Promise<TUser[]>=>{
     const users =await api.get("/users");
     return users.data.data
}

const getUser = async (id:string):Promise<TUser>=>{
   const getUser = await api.get(`/users/${id}`);
   return getUser.data.data;
}

const updateUser = async (id:string,data:Omit<TUser,"_id">)=>{
   const updatedUser = await api.put(`/users/${id}`,data)
   return updatedUser.data.data;
}

const deleteUser = async (id:string)=>{
    const deletedUser = await api.delete(`/users/${id}`)
    return deletedUser.data.data
}

const createUser = async (data: Omit<TUser,"_id">)=>{
    await api.post("/users/create",data)
}

export {getUser,getUsers,updateUser,deleteUser,createUser}