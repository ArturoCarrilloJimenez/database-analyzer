import { Body, Controller, Post } from '@nestjs/common';
import { DatabaseService } from './services/';
import { ConnectDatabaseDto } from './dtos';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService, private readonly ) {}

  @Post('analyze')
  analyzeDatabase(@Body() connectDatabase: ConnectDatabaseDto) {
    return this.dbService.runWithDataSource(dto, async (dataSource) => {
      // Ejemplo: listar tablas según tipo de BD
      if (dto.dbType === 'mysql') {
        return dataSource.query(`SHOW TABLES`);
      } else {
        return dataSource.query(
          `SELECT table_name FROM information_schema.tables WHERE table_schema='public'`,
        );
      }
    });
  }
}
