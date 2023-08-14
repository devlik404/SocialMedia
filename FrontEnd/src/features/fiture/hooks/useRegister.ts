import { useState, ChangeEvent, FormEvent} from "react";
import { ApiData } from "../../../hooks/api";
import { IValidation } from "../../../interface/interfaceData";
import { useNavigate } from "react-router-dom";



export function useRegister (){
      //validation register
  const [Validate,setValidate] = useState<IValidation>({
    fullname:"",
    nickname:"",
    email:"",
    password:""
})
// const toast = useToast();
    const  changeHandlerValidate = (event:ChangeEvent<HTMLInputElement>)=>{
      const { name, value } = event.target;
      setValidate({
            ...Validate,
            [name]:value
        })
    }
    const navigate = useNavigate()
    const submitHandelValidate = async (e:FormEvent) =>{
      e.preventDefault()
      try {
         await ApiData.post("/register",Validate)
          navigate("/login")
      } catch (error) {
          console.log("error submit data",error)
      }
  }
 return{changeHandlerValidate,submitHandelValidate}
}