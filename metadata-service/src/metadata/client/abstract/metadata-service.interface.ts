import { Knex } from 'knex';

export abstract class AbstractMetadataService {
  protected database: string;

  abstract getAllMetadata(connection: Knex): Promise<any>;

  init(database: string) {
    this.database = database;
    return this;
  }
}
