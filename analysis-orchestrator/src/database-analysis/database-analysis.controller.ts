import { Controller } from '@nestjs/common';
import { DatabaseAnalysisService } from './database-analysis.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ConfigDatabase } from './dto';

@Controller()
export class DatabaseAnalysisController {
  constructor(
    private readonly databaseAnalysisService: DatabaseAnalysisService,
  ) {}

  @EventPattern('orchestrator.getDatabaseAnalyze')
  databaseAnalyze(@Payload() configDataBase: ConfigDatabase) {
    return this.databaseAnalysisService.databaseAnalyze(configDataBase);
  }
}
