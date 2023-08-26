import { Request, Response } from "express";
import LikesService from "../services/LikesService";

class LikesController {
  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      console.log("ini data loginsess", loginSession);
      const response = await LikesService.create(req.body, loginSession);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "wrong something server hahah:" });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const threadId = parseInt(req.params.thread_id);

      const loginSession = res.locals.loginSession;

      const response = await LikesService.delete(threadId, loginSession);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
export default new LikesController();
