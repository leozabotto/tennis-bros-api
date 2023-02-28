import Exception from '../../errors/Exception';
import { Invite } from '../../interfaces/InviteInterfaces';

import InviteRepository from '../../repositories/InviteRepository';

interface IUpdateInviteService {
  inviteRepository: InviteRepository;
  validate: (invite: Invite, id: number) => Promise<boolean>;
  execute: (invite: Invite, id: number) => Promise<Invite>;
  inviteExists: (id: number) => Promise<boolean>;
}

export default class UpdateInviteService implements IUpdateInviteService {
  public inviteRepository;

  constructor() {
    this.inviteRepository = new InviteRepository();
  }

  async inviteExists(id: number): Promise<boolean> {
    const invite = await this.inviteRepository.findById(id);
    if (invite) return true;
    return false;
  }

  async validate(invite: Invite, id: number) {
    switch (true) {
      case !id:
        throw new Exception({
          status: 'validation',
          code: 108,
          message: 'id is required',
        });
      case !(await this.inviteExists(id)):
        throw new Exception({
          status: 'validation',
          code: 109,
          message: 'invite not found',
        });
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

  async execute(invite: Invite, id: number) {
    await this.validate(invite, id);

    const createdInvite = await this.inviteRepository.create(invite);

    return createdInvite;
  }
}
