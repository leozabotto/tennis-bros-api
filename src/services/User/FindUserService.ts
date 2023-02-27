import validator from 'validator';
import Exception from '../../errors/Exception';

import UserRepository from '../../repositories/UserRepository';

import { IRequestFindUser, User } from '../../interfaces/UserInterfaces';

interface IFindUserService {
  userRepository: UserRepository;
  validate: (params: IRequestFindUser) => boolean;
  execute: (params: IRequestFindUser) => Promise<User>;
}

export default class AuthUserService implements IFindUserService {
  public userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  validate({ id }: IRequestFindUser) {
    switch (true) {
      case !id:
        throw new Exception({
          status: 'validation',
          code: 100,
          message: 'id is required',
        });
      default:
        return true;
    }
  }

  async execute({ id }: IRequestFindUser) {
    this.validate({ id });

    let foundUser = (await this.userRepository.findById(Number(id))) as User;

    if (!foundUser)
      throw new Exception({
        status: 'error',
        message: 'user not found',
        code: 404,
      });

    delete foundUser.password;

    return foundUser;
  }
}
