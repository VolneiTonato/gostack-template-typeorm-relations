import { ValidationChain, body } from 'express-validator';
import numberUtils from '@shared/utils/numberUtils';

export const validatorCreateProduct = (): ValidationChain[] => {
  return [
    body('name').notEmpty(),
    body('quantity').isNumeric().notEmpty(),
    body('price')
      .notEmpty()
      .customSanitizer(value => {
        value = numberUtils.currencyBRLToDouble(value);

        if (!Number(value)) throw new Error(`price inválid!`);

        return value;
      }),
  ];
};
