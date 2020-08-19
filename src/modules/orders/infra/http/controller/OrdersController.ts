import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const findOrderService = container.resolve(FindOrderService);

    const { id } = request.params;

    const list = await findOrderService.execute({ id });

    return response.json(list);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createOrderService = container.resolve(CreateOrderService);

    const order = await createOrderService.execute(request.body);

    return response.json(order);
  }
}
