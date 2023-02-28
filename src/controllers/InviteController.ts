import { Request, Response } from 'express';
import {
  IRequestCreateInvite,
  IRequestUpdateInvite,
} from '../interfaces/InviteInterfaces';

import CreateInviteService from '../services/Invite/CreateInviteService';
import UpdateInviteService from '../services/Invite/UpdateInviteService';

export default class UserController {
  async create(req: Request, res: Response) {
    const { invite }: IRequestCreateInvite = req.body;

    const createInviteService = new CreateInviteService();
    const createdInvite = await createInviteService.execute({ invite });

    res.json(createdInvite);
  }

  async update(req: Request, res: Response) {
    const { id }: { id?: number } = req.params;
    const { invite }: IRequestUpdateInvite = req.body;

    const updateInviteService = new UpdateInviteService();
    const updatedInvite = await updateInviteService.execute(
      invite,
      id as number,
    );

    res.json(updatedInvite);
  }
}
