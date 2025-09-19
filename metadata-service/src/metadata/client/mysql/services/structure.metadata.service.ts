import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { createRpcError } from 'src/helper';
import {
  BasicStructureSchema,
  BasicTableQuery,
  HasIndexQuery,
  HasTriggerQuery,
} from 'src/metadata/interfaces';
import { AbstractStructureService } from '../../abstract';
import {
  BasicColumnSchema,
  BasicColumQuery,
} from 'src/metadata/interfaces/structute-schema.interface';

@Injectable()
export class MySQLStructureMetadataService extends AbstractStructureService {
  logger = new Logger('MySQLStructureMetadataService');

  async getStructureMetadata(connectionDb: Knex, database: string) {
    const structure = await this.getBasicSchemaTables(connectionDb, database);

    const result = await Promise.all(
      structure.map(async (t) => {
        const columns = await this.getTableColumns(
          connectionDb,
          database,
          t.tableName,
        );

        return {
          ...t,
          columns: columns,
        };
      }),
    );

    return result;
  }

  protected async getBasicSchemaTables(connectionDb: Knex, database: string) {
    try {
      // Obtiene information básica sobre las tablas
      const baseTables = connectionDb('information_schema.tables')
        .select<BasicTableQuery[]>([
          'TABLE_NAME AS tableName',
          'TABLE_TYPE AS tableType',
          'TABLE_COMMENT AS comment',
          'ENGINE AS engine',
          connectionDb.raw('(DATA_LENGTH + INDEX_LENGTH) AS totalSize'),
        ])
        .where('TABLE_SCHEMA', database);

      // Obtiene las tablas que tienen indices
      const indexInfo = connectionDb('information_schema.statistics')
        .distinct<HasIndexQuery[]>('TABLE_NAME as tableName')
        .where('TABLE_SCHEMA', database);

      // Obtiene las tablas con triggers
      const triggerInfo = connectionDb('information_schema.triggers')
        .distinct<HasTriggerQuery[]>('EVENT_OBJECT_TABLE as tableName')
        .where('EVENT_OBJECT_SCHEMA', database);

      const [tables, indexes, triggers] = await Promise.all([
        baseTables,
        indexInfo,
        triggerInfo,
      ]);

      const indexSet = new Set(indexes.map((i) => i.tableName));
      const triggerSet = new Set(triggers.map((t) => t.tableName));

      const result: BasicStructureSchema[] = tables.map((t) => ({
        tableName: t.tableName,
        tableType: t.tableType,
        totalSize: t.totalSize,
        engine: t.engine,
        hasIndexes: indexSet.has(t.tableName),
        hasTriggers: triggerSet.has(t.tableName),
        comment: t.comment,
      }));

      return result;
    } catch (error) {
      this.logger.error('Error fetching tables', error);
      throw createRpcError({
        status: 400,
        message: 'Error fetching tables',
      });
    }
  }

  protected async getTableColumns(
    connectionDb: Knex,
    database: string,
    tableName: string,
  ) {
    try {
      const table = connectionDb('information_schema.columns')
        .select<BasicColumQuery[]>([
          'COLUMN_NAME as name',
          'DATA_TYPE as type',
          'COLUMN_KEY as typeKey',
          'COLUMN_DEFAULT as default',
          connectionDb.raw(
            "CASE WHEN IS_NULLABLE = 'YES' THEN true ELSE false END as isNull",
          ),
          'EXTRA as extra',
          'CHARACTER_MAXIMUM_LENGTH as numChar',
          'NUMERIC_PRECISION as numDigits',
          'NUMERIC_SCALE as numDecimals',
          'CHARACTER_SET_NAME as character',
          'COLLATION_NAME as collection',
          'COLUMN_COMMENT as comment',
        ])
        .where('TABLE_SCHEMA', database)
        .where('TABLE_NAME', tableName);

      const result: BasicColumnSchema[] = (await table).map((c) => ({
        name: c.name,
        type: c.type,
        ...(c.typeKey != '' && { typeKey: c.typeKey }),
        ...(c.default != null && { default: c.default }),
        ...(c.isNull != false && { isNull: c.isNull }),
        ...(c.numChar != null && { numChar: c.numChar }),
        ...(c.numDigits != null && { numDigits: c.numDigits }),
        ...(c.numDecimals != null && { numDecimals: c.numDecimals }),
        ...(c.character != null && { character: c.character }),
        ...(c.collection != null && { collection: c.collection }),
        ...(c.extra != '' && { extra: c.extra }),
        comment: c.comment,
      }));

      return result;
    } catch (error) {
      this.logger.error('Error fetching tables', error);
      throw createRpcError({
        status: 400,
        message: `Error fetching column ${tableName}`,
      });
    }
  }
}
