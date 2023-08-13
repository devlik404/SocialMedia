import * as express from "express";
import {Request,Response} from "express";
import ThreadsController from "../controllers/ThreadsController";
import ValidationController from "../controllers/ValidationController";


const router = express.Router();
router.get("/",(req:Request,res:Response)=>{
    res.send("hello from v1");
});


router.get("/threads",ThreadsController.find);
router.get("/threads/:id",ThreadsController.findOne);
router.post("/threads",ThreadsController.create);
router.delete("/threads/delete/:id",ThreadsController.delete);
router.patch("/threads/update/:id",ThreadsController.update);
router.post("/threads",ThreadsController.create);
router.post("/threads/register",ValidationController.register);
export default router
