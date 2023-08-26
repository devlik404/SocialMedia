import { Avatar, Box, Button, Container,Flex,  Input, InputGroup, WrapItem } from "@chakra-ui/react"

import {RiImageAddFill} from "react-icons/ri"
import { usePost } from "./hooks/usePost"





const ContenPost = ()=>{
    
  const { submitHandler ,handleArticelChange, handlePictureChange,handleIconButtonClick,content} = usePost()
   
    return(
        <Container position="sticky" top="0" p="2" boxShadow="md" zIndex="1">
          <form onSubmit={submitHandler}>
            <Flex gap="10" mt="2" flex="1" >
              <Box>
              <WrapItem>
                  <Avatar size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />{' '}
              </WrapItem>
              </Box>
              <Box>
              <Input
              variant='flushed'
              type="text"
              value={content.article}
              onChange={handleArticelChange}
              placeholder='Create Content..'
              size='lg'
              
              />
              </Box>
              <Box>
                  <InputGroup size='sm' gap="2">
              <Box>
                  <label htmlFor="image-upload-input" >
                  <Button leftIcon={<RiImageAddFill/>} as="span" cursor={"pointer"} color={'greenyellow'}/>
                  </label>
                    <Input width='100px' type="file" onChange={handlePictureChange} hidden id="image-upload-input" />
              </Box>
            
                <Button type="submit" borderRadius="full"  onClick={handleIconButtonClick}  variant='outline'
                        colorScheme={content ? 'green' : 'teal'}>Post</Button>
                  </InputGroup>
              </Box>
          </Flex>
          </form>
        </Container>
    )
}

export default ContenPost