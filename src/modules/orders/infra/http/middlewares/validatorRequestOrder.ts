import { ValidationChain, body, param } from 'express-validator';

export const validatorCreateOrder = (): ValidationChain[] => {
  const validatorsProducts = [
    body('products.*.id')
      .notEmpty()
      .isUUID(4)
      .withMessage('ID do produto inválido'),
    body('products.*.quantity')
      .notEmpty()
      .custom(value => {
        return /^[0-9]{1,}$/.test(value);
      })
      .withMessage('Quantidade obrigatória'),
  ];
  return [body('customer_id').notEmpty().isUUID(4), ...validatorsProducts];
};

export const validadorShowOrder = (): ValidationChain[] => {
  return [param('id').notEmpty().isUUID(4)];
};
