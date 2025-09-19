import { Knex } from 'knex';
import {
  BasicColumnSchema,
  BasicStructureSchema,
} from '../../interfaces/structute-schema.interface';

export abstract class AbstractStructureService {
  abstract getStructureMetadata(
    connectionDb: Knex,
    database: string,
  ): Promise<any>;

  protected abstract getBasicSchemaTables(
    connectionDb: Knex,
    database: string,
  ): Promise<BasicStructureSchema[]>;

  protected abstract getTableColumns(
    connectionDb: Knex,
    database: string,
    tableName: string,
  ): Promise<BasicColumnSchema[]>;
}
