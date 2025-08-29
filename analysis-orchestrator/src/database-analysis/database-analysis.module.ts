import { Module } from '@nestjs/common';
import { DatabaseAnalysisService } from './database-analysis.service';
import { DatabaseAnalysisController } from './database-analysis.controller';
import { NatsModule } from 'src/trasport/nats.module';

@Module({
  controllers: [DatabaseAnalysisController],
  providers: [DatabaseAnalysisService],
  imports: [NatsModule],
})
export class DatabaseAnalysisModule {}
