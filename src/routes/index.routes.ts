import express from 'express';
import userRoutes from './user.routes';

const routes = express.Router();

routes.get('/test', (req, res) => res.sendStatus(200));
routes.use(userRoutes);

export default routes;
