import { Knex } from 'knex';
import { BasicTriggerQuery } from 'src/metadata/interfaces';

export abstract class AbstractTriggerService {
  abstract getTableTrigger(
    connectionDb: Knex,
    database: string,
  ): Promise<BasicTriggerQuery[]>;
}
