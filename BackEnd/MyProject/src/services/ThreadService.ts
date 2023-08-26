import { Repository } from "typeorm";
import { Threads } from "../entities/Threads";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

class ThreadService {
  private readonly threadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);

  async find(reqQuery: any, loginSession?: any): Promise<any> {
    try {
      const limit = parseInt(reqQuery.limit ?? 0);
      const threads = await this.threadRepository.find({
        relations: ["users", "replies", "likes.users"],
        order: { id: "DESC" },
        take: limit,
      });

      return threads.map((element) => ({
        id: element.id,
        articel: element.articel,
        picture: element.picture,
        postDate: element.postDate,
        users: element.users,
        replies: element.replies.length,
        likes_count: element.likes.length,
        isLike: element.likes.some(
          (like: any) => like.users.id === loginSession.user.id
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  }
  async findOne(id: number, loginSession?: any): Promise<any> {
    try {
      const threads = await this.threadRepository.findOne({
        where: {
          id: id,
        },
        relations: ["users", "replies", "likes.users"],
      });
      return {
        id: threads.id,
        articel: threads.articel,
        picture: threads.picture,
        postDate: threads.postDate,
        users: threads.users,
        replies: threads.replies.length,
        likes_count: threads.likes.length,
        isLike: threads.likes.some(
          (like: any) => like.users.id === loginSession.user.id
        ),
      };
    } catch (error) {
      console.log("error findone", error);
    }
  }
  async create(req: Request, res: Response) {
    const { articel } = req.body;
    const loginSession = res.locals.loginSession;
    const usersess = loginSession.user;

    try {
      const filename = res.locals.filename;

      const data = this.threadRepository.create({
        picture: filename,
        articel: articel,
        users: usersess,
      });

      const cloudinaryConfig = cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      const cloudinaryResponse = await cloudinary.uploader.upload(
        "./uploads/" + filename
      );
      const dataCloud = this.threadRepository.create({
        picture: cloudinaryResponse.secure_url,
        articel: data.articel,
        users: data.users,
      });
      const createThreads = this.threadRepository.save(dataCloud);
      return res.status(200).json("data berhasil di tambahkan");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const threads = await this.threadRepository.delete(id);
      return res.status(200).json(threads);
    } catch (error) {
      return res.status(500).json("terjadi kesalahan delete");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const threads = await this.threadRepository.findOne({
        where: {
          id: id,
        },
      });
      const data = req.body;
      if (data.content != "") {
        threads.picture = data.picture;
      }

      if (data.content != "") {
        threads.articel = data.articel;
      }
      const updateThreads = this.threadRepository.save(threads);
      return res.status(200).json(updateThreads);
    } catch (error) {
      return res.status(500).json("gagal  update");
    }
  }
}

export default new ThreadService();
