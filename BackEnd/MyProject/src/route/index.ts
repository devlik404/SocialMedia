import * as express from "express";
import {Request,Response} from "express";
import ThreadsController from "../controllers/ThreadsController";
import ValidationController from "../controllers/ValidationController";
import authenticate from "../middleware/authenticate";
import { upload } from "../middleware/uploadFile";
import QueueController from "../controllers/QueueController";
import RepliesController from "../controllers/RepliesController";
import LikesController from "../controllers/LikesController";


const router = express.Router();
router.get("/",(req:Request,res:Response)=>{
    return res.json({ message: 'hello world' });
});





router.get("/threads",authenticate,ThreadsController.find);
router.get("/threads/:id",authenticate,ThreadsController.findOne);
// router.post("/threads",authenticate,upload("picture"),ThreadsController.create);
router.post("/threads",authenticate,upload("picture"),QueueController.queue);
router.delete("/threads/delete/:id",ThreadsController.delete);
router.patch("/threads/update/:id",ThreadsController.update);
router.post("/threads",ThreadsController.create);


router.post("/register",ValidationController.register);
router.post("/login",ValidationController.login);
router.get("/check",authenticate,ValidationController.check);
// likes 
router.post("/likes",authenticate,LikesController.create);
router.delete("/likes/:thread_id",authenticate,LikesController.delete);
//reply comment
router.get("/replies",authenticate,RepliesController.find);
router.post("/reply",authenticate,RepliesController.create);
export default router
