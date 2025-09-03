import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class ConfigDatabase {
  @IsIn(['pg', 'mysql2'], { message: 'Client must be either "pg" or "mysql".' })
  client: 'pg' | 'mysql2';

  @IsString({ message: 'Host must be a valid string.' })
  host: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Port must be a number.' })
  port?: number;

  @IsString({ message: 'User is required.' })
  user: string;

  @IsString({ message: 'Password is required.' })
  password: string;

  @IsString({ message: 'Database name is required.' })
  database: string;

  @IsOptional()
  @IsBoolean({ message: 'SSL must be a boolean if provided.' })
  ssl?: boolean;

  @IsOptional()
  @IsObject({ message: 'SSL options must be an object if provided.' })
  sslOptions?: Record<string, unknown>;
}
