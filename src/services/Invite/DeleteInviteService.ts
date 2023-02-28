import Exception from '../../errors/Exception';
import { Invite } from '../../interfaces/InviteInterfaces';

import InviteRepository from '../../repositories/InviteRepository';

interface IDeleteInviteService {
  inviteRepository: InviteRepository;
  validate: (id: number) => Promise<boolean>;
  execute: (id: number) => Promise<Invite>;
  inviteExists: (id: number) => Promise<boolean>;
}

export default class DeleteInviteService implements IDeleteInviteService {
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
      case !(await this.inviteExists(id)):
        throw new Exception({
          status: 'validation',
          code: 109,
          message: 'invite not found',
        });
      default:
        return true;
    }
  }

  async execute(id: number) {
    await this.validate(id);

    const deletedInvite = (await this.inviteRepository.deleteInvite(
      id,
    )) as Invite;

    return deletedInvite;
  }
}
