import { Module } from '@nestjs/common';
import { DatabaseAnalysisService } from './database-analysis.service';
import { DatabaseAnalysisController } from './database-analysis.controller';

@Module({
  controllers: [DatabaseAnalysisController],
  providers: [DatabaseAnalysisService],
})
export class DatabaseAnalysisModule {}
