import { Module } from '@nestjs/common';
import {
  MySQLColumnsMetadataService,
  MySQLForeignKeyMetadataService,
  MySQLIndexMetadataService,
  MySQLMetadataService,
  MySQLTablesMetadataService,
  MySQLTriggerMetadataService,
} from './services';

@Module({
  providers: [
    MySQLMetadataService,
    MySQLTablesMetadataService,
    MySQLColumnsMetadataService,
    MySQLIndexMetadataService,
    MySQLForeignKeyMetadataService,
    MySQLTriggerMetadataService,
  ],
  exports: [MySQLMetadataService],
})
export class MySQLMetadataModule {}
