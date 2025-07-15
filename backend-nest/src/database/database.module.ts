import { Module } from '@nestjs/common';
import { DatabaseService, DynamicDatabaseService } from './services/';
import { DatabaseController } from './database.controller';

@Module({
  imports: [],
  controllers: [DatabaseController],
  providers: [DatabaseService, DynamicDatabaseService],
})
export class DatabaseModule {}
