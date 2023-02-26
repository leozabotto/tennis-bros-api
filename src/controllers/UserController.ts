import { Request, Response } from 'express';
import {
  IRequestCreateUser,
  IRequestAuthUser,
  IRequestFindUser,
} from '../interfaces/UserInterfaces';

import AuthUserService from '../services/User/AuthUserService';
import CreateUserService from '../services/User/CreateUserService';
import FindUserService from '../services/User/FindUserService';

export default class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password, phoneNumber, userName }: IRequestCreateUser =
      req.body;

    const createUserService = new CreateUserService();
    const createdUser = await createUserService.execute({
      name,
      email,
      password,
      phoneNumber,
      userName,
    });

    res.json(createdUser);
  }

  async find(req: Request, res: Response) {
    const { id }: IRequestFindUser = req.params;

    const findUserService = new FindUserService();
    const foundUser = await findUserService.execute({
      id,
    });

    res.json(foundUser);
  }

  async auth(req: Request, res: Response) {
    const { user, password }: IRequestAuthUser = req.body;

    const authUserService = new AuthUserService();
    const token = await authUserService.execute({ user, password });

    res.json({ token });
  }
}
