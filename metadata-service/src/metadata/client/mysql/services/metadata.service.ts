import { Injectable, Logger } from '@nestjs/common';
import {
  MySQLColumnsMetadataService,
  MySQLIndexMetadataService,
  MySQLTablesMetadataService,
} from '.';
import { createRpcError } from 'src/helper';
import { Knex } from 'knex';
import { AbstractMetadataService } from 'src/metadata/client/abstract/metadata-service.interface';

@Injectable()
export class MySQLMetadataService extends AbstractMetadataService {
  logger = new Logger('MySQLMetadataService');

  constructor(
    private readonly columnsMetadataService: MySQLColumnsMetadataService,
    private readonly tableMetadataService: MySQLTablesMetadataService,
    private readonly indexMetadataService: MySQLIndexMetadataService,
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

      const index = this.indexMetadataService.getTableIndex(
        connection,
        this.database,
      );

      const [baseTables, baseColumns, baseIndex] = await Promise.all([
        tables,
        columns,
        index,
      ]);

      const result: object[] = baseTables.map((t) => ({
        ...t,
        columns: baseColumns
          .filter((c) => {
            return c.tableName == t.tableName;
          })
          .map((c) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { tableName, ...res } = c;
            return {
              ...res,
              index: baseIndex
                .filter((i) => {
                  return i.name == res.name;
                })
                .map((i) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { name, tableName, ...res } = i;
                  return res;
                }),
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
