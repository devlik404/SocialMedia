import { useDispatch } from "react-redux";
import { ApiData } from "../../../hooks/api";
import { SET_THREADS_LIKE } from "../../../stores/rootReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types/rootState";



export function useLikes(){
    const dispatch = useDispatch();
    const threads = useSelector((state:RootState)=>state.thread.threads);

    async function handleLikes(id:number,isLike:boolean) {
        try {  
            if(!isLike){
           await ApiData.post("/likes",{thread_id:id});
             
            }else{
             await ApiData.delete(`/likes/${id}`);
               
        
            }
            dispatch(SET_THREADS_LIKE({id:id,isLike:isLike}));

        } catch (error) {
            console.log("failed liked!",error)
        }
    }
    
    
    return{handleLikes, threads};
}