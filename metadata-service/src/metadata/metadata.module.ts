import { Module } from '@nestjs/common';
import { MetadataService, StructureMetadataService } from './services/';
import { MetadataController } from './metadata.controller';
import { NatsModule } from 'src/trasport/nats.module';
import { MySQLMetadataModule } from './abstract -factory/mysql-metadata/mysql-metadata.module';
import { PostgreSQLMetadataModule } from './abstract -factory/postgresql-metadata/postgresql-metadata.module';

@Module({
  controllers: [MetadataController],
  providers: [MetadataService, StructureMetadataService],
  imports: [NatsModule, MySQLMetadataModule, PostgreSQLMetadataModule],
})
export class MetadataModule {}
