import { Router } from 'express';
import ValidatorRequest from '@shared/infra/http/middlewares/validatorRequest';
import { validatorCreateProduct } from '@modules/products/infra/http/middlewares/validadorRequestProduct';
import ProductsController from '../controller/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post(
  '/',
  ValidatorRequest([validatorCreateProduct()]),
  productsController.create,
);

export default productsRouter;
