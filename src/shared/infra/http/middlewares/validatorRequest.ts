import { validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

const runValidationChain = async (
  validations: Array<ValidationChain | ValidationChain[]>,
  req: Request,
) => {
  for (const validate of validations) {
    if (Array.isArray(validate)) await runValidationChain(validate, req);
    else await validate.run(req);
  }

  return req;
};

const validationMiddleware = (
  validations: Array<ValidationChain | ValidationChain[]>,
  ...rest: Array<ValidationChain | ValidationChain[]>
) => {
  return async (request: Request, responst: Response, next: NextFunction) => {
    try {
      if (rest) validations = [...validations, ...rest];

      await runValidationChain(validations, request);

      const errors = validationResult(request);

      if (errors.isEmpty()) return next();

      const data = errors
        .array({ onlyFirstError: true })
        .map(({ msg, param }) => {
          return `${param} ${msg}`;
        })
        .join(' - ');

      throw new AppError(data);
    } catch (err) {
      throw new AppError(err);
    }
  };
};

export default validationMiddleware;
