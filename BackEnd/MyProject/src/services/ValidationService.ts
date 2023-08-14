import { AppDataSource } from "../data-source";
import { Users } from "../entities/Users";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { schema } from "../utils/joiValidate";
import * as jwt from "jsonwebtoken"
import { secretKey } from "../middleware/authenticate";

class ValidationService {
    private readonly validationRepository: Repository<Users> = AppDataSource.getRepository(Users);

    async create(req:Request,res:Response){
        try {
            const data = req.body;
            const hash = await bcrypt.hash(data.password, 10)
            const validation = this.validationRepository.create({
                fullname:data.fullname,
                nickname:data.nickname,
                email:data.email,
                password:hash
            });
            
          const  createValid = this.validationRepository.save(validation);
               return res.status(200).json("data berhasil di tambahkan");
        } catch (error) {
            return res.status(500).json("terjadi kesalahan");
        }

    }


    async login(req:Request,res:Response){
    try {
        const data = req.body;
        // const { error, value } = schema.validate(data);
        // if (error) {
        //     return res.status(400).json({error:error});
        // }
        const validation = await this.validationRepository.findOne({
         where:{
            email:data.email
         },
         select:["id","nickname","fullname","email","password"]
        })
        if (!validation) {
            return res.status(401).json("User not found");
        }
        const compareHash =  bcrypt.compare(data.password,validation.password)
        console.log(compareHash)
        if (!compareHash) {
            return res.status(401).json("Invalid password");
        }
        const user = ({
            id:validation.id,
            fullname:validation.fullname,
            nickname:validation.nickname,
            email:validation.email,

        })
        const token = jwt.sign({user}, secretKey, { expiresIn: '1h' });
        return res.status(200).json({
            user:user,
            token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json("An error occurred");
    }
       
     }

     async check(req:Request,res:Response){
        try {
            const loginSession = res.locals.loginSession
            const user = await this.validationRepository.findOne ({
                where:{
                    id:loginSession.id
                },
                select:["id","nickname","fullname","email","password"]
            })
        
               return res.status(200).json({
                user,
                message:"token valid"
               });
        } catch (error) {
            return res.status(500).json("terjadi kesalahan validasi");
        }

    }
}
export default new ValidationService;