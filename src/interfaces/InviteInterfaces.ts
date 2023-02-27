import { User } from './UserInterfaces';
import { InviteInteraction } from './InviteInteractionInterfaces';

export type InviteStatus = 'Aberto' | 'Finalizado';

export interface Invite {
  id?: number;
  date?: Date;
  time?: string;
  street?: string;
  addressNumber?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  complement?: string;
  zipcode?: string;
  status?: InviteStatus;
  createdAt?: Date;
  updatedAt?: Date;
  User?: User;
  userId?: number;
  Interactions?: InviteInteraction[];
}

export interface IRequestCreateInvite {
  invite: Invite;
}
