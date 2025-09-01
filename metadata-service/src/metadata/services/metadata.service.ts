import { Injectable } from '@nestjs/common';
import { ConfigDatabase } from '../dto';
import { DatabaseConnectionManager } from 'src/database/database-conection';
import { StructureMetadataService } from './structure.metadata.service';
import { createRpcError } from 'src/helper';

@Injectable()
export class MetadataService {
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
        connectionManager.getClient,
      );
    } catch (error) {
      throw createRpcError(error);
    }
  }
}
