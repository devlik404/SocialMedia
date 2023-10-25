import { AppDataSource } from "../data-source";
import { QueryBuilder, Repository } from "typeorm";
import { Follows } from "../entities/Follows";
import { Users } from "../entities/Users";
import { query } from "express";

class FollowsService {
  private readonly FollowsRepository: Repository<Follows> =
    AppDataSource.getRepository(Follows);
  private readonly UsersRepository: Repository<Users> =
    AppDataSource.getRepository(Users);

  async find(
    loginSession: any,
    queryType?: string,
    queryLimit?: number
  ): Promise<any> {
    try {
      let follows: Follows[];
    
      if (queryType === "followings") {
        follows = await this.FollowsRepository.find({
          take: queryLimit,
          where: {
            follower: {
              id: loginSession.user.id,
            },
          },
          relations: ["followed", "follower"],
        });
        return follows.map((follow) => ({
          id: follow.id,
          user_id: follow.followed.id,
          fullname: follow.followed.fullname,
          nickname: follow.followed.nickname,
          email: follow.followed.email,
          picture: follow.followed.picture,
          profile_article: follow.followed.profile_articel,
          is_followed: true,
        }));
      }
      else if (queryType === "recommended") {
        
        const currentUserId = loginSession.user.id;
        
        
       const follows = await this.FollowsRepository.find({
          take: queryLimit,
          where: {
            follower: {
              id: currentUserId,
            },
          },
          relations: ["followed", "follower"],
        });
       
        const followedIds = follows.map((follow) => follow.followed.id);
   
     
        const usersNotFollowed = await this.UsersRepository.createQueryBuilder("user")
          .where("user.id != :currentUserId", { currentUserId })
          .andWhere("user.id NOT IN (:...followedIds)", { followedIds })
          .limit(5)
          .getMany();
     
      
        return usersNotFollowed.map((user) => ({
          id: user.id,
          user_id: user.id,
          fullname: user.fullname,
          nickname: user.nickname,
          email: user.email,
          picture: user.picture,
          profile_article: user.profile_articel,
          is_followed: false,
        }));
      }
      
      
      
       else if (queryType === "followers") {
        follows = await this.FollowsRepository.find({
          take: queryLimit,
          where: {
            followed: {
              id: loginSession.user.id,
            },
          },
          relations: ["followed", "follower"],
        });
      

        return await Promise.all(
          follows.map(async (follow) => {
            const isFollowed = await this.FollowsRepository.count({
              where: {
                follower: {
                  id: loginSession.user.id,
                },
                followed: {
                  id: follow.follower.id,
                },
              },
            });
            return {
              id: follow.id,
              user_id: follow.follower.id,
              fullname: follow.follower.fullname,
              nickname: follow.follower.nickname,
              email: follow.follower.email,
              picture: follow.follower.picture,
              profile_articel: follow.follower.profile_articel,
              is_followed: isFollowed > 0,
            };
          })
        );
      }
      return {
        message: `please valid "type" query(followers/following)`,
      };
    } catch (error) {
      throw new Error("An error create the server ");
    }
  }

  async create(reqBody: any, loginSession: any): Promise<any> {
    try {
     
      const followNow = await this.FollowsRepository.count({
        where: {
          follower: {
            id: loginSession.user.id,
          },
          followed: {
            id: reqBody.followed_id,
          },
        },
      });

      if (followNow > 0) {
        throw new Error("already follows in users");
      }

      if (reqBody.followed_id === loginSession.user.id) {
        throw new Error("you can't follows yourself");
      }

      const UsersNow = await this.UsersRepository.count({
        where: {
          id: reqBody.followed_id,
        },
      });

      if (UsersNow <= 0) {
        throw new Error("this user doesn't usernow");
      }
      const follow = this.FollowsRepository.create({
        follower: {
          id: loginSession.user.id,
        },
        followed: {
          id: reqBody.followed_id,
        },
      });

      await this.FollowsRepository.save(follow);

      return {
        message: "you follow user",
        Follow: follow,
      };
    } catch (error) {
      throw new Error("An error create the server ");
    }
  }

  async delete(followedId: number, loginSession: any): Promise<any> {
    try {
      const follows = await this.FollowsRepository.findOne({
        where: {
          follower: {
            id: loginSession.user.id,
          },
          followed: {
            id: followedId,
          },
        },
      });

      if (!follows) {
        throw new Error("don't follow this users ");
      }

      await this.FollowsRepository.delete({
        id: follows.id,
      });

      return {
        message: "unfollows users!",
        follows: follows,
      };
    } catch (err) {
      throw new Error("An error the server");
    }
  }
}
export default new FollowsService();
