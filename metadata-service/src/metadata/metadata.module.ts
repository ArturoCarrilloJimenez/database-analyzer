import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { NatsModule } from 'src/trasport/nats.module';
import { MySQLMetadataModule } from './client/mysql/mysql-metadata.module';
import { MetadataService } from './metadata.service';

@Module({
  controllers: [MetadataController],
  providers: [MetadataService],
  imports: [NatsModule, MySQLMetadataModule],
})
export class MetadataModule {}
