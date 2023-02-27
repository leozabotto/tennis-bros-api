/*import { Request, Response } from 'express';
import { IRequestCreateInvite } from '../interfaces/InviteInterfaces';

import CreateInviteService from '../services/Invite/CreateInviteService';

export default class UserController {
  async create(req: Request, res: Response) {
    const { invite }: IRequestCreateInvite = req.body;

    const createInviteService = new CreateInviteService();
    const createdInvite = await createInviteService.execute({ invite });

    res.json(createdInvite);
  }

  /*async find(req: Request, res: Response) {
    const { id }: IRequestFindUser = req.params;

    const findUserService = new FindUserService();
    const foundUser = await findUserService.execute({
      id,
    });

    res.json(foundUser);
  }*/
