import express from 'express';
import InviteController from '../controllers/InviteController';

const invitesRoutes = express.Router();
const inviteController = new InviteController();

invitesRoutes.post('/', inviteController.create);

export default invitesRoutes;
