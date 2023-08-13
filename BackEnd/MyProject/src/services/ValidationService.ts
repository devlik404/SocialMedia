import { AppDataSource } from "../data-source";
import { Users } from "../entities/Users";
import { Request, Response } from "express";
import { Repository } from "typeorm";




class ValidationService {
    private readonly validationRepository: Repository<Users> = AppDataSource.getRepository(Users);
    async create(req:Request,res:Response){
        try {
            const data = req.body;
            const validation = this.validationRepository.create({
                fullname:data.fullname,
                nickname:data.nickname,
                email:data.email,
                password:data.password
            });
          const  createValid = this.validationRepository.save(validation);
               return res.status(200).json("data berhasil di tambahkan");
        } catch (error) {
            return res.status(500).json("terjadi kesalahan");
        }

    }

}
export default new ValidationService;