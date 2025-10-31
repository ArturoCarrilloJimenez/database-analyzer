import { Knex } from 'knex';
import { BasicForeignKeyQuery } from 'src/metadata/interfaces';

export abstract class AbstractForeignKeyService {
  abstract getTableForeignKey(
    connectionDb: Knex,
    database: string,
  ): Promise<BasicForeignKeyQuery[]>;
}
