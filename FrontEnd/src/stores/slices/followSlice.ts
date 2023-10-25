
import {createSlice} from "@reduxjs/toolkit"
import { IFollowers } from "../../interface/IFollows";


 const initialFollowState:  {StateFollows:string,follows:IFollowers[] } = {
   StateFollows:"followers",
   follows: []
 };


export const followSlice = createSlice({
name:"follow",
initialState:initialFollowState,
reducers:{
 GET_FOLLOWS:(state,action) =>{
    state.follows = action.payload;
 },
 SET_FOLLOWS_STATE:(state,action) =>{
    state.StateFollows = action.payload;
 },
 SET_FOLLOW:(state,action:{payload:{id:number;isFollowed:boolean}})=>{
    const {id,isFollowed}= action.payload;

    state.follows = state.follows.map((follow)=>{
        if(follow.id === id){
            return{ 
                ...follow,
                is_followed:!isFollowed,
            };
        }
  
        return follow;
    });
 },
 
 },
});
