import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Likes } from "../entities/Likes";

class LikesService {
  private readonly likesRepository: Repository<Likes> =
    AppDataSource.getRepository(Likes);

  async create(reqBody: any, loginSession: any): Promise<any> {
    try {
      const liked = await this.likesRepository.count({
        where: {
          users: {
            id: loginSession.user.id,
          },
          threads: {
            id: reqBody.thread_id,
          },
        },
      });

      if (liked > 0) {
        throw new Error("already like in threads");
      }

      const Likes = this.likesRepository.create({
        threads: {
          id: reqBody.thread_id,
        },
        users: {
          id: loginSession.user.id,
        },
      });

      await this.likesRepository.save(Likes);

      return {
        message: "you liked",
        Likes: Likes,
      };
    } catch (error) {
      throw new Error("An error create the server ");
    }
  }
  async delete(threadsId: number, loginSession: any): Promise<any> {
    try {
      const likes = await this.likesRepository.findOne({
        where: {
          threads: {
            id: threadsId,
          },
          users: {
            id: loginSession.user.id,
          },
        },
      });

      if (!likes) {
        throw new Error("don't ready like in threads");
      }

      await this.likesRepository.delete({
        id: likes.id,
      });

      return {
        message: "unliked threads",
        likes: likes,
      };
    } catch (err) {
      throw new Error("An error the server");
    }
  }
}
export default new LikesService();
