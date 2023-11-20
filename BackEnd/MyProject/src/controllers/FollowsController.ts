import { Request, Response } from "express";
import FollowsService from "../services/FollowsService";

class FollowsController {
  async find(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const limit = (req.query.limit ?? 0) as number;
      const type = (req.query.type ?? "") as string;


      const response = await FollowsService.find(loginSession, type, limit);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "wrong something server hahah:" });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
    
      const response = await FollowsService.create(req.body, loginSession);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "wrong something server hahah:" });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const followedId = parseInt(req.params.followed_id);

      const response = await FollowsService.delete(followedId, loginSession);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
export default new FollowsController();
