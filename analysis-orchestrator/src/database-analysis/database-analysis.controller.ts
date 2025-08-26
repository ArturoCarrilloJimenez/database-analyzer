import { Controller } from '@nestjs/common';
import { DatabaseAnalysisService } from './database-analysis.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConfigDatabase } from './dto';

@Controller()
export class DatabaseAnalysisController {
  constructor(
    private readonly databaseAnalysisService: DatabaseAnalysisService,
  ) {}

  @MessagePattern({ cmd: 'databaseAnalyze' })
  databaseAnalyze(@Payload() configDataBase: ConfigDatabase) {
    return this.databaseAnalysisService.databaseAnalyze(configDataBase);
  }
}
