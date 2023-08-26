
import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import { ThreadsCards } from "../../interface/interfaceData";


 const initialThreadsState:  {threads:ThreadsCards[] } = {
    threads: []
 };


export const threadSlice = createSlice({
name:"thread",
initialState:initialThreadsState,
reducers:{
 GET_THREADS:(state,action) =>{
    state.threads = action.payload;
 },
 SET_THREADS:(state,action:PayloadAction<{thread:ThreadsCards[]}>) =>{
    state.threads = action.payload.thread;
 },
 SET_THREADS_LIKE:(state,action:{payload:{id:number;isLike:boolean}})=>{
    const {id,isLike}= action.payload;

    state.threads = state.threads.map((thread)=>{
        if(thread.id === id){
            return{ 
                ...thread,
                likes_count: isLike ? thread.likes_count - 1: thread.likes_count + 1,
                isLike:!isLike,
            };
        }
  
        return thread;
    });
 },
 
 },
});
