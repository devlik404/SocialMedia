import {
  Box,
  Button,
  Avatar,
  Image,
  Text,
  Flex,
  Divider,
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  IconButton,
  Stack,
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
} from "@chakra-ui/react";
import {
  BsHeartFill,
  BsFillChatSquareDotsFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiShare } from "react-icons/bi";
import { TimeFormat } from "../fiture/hooks/timeConvert";
import { useLikes } from "../fiture/hooks/useLikes";
import { Replythreads } from "../fiture/replyThreads";
import { UseThreads } from "../fiture/hooks/useThreads";

export function Threads() {
  //func Get Threads
  UseThreads();
  //Threads home replies
  const {
    selectedThread,
    postReplies,
    steps,
    activeStep,
    initialRef,
    finalRef,
    isOpen,
    onClose,
    handleOpen,
  } = Replythreads();

  //format PostDate

  const { formatTimeAgo } = TimeFormat();
  //Likes fiture
  const { handleLikes, threads } = useLikes();

  return (
    <>
      {threads?.map((item, i) => {
        return (
          <>
            <Card key={i}>
              <CardHeader>
                <Flex>
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar name="Segun Adebayo" src={item.users?.picture} />

                    <Box>
                      <Text color="teal.500" fontSize="lg">
                        <Link to={`/detail/${item.id}`}>
                          {item.users?.fullname}
                        </Link>
                      </Text>
                      <Stack alignItems="center" direction="row" h="30px" p="2">
                        <Text fontSize="md"> {item.users?.nickname}</Text>
                        <Divider orientation="vertical" />
                        <Text fontSize="md">
                          {" "}
                          {formatTimeAgo(item.postDate)}
                        </Text>
                      </Stack>
                    </Box>
                  </Flex>
                  <IconButton
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="See menu"
                    icon={<BsThreeDotsVertical />}
                  />
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>{item.articel}</Text>
              </CardBody>
              <Image objectFit="cover" src={item.picture} />
              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "136px",
                  },
                }}
              >
                <Box>
                  <Button
                    flex="1"
                    variant="ghost"
                    leftIcon={
                      item.isLike ? (
                        <BsHeartFill color="red" />
                      ) : (
                        <BsHeartFill color="white" />
                      )
                    }
                    onClick={() => handleLikes(item.id, item.isLike)}
                  >
                    <Text>{item.likes_count}</Text>
                  </Button>
                </Box>
                <Button
                  onClick={() => handleOpen(item)}
                  flex="1"
                  variant="ghost"
                  leftIcon={<BsFillChatSquareDotsFill color="grey" />}
                >
                  {item.replies}
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                  Share
                </Button>
              </CardFooter>
            </Card>
            <Divider />
          </>
        );
      })}
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
                          <Avatar src={selectedThread?.picture} size="sm" />
                        }
                        active={
                          <Avatar
                            src={selectedThread?.users.picture}
                            size="sm"
                          />
                        }
                      />
                    </StepIndicator>

                    <Box flexShrink="0" maxWidth="380px">
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>
                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} onClick={onClose}>
                Send
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
