import { Router } from 'express';
import ValidadorRequest from '@shared/infra/http/middlewares/validatorRequest';
import {
  validatorCreateOrder,
  validadorShowOrder,
} from '@modules/orders/infra/http/middlewares/validatorRequestOrder';
import OrdersController from '../controller/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post(
  '/',
  ValidadorRequest([validatorCreateOrder()]),
  ordersController.create,
);
ordersRouter.get(
  '/:id',
  ValidadorRequest([validadorShowOrder()]),
  ordersController.show,
);

export default ordersRouter;
