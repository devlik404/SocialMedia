import { Repository } from "typeorm";
import { Threads } from "../entities/Threads";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";


class ThreadService {
    private readonly threadRepository: Repository<Threads> = AppDataSource.getRepository(Threads);

    async find(req:Request,res:Response): Promise<Response>{
        try{
            const threads = await this.threadRepository.find({
                relations:["users","replies","likes"]
            });
            return res.status(200).json(threads);
        }catch(err){
            return res.status(500).json({err:"error while getting thread"});
        }
    }
    async findOne(req:Request,res:Response){
       const  id = parseInt(req.params.id);
       const threads = await this.threadRepository.findOne({
        where:{
            id:id
        },
        relations:["users","replies","likes"]
       });
       return res.status(200).json(threads);
    }
    async create(req:Request,res:Response){
        try {
            const data = req.body;
            const threads = this.threadRepository.create({
            picture:data.picture,
            articel:data.articel
           
    
            });
          const  createThreads = this.threadRepository.save(threads);
               return res.status(200).json("data berhasil di tambahkan");
            
        } catch (error) {
            return res.status(500).json("terjadi kesalahan");
        }

    }
    async delete(req:Request,res:Response){
        try {
            const id = parseInt(req.params.id);
            const threads = await this.threadRepository.delete(id);
            return res.status(200).json(threads);
            
        } catch (error) {
            return res.status(500).json("terjadi kesalahan delete");
        }
    }

    async update(req:Request,res:Response){
        try {
            const  id = parseInt(req.params.id);
            const threads = await this.threadRepository.findOne({
             where:{
                 id:id
             }
            });
            const data = req.body;
            if(data.content != ""){
                threads.picture = data.picture
            }
       
            if(data.content != ""){
                threads.articel = data.articel
            }
            const  updateThreads = this.threadRepository.save(threads);
            return res.status(200).json(updateThreads);
            
        } catch (error) {
            return res.status(500).json("gagal coy update");
        }
     }
}



export default new ThreadService;