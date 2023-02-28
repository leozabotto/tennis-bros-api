import { InviteInteraction, PrismaClient } from '@prisma/client';
import { Invite, InviteStatus } from '../interfaces/InviteInterfaces';

const prisma = new PrismaClient();

export default class InviteRepository {
  async create(invite: Invite): Promise<Invite> {
    const createdInvite = await prisma.invite.create({
      data: {
        date: new Date(invite.date as Date),
        time: invite.time as string,
        street: invite.street as string,
        addressNumber: invite.addressNumber as string,
        neighborhood: invite.neighborhood as string,
        city: invite.city as string,
        state: invite.state as string,
        complement: invite.complement as string,
        zipcode: invite.zipcode as string,
        status: invite.status as InviteStatus,
        userId: invite.userId as number,
      },
    });

    return createdInvite;
  }

  async update(invite: Invite, id: number): Promise<Invite> {
    const updatedInvite = await prisma.invite.update({
      where: {
        id: id as number,
      },
      data: {
        date: new Date(invite.date as Date),
        time: invite.time as string,
        street: invite.street as string,
        addressNumber: invite.addressNumber as string,
        neighborhood: invite.neighborhood as string,
        city: invite.city as string,
        state: invite.state as string,
        complement: invite.complement as string,
        zipcode: invite.zipcode as string,
        status: invite.status as InviteStatus,
      },
    });

    return updatedInvite;
  }

  async deleteInvite(id: number): Promise<Invite | null> {
    const deletedInvite = await prisma.invite.delete({
      where: {
        id: Number(id) as number,
      },
    });

    return deletedInvite;
  }

  async findById(id: number): Promise<Invite | null> {
    const invite = await prisma.invite.findUnique({
      where: {
        id: Number(id) as number,
      },
    });

    return invite;
  }
}
