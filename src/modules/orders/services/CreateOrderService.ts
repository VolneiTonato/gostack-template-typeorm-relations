import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IProductData {
  product_id: string;
  quantity: number;
  price: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    try {
      const customer = await this.customersRepository.findById(customer_id);

      if (!customer) throw new AppError('Customer inválido!');

      const productsId = products.map(product => ({ id: product.id }));

      const productsData = await this.productsRepository.findAllById(
        productsId,
      );

      const productUpdate: IProduct[] = [];
      const productSave: IProductData[] = [];

      productsData.forEach(prod => {
        const prodFilter = products.find(prd => prd.id === prod.id);

        if (!prodFilter) throw new AppError(`Erro na sincronização dos dados.`);

        const qtd = prod.quantity - prodFilter?.quantity;

        if (qtd < 0)
          throw new AppError(`Quantidade do item ${prod.name} é inválida!`);

        productUpdate.push({
          id: prod.id,
          quantity: qtd,
        });

        productSave.push({
          product_id: prod.id,
          price: prod.price,
          quantity: prodFilter.quantity,
        });
      });

      await this.productsRepository.updateQuantity(productUpdate);

      const order = await this.ordersRepository.create({
        customer,
        products: productSave,
      });

      return order;
    } catch (err) {
      throw new AppError(`Server error`);
    }
  }
}

export default CreateOrderService;
