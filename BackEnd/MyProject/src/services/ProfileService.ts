import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Users } from "../entities/Users";
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

class ProfileService {
  private readonly UsersRepository: Repository<Users> =
    AppDataSource.getRepository(Users);
  async patch(reqBody: any, loginSession: any, res: Response): Promise<any> {
    try {
      const id = loginSession.user.id;
      const user = await this.UsersRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!user) {
        return console.log("user not found");
      }

      const data = reqBody;
      console.log("data", data);
      const filename = res.locals.filename;
      console.log("filename", filename);

      const cloudinaryConfig = cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      const cloudinaryResponse = await cloudinary.uploader.upload(
        "./uploads/" + filename
      );
      console.log("cloudinaryResponse", cloudinaryResponse);

      if (data.picture !== null && data.picture !== "") {
        user.picture = cloudinaryResponse.secure_url;
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

  async update(req: Request,  res: Response){
    try {
      const id = parseInt(req.params.id);
      // const id = loginSession.user.id;
      console.log("id",id)
      // console.log("ids",ids)
      const user = await this.UsersRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!user) {
        return console.log("user not found");
      }

      const data = req.body;
     
      const filename = res.locals.filename;
      console.log("filename", filename);

      const cloudinaryConfig = cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      const cloudinaryResponse = await cloudinary.uploader.upload(
        "./uploads/" + filename
      );
     
      if (data.fullname !== undefined && data.fullname !== "") {
        user.fullname = data.fullname;
      }

      if (data.nickname !== undefined && data.nickname !== "") {
        user.nickname = data.nickname;
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

export default new ProfileService();
