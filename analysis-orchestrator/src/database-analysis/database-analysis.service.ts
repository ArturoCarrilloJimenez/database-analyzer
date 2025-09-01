import { Inject, Injectable } from '@nestjs/common';
import { ConfigDatabase } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { createRpcError } from 'src/helper';

@Injectable()
export class DatabaseAnalysisService {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly natsService: ClientProxy,
  ) {}

  async databaseAnalyze(configDataBase: ConfigDatabase) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await firstValueFrom(
        this.natsService.send('metadata.getAllMetadata', configDataBase),
      );
    } catch (error) {
      throw createRpcError(error);
    }
  }
}
