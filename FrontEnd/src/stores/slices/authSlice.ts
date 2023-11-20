import { setAuthToken } from "../../hooks/api";
import { Users } from "../../interface/interfaceData";
import {createSlice} from "@reduxjs/toolkit"


 const initalAuthState: Users = {
     fullname: "",
     nickname: "",
     email: "",
     picture: "",
     profile_articel: "",
     id: 0
 }

export const authSlice = createSlice({
name:"auth",
initialState:initalAuthState,
reducers:{
    AUTH_LOGIN:(_,action)=>{
      const userPayload = action.payload
      setAuthToken(userPayload.token)
        localStorage.setItem("token",userPayload.token)
        
         const user: Users = {
             id: userPayload.user.id,
             fullname: userPayload.user.fullname,
             nickname: userPayload.user.nickname,
             email: userPayload.user.email,
             picture: userPayload.user.picture,
             profile_articel: userPayload.user.profile_articel,
         
         };

        return user
    },
    AUTH_CHECK:(_, action)=>{
        const userPayload = action.payload
      
         const user: Users = {
             id: userPayload.id,
             fullname: userPayload.fullname,
             nickname: userPayload.nickname,
             email: userPayload.email,
             picture: userPayload.picture,
             profile_articel: userPayload.profile_articel,
         
         };

        return user
        
    },
    
    AUTH_ERROR:()=>{
        localStorage.removeItem("token")
    },
    AUTH_LOGOUT:()=>{
        localStorage.removeItem("token")
    return initalAuthState;
    },
    }
})
