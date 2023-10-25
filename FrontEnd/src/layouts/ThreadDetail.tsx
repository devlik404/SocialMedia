import {
  Box,
  Flex,
  Text,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Divider,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Avatar,
} from "@chakra-ui/react";
import Navbar from "./layout";
import { BsFillChatSquareDotsFill, BsHeartFill } from "react-icons/bs";
import {ReplyPost} from "../features/fiture/replyPost"
import { TimeFormat } from "../features/fiture/hooks/timeConvert";



export function ThreadDetail() {
  const {handleLikes,postReplies, element, replies,steps, activeStep , isOpen, onOpen, onClose ,initialRef,finalRef} = ReplyPost();
  const {formatTimeAgo}= TimeFormat()


  return (
    <Box>
      <Flex>
        <Box flex=".5">
          <Navbar />
        </Box>
        <Box flex="1">
          <Box p="4">
            <Box>
              <Box>
                <Image
                  src={element?.users.picture}
                  borderRadius="2xl"
                  h="50vh"
                  w="100%"
                  objectFit="cover"
                />
                <Avatar
                size='2xl' 
                  
                
                  mt="-20"
                  ml="3"
                  src={element?.users.picture}
                />
              </Box>
            </Box>
            <Box flexDirection="column" justifyContent="center" w="50%">
              <Box p="4">
                <Text>{element?.users.fullname}</Text>
              </Box>
              {/* {follows?.map((follow,i) => (

          <Button onClick={()=>handleFollows(follow.id,follow.user_id,follow.is_followed)} >
            {follow.is_followed?"unfollow":"follow"}

          </Button>

))} */}
              <Flex>
                <Box p="4">
                  <Text>{element?.users.nickname}</Text>
                </Box>
                <Box p="4">
                  <Text>{formatTimeAgo(element?.postDate)}</Text>
                </Box>
              </Flex>
            </Box>

            <Tabs>
              <TabList>
                <Tab>Post</Tab>
                <Tab>Replies</Tab>
                <Tab>Media</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Flex alignItems='center'>
                <Box>
                <Avatar size="md" src={element?.users.picture}/>
                </Box>
                <Box p='2'>
                <Text as='b'>{element?.users.fullname}</Text>
                </Box>
                </Flex>
                  <Box p='2'>
                    <Text>{element?.articel}</Text>
                  </Box>
                </TabPanel>

                <TabPanel>
                  <Box>
                    <Image
                      src={element?.picture}
                      borderRadius="2xl"
                      h="50vh"
                      objectFit="cover"
                    />
                    <Flex gap="7" p="4" alignItems={"center"}>
                      <Box>
                        <Button onClick={onOpen}>
                          <BsFillChatSquareDotsFill>
                            {" "}
                            {element?.isLike}
                          </BsFillChatSquareDotsFill>
                        </Button>
                      </Box>
                      <Box>
                      <Button
                    flex="1"
                    variant="ghost"
                    leftIcon={
                      element?.isLike? (
                        <BsHeartFill color="red" />
                      ) : (
                        <BsHeartFill color="white" />
                      )
                    }
                    onClick={() => handleLikes(element?.id, element?.isLike)}
                  >
                    <Text>{element?.likes_count}</Text>
                  </Button>
                        {/* <BsHeartFill>{element?.replies}</BsHeartFill> */}
                      </Box>
                    </Flex>
                  </Box>
                </TabPanel>

                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>

            </Tabs>

            <Divider />

            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <form onSubmit={postReplies}>
                  <ModalHeader>Create your Replies</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Stepper
                      index={activeStep}
                      orientation="vertical"
                      height="300px"
                      gap="0"
                    >
                      {steps.map((step, index) => (
                        <Step key={index}>
                          <StepIndicator>
                            <StepStatus
                              complete={
                                <Avatar src={element?.picture} size="sm" />
                              }
                              active={
                                <Avatar
                                  src={element?.users.picture}
                                  size="sm"
                                />
                              }
                            />
                          </StepIndicator>

                          <Box flexShrink="0" maxWidth="380px">
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>
                           
                              {step.description}
                             
                            </StepDescription>
                          </Box>
                          <StepSeparator />
                        </Step>
                      ))}
                    </Stepper>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      mr={3}
                      onClick={onClose}
                    >
                      Send
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
          </Box>

          <Box>
            {replies?.map((reply) => {
              return (
                <>
                  <Box key={reply.users.id}>
                    <Flex alignItems="center">
                    <Box>
                    <Avatar
                      size="xs"
                      src={
                        reply.users?.picture
                          ? reply.users?.picture
                          : "/user-placeholder.png"
                      }
                    />
                    </Box>
                    <Box p="2">
                      <Text fontSize="xs">@{reply.users.fullname}</Text>
                    </Box>
                    </Flex>
                    <Text p="2">{reply.articel}</Text>
                  </Box>
                  <Divider />
                </>
              );
            })}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
