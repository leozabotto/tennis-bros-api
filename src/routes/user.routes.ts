import express from 'express';
import UserController from '../controllers/UserController';

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.get('/:id', userController.find);
userRoutes.post('/', userController.create);
userRoutes.post('/auth', userController.auth);

export default userRoutes;
