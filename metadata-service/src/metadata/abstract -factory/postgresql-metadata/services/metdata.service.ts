import { Injectable, Logger } from '@nestjs/common';
import { PostgreSQLStructureMetadataService } from './structure.metadata.service';
import { createRpcError } from 'src/helper';
import { Knex } from 'knex';
import { AbstractMetadataService } from 'src/metadata/abstract/metadata-service.interface';

@Injectable()
export class PostgreSQLMetadataService extends AbstractMetadataService {
  logger = new Logger('PostgreSQLMetadataService');

  constructor(
    private readonly structureMetadataService: PostgreSQLStructureMetadataService,
  ) {
    super();
  }

  async getAllMetadata(connection: Knex) {
    try {
      return await this.structureMetadataService.getStructureMetadata(
        connection,
      );
    } catch (error) {
      this.logger.error('Error getting all metadata', error);
      throw createRpcError(error);
    }
  }
}
