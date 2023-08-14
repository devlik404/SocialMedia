
import { Routes, Route, useNavigate } from "react-router-dom";
import Index from "./layouts/index";
import {ThreadDetail} from "./layouts/ThreadDetail";
import RegisterForm from "./pages/register";
import LoginForm from "./pages/login";
import { ApiData, setAuthToken } from "./hooks/api";
import { useEffect,useState } from "react";


export default function App() {
 const [isLoading,setIsoLoading]= useState<boolean>(true)
const navigate=useNavigate()

  async function authCheck(){
    try {
      setAuthToken(localStorage.token)
      const response = await ApiData.get('/check')
      console.log("respons auth",response)
      setIsoLoading(false)
      
    } catch (error) {
      localStorage.removeItem("token")
      setIsoLoading(false)
      navigate("/login")
      console.log("autherror",error)
    }
  }
useEffect(()=>{

    authCheck()
  
},[])

  return (
    <>
    {isLoading ? null : 
      <Routes>
      <Route path="/" element={<Index />}></Route>
      <Route path="/detail/:id" element={<ThreadDetail/>}/>
      <Route path="/register" element={<RegisterForm/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      </Routes>
    } 
   
    </>

  )
}


