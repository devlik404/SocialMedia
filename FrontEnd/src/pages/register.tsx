import { Box, Button, FormControl, FormLabel, Input, Container, FormHelperText, InputGroup, InputRightElement, Heading} from "@chakra-ui/react"
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ApiData } from "../hooks/api";
import { IValidation } from "../interface/interfaceData";
import { useNavigate } from "react-router-dom";



const RegisterForm = () =>{
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  //validation register
  const [Validate,setValidate] = useState<IValidation>({
    fullname:"",
    nickname:"",
    email:"",
    password:""
})
// const toast = useToast();
console.log("contentpost data",Validate)

    const  changeHandlerValidate = (event:ChangeEvent<HTMLInputElement>)=>{
      const { name, value } = event.target;
      setValidate({
            ...Validate,
            [name]:value
        })
        console.log(setValidate,"data chengehandler spreds")
    }
    const navigate = useNavigate()
    const sumbitHandelValidate = async (e:FormEvent) =>{
      e.preventDefault()
      try {
          const response = await ApiData.post("/threads/register",Validate)
          navigate("/")
          console.log("response",response.data)
      
      } catch (error) {
          console.log("error submit data",error)
      }
  }
 

return(

 <Container w='100vh' height='100vh'  display="flex" justifyContent={"center"} alignItems='center'>
  <Box boxShadow='base' p='6' rounded='md' bg='white' >
    <form onSubmit={sumbitHandelValidate}>
<Heading color="greenyellow">OCTAGRAM</Heading>
<Heading  size='lg'>
    Create Account Octagram
  </Heading>
  <FormControl isRequired>
  <FormLabel>Full Name</FormLabel>
  <Input placeholder='Fullname' onChange={changeHandlerValidate} name="fullname"/>
</FormControl>

<FormControl isRequired>
  <FormLabel>Nick Name</FormLabel>
  <Input placeholder='Nick name' onChange={changeHandlerValidate} name="nickname"/>
</FormControl>

<FormControl>
  <FormLabel>Email address</FormLabel>
  <Input type='email' onChange={changeHandlerValidate} name="email"/>
  <FormHelperText>We'll never share your email.</FormHelperText>
</FormControl>

<InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        onChange={changeHandlerValidate} 
        name="password"
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
    
<Button
mt={4}
colorScheme='green'
type='submit'
>
Register
</Button>
    </form>
  </Box>
 </Container>
)
}
export default RegisterForm;