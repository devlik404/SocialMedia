import { Request, Response } from "express";
import ThreadService from "../services/ThreadService";

class ThreadsController {
  async find(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const response = await ThreadService.find(req.query, loginSession);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const loginSession = res.locals.loginSession;

      const response = await ThreadService.findOne(id, loginSession);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  create(req: Request, res: Response) {
    ThreadService.create(req, res);
  }
  delete(req: Request, res: Response) {
    ThreadService.delete(req, res);
  }
  update(req: Request, res: Response) {
    ThreadService.update(req, res);
  }
}
export default new ThreadsController();
