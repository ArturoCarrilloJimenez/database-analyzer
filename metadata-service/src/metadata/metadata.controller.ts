import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ConfigDatabase } from './dto';
import { MetadataService } from './metadata.service';

@Controller()
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @EventPattern('metadata.getAllMetadata')
  getAllMetadata(@Payload() configDataBase: ConfigDatabase) {
    return this.metadataService.getAllMetadata(configDataBase);
  }
}
