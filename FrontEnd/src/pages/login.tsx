import { Box, Button, FormControl, FormLabel, Input, FormHelperText, InputGroup, InputRightElement, Heading, Divider} from "@chakra-ui/react"
import React from "react";
import { Link} from "react-router-dom";
import { useLogin } from "../features/fiture/hooks/useLogin";
import { BiHide, BiShowAlt } from "react-icons/bi";




const LoginForm = () =>{
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const {submitHandelValidate,changeHandlerValidate} = useLogin()

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
<FormControl>
  <FormLabel>Email address</FormLabel>
  <Input type='email' onChange={changeHandlerValidate} name="email"/>
  <FormHelperText>We'll never share your email.</FormHelperText>
</FormControl>
</Box>
<Box m='4'>
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
            {show ? <BiHide/> : <BiShowAlt/>}
          </Button>
        </InputRightElement>
  </InputGroup>
</Box>
<Button m='4' colorScheme='teal' variant='outline' type='submit'>
Login
</Button>
    </form>
<Divider m='2'></Divider>
<Box float={'right'}>

<Heading size='xs'>Belum Memiliki Akun?</Heading>
<Button colorScheme='teal' variant='link'>
<Link to={'/register'}>Register</Link>
</Button>
</Box>
  </Box>
 </Box>
)
}
export default LoginForm;