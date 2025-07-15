import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConnectDatabaseDto } from '../dtos';

@Injectable()
export class DynamicDatabaseService {
  // Método que se encarga de la conexión de la base de datos
  async runWithDataSource<T>(
    dto: ConnectDatabaseDto,
    callback: (dataSource: DataSource) => Promise<T>,
  ): Promise<T> {
    // Configuro el DataSource con los datos que me envían
    const dataSource = new DataSource({
      type: dto.type,
      host: dto.host,
      port: dto.port,
      username: dto.username,
      password: dto.password,
      database: dto.database,
    });

    await dataSource.initialize();

    // Realizo la consulta 
    try {
      return await callback(dataSource);
    } finally {
      await dataSource.destroy();
    }
  }
}
