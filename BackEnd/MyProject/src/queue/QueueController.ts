import * as amqp from "amqplib";
import { Request,Response } from "express";

class QueueControllerProduct{
    async enqueue(req:Request,res:Response){

        try {
            const queueName ="thread-queue";
          

                const filename = res.locals.filename;
                const loginSession = res.locals.loginSession 
         
                const payload={
                    articel:req.body.articel?req.body.articel:"",
                    picture:filename?filename:null,
                    users:loginSession.user
                };
           


           
            const connection = await amqp.connect("amqp://localhost");
            const channel = await connection.createChannel();

            await channel.assertQueue(queueName);

            channel.sendToQueue(queueName,
            Buffer.from(JSON.stringify(payload)));
            await channel.close();
            await connection.close();

            res.status(200).json({
                message:"Thread is queued!",
            });
   
        } catch (error) {
            console.error("Error enqueueing message:",error);
            res.status(500).json({
                error:"something wrong in server!",
            });
        }
    }
}
export default new QueueControllerProduct();