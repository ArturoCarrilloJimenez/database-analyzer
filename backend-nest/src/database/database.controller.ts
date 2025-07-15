import { Body, Controller, Post } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConnectDatabaseDto } from './dtos';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('analyze')
  analyzeDatabase(@Body() connectDatabase: ConnectDatabaseDto) {
    return connectDatabase;
  }
}
