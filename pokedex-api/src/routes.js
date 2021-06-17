import { Router } from 'express';

import authMiddleware from '../../core/middlewares/auth';

import PokedexController from './app/controllers/PokedexController';
import ReportController from './app/controllers/ReportController';



const routes = new Router();

routes.use(authMiddleware);
routes.post('/registers', PokedexController.register);
routes.get('/registers', PokedexController.getAll);
routes.get('/registers/:id', PokedexController.getById);
routes.put('/registers/:id', PokedexController.update);
routes.delete('/registers/:id', PokedexController.delete);

routes.get('/report', ReportController.reportPokedex);



export default routes;
