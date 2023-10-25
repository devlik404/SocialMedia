import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Navbar from "./layout";
import { useDispatch, useSelector } from "react-redux";
import { ApiData } from "../hooks/api";
import { GET_FOLLOWS, SET_FOLLOWS_STATE } from "../stores/rootReducer";
import { RootState } from "../stores/types/rootState";
import { useEffect } from "react";
import { Follows } from "../features/follows/follower";

export function FollowersPage() {
  const dispatch = useDispatch();
  const StateFollows = useSelector(
    (state: RootState) => state.follow.StateFollows
  );
  const follows = useSelector((state: RootState) => state.follow.follows);

  // const threads = useSelector((state:RootState)=>state.thread.threads);

  async function getFollowers() {
    const response = await ApiData.get(`/follows?type=${StateFollows}`);

    dispatch(GET_FOLLOWS(response.data));
  }

  useEffect(() => {
    getFollowers();
  }, [StateFollows]);

  return (
    <>
      <Box>
        <Flex>
          <Box flex=".4">
            <Navbar />
          </Box>
          <Box flex="1">
              <Tabs w="100%">
                <TabList
                  justifyContent="center"
                  color={"greenyellow"}
                  p="2"
                  gap="100"
                >
                  <Tab onClick={() => dispatch(SET_FOLLOWS_STATE("followers"))}>
                    Follower
                  </Tab>
                  <Tab
                    onClick={() => dispatch(SET_FOLLOWS_STATE("followings"))}
                  >
                    Followed
                  </Tab>
                  <Tab
                    onClick={() => dispatch(SET_FOLLOWS_STATE("recommended"))}
                  >
                    Recomended
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
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
                  </TabPanel>
                  <TabPanel>
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
                  </TabPanel>
                  <TabPanel>
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
                  </TabPanel>
                </TabPanels>
              </Tabs>
          
          </Box>
         
        </Flex>
      </Box>
    </>
  );
}
