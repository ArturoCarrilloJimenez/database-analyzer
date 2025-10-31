/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { createRpcError } from 'src/helper';
import { BasicTriggerQuery } from 'src/metadata/interfaces';
import { AbstractTriggerService } from '../../abstract';

@Injectable()
export class MySQLTriggerMetadataService extends AbstractTriggerService {
  private logger = new Logger('MySQLForeignKeyMetadataService');

  async getTableTrigger(
    connectionDb: Knex,
    database: string,
  ): Promise<BasicTriggerQuery[]> {
    try {
      const trigger = connectionDb('information_schema.TRIGGERS')
        .select<
          BasicTriggerQuery[]
        >(['TRIGGER_NAME as name', 'EVENT_MANIPULATION as tableName', 'EVENT_OBJECT_TABLE as operation', 'ACTION_TIMING as ejecute'])
        .where('TRIGGER_SCHEMA', database);

      return trigger;
    } catch (error) {
      this.logger.error('Error fetching tables', error);
      throw createRpcError({
        status: 400,
        message: `Error fetching column of ${database}`,
      });
    }
  }
}
