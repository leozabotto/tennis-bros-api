import validator from 'validator';
import Exception from '../../errors/Exception';

import { compareHash } from '../../utils/hash';
import generateToken from '../../utils/jwt';

import UserRepository from '../../repositories/UserRepository';

import { IRequestAuthUser, IUser } from '../../interfaces/UserInterfaces';

interface IAuthUserService {
  userRepository: UserRepository;
  validate: (params: IRequestAuthUser) => boolean;
  execute: (params: IRequestAuthUser) => Promise<string>;
}

const defaultAuthException = new Exception({
  status: 'error',
  message: 'invalid e-mail or password',
  code: 100,
});

export default class AuthUserService implements IAuthUserService {
  public userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  validate({ user, password }: IRequestAuthUser) {
    switch (true) {
      case !user:
        throw new Exception({
          status: 'validation',
          code: 100,
          message: 'user is required',
        });
      case !password: {
        throw new Exception({
          status: 'validation',
          code: 101,
          message: 'password is required',
        });
      }
      default:
        return true;
    }
  }

  async execute({ user, password }: IRequestAuthUser) {
    this.validate({ user, password });

    let foundUser: null | IUser = null;

    const userParamType = validator.isEmail(user) ? 'email' : 'userName';

    if (userParamType === 'email') {
      foundUser = await this.userRepository.findByEmail(user);
    } else {
      foundUser = await this.userRepository.findByUserName(user);
    }

    if (!foundUser) throw defaultAuthException;

    const isPasswordValid = compareHash(password, foundUser.password as string);

    if (!isPasswordValid) throw defaultAuthException;

    const token = generateToken({
      id: foundUser.id,
      userName: foundUser.userName,
      name: foundUser.name,
      email: foundUser.email,
      phoneNumber: foundUser.phoneNumber,
    });

    return token;
  }
}
