
import { Box, Flex, Text ,Image} from '@chakra-ui/react';
import Navbar from "./layout"
import { BsFillChatSquareDotsFill,BsHeartFill } from 'react-icons/bs';
import { ApiData } from '../hooks/api';
import { useEffect, useState } from 'react';
import { ThreadsCards } from '../features/threads/Thread';
import { useParams } from 'react-router-dom';



export function ThreadDetail() {
  const { id } = useParams();
  
  const [Threads, setThreads] = useState<ThreadsCards[]>([]);
  
  const fetchData = async () => {
    try {
      const response = await ApiData.get("/threads");
      setThreads(response.data);
      console.log('ini respon', response);
    } catch (error) {
      console.info(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const element = Threads.find((el) => el.id === Number(id));
  console.log('ini', element);
  return (
    <Box>
      <Flex>
        <Box flex=".5">
          <Navbar />
        </Box>
        <Box flex="1">
          {element ? (
            <Flex p="4">
              <Box>
                <Image src={element.picture} borderRadius="2xl" />
                <Flex gap={"3"}>
                  <Box>
                    <Text>{element.articel}</Text>
                  </Box>
                </Flex>
              </Box>
              <Box flexDirection="column" justifyContent="center" w="50%">
                <Box p="4">
                  <Text>{element.users.fullname}</Text>
                </Box>
                <Flex>
                  <Box p="4">
                    <Text>{element.users.nickname}</Text>
                  </Box>
                  <Box p="4">
                    <Text>{element.postDate}</Text>
                  </Box>
                </Flex>
                <Flex gap="2" p="4">

                  <Box>
                    <Box><Text>Pengikut</Text>{element.like}<BsFillChatSquareDotsFill /></Box>
                  </Box>
                  <Box>
                    <Box><Text>Followers</Text>{element.replice}<BsHeartFill /></Box>
                  </Box>
                </Flex>
              </Box>
            </Flex>) : (
            <p> tidak ada thread</p>
          )}
        </Box>
      </Flex>

    </Box>
  );
}

 
  