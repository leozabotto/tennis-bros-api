import express from 'express';
import InviteController from '../controllers/InviteController';

const invitesRoutes = express.Router();
const inviteController = new InviteController();

invitesRoutes.get('/:id', inviteController.find);
invitesRoutes.post('/', inviteController.create);
invitesRoutes.put('/:id', inviteController.update);
invitesRoutes.delete('/:id', inviteController.delete);

export default invitesRoutes;
