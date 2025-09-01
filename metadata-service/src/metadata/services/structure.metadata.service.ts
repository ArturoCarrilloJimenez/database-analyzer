import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { createRpcError } from 'src/helper';

@Injectable()
export class StructureMetadataService {
  async getStructureMetadata(connectionDb: Knex) {
    return await this.getTables(connectionDb);
  }

  private async getTables(connectionDb: Knex) {
    try {
      return await connectionDb.raw('SHOW TABLES');
    } catch (error) {
      throw createRpcError({
        status: 404,
        message: 'Error fetching tables',
      });
    }
  }
}
