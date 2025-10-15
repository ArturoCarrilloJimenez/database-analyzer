import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { createRpcError } from 'src/helper';
import { AbstractIndexService } from '../../abstract/';

@Injectable()
export class MySQLColumnsMetadataService extends AbstractIndexService {
  private logger = new Logger('MySQLIndexMetadataService');

  async getTableIndex(connectionDb: Knex, database: string): Promise<object[]> {
    try {
      const table = connectionDb('information_schema.statistics')
        .select<any[]>(['TABLE_NAME as tableName', 'COLUMN_NAME as name'])
        .where('TABLE_SCHEMA', database);

      return table;
    } catch (error) {
      this.logger.error('Error fetching index', error);
      throw createRpcError({
        status: 400,
        message: `Error fetching index of ${database}`,
      });
    }
  }
}
