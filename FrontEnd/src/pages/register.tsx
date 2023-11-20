import { Box, Button, FormControl, FormLabel, Input, FormHelperText, InputGroup, InputRightElement, Heading, Divider} from "@chakra-ui/react"
import React from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { useRegister } from "../features/fiture/hooks/useRegister";
import { Link } from "react-router-dom";


const RegisterForm = () =>{
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

const {submitHandelValidate,changeHandlerValidate} = useRegister()

return(

 <Box   height='100vh'  display="flex" justifyContent={"center"} alignItems='center' >
  <Box boxShadow='base' p='6' rounded='md'   w='50%'>
    <form onSubmit={submitHandelValidate}>
    
<Box gap='4'>
<Heading color="greenyellow">OCTAGRAM</Heading>
</Box>
<Box m='4'>
<Heading  size='md'>
    Create Account Octagram
  </Heading>
</Box>
<Box m='4'>  
  <FormControl isRequired>
  <FormLabel>Full Name</FormLabel>
  <Input placeholder='Fullname' onChange={changeHandlerValidate} name="fullname"/>
</FormControl>
</Box>
<Box m='4'>
<FormControl isRequired>
  <FormLabel>Nick Name</FormLabel>
  <Input placeholder='Nick name' onChange={changeHandlerValidate} name="nickname"/>
</FormControl>
</Box>
<Box m='4'> 
<FormControl>
  <FormLabel>Email address</FormLabel>
  <Input type='email' onChange={changeHandlerValidate} name="email"/>
  <FormHelperText>We'll never share your email.</FormHelperText>
</FormControl>
</Box>
<Box m='4'>
  <InputGroup size='md' display='flex' alignItems='center'>
  <FormLabel>Password</FormLabel>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          onChange={changeHandlerValidate} 
          name="password"
        />
        <InputRightElement width='5rem' >
          <Button h='1.8rem' size='md'  colorScheme='green' variant='outline' onClick={handleClick} >
            {show ? <BiHide/> : <BiShowAlt/>}
          </Button>
        </InputRightElement>
  </InputGroup>
</Box>
<Button
 colorScheme='teal' variant='outline'
type='submit'
m='4'
>
Register
</Button>
    </form>
<Divider m='2'></Divider>
<Box float={'right'}>
<Heading size='xs'>Sudah Memiliki Akun?</Heading>
<Button colorScheme='teal' variant='link' >
  <Link to="/login">
Login
  </Link>
</Button>
</Box>
  </Box>
 </Box>
)
}
export default RegisterForm;