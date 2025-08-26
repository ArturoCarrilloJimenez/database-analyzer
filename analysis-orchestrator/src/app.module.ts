import { Module } from '@nestjs/common';
import { DatabaseAnalysisModule } from './database-analysis/database-analysis.module';

@Module({
  imports: [DatabaseAnalysisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
