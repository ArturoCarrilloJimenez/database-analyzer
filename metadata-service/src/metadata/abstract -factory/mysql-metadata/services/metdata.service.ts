import { Injectable, Logger } from '@nestjs/common';
import { MySQLStructureMetadataService } from './structure.metadata.service';
import { createRpcError } from 'src/helper';
import { Knex } from 'knex';
import { AbstractMetadataService } from 'src/metadata/abstract/metadata-service.interface';

@Injectable()
export class MySQLMetadataService extends AbstractMetadataService {
  logger = new Logger('MySQLMetadataService');

  constructor(
    private readonly structureMetadataService: MySQLStructureMetadataService,
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
