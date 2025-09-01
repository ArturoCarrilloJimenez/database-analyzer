import { Module } from '@nestjs/common';
import { MetadataService, StructureMetadataService } from './services/';
import { MetadataController } from './metadata.controller';
import { NatsModule } from 'src/trasport/nats.module';

@Module({
  controllers: [MetadataController],
  providers: [MetadataService, StructureMetadataService],
  imports: [NatsModule],
})
export class MetadataModule {}
