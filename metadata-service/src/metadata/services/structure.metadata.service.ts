import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { createRpcError } from 'src/helper';

@Injectable()
export class StructureMetadataService {
  logger = new Logger('StructureMetadataService');

  async getStructureMetadata(connectionDb: Knex) {
    return await this.getTables(connectionDb);
  }

  private async getTables(connectionDb: Knex) {
    try {
      let operation = '';

      switch (connectionDb.client.config.client) {
        case 'mysql2':
          operation = 'SELECT * FROM information_schema.tables;';
          break;
        case 'pg':
          operation = 'SELECT * FROM pg_catalog.pg_tables';
          break;
      }

      return await connectionDb.raw(operation);
    } catch (error) {
      this.logger.error('Error fetching tables', error);
      throw createRpcError({
        status: 404,
        message: 'Error fetching tables',
      });
    }
  }
} 
