import * as express from "express";
import {Request,Response} from "express";

import { AppDataSource } from "./data-source"
import router from "./route";
import * as cors from "cors";

const app = express();
app.use(cors())
AppDataSource.initialize().then(async () => {
    const port = 5000;
    
    app.use(express.json());
    app.use("/api/v1",router);

    app.get("/",(req:Request,res:Response) => {
        res.send("hello world");
    });
    app.listen(port,()=>{
        console.log(`server is running on localhost:${port}`)
    })


}).catch(error => console.log(error))
