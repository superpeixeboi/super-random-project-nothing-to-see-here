import {MigrationInterface, QueryRunner, Table} from "typeorm";

const name = 'restaurants'

export class restaurants1614569653602 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name,
      columns: [
        { name: 'id', type: 'varchar(6)', isPrimary },
        { name: 'name', type: 'varchar(200)' },
        { name: 'customer_rating', type: 'integer' },
        { name: 'distance', type: 'integer' },
        { name: 'price', type: 'numeric(8, 2)' },
        { name: 'cuisine_id', type: 'varchar(6)' },
      ]
    }));

    await queryRunner.query('ALTER TABLE "restaurants" ADD CONSTRAINT "FK_restaurants_x_cuisines" FOREIGN KEY (cuisine_id) REFERENCES "cuisines"(id);');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(name);
  }
}

var isPrimary = true
