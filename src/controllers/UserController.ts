import { Request, Response } from 'express';
import { IRequestCreateUser } from '../interfaces/UserInterfaces';

import CreateUserService from '../services/User/CreateUserService';

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
}
