import { Module } from '@nestjs/common';
import { AnalysisOrchestratorModule } from './analysis-orchestrator/analysis-orchestrator.module';
import { NatsModule } from './trasport/nats.module';

@Module({
  imports: [AnalysisOrchestratorModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
