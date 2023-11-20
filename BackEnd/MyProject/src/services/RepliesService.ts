import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Replies } from "../entities/Replies";


class RepliesService {
  private readonly RepliesRepository: Repository<Replies> =
    AppDataSource.getRepository(Replies);

  async find(reqQuery: any): Promise<any> {
    try {
      const ThreadId = parseInt(reqQuery.thread_id ?? 0);
      const replies = await this.RepliesRepository.find({
        relations: ["users", "threads"],
        where: {
          threads: {
            id: ThreadId,
          },
        },
        order: {
          id: "DESC",
        },
      });

      return replies;
    } catch (err) {
      throw new Error("An error the server");
    }
  }

  async create(reqBody: any, loginSession: any): Promise<any> {
    try {
      const reply = this.RepliesRepository.create({
        articel: reqBody.articel,
        users: {
          id: loginSession.user.id,
        },
        threads: {
          id: parseInt(reqBody.thread_id),
        },
      });

      await this.RepliesRepository.save(reply);
      return;
    } catch (error) {
      throw new Error("An error create the server ");
    }
  }
}
export default new RepliesService();
