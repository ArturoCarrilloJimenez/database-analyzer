import { Knex } from 'knex';
import { BasicTableQuery } from '../../interfaces/structute-schema.interface';

export abstract class AbstractTableService {
  abstract getBasicSchemaTables(
    connectionDb: Knex,
    database: string,
  ): Promise<BasicTableQuery[]>;
}
