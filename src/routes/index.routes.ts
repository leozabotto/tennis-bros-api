import express from 'express';
import userRoutes from './user.routes';
import inviteRoutes from './invite.routes';

const routes = express.Router();

routes.get('/test', (req, res) => res.sendStatus(200));

routes.use('/user', userRoutes);
routes.use('/invite', inviteRoutes);

export default routes;
