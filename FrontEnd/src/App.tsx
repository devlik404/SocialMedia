
import { Routes, Route, useNavigate, Outlet, Navigate } from "react-router-dom";
import Index from "./layouts/index";
import {ThreadDetail} from "./layouts/ThreadDetail";
import RegisterForm from "./pages/register";
import LoginForm from "./pages/login";
import { ApiData, setAuthToken} from "./hooks/api";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { AUTH_CHECK, AUTH_ERROR } from "./stores/rootReducer";
import { useSelector } from "react-redux";
import { RootState } from "./stores/types/rootState";

export default function App() {
 const [isLoading,setIsoLoading]= useState<boolean>(true)
 const auth = useSelector((state:RootState)=>state.auth)
 const navigate=useNavigate()
 const dispatch =useDispatch()

  async function authCheck(){
    try {
      setAuthToken(localStorage.token)
      const response = await ApiData.get('/check')
      dispatch(AUTH_CHECK(response.data.user))
      setIsoLoading(false)
      
    } catch (error) {
      dispatch(AUTH_ERROR())
      setIsoLoading(false)
      navigate("/login")
    }
  }
useEffect(()=>{
if(localStorage.token){
  authCheck()
 
}else{
  setIsoLoading(false)
  navigate("/login")
}
  
},[])

function RouteLogin(){
  if(!auth.fullname){
    return <Navigate to={"/login"}/>
  }else{
    return <Outlet/>
  }
}
function RouteNotLogin(){
  if(auth.fullname){
    return <Navigate to={"/"}/>
  }else{
    return <Outlet/>
  }
}


  return (
    <>
    {isLoading ? null :
     
      <Routes>
        <Route path="/" element={<RouteLogin/>}>
          <Route path="/" element={<Index />}></Route>
          <Route path="/detail/:id" element={<ThreadDetail/>}/>
        </Route>
        <Route path="/" element={<RouteNotLogin/>}>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/login" element={<LoginForm/>}/>
        </Route>
      </Routes>
    } 
   
    </>

  )
}


