import { Avatar, Box, Button, Container,Flex, IconButton, Input, InputGroup, WrapItem, useToast } from "@chakra-ui/react"

import { ApiData } from "../../hooks/api"
import { useState, useEffect, ChangeEvent, FormEvent} from "react"

import {FaCheck,FaImage} from "react-icons/fa"
import { ThreadsCards } from "../../interface/interfaceData"



interface IthreadPost {
    articel:string,
    picture : string
}

const ContenPost = ()=>{
    const [_,setThreads] = useState<ThreadsCards[]>([])
    const [content,setContent] = useState<IthreadPost>({
        articel:"",
        picture:"",
    })
    const toast = useToast();
console.log("contentpost data",content)
    const fetchData = async ()=>{
     try {
       const response = await ApiData.get("/threads")
       console.info("error fetch:",response.data)
       setThreads(response.data)
     } catch (error) {
       console.log("error fetchdata:",error)
     }
    }
    const  changeHandler = (event:ChangeEvent<HTMLInputElement>)=>{
        setContent({
            ...content,
            [event.target.name]:event.target.value,
        })
        console.log(setContent,"data chengehandler spreds")
    }
    const sumbitHandel = async (e:FormEvent) =>{
        e.preventDefault()
        try {
            const response = await ApiData.post("/threads",{
                articel:content.articel,
                picture:content.picture,
            })
            console.log("response",response.data)
            setContent({
                articel:"",
                picture:"",
            })
            fetchData()
            console.log(fetchData,"data submit di fetchdata")
        } catch (error) {
            console.log("error submit data",error)
        }
    }
    useEffect(() => {
     fetchData()
    },[])

    const handleIconButtonClick = () => {
        if (content) {
            if (content.picture) {
              toast({
                title: 'Gambar Terpilih',
                description: `Anda telah memilih gambar dengan nilai: ${content.picture}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            } else {
              toast({
                title: 'Gambar Kosong',
                description: 'Anda belum memilih gambar.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
              });
            }
          } else {
            fetchData();
        }
    };
    return(
        
        <Container
        position="sticky"
        top="0"
       p="2"
        boxShadow="md"
        
       >

            <form onSubmit={sumbitHandel}>
       <Flex gap="10" mt="2" flex="1" >
        <Box>
        <WrapItem>
            <Avatar size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />{' '}
        </WrapItem>
        </Box>
        <Box>
        <Input
        name="articel"
        onChange={changeHandler}
        value={content.articel}
        placeholder='Create Content..'
        size='lg'
        
        />
        </Box>
        <Box>
            <InputGroup size='sm' gap="2">
            <IconButton
        variant='outline'
        colorScheme={content ? 'green' : 'teal'}
        aria-label={content ? 'Simpan Gambar' : 'Tambahkan Gambar'}
        icon={content ? <FaCheck /> : <FaImage />}
        onClick={handleIconButtonClick}
      />
      {content && (
        <Input
          width='100px'
          name='picture'
          value={content.picture}
          onChange={changeHandler}
          placeholder='Masukkan URL Gambar'
        />
      )}
            
            {/* <IconButton variant='outline' colorScheme='teal' aria-label='Send email' icon={<LuImagePlus/>}>
            </IconButton>
           <Input  width='lg'  name="picture" value={content.picture} onChange={changeHandler}/>
          
           */}
            <Button type="submit" borderRadius="full">Post</Button>
            </InputGroup>
        </Box>
       </Flex>
        </form>
        </Container>
    )
}

export default ContenPost