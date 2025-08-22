import { IsString } from 'class-validator';

export class ConfigDatabase {
  @IsString()
  name: string;
}
