import { Module } from '@nestjs/common';
import {
  PostgreSQLMetadataService,
  PostgreSQLStructureMetadataService,
} from './services';

@Module({
  providers: [PostgreSQLMetadataService, PostgreSQLStructureMetadataService],
  exports: [PostgreSQLMetadataService],
})
export class PostgreSQLMetadataModule {}
