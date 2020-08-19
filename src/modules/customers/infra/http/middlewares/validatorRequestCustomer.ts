import { ValidationChain, body } from 'express-validator';

export const validatorCreateCustomer = (): ValidationChain[] => {
  return [body('name').notEmpty(), body('email').isEmail().notEmpty()];
};
