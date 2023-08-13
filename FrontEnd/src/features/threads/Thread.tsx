import {Box, Button,Avatar,Image,Text,Flex,Divider, Card, CardFooter, CardBody, CardHeader, Heading, IconButton} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {BsHeartFill,BsFillChatSquareDotsFill, BsThreeDotsVertical} from "react-icons/bs";
import { Link } from 'react-router-dom'; // Impor Link
import { ApiData } from "../../hooks/api";
import { BiShare } from "react-icons/bi";
import { ThreadsCards } from "../../interface/interfaceData";





export  function Threads (){
 const [threads,setThreads] = useState<ThreadsCards[]>([])

 const fetchData = async ()=>{
  try {
    const response = await ApiData.get("/threads")
    setThreads(response.data)
  } catch (error) {
    console.info(error)
  }
 }
 useEffect(() => {
  fetchData()
 },[])


//  console.log('ini data' , threads)

  return (
    <>
    {threads?.map((item) =>{
     
      return (
        <>
        <Card zIndex="-1">
        <CardHeader>
          <Flex>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name='Segun Adebayo' src={item.users.profile_articel}/>
      
              <Box>
                <Heading size='sm'><Link to={`/detail/${item.id}`}>{item.users.fullname}</Link></Heading>
                <Text>{item.users.nickname}|{item.postDate}</Text>
              </Box>
            </Flex>
            <IconButton
              variant='ghost'
              colorScheme='gray'
              aria-label='See menu'
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
          {item.articel}
          </Text>
        </CardBody>
        <Image objectFit='cover' src={item.picture}/>
        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Button flex='1' variant='ghost' leftIcon={<BsHeartFill color="red" />}>
          {item.like}
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<BsFillChatSquareDotsFill color="grey" />}>
          {item.replice}
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
            Share
          </Button>
        </CardFooter>
      </Card>
          <Divider />
        </>
      );
    })}
    </>
  
  )
}


