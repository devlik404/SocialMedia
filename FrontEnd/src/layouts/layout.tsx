import { Outlet, Link } from "react-router-dom";
import {Avatar, Badge, Box,Button,Flex,Text} from "@chakra-ui/react";
import {BiHomeSmile} from "react-icons/bi"
import { TbMoodSearch} from "react-icons/tb"
import { RiHeartAddLine} from "react-icons/ri"
import {CgProfile} from "react-icons/cg"
import {FiLogOut} from "react-icons/fi"

const Layout = () => {
    return (
      <>
        <Box  position='fixed' top='0'>
          <Box  h="100vh" m="0" display="flex" flexDirection="column" gap="5">
              <Text fontSize='4xl' fontWeight="bold" color="greenyellow">OctaGram</Text>
              <Box fontSize='lg' display="flex" flexDirection="row" alignItems="center" gap="2"><BiHomeSmile/><Link to="/">Home</Link></Box>
              <Box fontSize='lg'  display="flex" flexDirection="row" alignItems="center" gap="2"><TbMoodSearch/><Link to="/">Search</Link></Box>
              <Box fontSize='lg'  display="flex" flexDirection="row" alignItems="center" gap="2"><RiHeartAddLine/><Link to="/">Folowers</Link></Box>
              <Box fontSize='lg' display="flex" flexDirection="row" alignItems="center" gap="2"><CgProfile/><Link to="/">Profile</Link></Box>
          <Button colorScheme='teal'   variant='outline'color="greenyellow">Create Post</Button>
          </Box>
        <Box>
        <Flex mt="-14">
        <Avatar src='https://bit.ly/sage-adebayo' />
        <Box ml='3'>
          <Text fontWeight='bold'>
            Malik fajar
            <Badge ml='1' gap="2">
              <Button  variant='link'><FiLogOut/></Button>
            </Badge>
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