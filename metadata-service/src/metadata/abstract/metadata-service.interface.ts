import { Knex } from 'knex';

export abstract class AbstractMetadataService {
  abstract getAllMetadata(connection: Knex): Promise<any>;
}
