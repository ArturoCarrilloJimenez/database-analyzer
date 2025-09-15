import { Knex } from 'knex';
import { InformationSchema } from '../interfaces/information-schema.interface';

export abstract class AbstractStructureService {
  abstract getStructureMetadata(connectionDb: Knex): Promise<any>;
  protected abstract getBasicSchemaTables(
    connectionDb: Knex,
  ): Promise<InformationSchema[]>;
}
