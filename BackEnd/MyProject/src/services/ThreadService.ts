import { Repository } from "typeorm";
import { Threads } from "../entities/Threads";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Users } from "../entities/Users";
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

class ThreadService {
  private readonly threadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);
    private readonly UsersRepository: Repository<Users> =
    AppDataSource.getRepository(Users);

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
     await this.threadRepository.save(dataCloud);
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

  async update(reqBody: any, loginSession: any,res:Response): Promise<any> {
   
    try {
      const id = loginSession.user.id;
      const user = await this.UsersRepository.findOne({
        where:{
          id:id
        }
      });

      if (!user) {
        return console.log("user not found")
      }

      const data = reqBody;
    
      const filename = res.locals.filename;
     

      const cloudinaryConfig = cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });
     
      const cloudinaryResponse = await cloudinary.uploader.upload(
        "./uploads/" + filename
      );
      console.log("cloudinaryResponse",cloudinaryResponse)

      
      if (data.fullname !== undefined && data.fullname !== "") {
        user.fullname = data.fullname;
      }

      if (data.nickname !== undefined && data.nickname !== "") {
        user.nickname = data.nickname;
      }

      if (data.picture !== null && data.picture !== "") {
        user.picture = cloudinaryResponse.secure_url;
      }
      if (data.profile_articel !== null && data.profile_articel !== "") {
        user.profile_articel = cloudinaryResponse.secure_url;
      }
      
     

      const updatedUser = await this.UsersRepository.save(user);
      return {
        message: "Update Sucess",
        UpdatedUser: updatedUser,
      };
    } catch (error) {
      throw new Error("An error create the server ");
    }
  }
}

export default new ThreadService();
