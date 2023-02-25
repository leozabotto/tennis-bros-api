import express from 'express';
import UserController from '../controllers/UserController';

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post('/user', userController.create);

export default userRoutes;
