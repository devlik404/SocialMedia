import * as express from "express";
import {Request,Response} from "express";
import ThreadsController from "../controllers/ThreadsController";
import ValidationController from "../controllers/ValidationController";
import authenticate from "../middleware/authenticate";


const router = express.Router();
router.get("/",(req:Request,res:Response)=>{
    return res.json({ message: 'hello world' });
});





router.get("/threads",authenticate,ThreadsController.find);
router.get("/threads/:id",authenticate,ThreadsController.findOne);
router.post("/threads",ThreadsController.create);
router.delete("/threads/delete/:id",ThreadsController.delete);
router.patch("/threads/update/:id",ThreadsController.update);
router.post("/threads",ThreadsController.create);


router.post("/register",ValidationController.register);
router.post("/login",ValidationController.login);
router.get("/check",authenticate,ValidationController.check);
export default router
