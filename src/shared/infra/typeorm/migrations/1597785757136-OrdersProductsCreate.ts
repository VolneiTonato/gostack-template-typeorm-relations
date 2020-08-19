import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class OrdersProductsCreate1597785757136 implements MigrationInterface {
  private table = new Table({
    name: 'orders_products',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'order_id',
        type: 'uuid',
        isNullable: false,
      },
      {
        name: 'product_id',
        type: 'uuid',
        isNullable: false,
      },
      {
        name: 'price',
        type: 'decimal',
        default: '0.00',
        precision: 10,
        scale: 2,
        isNullable: false,
      },
      {
        name: 'quantity',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      },

      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table.name);
  }
}
