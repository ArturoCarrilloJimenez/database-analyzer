import { Knex } from 'knex';
import { BasicIndexQuery } from 'src/metadata/interfaces';

export abstract class AbstractIndexService {
  abstract getTableIndex(
    connectionDb: Knex,
    database: string,
  ): Promise<BasicIndexQuery[]>;
}
