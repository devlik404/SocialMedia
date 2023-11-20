import { Request, Response } from "express";
import QueueControllerProduct from "../queue/QueueController";

class QueueController{

    queue(req:Request,res:Response){
        QueueControllerProduct.enqueue(req,res);

}
}
export default new QueueController();