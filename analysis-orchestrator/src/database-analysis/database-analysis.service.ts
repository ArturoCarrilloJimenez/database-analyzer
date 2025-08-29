import { Injectable } from '@nestjs/common';
import { ConfigDatabase } from './dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class DatabaseAnalysisService {
  databaseAnalyze(configDataBase: ConfigDatabase) {
    return configDataBase.name;
    throw new RpcException({
      status: 401,
      message: configDataBase.name,
    });
  }
}
