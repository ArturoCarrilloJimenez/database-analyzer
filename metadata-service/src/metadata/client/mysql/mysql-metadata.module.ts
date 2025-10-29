import { Module } from '@nestjs/common';
import {
  MySQLColumnsMetadataService,
  MySQLIndexMetadataService,
  MySQLMetadataService,
  MySQLTablesMetadataService,
} from './services';

@Module({
  providers: [
    MySQLMetadataService,
    MySQLTablesMetadataService,
    MySQLColumnsMetadataService,
    MySQLIndexMetadataService,
  ],
  exports: [MySQLMetadataService],
})
export class MySQLMetadataModule {}
