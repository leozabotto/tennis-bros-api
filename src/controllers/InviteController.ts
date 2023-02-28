import { Request, Response } from 'express';
import {
  IRequestCreateInvite,
  IRequestUpdateInvite,
} from '../interfaces/InviteInterfaces';

import FindInviteService from '../services/Invite/FindInviteService';
import CreateInviteService from '../services/Invite/CreateInviteService';
import UpdateInviteService from '../services/Invite/UpdateInviteService';
import DeleteInviteService from '../services/Invite/DeleteInviteService';

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

  async find(req: Request, res: Response) {
    const { id }: { id?: number } = req.params;

    const findInviteService = new FindInviteService();
    const invite = await findInviteService.execute(id as number);

    res.json(invite);
  }

  async delete(req: Request, res: Response) {
    const { id }: { id?: number } = req.params;

    const deleteInviteService = new DeleteInviteService();
    const deleteService = await deleteInviteService.execute(id as number);

    res.json(deleteService);
  }
}
