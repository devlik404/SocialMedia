import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import Cards from "../layouts/cardSprofile";
import { useUpdateProfile } from "../features/fiture/hooks/useUpdateProfile";
import Navbar from "../layouts/layout"
export function FormUpdate() {

 const {submitHandelUpdate,changeHandlerUpdate}= useUpdateProfile();

  return (
    <Box >
      <Flex>
      <Box flex='0.4' flexDirection="column" >
          <Navbar />
        </Box>
        <Box flex='1' overflow={"none"}>
<Text fontSize={"2xl"}>Edit Profile</Text>
        <form onSubmit={submitHandelUpdate}>
        <Box flex="1">
          <Box m="4">
            <FormControl >
              <FormLabel>Full Name</FormLabel>
              <Input onChange={changeHandlerUpdate} placeholder="Fullname" name="fullname" />
            </FormControl>
          </Box>
          <Box m="4">
            <FormControl >
              <FormLabel>Nick Name</FormLabel>
              <Input onChange={changeHandlerUpdate} placeholder="Nickname" name="nickname" />
            </FormControl>
          </Box>
  
          <Box m="4">
            <FormControl>
              <FormLabel>Profile Picture</FormLabel>
              <Input onChange={changeHandlerUpdate}  type="file" name="profile_articel" />
            </FormControl>
          </Box>
        </Box>

        <Button m='4' colorScheme='teal' variant='outline' type='submit'>Submit</Button>
        </form>

        </Box>
        <Box flex='0.4' >
          <Cards />
        </Box>
      </Flex>
    </Box>
  );
}
