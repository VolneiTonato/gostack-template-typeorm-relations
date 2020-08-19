import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class OrderCustomerForeingKey1597786029959
  implements MigrationInterface {
  private tableName = 'orders';

  private foreingKey = new TableForeignKey({
    columnNames: ['customer_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'customers',
    name: 'fk_order_customer',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey(this.tableName, this.foreingKey);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey(this.tableName, this.foreingKey);
  }
}
