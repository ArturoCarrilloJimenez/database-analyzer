import { Injectable } from '@nestjs/common';
import { ConfigDatabase } from '../dto';

@Injectable()
export class MetadataService {
  getAllMetadata(configDatabase: ConfigDatabase) {
    return configDatabase.name;
  }
}
