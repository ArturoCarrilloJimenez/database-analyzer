import { Injectable, Logger } from '@nestjs/common';
import { ConfigDatabase } from '../dto';
import { createRpcError } from 'src/helper';
import { MySQLMetadataService } from '../abstract -factory/mysql-metadata/services';
import { DatabaseConnectionManager } from 'src/database/database-conection';
import { AbstractMetadataService } from '../abstract';
import { PostgreSQLMetadataService } from '../abstract -factory/postgresql-metadata/services';

@Injectable()
export class MetadataService {
  logger = new Logger('MetadataService');

  engines: Record<string, AbstractMetadataService>;

  constructor(
    private readonly mysqlService: MySQLMetadataService,
    private readonly postgresService: PostgreSQLMetadataService,
  ) {
    this.engines = {
      mysql2: this.mysqlService,
      pg: this.postgresService,
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

      return await this.engines[configDatabase.client].getAllMetadata(
        connectionManager.getConnection,
      );
    } catch (error) {
      this.logger.error('Error getting all metadata', error);
      throw createRpcError(error);
    }
  }
}
