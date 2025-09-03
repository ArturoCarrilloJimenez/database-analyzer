import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsIn(['pg', 'mysql2'], {
    message: 'Client must be either "pg" or "mysql2".',
  })
  client: 'pg' | 'mysql2';

  @ApiProperty()
  @IsString({ message: 'Host must be a valid string.' })
  host: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Port must be a number.' })
  port?: number;

  @ApiProperty()
  @IsString({ message: 'User is required.' })
  user: string;

  @ApiProperty()
  @IsString({ message: 'Password is required.' })
  password: string;

  @ApiProperty()
  @IsString({ message: 'Database name is required.' })
  database: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean({ message: 'SSL must be a boolean if provided.' })
  ssl?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsObject({ message: 'SSL options must be an object if provided.' })
  sslOptions?: Record<string, unknown>;
}
