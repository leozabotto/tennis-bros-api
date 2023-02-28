import Exception from '../../errors/Exception';
import { Invite } from '../../interfaces/InviteInterfaces';

import InviteRepository from '../../repositories/InviteRepository';

interface IFindInviteService {
  inviteRepository: InviteRepository;
  validate: (id: number) => Promise<boolean>;
  execute: (id: number) => Promise<Invite>;
}

export default class FindInviteService implements IFindInviteService {
  public inviteRepository;

  constructor() {
    this.inviteRepository = new InviteRepository();
  }

  async inviteExists(id: number): Promise<boolean> {
    const invite = await this.inviteRepository.findById(id);
    if (invite) return true;
    return false;
  }

  async validate(id: number) {
    switch (true) {
      case !id:
        throw new Exception({
          status: 'validation',
          code: 108,
          message: 'id is required',
        });
      default:
        return true;
    }
  }

  async execute(id: number) {
    await this.validate(id);

    const foundInvite = await this.inviteRepository.findById(id);

    if (!foundInvite)
      throw new Exception({
        code: 404,
        message: 'invite not found',
        status: 'error',
      });

    return foundInvite;
  }
}
