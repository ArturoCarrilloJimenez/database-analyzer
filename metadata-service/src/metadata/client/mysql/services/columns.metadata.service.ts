import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { createRpcError } from 'src/helper';
import { BasicColumnSchema, BasicColumQuery } from 'src/metadata/interfaces';
import { AbstractColumnService } from '../../abstract';

@Injectable()
export class MySQLColumnsMetadataService extends AbstractColumnService {
  private logger = new Logger('MySQLStructureMetadataService');

  async getTableColumns(connectionDb: Knex, database: string) {
    try {
      const table = connectionDb('information_schema.columns')
        .select<BasicColumQuery[]>([
          'TABLE_NAME as tableName',
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
        .where('TABLE_SCHEMA', database);

      const result: BasicColumnSchema[] = (await table).map((c) => ({
        tableName: c.tableName,
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
        message: `Error fetching column of ${database}`,
      });
    }
  }
}
