import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { createRpcError } from 'src/helper';
import { BasicTableQuery } from 'src/metadata/interfaces';
import { AbstractTableService } from '../../abstract';

@Injectable()
export class MySQLTablesMetadataService extends AbstractTableService {
  private logger = new Logger('MySQLStructureMetadataService');

  async getBasicSchemaTables(connectionDb: Knex, database: string) {
    try {
      // Obtiene information básica sobre las tablas
      const baseTables = connectionDb('information_schema.tables')
        .select<BasicTableQuery[]>([
          'TABLE_NAME AS tableName',
          'TABLE_TYPE AS tableType',
          'TABLE_COMMENT AS comment',
          'ENGINE AS engine',
          connectionDb.raw('(DATA_LENGTH + INDEX_LENGTH) AS totalSize'),
          'TABLE_ROWS as rows',
        ])
        .where('TABLE_SCHEMA', database);

      return await baseTables;
    } catch (error) {
      this.logger.error('Error fetching tables', error);
      throw createRpcError({
        status: 400,
        message: 'Error fetching tables',
      });
    }
  }
}
