import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { createRpcError } from 'src/helper';
import { BasicForeignKeyQuery } from 'src/metadata/interfaces';
import { AbstractForeignKeyService } from '../../abstract';
@Injectable()
export class MySQLForeignKeyMetadataService extends AbstractForeignKeyService {
  private logger = new Logger('MySQLForeignKeyMetadataService');

  getTableForeignKey(
    connectionDb: Knex,
    database: string,
  ): Promise<BasicForeignKeyQuery[]> {
    try {
      const foreignKey = connectionDb()
        .select<BasicForeignKeyQuery[]>([
          'kcu.TABLE_NAME as tableName',
          'kcu.COLUMN_NAME as name',
          'kcu.CONSTRAINT_NAME as restrictName',
          'kcu.REFERENCED_TABLE_NAME AS tableReference',
          'kcu.REFERENCED_COLUMN_NAME AS columnsReference',
          'rc.DELETE_RULE AS onDelete',
          'rc.UPDATE_RULE AS onUpdate',
        ])
        .from('information_schema.key_column_usage as kcu')
        .join('information_schema.referential_constraints as rc', {
          'kcu.CONSTRAINT_NAME': 'rc.CONSTRAINT_NAME',
          'kcu.TABLE_SCHEMA': 'rc.CONSTRAINT_SCHEMA',
        })
        .where('TABLE_SCHEMA', database);

      return foreignKey;
    } catch (error) {
      this.logger.error('Error fetching tables', error);
      throw createRpcError({
        status: 400,
        message: `Error fetching column of ${database}`,
      });
    }
  }
}
