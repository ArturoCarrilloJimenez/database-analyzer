import { Injectable, Logger } from '@nestjs/common';
import { MySQLColumnsMetadataService, MySQLTablesMetadataService } from '.';
import { createRpcError } from 'src/helper';
import { Knex } from 'knex';
import { AbstractMetadataService } from 'src/metadata/client/abstract/metadata-service.interface';

@Injectable()
export class MySQLMetadataService extends AbstractMetadataService {
  logger = new Logger('MySQLMetadataService');

  constructor(
    private readonly columnsMetadataService: MySQLColumnsMetadataService,
    private readonly tableMetadataService: MySQLTablesMetadataService,
  ) {
    super();
  }

  async getAllMetadata(connection: Knex) {
    try {
      const tables = this.tableMetadataService.getBasicSchemaTables(
        connection,
        this.database,
      );

      const columns = this.columnsMetadataService.getTableColumns(
        connection,
        this.database,
      );

      const [baseTables, baseColumns] = await Promise.all([tables, columns]);

      const result: object[] = baseTables.map((t) => ({
        ...t,
        comment: baseColumns
          .filter((c) => {
            return c.tableName == t.tableName;
          })
          .map((c) => {
            const { tableName, ...res } = c;

            return {
              ...res,
            };
          }),
      }));

      return result;
    } catch (error) {
      this.logger.error('Error getting all metadata', error);
      throw createRpcError(error);
    }
  }
}
