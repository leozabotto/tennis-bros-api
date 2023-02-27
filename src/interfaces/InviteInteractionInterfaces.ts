import { User } from './UserInterfaces';
import { Invite } from './InviteInterfaces';

export interface InviteInteraction {
  id?: number;
  type?: 'Aceito' | 'Rejeitado';
  createdAt?: string;
  updatedAt?: string;
  User?: User;
  userId?: number;
  Invite?: Invite;
  inviteId?: number;
}
