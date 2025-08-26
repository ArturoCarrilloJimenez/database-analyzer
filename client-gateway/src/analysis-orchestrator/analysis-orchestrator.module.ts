import { Module } from '@nestjs/common';
import { AnalysisOrchestratorController } from './analysis-orchestrator.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES, env } from 'src/config/';

@Module({
  controllers: [AnalysisOrchestratorController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: SERVICES['ANALYZE_ORCHESTRATOR_SERVICE'],
        transport: Transport.TCP,
        options: {
          host: env.analyzeOrchestratorServiceHost,
          port: env.analyzeOrchestratorServicePort,
        },
      },
    ]),
  ],
})
export class AnalysisOrchestratorModule {}
