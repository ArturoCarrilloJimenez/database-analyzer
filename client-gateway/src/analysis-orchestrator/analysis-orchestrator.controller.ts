import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ConfigDatabase } from './dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

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
        this.natsService.send({ cmd: 'databaseAnalyze' }, configDatabase),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
