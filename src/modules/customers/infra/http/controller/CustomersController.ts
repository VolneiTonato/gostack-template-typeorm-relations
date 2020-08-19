import { Request, Response } from 'express';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

import { container } from 'tsyringe';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { body: createCustomerDTO }: { body: ICreateCustomerDTO } = request;

    const createCustomerService = container.resolve(CreateCustomerService);

    const customer = await createCustomerService.execute(createCustomerDTO);

    return response.json(customer);
  }
}
