import { Module } from '@nestjs/common';
import { AnalysisOrchestratorModule } from './analysis-orchestrator/analysis-orchestrator.module';

@Module({
  imports: [AnalysisOrchestratorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
