import { Module } from '@nestjs/common';
import {
  MySQLMetadataService,
  MySQLStructureMetadataService,
} from './services';

@Module({
  providers: [MySQLStructureMetadataService, MySQLMetadataService],
  exports: [MySQLMetadataService],
})
export class MySQLMetadataModule {}
