/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import {
  MySQLColumnsMetadataService,
  MySQLForeignKeyMetadataService,
  MySQLIndexMetadataService,
  MySQLTablesMetadataService,
  MySQLTriggerMetadataService,
} from '.';
import { createRpcError } from 'src/helper';
import { Knex } from 'knex';
import { AbstractMetadataService } from 'src/metadata/client/abstract/';

@Injectable()
export class MySQLMetadataService extends AbstractMetadataService {
  logger = new Logger('MySQLMetadataService');

  constructor(
    private readonly columnsMetadataService: MySQLColumnsMetadataService,
    private readonly tableMetadataService: MySQLTablesMetadataService,
    private readonly indexMetadataService: MySQLIndexMetadataService,
    private readonly foreignKeyMetadataService: MySQLForeignKeyMetadataService,
    private readonly triggerMetadataService: MySQLTriggerMetadataService,
  ) {
    super();
  }

  async getAllMetadata(connection: Knex) {
    try {
      // Obtengo los datos
      const [baseTables, baseColumns, baseIndex, baseForeignKey, baseTrigger] =
        await Promise.all([
          this.tableMetadataService.getBasicSchemaTables(
            connection,
            this.database,
          ),
          this.columnsMetadataService.getTableColumns(
            connection,
            this.database,
          ),
          this.indexMetadataService.getTableIndex(connection, this.database),
          this.foreignKeyMetadataService.getTableForeignKey(
            connection,
            this.database,
          ),
          this.triggerMetadataService.getTableTrigger(
            connection,
            this.database,
          ),
        ]);

      // Mapeo los indices
      const indexedIndexes = new Map<string, object[]>();

      baseIndex.map((i) => {
        const key = `${i.tableName}__${i.name}`;

        // Verifica si la clave ya existe en el Map
        if (!indexedIndexes.has(key)) {
          // Si NO existe, crea un nuevo Array vacío y lo asigna a esa clave.
          indexedIndexes.set(key, []);
        }

        const { name, tableName, ...indexData } = i;

        indexedIndexes.get(key)!.push(indexData);
      });

      // Mapeo las fk
      const foreignKeyIndexed = new Map<string, object[]>();

      baseForeignKey.map((c) => {
        const key = `${c.tableName}__${c.name}`;

        // Verifica si la clave ya existe en el Map
        if (!foreignKeyIndexed.has(key)) {
          // Si NO existe, crea un nuevo Array vacío y lo asigna a esa clave.
          foreignKeyIndexed.set(key, []);
        }

        const { tableName, name, ...foreignKeyData } = c;

        foreignKeyIndexed.get(key)!.push(foreignKeyData);
      });

      // Mapeo las columnas y añado los indices y fk
      const columnsIndexes = new Map<string, object[]>();

      baseColumns.map((c) => {
        const key = `${c.tableName}__${c.name}`;

        // Verifica si la clave ya existe en el Map
        if (!columnsIndexes.has(c.tableName)) {
          // Si NO existe, crea un nuevo Array vacío y lo asigna a esa clave.
          columnsIndexes.set(c.tableName, []);
        }

        const { tableName, ...columnsData } = c;

        columnsIndexes.get(c.tableName)!.push({
          ...columnsData,
          index: indexedIndexes.get(key),
          foreignKey: foreignKeyIndexed.get(key),
        });
      });

      const result: object[] = baseTables.map((t) => ({
        ...t,
        columns: columnsIndexes.get(t.tableName),
        trigger: baseTrigger,
      }));

      return result;
    } catch (error) {
      this.logger.error('Error getting all metadata', error);
      throw createRpcError(error);
    }
  }
}
