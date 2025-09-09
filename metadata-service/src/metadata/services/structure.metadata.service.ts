import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { createRpcError } from 'src/helper';
import { InformationSchema } from '../interfaces';

@Injectable()
export class StructureMetadataService {
  logger = new Logger('StructureMetadataService');

  async getStructureMetadata(connectionDb: Knex) {
    return await this.getBasicSchemaTables(connectionDb);
  }

  /**
   * Fetches basic schema tables information from the connected database.
   *
   * @param connectionDb connection to database
   * @returns List of tables with basic information
   */
  private async getBasicSchemaTables(connectionDb: Knex) {
    try {
      let consultation: Knex.QueryBuilder<
        InformationSchema,
        InformationSchema[]
      > | null = null;

      switch (connectionDb.client.config.client) {
        case 'mysql2':
          consultation = connectionDb<InformationSchema>(
            'information_schema.tables',
          ).select<InformationSchema[]>([
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
            connectionDb.raw('(DATA_LENGTH + INDEX_LENGTH) AS total_size'),
            'TABLE_COMMENT AS comment',
          ]);
          break;

        case 'pg':
          consultation = connectionDb<InformationSchema>('pg_class AS c')
            .select<InformationSchema[]>([
              'n.nspname AS schema_name',
              'c.relname AS table_name',
              connectionDb.raw('pg_get_userbyid(c.relowner) AS owner'),
              connectionDb.raw('c.relhasindex AS has_indexes'),
              connectionDb.raw('c.relhastriggers AS has_triggers'),
              connectionDb.raw(`
                CASE c.relkind
                  WHEN 'r' THEN 'BASE TABLE'
                  WHEN 'v' THEN 'VIEW'
                END AS table_type
              `),
              connectionDb.raw(`NULL::text AS engine`),
              connectionDb.raw(`
                CASE 
                  WHEN has_table_privilege(c.oid, 'SELECT') 
                  THEN pg_total_relation_size(c.oid)
                  WHEN c.relkind = 'r' 
                  THEN (c.relpages * 8 * 1024)
                  ELSE NULL
                END AS total_size
              `),
              connectionDb.raw(`
                CASE
                  WHEN has_table_privilege(c.oid, 'SELECT')
                  THEN obj_description(c.oid)
                  ELSE NULL
                END AS comment
              `),
            ])
            .join('pg_namespace AS n', 'n.oid', 'c.relnamespace')
            .whereIn('c.relkind', ['r', 'v']);
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
