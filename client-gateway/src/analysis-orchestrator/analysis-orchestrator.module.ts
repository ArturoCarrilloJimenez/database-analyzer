import { Module } from '@nestjs/common';
import { AnalysisOrchestratorController } from './analysis-orchestrator.controller';
import { NatsModule } from 'src/trasport/nats.module';

@Module({
  controllers: [AnalysisOrchestratorController],
  providers: [],
  imports: [NatsModule],
})
export class AnalysisOrchestratorModule {}
