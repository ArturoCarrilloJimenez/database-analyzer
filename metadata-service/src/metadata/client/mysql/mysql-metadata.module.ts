import { Module } from '@nestjs/common';
import {
  MySQLColumnsMetadataService,
  MySQLMetadataService,
  MySQLTablesMetadataService,
} from './services';

@Module({
  providers: [
    MySQLMetadataService,
    MySQLTablesMetadataService,
    MySQLColumnsMetadataService,
  ],
  exports: [MySQLMetadataService],
})
export class MySQLMetadataModule {}
