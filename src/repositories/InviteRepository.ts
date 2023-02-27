import { PrismaClient } from '@prisma/client';
import { IRequestCreateUser, User } from '../interfaces/UserInterfaces';
import { Invite, InviteStatus } from '../interfaces/InviteInterfaces';

const prisma = new PrismaClient();

export default class InviteRepository {
  // async create(invite: Invite): Promise<Invite> {
  //   const createdInvite = await prisma.invite.create({
  //     data: {
  //       date: invite.date as string,
  //       time: invite.time as string,
  //       street: invite.street as string,
  //       addressNumber: invite.addressNumber as string,
  //       neighborhood: invite.neighborhood as string,
  //       city: invite.city as string,
  //       state: invite.state as string,
  //       complement: invite.complement as string,
  //       zipcode: invite.zipcode as string,
  //       status: invite.status as InviteStatus,
  //       userId: invite.userId as number,
  //     },
  //   });
  //   return createdInvite;
  // }
}
