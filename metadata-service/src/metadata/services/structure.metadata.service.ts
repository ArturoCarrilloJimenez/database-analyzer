import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { createRpcError } from 'src/helper';
import { InformationSchema } from '../interfaces';

@Injectable()
export class StructureMetadataService {
  logger = new Logger('StructureMetadataService');

  async getStructureMetadata(connectionDb: Knex) {
    return await this.getSchemaTables(connectionDb);
  }

  private async getSchemaTables(connectionDb: Knex) {
    try {
      let consultation: Knex.QueryBuilder<object, InformationSchema[]> | null =
        null;

      switch (connectionDb.client.config.client) {
        case 'mysql2':
          consultation = connectionDb
            .select([
              'TABLE_SCHEMA AS schema_name',
              'TABLE_NAME AS table_name',
              connectionDb.raw('USER() AS owner'),
              connectionDb.raw(
                'IF(INDEX_LENGTH > 0, TRUE, FALSE) AS has_indexes',
              ),
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
              // connectionDb.raw('(DATA_LENGTH + INDEX_LENGTH) AS total_size'),
              // 'TABLE_COMMENT AS comment',
            ])
            .from('information_schema.tables');
          break;
        case 'pg':
          consultation = connectionDb
            .select([
              'schemaname AS schema_name',
              'tablename AS table_name',
              'tableowner AS owner',
              'hasindexes AS has_indexes',
              'hastriggers AS has_triggers',
              connectionDb.raw(`'BASE TABLE' AS table_type`),
              connectionDb.raw(`NULL::text AS engine`),
              // connectionDb.raw(
              //   `pg_total_relation_size(format('%I.%I', schemaname, tablename)::regclass) AS total_size`,
              // ),
              // connectionDb.raw(
              //   `obj_description(format('%I.%I', schemaname, tablename)::regclass) AS comment`,
              // ),
            ])
            .from('pg_catalog.pg_tables');
          break;
      }

      if (!consultation) {
        throw createRpcError({
          status: 400,
          message: 'Unsupported database client',
        });
      }

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
