import { Injectable, Logger } from '@nestjs/common';
import { ConfigDatabase } from '../dto';
import { DatabaseConnectionManager } from 'src/database/database-conection';
import { StructureMetadataService } from './structure.metadata.service';
import { createRpcError } from 'src/helper';

@Injectable()
export class MetadataService {
  logger = new Logger('MetadataService');

  constructor(
    private readonly structureMetadataService: StructureMetadataService,
  ) {}

  async getAllMetadata(configDatabase: ConfigDatabase) {
    try {
      const connectionManager = new DatabaseConnectionManager(configDatabase);

      if (!connectionManager.isConnected) {
        throw createRpcError({
          status: '404',
          message: 'Database not connected',
        });
      }

      return await this.structureMetadataService.getStructureMetadata(
        connectionManager.getConnection,
      );
    } catch (error) {
      this.logger.error('Error getting all metadata', error);
      throw createRpcError(error);
    }
  }
}
