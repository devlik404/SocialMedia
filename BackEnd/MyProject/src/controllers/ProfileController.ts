import { Request, Response } from "express";
import ProfileService from "../services/ProfileService";

class ProfileController {
 
  async update(req: Request, res: Response) {
    try {
      // const loginSession = res.locals.loginSession;
    
      const response = await ProfileService.update(req,res);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "wrong something server hahah:" });
    }
  }

  async patch(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
    
      const response = await ProfileService.patch(req.body, loginSession,res);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: "wrong something server hahah:" });
    }
  }

}
export default new ProfileController();
