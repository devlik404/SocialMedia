import { Card, CardHeader, CardBody, CardFooter, Heading, Box,Button,Text ,Image, Container, Avatar, List, ListItem, Flex, Divider} from '@chakra-ui/react'

import {BiLike,BiChat,BiShare} from "react-icons/bi"
import{RiEditFill} from "react-icons/ri"
import {SlSocialGithub} from "react-icons/sl"
import{TiSocialInstagram,TiSocialLinkedin,TiSocialTwitter} from "react-icons/ti"
const Cards = () => {
    return(
      <Container>
        <Box position='fixed'>

<Box p="1"    >
<Card>
  <CardHeader>
    <Text fontSize="2xl" mb="2">Profile</Text>
    <Box bg="greenyellow" w="full" h="20" borderRadius="2xl"></Box>
    <Image 
    borderRadius="50%" 
    w="25%" 
    mt="-12"
    ml="3"
    src='https://th.bing.com/th/id/OIP.6KZiUNTqbsDFQsAxPxajLAAAAA?pid=ImgDet&rs=1'/>
    <Button gap="2" float={"right"}>Edit Profle<RiEditFill/></Button>
  </CardHeader>
  <CardBody>
  <Box mt="-10">
    <Heading size='sm'>Malik fajar</Heading>
    <Text size='xs'>FullStack Dev, @DevTech</Text>
  </Box>
  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    mt='-2'
    bottom='0'
    sx={{
      '& > button': {
        minW: '50px',
      },
    }}
  >
    <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
      10
    </Button>
    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
      2
    </Button>
    <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
      1
    </Button>
  </CardFooter>
  </CardBody>
</Card>
</Box>

<Box p="1">
<Card>
  <CardBody>
  <List spacing={3}>
  <ListItem>
    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
      <Avatar size='xs' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
        <Box>
          <Heading size='xs'>Segun Adebayo</Heading>
          <Text fontSize='xs'>Creator, Chakra UI</Text>
        </Box>
        <Box>
        <Button size='xs'>Follows</Button>
        </Box>
    </Flex>
  </ListItem>
  <ListItem>
    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
      <Avatar size='xs' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
        <Box>
          <Heading size='xs'>Segun Adebayo</Heading>
          <Text fontSize='xs'>Creator, Chakra UI</Text>
        </Box>
        <Box>
        <Button size='xs'>Follows</Button>
        </Box>
    </Flex>
  </ListItem>
  <ListItem>
    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
      <Avatar size='xs' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
        <Box>
          <Heading size='xs'>Segun Adebayo</Heading>
          <Text fontSize='xs'>Creator, Chakra UI</Text>
        </Box>
        <Box>
        <Button size='xs'>Follows</Button>
        </Box>
    </Flex>
  </ListItem>

</List>
  </CardBody>
</Card>
</Box>

<Box p="1">
<Card>
  <CardBody>
    <Flex alignItems='center' gap='1'>
  <Heading size='1pxx'>Developed By</Heading>
  <Text size='xs'>malik Fajar </Text>
  <Divider orientation='vertical' color='black' m='1'/>
  <SlSocialGithub/>
  <TiSocialInstagram/>
  <TiSocialTwitter/>
  <TiSocialLinkedin/>
    </Flex>
  </CardBody>
 
</Card>


</Box>
        </Box>
      </Container>
    )
};
export default Cards