import { useDispatch } from "react-redux";
import { ApiData } from "../../hooks/api";
import { SET_FOLLOW } from "../../stores/rootReducer";
import { IFollowers } from "../../interface/IFollows";
import { Avatar, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

export function Follows(props: IFollowers) {
  const dispatch = useDispatch();
  // const follows = useSelector((state: RootState) => state.follow.follows);
  async function handleFollows(
    id: number,
    followdId: number,
    isFollowed: boolean
  ) {
    try {
      if (!isFollowed) {
        await ApiData.post(`/follower`, {
          followed_id: followdId,
        });
        dispatch(
          SET_FOLLOW({
            id: id,
            isFollowed: isFollowed,
          })
        );
      } else {
        await ApiData.delete(`/follower/${followdId}`);
        dispatch(
          SET_FOLLOW({
            id: id,
            isFollowed: isFollowed,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Box flex="1" gap="4" alignItems="center" flexWrap="wrap">
    <Flex gap="4">
        <Box p="2">

        <Avatar
          size="md"
          name="Segun Adebayo"
          src={props.picture ?? "/user-png"}
        />
        </Box>
        <Box p="2" w="40%">
          <Heading size="xs">{props.fullname}</Heading>
          <Text fontSize="xs">{props.nickname}</Text>
        </Box>
        <Box p="2">
        <Button
           flex="1"
        size="sm"
            onClick={() =>
              handleFollows(props.id, props.user_id, props.is_followed)
            }
          >
            {props.is_followed ? "unfollow" : "follow"}
          </Button>
        </Box>
    </Flex>
      </Box>
    </>
  );
}
