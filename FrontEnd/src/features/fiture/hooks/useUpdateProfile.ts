import { useState, ChangeEvent, FormEvent} from "react";
import { ApiData} from "../../../hooks/api";

import { UsersCard } from "../../../interface/interfaceData";
import { useDispatch } from "react-redux";
import { RootState } from "../../../stores/types/rootState";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_CHECK } from "../../../stores/rootReducer";

export function useUpdateProfile (){
   const dispatch = useDispatch()
   const auth = useSelector((state:RootState)=>state.auth);
  const [update,setUpdate] = useState<UsersCard>({
   fullname:"",
   nickname:"",
   profile_articel:null
})
console.log("update",update)
const navigate = useNavigate();

const submitHandelUpdate = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const formData = new FormData();
     update.nickname?formData.append("nickname", update.nickname as string):"";
     update.fullname?formData.append("fullname", update.fullname as string):"";
    update.profile_articel ?formData.append("profile_articel", update.profile_articel as File):null;
   
 

    const response = await ApiData.patch(`/profile/update/${auth.id}`, formData);
  

    console.log("response data", response);
    dispatch(AUTH_CHECK(response.data))
    navigate("/")
    // Refresh data or perform other actions as needed
  } catch (error) {
    console.log("error submitting data", error);
  }
};

    const  changeHandlerUpdate= (event:ChangeEvent<HTMLInputElement>)=>{
      const { name, value ,files} = event.target;
      if (files) {
        setUpdate((prevContent) => ({
        ...prevContent,
       [name]:files[0],
      }));
    }else{
      setUpdate((prevContent) => ({
        ...prevContent,
        [name]:value,
      }));
    }
    
    }


 
 return{changeHandlerUpdate,submitHandelUpdate}
}