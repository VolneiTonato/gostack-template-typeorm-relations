import { Router } from 'express';
import validatorRequest from '@shared/infra/http/middlewares/validatorRequest';
import { validatorCreateCustomer } from '@modules/customers/infra/http/middlewares/validatorRequestCustomer';

import CustomersController from '../controller/CustomersController';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.post(
  '/',
  validatorRequest([validatorCreateCustomer()]),
  customersController.create,
);

export default customersRouter;
