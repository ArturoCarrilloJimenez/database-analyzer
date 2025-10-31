import { Injectable, Logger } from '@nestjs/common';
import { ConfigDatabase } from './dto';
import { createRpcError } from 'src/helper';
import { MySQLMetadataService } from './client/mysql/services';
import { DatabaseConnectionManager } from 'src/database/database-conection';
import { AbstractMetadataService } from './client/abstract';

@Injectable()
export class MetadataService {
  logger = new Logger('MetadataService');

  engines: Record<string, AbstractMetadataService>;

  constructor(private readonly mysqlService: MySQLMetadataService) {
    this.engines = {
      mysql2: this.mysqlService,
    };
  }

  async getAllMetadata(configDatabase: ConfigDatabase) {
    try {
      const connectionManager = new DatabaseConnectionManager(configDatabase);

      if (!connectionManager.isConnected) {
        throw createRpcError({
          status: '404',
          message: 'Database not connected',
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
      const result = await this.engines[configDatabase.client]
        .init(configDatabase.database)
        .getAllMetadata(connectionManager.getConnection);

      await connectionManager.remove();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return result;
    } catch (error) {
      this.logger.error('Error getting all metadata', error);
      throw createRpcError(error);
    }
  }
}
