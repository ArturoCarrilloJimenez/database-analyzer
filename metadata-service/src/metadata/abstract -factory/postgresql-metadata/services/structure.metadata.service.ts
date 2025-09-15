import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { createRpcError } from 'src/helper';
import { InformationSchema, IStructureService } from 'src/metadata/interfaces';

@Injectable()
export class PostgreSQLStructureMetadataService extends IStructureService {
  logger = new Logger('PostgreSQLStructureMetadataService');

  async getStructureMetadata(connectionDb: Knex) {
    return await this.getBasicSchemaTables(connectionDb);
  }

  protected async getBasicSchemaTables(connectionDb: Knex) {
    try {
      const consultation = connectionDb<InformationSchema>('pg_class AS c')
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
