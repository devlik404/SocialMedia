import { Box, Flex } from "@chakra-ui/react";
import Home from "./home";
import Navbar from "./layout"
import Cards from "./cardSprofile"
import ContentPost from "../features/fiture/contentPost";


const ThreeColumnLayout = () => {
  
    return (
      

      <Flex>
        <Box flex='0.4' flexDirection="column" >
          <Navbar />
        </Box>
     
        <Box flex='1'>
            <ContentPost/>
        <Home />
        </Box>
  
        <Box  flex='0.5' h='100vh' >
        <Cards/>
        </Box>
          
          
      </Flex>
     
    );
  };
  
  export default ThreeColumnLayout;