import { Knex } from 'knex';
import { BasicColumnSchema } from '../../interfaces/structute-schema.interface';

export abstract class AbstractColumnService {
  abstract getTableColumns(
    connectionDb: Knex,
    database: string,
  ): Promise<BasicColumnSchema[]>;
}
