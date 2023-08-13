import { Request, Response } from "express";
import ValidationService from "../services/ValidationService";

class ValidationController{

    register(req:Request,res:Response){
        ValidationService.create(req,res);
    }

}
export default new ValidationController();