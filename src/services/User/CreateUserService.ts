import validator from 'validator';
import Exception from '../../errors/Exception';

import { transformToHash } from '../../utils/hash';

import UserRepository from '../../repositories/UserRepository';

import { IRequestCreateUser, User } from '../../interfaces/UserInterfaces';

interface ICreateUserService {
  userRepository: UserRepository;
  validate: (params: IRequestCreateUser) => Promise<boolean>;
  execute: (params: IRequestCreateUser) => Promise<User>;
  isEmailAlreadyInUse: (email: string) => Promise<boolean>;
  isUserNameAlreadyInUse: (userName: string) => Promise<boolean>;
  isPhoneNumberAlreadyInUse: (userName: string) => Promise<boolean>;
}

export default class CreateUserService implements ICreateUserService {
  public userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async isEmailAlreadyInUse(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (user) return true;
    return false;
  }

  async isUserNameAlreadyInUse(userName: string): Promise<boolean> {
    const user = await this.userRepository.findByUserName(userName);
    if (user) return true;
    return false;
  }

  async isPhoneNumberAlreadyInUse(phoneNumber: string): Promise<boolean> {
    const user = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (user) return true;
    return false;
  }

  async validate({
    name,
    email,
    password,
    phoneNumber,
    userName,
  }: IRequestCreateUser) {
    switch (true) {
      case !name:
        throw new Exception({
          status: 'validation',
          code: 100,
          message: 'name is required',
        });
      case !email:
        throw new Exception({
          status: 'validation',
          code: 101,
          message: 'email is required',
        });
      case !validator.isEmail(email):
        throw new Exception({
          status: 'validation',
          code: 102,
          message: 'email is not valid',
        });
      case !password: {
        throw new Exception({
          status: 'validation',
          code: 103,
          message: 'password is required',
        });
      }
      case !validator.isLength(password, { min: 6, max: 12 }): {
        throw new Exception({
          status: 'validation',
          code: 104,
          message: 'password must have 6 to 12 characters',
        });
      }
      case !userName:
        throw new Exception({
          status: 'validation',
          code: 105,
          message: 'userName is required',
        });
      case !phoneNumber:
        throw new Exception({
          status: 'validation',
          code: 106,
          message: 'phoneNumber is required',
        });
      case await this.isEmailAlreadyInUse(email):
        throw new Exception({
          status: 'validation',
          code: 107,
          message: 'email already in use',
        });
      case await this.isUserNameAlreadyInUse(userName):
        throw new Exception({
          status: 'validation',
          code: 108,
          message: 'userName already in use',
        });
      case await this.isPhoneNumberAlreadyInUse(phoneNumber):
        throw new Exception({
          status: 'validation',
          code: 109,
          message: 'phoneNumber already in use',
        });
      default:
        return true;
    }
  }

  async execute({
    name,
    email,
    password,
    phoneNumber,
    userName,
  }: IRequestCreateUser) {
    await this.validate({ name, email, password, phoneNumber, userName });

    const passwordHash = transformToHash(password);

    const user = await this.userRepository.create({
      name,
      userName,
      email,
      phoneNumber,
      password: passwordHash,
    });

    return user;
  }
}
