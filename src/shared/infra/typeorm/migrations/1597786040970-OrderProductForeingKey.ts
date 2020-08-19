import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class OrderProductForeingKey1597786040970 implements MigrationInterface {
  private tableName = 'orders_products';

  private foreingKeyProduct = new TableForeignKey({
    columnNames: ['product_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'products',
    name: 'fk_order_product',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  private foreingKeyOrder = new TableForeignKey({
    columnNames: ['order_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'orders',
    name: 'fk_order',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKeys(this.tableName, [
      this.foreingKeyOrder,
      this.foreingKeyProduct,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKeys(this.tableName, [
      this.foreingKeyOrder,
      this.foreingKeyProduct,
    ]);
  }
}
