import { Outlet, Link} from "react-router-dom";
import {Avatar, Box,Button,Flex,Icon,Text, useColorMode} from "@chakra-ui/react";
import {BiHomeSmile} from "react-icons/bi"
import { TbMoodSearch} from "react-icons/tb"
import { RiHeartAddLine} from "react-icons/ri"
import {CgProfile} from "react-icons/cg"
import {FiLogOut} from "react-icons/fi"
import {BsFillLightbulbFill} from "react-icons/bs"

import { Logout } from "../features/fiture/hooks/useLogout";


const   Layout = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const {handleLogout} = Logout()

    return (
      <>
        <Box  position='fixed' borderRight={"1px solid grey"} w={"300px"}>
          <Box  h="100vh" m="0" display="flex" flexDirection="column" gap="5">
              <Text fontSize='4xl' fontWeight="bold" color="greenyellow">OctaGram</Text>
              <Box fontSize='lg' display="flex" flexDirection="row" alignItems="center" gap="2"><BiHomeSmile/><Link to="/">Home</Link></Box>
              <Box fontSize='lg'  display="flex" flexDirection="row" alignItems="center" gap="2"><TbMoodSearch/><Link to="/">Search</Link></Box>
              <Box fontSize='lg'  display="flex" flexDirection="row" alignItems="center" gap="2"><RiHeartAddLine/><Link to="/followers">Folowers</Link></Box>
              <Box fontSize='lg' display="flex" flexDirection="row" alignItems="center" gap="2"><CgProfile/><Link to="/">Profile</Link></Box>
          <Button onClick={toggleColorMode} w={"50%"}  variant='outline'>
                {colorMode === 'light' ?   <Icon as={BsFillLightbulbFill} color='dark' />  :<Icon as={BsFillLightbulbFill}  color='yellow' /> } Mode
            </Button>
          <Button colorScheme='teal'   variant='outline' color="greenyellow" mr={"5"}>Create Post</Button>
          </Box>
        <Box>
   
                
            
        <Flex mt="-16">
        <Avatar src='https://bit.ly/sage-adebayo' />
        <Box ml='3' alignItems="center">
          <Text fontWeight='bold'>
            Malik fajar     
              <Button  variant='link' onClick={handleLogout}><FiLogOut/>
              </Button>
          </Text>
          <Text fontSize='sm'>FullStack Dev</Text>
        </Box>
      </Flex>
        </Box>
        </Box>
        <Outlet />
      </>
    )
  };
  
  export default Layout;