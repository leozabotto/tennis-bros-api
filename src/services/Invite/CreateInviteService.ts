import validator from 'validator';
import Exception from '../../errors/Exception';

import {
  Invite,
  IRequestCreateInvite,
} from '../../interfaces/InviteInterfaces';

import InviteRepository from '../../repositories/InviteRepository';

interface ICreateInviteService {
  inviteRepository: InviteRepository;
  validate: (params: IRequestCreateInvite) => Promise<boolean>;
  execute: (params: IRequestCreateInvite) => Promise<Invite>;
}

export default class CreateInviteService implements ICreateInviteService {
  public inviteRepository;

  constructor() {
    this.inviteRepository = new InviteRepository();
  }

  async validate({ invite }: IRequestCreateInvite) {
    switch (true) {
      case !invite.date:
        throw new Exception({
          status: 'validation',
          code: 100,
          message: 'date is required',
        });
      case !invite.time:
        throw new Exception({
          status: 'validation',
          code: 101,
          message: 'time is required',
        });
      case !invite.street:
        throw new Exception({
          status: 'validation',
          code: 102,
          message: 'street is required',
        });
      case !invite.addressNumber:
        throw new Exception({
          status: 'validation',
          code: 103,
          message: 'addressNumber is required',
        });
      case !invite.neighborhood:
        throw new Exception({
          status: 'validation',
          code: 104,
          message: 'neighborhood is required',
        });
      case !invite.city:
        throw new Exception({
          status: 'validation',
          code: 105,
          message: 'city is required',
        });
      case !invite.state:
        throw new Exception({
          status: 'validation',
          code: 106,
          message: 'state is required',
        });
      case !invite.zipcode:
        throw new Exception({
          status: 'validation',
          code: 107,
          message: 'zipcode is required',
        });
      default:
        return true;
    }
  }

  async execute({ invite }: IRequestCreateInvite) {
    await this.validate({ invite });

    const createdInvite = await this.inviteRepository.create(invite);

    return createdInvite;
  }
}
