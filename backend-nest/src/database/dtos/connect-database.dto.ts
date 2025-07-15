import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { TypeDatabase } from '../interfaces';

export class ConnectDatabaseDto {
  @ApiProperty({
    enum: TypeDatabase,
    description: 'Tipo de base de datos',
  })
  @IsNotEmpty({ message: 'El tipo de base de datos es obligatorio' })
  @IsString({ message: 'El tipo de base de datos debe ser un texto' })
  @IsEnum(TypeDatabase, {
    message: 'El tipo de base de datos solo puede ser mysql o postgresql',
  })
  type: TypeDatabase;

  @ApiProperty({
    description: 'Host de la base de datos',
    example: 'localhost',
  })
  @IsNotEmpty({ message: 'El host es obligatorio' })
  @IsString({ message: 'El host debe ser un texto' })
  @Matches(/^(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(?:\d{1,3}\.){3}\d{1,3})$/, {
    message: 'El host debe ser una IP válida o un dominio válido',
  })
  host: string;

  @ApiProperty({
    description: 'Puesto de la base de datos',
    example: '5432',
  })
  @IsInt({ message: 'El puerto debe ser un número entero' })
  @Min(1, { message: 'El puerto debe ser mayor que 0' })
  @Max(65535, { message: 'El puerto no puede ser mayor que 65535' })
  port: number;

  @ApiProperty({
    description: 'Username de la base de datos',
  })
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @IsString({ message: 'El nombre de usuario debe ser un texto' })
  @Matches(/^[a-zA-Z0-9_@.-]*$/, {
    message:
      'El nombre de usuario solo puede contener letras, números, guiones bajos, puntos, arrobas o guiones',
  })
  @MaxLength(63, {
    message: 'El nombre de usuario no puede tener más de 63 caracteres',
  })
  username: string;

  @ApiProperty({
    description: 'Contraseña del usuario de la base de datos',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatorio' })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @Matches(/^[a-zA-Z0-9_@.-]*$/, {
    message:
      'La contraseña solo puede contener letras, números, guiones bajos, puntos, arrobas o guiones',
  })
  password: string;

  @ApiProperty({
    description: 'Nombre de la base de datos',
  })
  @IsNotEmpty({ message: 'El nombre de la base de datos es obligatorio' })
  @IsString({ message: 'El nombre de la base de datos debe ser un texto' })
  @Matches(/^[a-zA-Z0-9_@.-]*$/, {
    message:
      'El nombre de la base de datos solo puede contener letras, números, guiones bajos, puntos, arrobas o guiones',
  })
  database: string;
}
