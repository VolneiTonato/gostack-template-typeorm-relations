import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { body: createProductDTO }: { body: ICreateProductDTO } = request;

    const createProductService = container.resolve(CreateProductService);

    const product = await createProductService.execute(createProductDTO);

    return response.json(product);
  }
}
