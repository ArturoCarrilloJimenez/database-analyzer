import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { createRpcError } from 'src/helper';
import { InformationSchema, IStructureService } from 'src/metadata/interfaces';

@Injectable()
export class MySQLStructureMetadataService extends IStructureService {
  logger = new Logger('MySQLStructureMetadataService');

  async getStructureMetadata(connectionDb: Knex) {
    return await this.getBasicSchemaTables(connectionDb);
  }

  protected async getBasicSchemaTables(connectionDb: Knex) {
    try {
      const consultation = connectionDb<InformationSchema>(
        'information_schema.tables',
      ).select<InformationSchema[]>([
        'TABLE_SCHEMA AS schema_name',
        'TABLE_NAME AS table_name',
        connectionDb.raw('USER() AS owner'),
        connectionDb.raw('IF(INDEX_LENGTH > 0, TRUE, FALSE) AS has_indexes'),
        connectionDb.raw(`
                EXISTS (
                  SELECT 1
                  FROM information_schema.triggers
                  WHERE EVENT_OBJECT_SCHEMA = TABLE_SCHEMA
                    AND EVENT_OBJECT_TABLE = TABLE_NAME
                ) AS has_triggers
              `),
        'TABLE_TYPE AS table_type',
        'ENGINE AS engine',
        connectionDb.raw('(DATA_LENGTH + INDEX_LENGTH) AS total_size'),
        'TABLE_COMMENT AS comment',
      ]);

      return await consultation;
    } catch (error) {
      this.logger.error('Error fetching tables', error);
      throw createRpcError({
        status: 404,
        message: 'Error fetching tables',
      });
    }
  }
}
