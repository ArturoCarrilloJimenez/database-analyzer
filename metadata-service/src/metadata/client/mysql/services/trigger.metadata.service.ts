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
      const trigger = await connectionDb('information_schema.TRIGGERS')
        .select<
          BasicTriggerQuery[]
        >(['TRIGGER_NAME as name', 'EVENT_MANIPULATION as tableName', 'EVENT_OBJECT_TABLE as operation', 'ACTION_TIMING as ejecute'])
        .where('TRIGGER_SCHEMA', database);

      // Obtengo el código del trigger
      const detailedTriggersPromises = trigger.map(async (t) => {
        try {
          // Ejecución del comando DDL especial para obtener el código
          const [result]: any = await connectionDb.raw(
            'SHOW CREATE TRIGGER ??',
            [t.name],
          );

          // MySQL devuelve el código en la columna 'SQL Statement' o 'Create Trigger'
          const codeStatement =
            result[0]['SQL Statement'] || result[0]['Create Trigger'];

          return {
            ...t,
            code: codeStatement, // Incluimos el código completo
          };
        } catch (error) {
          this.logger.error(
            `Error fetching code for trigger: ${t.name}`,
            error,
          );
          // Devolvemos el trigger básico sin código si falla la obtención del DDL
          return t;
        }
      });

      // Esperar a que todas las promesas de SHOW CREATE se resuelvan
      return Promise.all(detailedTriggersPromises);
    } catch (error) {
      this.logger.error('Error fetching tables', error);
      throw createRpcError({
        status: 400,
        message: `Error fetching column of ${database}`,
      });
    }
  }
}
