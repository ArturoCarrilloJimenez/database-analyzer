import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { createRpcError } from 'src/helper';
import { AbstractIndexService } from '../../abstract/';
import { BasicIndexQuery } from 'src/metadata/interfaces';

@Injectable()
export class MySQLIndexMetadataService extends AbstractIndexService {
  private logger = new Logger('MySQLIndexMetadataService');

  async getTableIndex(
    connectionDb: Knex,
    database: string,
  ): Promise<BasicIndexQuery[]> {
    try {
      const table = connectionDb('information_schema.statistics')
        .select<
          BasicIndexQuery[]
        >(['TABLE_NAME as tableName', 'COLUMN_NAME as name', 'INDEX_NAME as indexName', 'NON_UNIQUE as unique', 'CARDINALITY as cardinality', 'INDEX_TYPE as type', 'SEQ_IN_INDEX as seqIndex'])
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
