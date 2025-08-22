import { Controller } from '@nestjs/common';
import { MetadataService } from './services/metadata.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConfigDatabase } from './dto';

@Controller()
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @MessagePattern({ cmd: 'getAllMetadata' })
  getAllMetadata(@Payload() configDataBase: ConfigDatabase) {
    this.metadataService.getAllMetadata(configDataBase);
  }
}
