import { PrismaClient } from '@prisma/client';
import { IRequestCreateUser, IUser } from '../interfaces/UserInterfaces';

const prisma = new PrismaClient();

export default class UserRepository {
  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        phoneNumber,
      },
    });

    return user;
  }

  async findByUserName(userName: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        userName,
      },
    });

    return user;
  }

  async create(params: IRequestCreateUser): Promise<IUser> {
    const user = await prisma.user.create({
      data: {
        email: params.email,
        name: params.name,
        userName: params.userName,
        password: params.password,
        phoneNumber: params.phoneNumber,
      },
    });

    return user;
  }
}
