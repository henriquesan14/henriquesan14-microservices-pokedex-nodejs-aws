import { Router } from 'express';

import authMiddleware from '../../core/middlewares/auth';

import TrainerController from './app/controllers/TrainerController';
import AuthController from './app/controllers/AuthController';

import trainerValidator from './app/validators/TrainerValidator';
import authValidator from './app/validators/AuthValidator';

const routes = new Router();

routes.post('/authorize', authValidator, AuthController.login);
routes.post('/trainers', trainerValidator,  TrainerController.create);

routes.use(authMiddleware);

routes.get('/trainers', TrainerController.getAll);
routes.get('/trainers/:id', TrainerController.getById);
routes.put('/trainers/:id', trainerValidator, TrainerController.update);
routes.delete('/trainers/:id', TrainerController.delete);

export default routes;
