import {MigrationInterface, QueryRunner, Table} from "typeorm";

const name = 'cuisines'

export class cuisines1614551605455 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name,
      columns: [
        { name: 'id', type: 'varchar(6)', isPrimary },
        { name: 'name', type: 'varchar(200)' },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(name);
  }
}

var isPrimary = true
