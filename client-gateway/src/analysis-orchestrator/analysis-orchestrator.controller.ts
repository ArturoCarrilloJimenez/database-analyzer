import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ConfigDatabase } from './dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { createRpcError } from 'src/helper';

@Controller()
export class AnalysisOrchestratorController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly natsService: ClientProxy,
  ) {}

  @Post('analyze')
  async create(@Body() configDatabase: ConfigDatabase) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await firstValueFrom(
        this.natsService.send(
          'orchestrator.getDatabaseAnalyze',
          configDatabase,
        ),
      );
    } catch (error) {
      throw createRpcError(error);
    }
  }
}
