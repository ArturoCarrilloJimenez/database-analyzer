import { Knex } from 'knex';

export abstract class AbstractIndexService {
  abstract getTableIndex(connectionDb: Knex, database: string): Promise<any[]>;
}
