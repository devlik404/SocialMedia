import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_LOGOUT } from "../../../stores/rootReducer";



export function Logout (){

    const dispatch = useDispatch()

    const navigate = useNavigate();

   function handleLogout  ()  {
  
     dispatch(AUTH_LOGOUT()) 
  
      navigate("/login")
     
    }
    
    return{handleLogout}
}