import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Box,
  Button,
  Text,
  Container,
  Avatar,
  List,
  ListItem,
  Flex,
  Divider,
  Image,
} from "@chakra-ui/react";

import { RiEditFill } from "react-icons/ri";
import { SlSocialGithub } from "react-icons/sl";
import {
  TiSocialInstagram,
  TiSocialLinkedin,
  TiSocialTwitter,
} from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/types/rootState";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Follows } from "../features/follows/follower";
import { ApiData } from "../hooks/api";
import { GET_FOLLOWS, SET_FOLLOWS_STATE } from "../stores/rootReducer";

const Cards = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const StateFollows = useSelector(
    (state: RootState) => state.follow.StateFollows
  );
  const follows = useSelector((state: RootState) => state.follow.follows);

  async function getFollowers() {
    const response = await ApiData.get(`/follows?type=${StateFollows}`);

    dispatch(GET_FOLLOWS(response.data));
  }

  useEffect(() => {
    getFollowers();
    dispatch(SET_FOLLOWS_STATE("recommended"));
  }, [StateFollows]);

  console.log(follows);
  console.log("auth", auth);
  return (
    <Container>
      <Box position="fixed" borderLeft={"1px solid grey"}>
        <Box p="1">
          <Card>
            <CardHeader>
              <Box w="full" h="28" position="relative" border={"1px solid grey"}   borderRadius="2xl">
                <Image
                  src={auth.picture ? auth.picture : "placeholder.png"}
                  alt="Cover Image"
                  objectFit="cover"
                  w="full"
                  h="full"
                  borderRadius="2xl"
                />
              </Box>
              <Avatar
                size="lg"
                mt="-7"
                ml="5"
                src={
                  auth.profile_articel
                    ? auth.profile_articel
                    : "placeholder.png"
                }
              />
              <Link to={`/profile/update/${auth.id}}`}>
                <Button gap="2" float={"right"} mt={"4"}>
                  Edit Profle
                  <RiEditFill />
                </Button>
              </Link>
            </CardHeader>
            <CardBody>
              <Box mt="-10">
                <Heading size="sm">{auth.fullname}</Heading>
                <Text size="xs">FullStack Dev,{auth.nickname}</Text>
              </Box>
              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                mt="-2"
                bottom="0"
                sx={{
                  "& > button": {
                    minW: "50px",
                  },
                }}
              >
                <Box textAlign={"center"}>
                  <Text>followers</Text>
                  <Text>10</Text>
                </Box>
                <Box textAlign={"center"}>
                  <Text>followings</Text>
                  <Text>10</Text>
                </Box>
              </CardFooter>
            </CardBody>
          </Card>
        </Box>

        <Box p="1">
          <Card>
            <CardHeader>Suggested For You:</CardHeader>
            <CardBody>
              <List spacing={3}>
                <ListItem>
                  {follows?.map((follow, i) => (
                    <Follows
                      key={i}
                      id={follow.id}
                      user_id={follow.user_id}
                      fullname={follow.fullname}
                      nickname={follow.nickname}
                      email={follow.email}
                      picture={follow.picture}
                      profile_article={follow.profile_article}
                      is_followed={follow.is_followed}
                    />
                  ))}
                </ListItem>
              </List>
            </CardBody>
          </Card>
        </Box>

        <Box p="2">
          <Card>
            <CardBody>
              <Flex alignItems="center" gap="1">
                <Heading size="1pxx">Developed By</Heading>
                <Text size="xs">malik Fajar </Text>
                <Divider orientation="vertical" color="black" m="1" />
                <SlSocialGithub />
                <TiSocialInstagram />
                <TiSocialTwitter />
                <TiSocialLinkedin />
              </Flex>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};
export default Cards;
