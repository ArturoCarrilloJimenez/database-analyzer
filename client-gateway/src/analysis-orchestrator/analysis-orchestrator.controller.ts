import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ConfigDatabase } from './dto';
import { SERVICES } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AnalysisOrchestratorController {
  constructor(
    @Inject(SERVICES['ANALYZE_ORCHESTRATOR_SERVICE'])
    private readonly analyzeOrchestratorClient: ClientProxy,
  ) {}

  @Post('analyze')
  async create(@Body() configDatabase: ConfigDatabase) {
    try {
      return await firstValueFrom(
        this.analyzeOrchestratorClient.send(
          { cmd: 'databaseAnalyze' },
          configDatabase,
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
