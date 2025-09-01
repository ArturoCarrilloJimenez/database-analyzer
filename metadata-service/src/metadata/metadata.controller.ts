import { Controller } from '@nestjs/common';
import { MetadataService } from './services/';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ConfigDatabase } from './dto';

@Controller()
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @EventPattern('metadata.getAllMetadata')
  getAllMetadata(@Payload() configDataBase: ConfigDatabase) {
    return this.metadataService.getAllMetadata(configDataBase);
  }
}
